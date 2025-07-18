'use client';
// File: src/components/Editor.tsx
import React, { useCallback } from "react";
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
import Highlight from "@tiptap/extension-highlight";
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
import { Upload } from 'lucide-react';
import { Bold as BoldIcon, Italic as ItalicIcon, Underline as UnderlineIcon, Strikethrough as StrikeIcon, Code2 as CodeIcon, List as BulletListIcon, ListOrdered as OrderedListIcon, ListTodo as TaskListIcon, Quote as BlockquoteIcon, Link as LinkIcon, Image as ImageIcon, Table as TableIcon, Undo2 as UndoIcon, Redo2 as RedoIcon, AlignLeft, AlignCenter, AlignRight, AlignJustify, Highlighter, Heading1, Heading2, Heading3, Video as VideoIcon } from 'lucide-react';

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  // Helper for image upload
  const addImage = useCallback(async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file); // Replace with upload logic if needed
        editor.chain().focus().setImage({ src: url }).run();
      }
    };
    input.click();
  }, [editor]);

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

  return (
    <div className="flex flex-wrap gap-2 border-b border-gray-200 bg-gray-50 p-2 rounded-t-md">
      {/* Headings */}
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`px-2 py-1 rounded ${editor.isActive("heading", { level: 1 }) ? "bg-blue-200" : ""}`} type="button"><Heading1 size={18} /></button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`px-2 py-1 rounded ${editor.isActive("heading", { level: 2 }) ? "bg-blue-200" : ""}`} type="button"><Heading2 size={18} /></button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`px-2 py-1 rounded ${editor.isActive("heading", { level: 3 }) ? "bg-blue-200" : ""}`} type="button"><Heading3 size={18} /></button>
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
      <button onClick={addImage} className="px-2 py-1 rounded" type="button"><ImageIcon size={18} /></button>
      <button onClick={addVideo} className="px-2 py-1 rounded" type="button"><VideoIcon size={18} /></button>
      {/* Undo/Redo */}
      <button onClick={() => editor.chain().focus().undo().run()} className="px-2 py-1 rounded" type="button"><UndoIcon size={18} /></button>
      <button onClick={() => editor.chain().focus().redo().run()} className="px-2 py-1 rounded" type="button"><RedoIcon size={18} /></button>
      {/* Alignment */}
      <button onClick={() => editor.chain().focus().setTextAlign("left").run()} className={`px-2 py-1 rounded ${editor.isActive({ textAlign: "left" }) ? "bg-blue-200" : ""}`} type="button"><AlignLeft size={18} /></button>
      <button onClick={() => editor.chain().focus().setTextAlign("center").run()} className={`px-2 py-1 rounded ${editor.isActive({ textAlign: "center" }) ? "bg-blue-200" : ""}`} type="button"><AlignCenter size={18} /></button>
      <button onClick={() => editor.chain().focus().setTextAlign("right").run()} className={`px-2 py-1 rounded ${editor.isActive({ textAlign: "right" }) ? "bg-blue-200" : ""}`} type="button"><AlignRight size={18} /></button>
      <button onClick={() => editor.chain().focus().setTextAlign("justify").run()} className={`px-2 py-1 rounded ${editor.isActive({ textAlign: "justify" }) ? "bg-blue-200" : ""}`} type="button"><AlignJustify size={18} /></button>
    </div>
  );
};

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: true }),
      Image,
      Heading.configure({ levels: [1, 2, 3] }),
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
      Highlight,
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
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[300px] p-4 bg-white rounded-b-md border border-gray-200",
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
