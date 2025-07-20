'use client';
// File: src/components/Editor.tsx
import React, { useCallback, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TextAlign from "@tiptap/extension-text-align";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Dropcursor from "@tiptap/extension-dropcursor";
import Gapcursor from "@tiptap/extension-gapcursor";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Typography from "@tiptap/extension-typography";
// Video extension (custom or from @tiptap/extension-video if available)
import Youtube from '@tiptap/extension-youtube';
import Highlight from '@tiptap/extension-highlight';

import BoldIcon from '../icons/BoldIcon';
import ItalicIcon from '../icons/ItalicIcon';
import UnderlineIcon from '../icons/UnderlineIcon';
import StrikeIcon from '../icons/StrikeIcon';
import CodeIcon from '../icons/CodeIcon';
import BulletListIcon from '../icons/BulletListIcon';
import OrderedListIcon from '../icons/OrderedListIcon';
import TaskListIcon from '../icons/TaskListIcon';
import BlockquoteIcon from '../icons/BlockquoteIcon';
import LinkIcon from '../icons/LinkIcon';
import ImageIcon from '../icons/ImageIcon';
import TableIcon from '../icons/TableIcon';
import UndoIcon from '../icons/UndoIcon';
import RedoIcon from '../icons/RedoIcon';
import AlignLeft from '../icons/AlignLeft';
import AlignCenter from '../icons/AlignCenter';
import AlignRight from '../icons/AlignRight';
import AlignJustify from '../icons/AlignJustify';
import Highlighter from '../icons/Highlighter';
import Heading1 from '../icons/Heading1';
import Heading2 from '../icons/Heading2';
import Heading3 from '../icons/Heading3';
import Heading4 from '../icons/Heading4';
import Heading5 from '../icons/Heading5';
import Heading6 from '../icons/Heading6';
import VideoIcon from '../icons/VideoIcon';
import SubscriptIcon from '../icons/SubscriptIcon';
import SuperscriptIcon from '../icons/SuperscriptIcon';
import PaintBucket from '../icons/PaintBucket';
import TextColorIcon from '../icons/TextColorIcon';

import { TextStyle } from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import FontSize from '@tiptap/extension-font-size';
import Color from '@tiptap/extension-color';
import { CustomBulletList } from './tiptap-extensions/CustomBulletList';
import { CustomOrderedList } from './tiptap-extensions/CustomOrderedList';
import CustomSelect from './ui/CustomSelect';
import CustomPopover from './ui/CustomPopover';
import styles from './TiptapEditor.module.css';


const fontSizes = [
  { name: '10px', value: '10px' },
  { name: '12px', value: '12px' },
  { name: '14px', value: '14px' },
  { name: '16px', value: '16px' },
  { name: '18px', value: '18px' },
  { name: '20px', value: '20px' },
  { name: '22px', value: '22px' },
  { name: '24px', value: '24px' },
  { name: '26px', value: '26px' },
  { name: '28px', value: '28px' },
  { name: '32px', value: '32px' },
  { name: '36px', value: '36px' },
  { name: '40px', value: '40px' },
  { name: '48px', value: '48px' },
  { name: '56px', value: '56px' },
  { name: '64px', value: '64px' },
];

const fontFamilies = [
  { name: 'Sans-serif', value: 'sans-serif' },
  { name: 'Serif', value: 'serif' },
  { name: 'Monospace', value: 'monospace' },
  { name: 'Arial', value: 'Arial, sans-serif' },
  { name: 'Helvetica', value: 'Helvetica, Arial, sans-serif' },
  { name: 'Times New Roman', value: 'Times New Roman, Times, serif' },
  { name: 'Georgia', value: 'Georgia, serif' },
  { name: 'Courier New', value: 'Courier New, Courier, monospace' },
  { name: 'Verdana', value: 'Verdana, Geneva, sans-serif' },
  { name: 'Trebuchet MS', value: 'Trebuchet MS, sans-serif' },
  { name: 'Palatino', value: 'Palatino, serif' },
  { name: 'Garamond', value: 'Garamond, serif' },
  { name: 'Comic Sans MS', value: 'Comic Sans MS, cursive, sans-serif' },
  { name: 'Impact', value: 'Impact, Charcoal, sans-serif' },
  { name: 'Lucida Console', value: 'Lucida Console, Monaco, monospace' },
  { name: 'Tahoma', value: 'Tahoma, Geneva, sans-serif' },
  { name: 'Optima', value: 'Optima, sans-serif' },
  { name: 'Futura', value: 'Futura, sans-serif' },
  { name: 'Franklin Gothic', value: 'Franklin Gothic Medium, Arial Narrow, Arial, sans-serif' },
  { name: 'Century Gothic', value: 'Century Gothic, sans-serif' },
];
const headingOptions = [
  { level: 1, label: <Heading1 size={18} /> },
  { level: 2, label: <Heading2 size={18} /> },
  { level: 3, label: <Heading3 size={18} /> },
  { level: 4, label: <Heading4 size={18} /> },
  { level: 5, label: <Heading5 size={18} /> },
  { level: 6, label: <Heading6 size={18} /> },
];
const lineHeights = [
  { name: 'Single', value: '1' },
  { name: '1.15', value: '1.15' },
  { name: '1.5', value: '1.5' },
  { name: 'Double', value: '2' },
  { name: '2.5', value: '2.5' },
  { name: '3', value: '3' },
];

const unorderedListStyles = [
  { name: 'Disc', value: 'disc', icon: '●', aria: 'Disc' },
  { name: 'Circle', value: 'circle', icon: '○', aria: 'Circle' },
  { name: 'Square', value: 'square', icon: '■', aria: 'Square' },
];
const orderedListStyles = [
  { name: 'Decimal', value: 'decimal', icon: '1.', aria: 'Decimal' },
  { name: 'Lower Alpha', value: 'lower-alpha', icon: 'a.', aria: 'Lower Alpha' },
  { name: 'Upper Alpha', value: 'upper-alpha', icon: 'A.', aria: 'Upper Alpha' },
  { name: 'Lower Roman', value: 'lower-roman', icon: 'i.', aria: 'Lower Roman' },
  { name: 'Upper Roman', value: 'upper-roman', icon: 'I.', aria: 'Upper Roman' },
];

const MenuBar = ({ editor }: { editor: any }) => {
  // Popover state for link, image, video
  const [imagePopoverOpen, setImagePopoverOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageWidth, setImageWidth] = useState('');
  const [imageHeight, setImageHeight] = useState('');
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
    <div className={styles.toolbar}>
      {/* Headings Dropdown */}
      <CustomSelect
        value={(() => {
          const activeHeading = headingOptions.find(opt => editor.isActive('heading', { level: opt.level }));
          return activeHeading ? activeHeading.level.toString() : '';
        })()}
        options={[
          { value: 'paragraph', label: 'Paragraph' },
          ...headingOptions.map(opt => ({ value: opt.level.toString(), label: `H${opt.level}` }))
        ]}
        onChange={(val: string) => {
          if (val === 'paragraph') {
            editor.chain().focus().setParagraph().run();
          } else {
            editor.chain().focus().toggleHeading({ level: Number(val) }).run();
          }
        }}
        className={styles.select}
        placeholder="Heading"
      />
      {/* Font Size Dropdown */}
      <CustomSelect
        value={editor.getAttributes('fontSize').fontSize || ''}
        options={fontSizes.map(f => ({ value: f.value, label: f.name }))}
        onChange={(val: string) => editor.chain().focus().setFontSize(val).run()}
        className={styles.select}
        placeholder="Font Size"
      />
      {/* Font Family Dropdown */}
      <CustomSelect
        value={editor.getAttributes('fontFamily').fontFamily || ''}
        options={fontFamilies.map(f => ({ value: f.value, label: f.name }))}
        onChange={(val: string) => editor.chain().focus().setFontFamily(val).run()}
        className={styles.select}
        placeholder="Font Family"
      />
      {/* Font styles */}
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={`${styles.button} ${editor.isActive("bold") ? styles.buttonActive : ''}`} type="button"><BoldIcon size={18} /></button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`${styles.button} ${editor.isActive("italic") ? styles.buttonActive : ''}`} type="button"><ItalicIcon size={18} /></button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`${styles.button} ${editor.isActive("underline") ? styles.buttonActive : ''}`} type="button"><UnderlineIcon size={18} /></button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()} className={`${styles.button} ${editor.isActive("strike") ? styles.buttonActive : ''}`} type="button"><StrikeIcon size={18} /></button>
      <button onClick={() => editor.chain().focus().toggleHighlight().run()} className={`${styles.button} ${editor.isActive("highlight") ? styles.buttonActive : ''}`} type="button"><Highlighter size={18} /></button>
      <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`${styles.button} ${editor.isActive("codeBlock") ? styles.buttonActive : ''}`} type="button"><CodeIcon size={18} /></button>
      {/* Lists */}
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`${styles.button} ${editor.isActive("bulletList") ? styles.buttonActive : ''}`} type="button"><BulletListIcon size={18} /></button>
      {/* Unordered List Style Dropdown */}
      <CustomSelect
        value={editor.getAttributes('bulletList').listStyleType || ''}
        options={unorderedListStyles.map(opt => ({ value: opt.value, label: <>{opt.icon} {opt.name}</> }))}
        onChange={(val: string) => {
          if (editor.isActive('bulletList')) {
            editor.chain().focus().updateAttributes('bulletList', { listStyleType: val }).run();
          } else {
            window.alert('Please place the cursor inside an unordered list to change its style.');
          }
        }}
        className={styles.select}
        placeholder="UL Style"
      />
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`${styles.button} ${editor.isActive("orderedList") ? styles.buttonActive : ''}`} type="button"><OrderedListIcon size={18} /></button>
      {/* Ordered List Style Dropdown */}
      <CustomSelect
        value={editor.getAttributes('orderedList').listStyleType || ''}
        options={orderedListStyles.map(opt => ({ value: opt.value, label: <>{opt.icon} {opt.name}</> }))}
        onChange={(val: string) => {
          if (editor.isActive('orderedList')) {
            editor.chain().focus().updateAttributes('orderedList', { listStyleType: val }).run();
          } else {
            window.alert('Please place the cursor inside an ordered list to change its style.');
          }
        }}
        className={styles.select}
        placeholder="OL Style"
      />
      <button onClick={() => editor.chain().focus().toggleTaskList().run()} className={`${styles.button} ${editor.isActive("taskList") ? styles.buttonActive : ''}`} type="button"><TaskListIcon size={18} /></button>
      {/* Blockquote, hr */}
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`${styles.button} ${editor.isActive("blockquote") ? styles.buttonActive : ''}`} type="button"><BlockquoteIcon size={18} /></button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className={styles.button} type="button">HR</button>
      {/* Table */}
      <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} className={styles.button} type="button"><TableIcon size={18} /></button>
      {/* Link Popover */}
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
          className={styles.input}
          autoFocus
        />
        <div className={styles.flexRow}>
          <button
            className={styles.primaryBtn}
            onClick={handleLinkInsert}
            disabled={!linkUrl}
          >
            Insert
          </button>
          <button
            className={styles.secondaryBtn}
            onClick={handleLinkUnset}
            disabled={!editor.isActive('link')}
          >
            Remove
          </button>
        </div>
      </CustomPopover>
      {/* Image Popover */}
      <CustomPopover
        open={imagePopoverOpen}
        onOpenChange={setImagePopoverOpen}
        anchorEl={imageButtonRef.current}
      >
        <div className="mb-2 font-semibold text-base">Insert Image</div>
        <input
          type="text"
          placeholder="Paste image URL here..."
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          className={styles.input}
          autoFocus
        />
        <div className={styles.flexRowMb2}>
          <input
            type="text"
            placeholder="Width (e.g. 400 or 50%)"
            value={imageWidth}
            onChange={e => setImageWidth(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Height (e.g. 300 or 50%)"
            value={imageHeight}
            onChange={e => setImageHeight(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.textXs}>Leave blank for default size. Use px (e.g. 400) or % (e.g. 50%).</div>
        <button
          className={styles.primaryBtn}
          onClick={handleImageUrlInsert}
          disabled={!imageUrl}
        >
          Insert Image
        </button>
      </CustomPopover>
      {/* Video Popover */}
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
          className={styles.input}
          autoFocus
        />
        <div className={styles.flexRowMb2}>
          <input
            type="text"
            placeholder="Width (e.g. 400 or 50%)"
            value={videoWidth}
            onChange={e => setVideoWidth(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Height (e.g. 300 or 50%)"
            value={videoHeight}
            onChange={e => setVideoHeight(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.textXs}>Leave blank for default size. Use px (e.g. 400) or % (e.g. 50%).</div>
        <button
          className={styles.primaryBtn}
          onClick={handleVideoUrlInsert}
          disabled={!videoUrl}
        >
          Insert Video
        </button>
      </CustomPopover>
      {/* Alignment */}
      <button onClick={() => editor.chain().focus().setTextAlign("left").run()} className={`${styles.button} ${editor.isActive({ textAlign: "left" }) ? styles.buttonActive : ''}`} type="button"><AlignLeft size={18} /></button>
      <button onClick={() => editor.chain().focus().setTextAlign("center").run()} className={`${styles.button} ${editor.isActive({ textAlign: "center" }) ? styles.buttonActive : ''}`} type="button"><AlignCenter size={18} /></button>
      <button onClick={() => editor.chain().focus().setTextAlign("right").run()} className={`${styles.button} ${editor.isActive({ textAlign: "right" }) ? styles.buttonActive : ''}`} type="button"><AlignRight size={18} /></button>
      <button onClick={() => editor.chain().focus().setTextAlign("justify").run()} className={`${styles.button} ${editor.isActive({ textAlign: "justify" }) ? styles.buttonActive : ''}`} type="button"><AlignJustify size={18} /></button>
      {/* Text Color Picker */}
      <div className="flex items-center gap-1 border border-gray-300 dark:border-gray-600 rounded px-1 py-0.5" style={{height: 28}} title="Text Color">
        <TextColorIcon size={16} />
        <input
          type="color"
          value={editor.getAttributes('textStyle').color || '#000000'}
          onChange={e => {
            editor.commands.focus();
            editor.commands.setColor(e.target.value);
          }}
          style={{ width: 20, height: 20, border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
          className={styles.colorInput}
        />
      </div>
      {/* Background Color Picker */}
      <div className="flex items-center gap-1 border border-gray-300 dark:border-gray-600 rounded px-1 py-0.5" style={{height: 28}} title="Background Color">
        <PaintBucket size={16} />
        <input
          type="color"
          value={editor.getAttributes('highlight').color || '#ffff00'}
          onChange={e => {
            editor.commands.focus();
            editor.commands.setHighlight({ color: e.target.value });
          }}
          style={{ width: 20, height: 20, border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
          className={styles.colorInput}
        />
      </div>
      {/* Subscript/Superscript Buttons */}
      <button
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        className={`${styles.button} ${editor.isActive('subscript') ? styles.buttonActive : ''}`}
        type="button"
        title="Subscript"
      >
        <SubscriptIcon size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        className={`${styles.button} ${editor.isActive('superscript') ? styles.buttonActive : ''}`}
        type="button"
        title="Superscript"
      >
        <SuperscriptIcon size={18} />
      </button>
       {/* Undo/Redo */}
       <div className={styles.ml2}></div>
      <button onClick={() => editor.chain().focus().undo().run()} className={styles.button} type="button"><UndoIcon size={18} /></button>
      <button onClick={() => editor.chain().focus().redo().run()} className={styles.button} type="button"><RedoIcon size={18} /></button>
    </div>
  );
};

// Update TiptapEditor to accept props
interface TiptapEditorProps {
  content?: string;
  onChange?: (html: string) => void;
}

const TiptapEditor = ({ content = '', onChange }: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: true }),
      Image,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      CustomBulletList,
      CustomOrderedList,
      ListItem,
      Bold,
      Italic,
      Underline,
      Strike,
      Blockquote,
      CodeBlock,
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      Dropcursor,
      Gapcursor,
      TaskList,
      TaskItem,
      Superscript,
      Subscript,
      Typography,
      Youtube.configure({
        controls: true,
        allowFullscreen: true,
        width: 640,
        height: 360,
        HTMLAttributes: {
          class: 'mx-auto my-4 rounded-lg shadow',
        },
      }),
      Color, // <-- Color must come before TextStyle
      TextStyle,
      FontFamily,
      FontSize,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg     sm:prose-base prose-p:mt-0 prose-p:mb-1 leading-6 prose-blockquote:bg-muted/50 prose-blockquote:p-2 prose-blockquote:px-6 prose-blockquote:border-border prose-blockquote:not-italic prose-blockquote:rounded-r-lg [&_blockquote>p]:after:content-none [&_blockquote>p]:before:content-none  prose-li:marker:text-muted-foreground w-full max-w-full      focus:outline-none min-h-[300px] p-4 bg-background rounded-b-md border border-gray-200 dark:border-gray-700",
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

      <div className={styles.roundedMdBorder}>
        <MenuBar editor={editor} />
        <div className={styles.overflowAuto}>
          <EditorContent editor={editor} />
        </div>
      </div>

  );
};

export default TiptapEditor;
