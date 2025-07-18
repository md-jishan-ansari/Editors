'use client';
// File: src/components/Editor.tsx
import React, { useCallback, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import History from "@tiptap/extension-history";
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
import { Upload, PaintBucket, Type as TextColorIcon, ALargeSmall  } from 'lucide-react';
import { Bold as BoldIcon, Italic as ItalicIcon, Underline as UnderlineIcon, Strikethrough as StrikeIcon, Code2 as CodeIcon, List as BulletListIcon, ListOrdered as OrderedListIcon, ListTodo as TaskListIcon, Quote as BlockquoteIcon, Link as LinkIcon, Image as ImageIcon, Table as TableIcon, Undo2 as UndoIcon, Redo2 as RedoIcon, AlignLeft, AlignCenter, AlignRight, AlignJustify, Highlighter, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Video as VideoIcon, Indent, Outdent, Subscript as SubscriptIcon, Superscript as SuperscriptIcon } from 'lucide-react';
import { TextStyle } from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import FontSize from '@tiptap/extension-font-size';
import Color from '@tiptap/extension-color';


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

const MenuBar = ({ editor }: { editor: any }) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageTab, setImageTab] = useState<'upload' | 'url'>('upload');
  const [imageUrl, setImageUrl] = useState('');

  // Helper for image upload
  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file); // Replace with upload logic if needed
      editor.chain().focus().setImage({ src: url }).run();
      setShowImageModal(false);
      setImageUrl('');
    }
  }, [editor]);

  // Helper for image by URL
  const handleImageUrlInsert = useCallback(() => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setShowImageModal(false);
      setImageUrl('');
    }
  }, [editor, imageUrl]);

  // Helper for video embedding
  const addVideo = useCallback(() => {
    const url = window.prompt('Enter YouTube video URL');
    if (url) {
      editor.chain().focus().setYoutubeVideo({ src: url }).run();
    }
  }, [editor]);

  // Helper for link insertion
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <>
      <div className="flex flex-wrap gap-2 border-b border-gray-200 bg-gray-50 dark:bg-gray-900 dark:border-gray-700 p-2 rounded-t-md">
        {/* Headings Dropdown */}
        <select
          className="px-2 py-1 rounded border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
          onChange={e => editor.chain().focus().toggleHeading({ level: Number(e.target.value) }).run()}
          value={headingOptions.find(opt => editor.isActive('heading', { level: opt.level }))?.level || ''}
        >
          <option value="">Paragraph</option>
          {headingOptions.map(opt => (
            <option key={opt.level} value={opt.level}>{`H${opt.level}`}</option>
          ))}
        </select>
        {/* Font Size Dropdown */}
        <select
          className="px-2 py-1 rounded border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
          onChange={e => editor.chain().focus().setFontSize(e.target.value).run()}
          value={editor.getAttributes('fontSize').fontSize || ''}
        >
          <option value="">Font Size</option>
          {fontSizes.map(f => (
            <option key={f.value} value={f.value}>{f.name}</option>
          ))}
        </select>
        {/* Font Family Dropdown */}
        <select
          className="px-2 py-1 rounded border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
          onChange={e => editor.chain().focus().setFontFamily(e.target.value).run()}
          value={editor.getAttributes('fontFamily').fontFamily || ''}
        >
          <option value="">Font Family</option>
          {fontFamilies.map(f => (
            <option key={f.value} value={f.value} style={{ fontFamily: f.value }}>{f.name}</option>
          ))}
        </select>
        {/* Font styles */}
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={`px-2 py-1 rounded ${editor.isActive("bold") ? "bg-blue-200" : ""}`} type="button"><BoldIcon size={18} /></button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`px-2 py-1 rounded ${editor.isActive("italic") ? "bg-blue-200" : ""}`} type="button"><ItalicIcon size={18} /></button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`px-2 py-1 rounded ${editor.isActive("underline") ? "bg-blue-200" : ""}`} type="button"><UnderlineIcon size={18} /></button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} className={`px-2 py-1 rounded ${editor.isActive("strike") ? "bg-blue-200" : ""}`} type="button"><StrikeIcon size={18} /></button>
        <button onClick={() => editor.chain().focus().toggleHighlight().run()} className={`px-2 py-1 rounded ${editor.isActive("highlight") ? "bg-yellow-200" : ""}`} type="button"><Highlighter size={18} /></button>
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`px-2 py-1 rounded ${editor.isActive("codeBlock") ? "bg-blue-200" : ""}`} type="button"><CodeIcon size={18} /></button>
        {/* Lists */}
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`px-2 py-1 rounded ${editor.isActive("bulletList") ? "bg-blue-200" : ""}`} type="button"><BulletListIcon size={18} /></button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`px-2 py-1 rounded ${editor.isActive("orderedList") ? "bg-blue-200" : ""}`} type="button"><OrderedListIcon size={18} /></button>
        <button onClick={() => editor.chain().focus().toggleTaskList().run()} className={`px-2 py-1 rounded ${editor.isActive("taskList") ? "bg-blue-200" : ""}`} type="button"><TaskListIcon size={18} /></button>
        {/* Blockquote, hr */}
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`px-2 py-1 rounded ${editor.isActive("blockquote") ? "bg-blue-200" : ""}`} type="button"><BlockquoteIcon size={18} /></button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className="px-2 py-1 rounded" type="button">HR</button>
        {/* Table */}
        <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} className="px-2 py-1 rounded" type="button"><TableIcon size={18} /></button>
        {/* Link, image, video */}
        <button onClick={setLink} className={`px-2 py-1 rounded ${editor.isActive("link") ? "bg-blue-200" : ""}`} type="button"><LinkIcon size={18} /></button>
        <button onClick={() => setShowImageModal(true)} className="px-2 py-1 rounded" type="button"><ImageIcon size={18} /></button>
        <button onClick={addVideo} className="px-2 py-1 rounded" type="button"><VideoIcon size={18} /></button>
        {/* Undo/Redo */}
        <button onClick={() => editor.chain().focus().undo().run()} className="px-2 py-1 rounded" type="button"><UndoIcon size={18} /></button>
        <button onClick={() => editor.chain().focus().redo().run()} className="px-2 py-1 rounded" type="button"><RedoIcon size={18} /></button>
        {/* Alignment */}
        <button onClick={() => editor.chain().focus().setTextAlign("left").run()} className={`px-2 py-1 rounded ${editor.isActive({ textAlign: "left" }) ? "bg-blue-200" : ""}`} type="button"><AlignLeft size={18} /></button>
        <button onClick={() => editor.chain().focus().setTextAlign("center").run()} className={`px-2 py-1 rounded ${editor.isActive({ textAlign: "center" }) ? "bg-blue-200" : ""}`} type="button"><AlignCenter size={18} /></button>
        <button onClick={() => editor.chain().focus().setTextAlign("right").run()} className={`px-2 py-1 rounded ${editor.isActive({ textAlign: "right" }) ? "bg-blue-200" : ""}`} type="button"><AlignRight size={18} /></button>
        <button onClick={() => editor.chain().focus().setTextAlign("justify").run()} className={`px-2 py-1 rounded ${editor.isActive({ textAlign: "justify" }) ? "bg-blue-200" : ""}`} type="button"><AlignJustify size={18} /></button>
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
          />
        </div>
        {/* Subscript/Superscript Buttons */}
        <button
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          className={`px-2 py-1 rounded ${editor.isActive('subscript') ? 'bg-blue-200' : ''}`}
          type="button"
          title="Subscript"
        >
          <SubscriptIcon size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          className={`px-2 py-1 rounded ${editor.isActive('superscript') ? 'bg-blue-200' : ''}`}
          type="button"
          title="Superscript"
        >
          <SuperscriptIcon size={18} />
        </button>
      </div>
      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 min-w-[320px] relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
              onClick={() => { setShowImageModal(false); setImageUrl(''); }}
              aria-label="Close"
            >
              ×
            </button>
            <div className="flex border-b mb-4">
              <button
                className={`flex-1 px-4 py-2 ${imageTab === 'upload' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
                onClick={() => setImageTab('upload')}
              >
                Upload
              </button>
              <button
                className={`flex-1 px-4 py-2 ${imageTab === 'url' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
                onClick={() => setImageTab('url')}
              >
                URL
              </button>
            </div>
            {imageTab === 'upload' && (
              <div className="flex flex-col items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-gray-700 dark:text-gray-200"
                />
              </div>
            )}
            {imageTab === 'url' && (
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Enter image URL"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  className="border rounded px-2 py-1 w-full text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700"
                />
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={handleImageUrlInsert}
                  disabled={!imageUrl}
                >
                  Insert Image
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: true }),
      Image,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      BulletList,
      OrderedList,
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
    content: "",
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[300px] p-4 bg-white dark:bg-gray-900 rounded-b-md border border-gray-200 dark:border-gray-700",
      },
    },
    immediatelyRender: false,
  });

  return (
    <div className="max-w-2xl mx-auto my-8">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
