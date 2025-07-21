'use client';
// File: frontend/src/components/tiptap/SmallTiptapEditor.tsx
import React, { useCallback, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import Highlight from '@tiptap/extension-highlight';
import CodeBlock from "@tiptap/extension-code-block";
import Youtube from '@tiptap/extension-youtube';
import TextAlign from "@tiptap/extension-text-align";
import { ListItem } from "@tiptap/extension-list-item";
import { BulletList } from "@tiptap/extension-bullet-list";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { TextStyle } from '@tiptap/extension-text-style';
import FontSize from '@tiptap/extension-font-size';
import Placeholder from '@tiptap/extension-placeholder';
import CustomSelect from './ui/CustomSelect';
import CustomPopover from './ui/CustomPopover';
import BoldIcon from '../icons/BoldIcon';
import UnderlineIcon from '../icons/UnderlineIcon';
import Highlighter from '../icons/Highlighter';
import CodeIcon from '../icons/CodeIcon';
import BulletListIcon from '../icons/BulletListIcon';
import OrderedListIcon from '../icons/OrderedListIcon';
import LinkIcon from '../icons/LinkIcon';
import ImageIcon from '../icons/ImageIcon';
import VideoIcon from '../icons/VideoIcon';
import AlignLeft from '../icons/AlignLeft';
import AlignCenter from '../icons/AlignCenter';
import AlignRight from '../icons/AlignRight';
import AlignJustify from '../icons/AlignJustify';
import FontSizeIcon from '../icons/FontSizeIcon';
import './SmallTiptapEditor.css';

const fontSizes = [
  { name: '10px', value: '10px' },
  { name: '12px', value: '12px' },
  { name: '14px', value: '14px' },
  { name: '16px', value: '16px' },
];

const alignmentOptions = [
  { value: 'left', label: <AlignLeft size={18} />, name: 'Left' },
  { value: 'center', label: <AlignCenter size={18} />, name: 'Center' },
  { value: 'right', label: <AlignRight size={18} />, name: 'Right' },
  { value: 'justify', label: <AlignJustify size={18} />, name: 'Justify' },
];

// Update MenuBar to accept imageUploadUrl prop
const MenuBar = ({ editor, imageUploadUrl }: { editor: any, imageUploadUrl?: string }) => {
  const [imagePopoverOpen, setImagePopoverOpen] = useState(false);
  const [imageTab, setImageTab] = useState<'url' | 'upload'>('url');
  const [imageUrl, setImageUrl] = useState('');
  const [imageWidth, setImageWidth] = useState('');
  const [imageHeight, setImageHeight] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoPopoverOpen, setVideoPopoverOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoWidth, setVideoWidth] = useState('');
  const [videoHeight, setVideoHeight] = useState('');
  const [linkPopoverOpen, setLinkPopoverOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const linkButtonRef = React.useRef<HTMLButtonElement>(null);
  const imageButtonRef = React.useRef<HTMLButtonElement>(null);
  const videoButtonRef = React.useRef<HTMLButtonElement>(null);

  // Helper for image by URL
  const handleImageUrlInsert = useCallback(() => {
    if (imageUrl) {
      const attrs: any = { src: imageUrl };
      if (imageWidth) attrs.width = imageWidth;
      if (imageHeight) attrs.height = imageHeight;
      editor.chain().focus().setImage(attrs).run();
      setImagePopoverOpen(false);
      setImageUrl('');
      setImageWidth('');
      setImageHeight('');
    }
  }, [editor, imageUrl, imageWidth, imageHeight]);

  // Helper for image upload
  const handleImageUpload = async (file: File) => {
    if (!imageUploadUrl) return;
    setUploading(true);
    setUploadError(null);
    setUploadedImageUrl('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      // If tiptap expects a specific field name, adjust here
      const response = await fetch(imageUploadUrl, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Upload failed');
      const data = await response.json();
      // Tiptap expects { link: 'url' } or similar; adjust as needed
      const url = data.link || data.url || data.src || '';
      if (!url) throw new Error('No image URL returned');
      setUploadedImageUrl(url);
    } catch (err: any) {
      setUploadError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleUploadInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      handleImageUpload(file);
    }
  };

  const handleUploadedImageInsert = () => {
    if (uploadedImageUrl) {
      const attrs: any = { src: uploadedImageUrl };
      if (imageWidth) attrs.width = imageWidth;
      if (imageHeight) attrs.height = imageHeight;
      editor.chain().focus().setImage(attrs).run();
      setImagePopoverOpen(false);
      setUploadedImageUrl('');
      setImageFile(null);
      setImageWidth('');
      setImageHeight('');
      setUploadError(null);
      setImageTab('url');
    }
  };

  // Helper for video embedding (popover)
  const handleVideoUrlInsert = useCallback(() => {
    if (videoUrl) {
      const attrs: any = { src: videoUrl };
      if (videoWidth) attrs.width = videoWidth;
      if (videoHeight) attrs.height = videoHeight;
      editor.chain().focus().setYoutubeVideo(attrs).run();
      setVideoPopoverOpen(false);
      setVideoUrl('');
      setVideoWidth('');
      setVideoHeight('');
    }
  }, [editor, videoUrl, videoWidth, videoHeight]);

  // Helper for link insertion (popover)
  const handleLinkInsert = useCallback(() => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkPopoverOpen(false);
      setLinkUrl('');
    }
  }, [editor, linkUrl]);
  const handleLinkUnset = useCallback(() => {
    editor.chain().focus().unsetLink().run();
    setLinkPopoverOpen(false);
    setLinkUrl('');
  }, [editor]);

  if (!editor) return null;

  return (
    <>
      <div className="toolbar global-toolbar">
        {/* Font Size Dropdown */}
        <CustomSelect
          value={editor.getAttributes('fontSize').fontSize || ''}
          options={fontSizes.map(f => ({ value: f.value, label: f.name }))}
          onChange={val => editor.chain().focus().setFontSize(val).run()}
          className="select"
          placeholder="Font Size"
        />
        {/* Bold */}
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={`button${editor.isActive("bold") ? ' buttonActive' : ''}`} type="button"><BoldIcon size={18} /></button>
        {/* Underline */}
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`button${editor.isActive("underline") ? ' buttonActive' : ''}`} type="button"><UnderlineIcon size={18} /></button>
        {/* Highlighter (single color) */}
        <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#fff59d' }).run()} className={`button${editor.isActive("highlight") ? ' buttonActive' : ''}`} type="button"><Highlighter size={18} /></button>
        {/* Code block */}
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`button${editor.isActive("codeBlock") ? ' buttonActive' : ''}`} type="button"><CodeIcon size={18} /></button>
        {/* Unordered List */}
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`button${editor.isActive("bulletList") ? ' buttonActive' : ''}`} type="button"><BulletListIcon size={18} /></button>
        {/* Ordered List */}
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`button${editor.isActive("orderedList") ? ' buttonActive' : ''}`} type="button"><OrderedListIcon size={18} /></button>
        {/* Link Popover */}
        <>
          <button
            ref={linkButtonRef}
            onClick={() => {
              setLinkPopoverOpen((open) => !open);
              setLinkUrl(editor.getAttributes('link').href || '');
            }}
            className={`button${editor.isActive("link") ? ' buttonActive' : ''}`}
            type="button"
          >
            <LinkIcon size={18} />
          </button>
          <CustomPopover
            open={linkPopoverOpen}
            onOpenChange={setLinkPopoverOpen}
            anchorEl={linkButtonRef.current}
          >
            <div className="mb-2 font-semibold text-base">Insert Link</div>
            <input
              type="text"
              placeholder="Paste link URL here..."
              value={linkUrl}
              onChange={e => setLinkUrl(e.target.value)}
              className="input"
              autoFocus
            />
            <div className="flexRow">
              <button
                className="primaryBtn"
                onClick={handleLinkInsert}
                disabled={!linkUrl}
              >
                Insert
              </button>
              <button
                className="secondaryBtn"
                onClick={handleLinkUnset}
                disabled={!editor.isActive('link')}
              >
                Remove
              </button>
            </div>
          </CustomPopover>
        </>
        {/* Image Popover */}
        <>
          <button
            ref={imageButtonRef}
            onClick={() => setImagePopoverOpen((open) => !open)}
            className="button"
            type="button"
          >
            <ImageIcon size={18} />
          </button>
          <CustomPopover
            open={imagePopoverOpen}
            onOpenChange={setImagePopoverOpen}
            anchorEl={imageButtonRef.current}
          >
            <div className="mb-2 font-semibold text-base flex gap-4 border-b pb-2">
              <button className={`button${imageTab === 'url' ? ' buttonActive' : ''}`} onClick={() => setImageTab('url')}>URL</button>
              <button className={`button${imageTab === 'upload' ? ' buttonActive' : ''}`} onClick={() => setImageTab('upload')}>Upload</button>
            </div>
            {imageTab === 'url' && (
              <>
                <input
                  type="text"
                  placeholder="Paste image URL here..."
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  className="input"
                  autoFocus
                />
                <div className="flexRowMb2">
                  <input
                    type="text"
                    placeholder="Width (e.g. 400 or 50%)"
                    value={imageWidth}
                    onChange={e => setImageWidth(e.target.value)}
                    className="input"
                  />
                  <input
                    type="text"
                    placeholder="Height (e.g. 300 or 50%)"
                    value={imageHeight}
                    onChange={e => setImageHeight(e.target.value)}
                    className="input"
                  />
                </div>
                <div className="textXs">Leave blank for default size. Use px (e.g. 400) or % (e.g. 50%).</div>
                <button
                  className="primaryBtn"
                  onClick={handleImageUrlInsert}
                  disabled={!imageUrl}
                >
                  Insert Image
                </button>
              </>
            )}
            {imageTab === 'upload' && (
              <>
                {!uploadedImageUrl && (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUploadInputChange}
                      className="mb2"
                      disabled={uploading}
                    />
                    {uploading && <div className="text-sm text-blue-600 mb-2">Uploading...</div>}
                    {uploadError && <div className="text-sm text-red-600 mb-2">{uploadError}</div>}
                  </>
                )}
                {uploadedImageUrl && (
                  <>
                    <div className="mb-2 flex flex-col items-center">
                      <img src={uploadedImageUrl} alt="Preview" className="max-h-40 max-w-full rounded border mb-2" />
                    </div>
                    <div className="flexRowMb2">
                      <input
                        type="text"
                        placeholder="Width (e.g. 400 or 50%)"
                        value={imageWidth}
                        onChange={e => setImageWidth(e.target.value)}
                        className="input"
                      />
                      <input
                        type="text"
                        placeholder="Height (e.g. 300 or 50%)"
                        value={imageHeight}
                        onChange={e => setImageHeight(e.target.value)}
                        className="input"
                      />
                    </div>
                    <div className="flexRow">
                      <button
                        className="primaryBtn"
                        onClick={handleUploadedImageInsert}
                      >
                        Add
                      </button>
                      <button
                        className="secondaryBtn"
                        onClick={() => {
                          setUploadedImageUrl('');
                          setImageFile(null);
                          setImageWidth('');
                          setImageHeight('');
                          setUploadError(null);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </CustomPopover>
        </>
        {/* Video Popover */}
        <>
          <button
            ref={videoButtonRef}
            onClick={() => setVideoPopoverOpen((open) => !open)}
            className="button"
            type="button"
          >
            <VideoIcon size={18} />
          </button>
          <CustomPopover
            open={videoPopoverOpen}
            onOpenChange={setVideoPopoverOpen}
            anchorEl={videoButtonRef.current}
          >
            <div className="mb-2 font-semibold text-base">Insert YouTube Video</div>
            <input
              type="text"
              placeholder="Paste YouTube video URL here..."
              value={videoUrl}
              onChange={e => setVideoUrl(e.target.value)}
              className="input"
              autoFocus
            />
            <div className="flexRowMb2">
              <input
                type="text"
                placeholder="Width (e.g. 400 or 50%)"
                value={videoWidth}
                onChange={e => setVideoWidth(e.target.value)}
                className="input"
              />
              <input
                type="text"
                placeholder="Height (e.g. 300 or 50%)"
                value={videoHeight}
                onChange={e => setVideoHeight(e.target.value)}
                className="input"
              />
            </div>
            <div className="textXs">Leave blank for default size. Use px (e.g. 400) or % (e.g. 50%).</div>
            <button
              className="primaryBtn"
              onClick={handleVideoUrlInsert}
              disabled={!videoUrl}
            >
              Insert Video
            </button>
          </CustomPopover>
        </>
        {/* Alignment Dropdown */}
        <CustomSelect
          value={editor.getAttributes('textAlign') || 'left'}
          options={alignmentOptions.map(opt => ({ value: opt.value, label: <>{opt.label} {opt.name}</> }))}
          onChange={val => editor.chain().focus().setTextAlign(val).run()}
          className="select"
          placeholder="Align"
        />
      </div>
    </>
  );
};

// Update SmallTiptapEditor to accept imageUploadUrl prop
interface TiptapEditorProps {
  content?: string;
  onChange?: (html: string) => void;
  imageUploadUrl?: string;
  placeholderText?: string;
}

const SmallTiptapEditor  = ({ content = '', onChange, imageUploadUrl, placeholderText }: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: true }),
      Image,
      Bold,
      Underline,
      Highlight.configure({ multicolor: false, HTMLAttributes: { style: 'background-color: #fff59d' } }),
      CodeBlock,
      BulletList,
      OrderedList,
      ListItem,
      TextAlign.configure({ types: ["paragraph"] }),
      Youtube.configure({
        controls: true,
        allowFullscreen: true,
        width: 640,
        height: 360,
        HTMLAttributes: {
          class: 'mx-auto my-4 rounded-lg shadow',
        },
      }),
      TextStyle,
      FontSize,
      Placeholder.configure({
        placeholder: placeholderText || 'Write something...'
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert prose-sm prose-p:mt-0 prose-p:mb-1 leading-6 prose-blockquote:bg-muted/50 prose-blockquote:p-2 prose-blockquote:px-6 prose-blockquote:border-border prose-blockquote:not-italic prose-blockquote:rounded-r-lg [&_blockquote>p]:after:content-none [&_blockquote>p]:before:content-none  prose-li:marker:text-muted-foreground w-full max-w-full      focus:outline-none min-h-[130px] p-2 bg-background rounded-b-md border border-gray-200 dark:border-gray-700",
      },
    },
    onUpdate({ editor }) {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
    immediatelyRender: false,
  });

  // If content prop changes, update the editor content
  React.useEffect(() => {
    if (editor && content !== undefined && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  return (
      <div className="roundedMdBorder">
        <MenuBar editor={editor} imageUploadUrl={imageUploadUrl} />
        <div className="overflowAuto">
          <EditorContent editor={editor} />
        </div>
      </div>
  );
};

export default SmallTiptapEditor;