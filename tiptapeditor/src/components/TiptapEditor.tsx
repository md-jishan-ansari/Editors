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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from './ui/popover';


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
    <>
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 rounded-t-md px-2 py-2 flex flex-wrap gap-2 items-center">
        {/* Headings Dropdown */}
        <Select
          onValueChange={val => {
            if (val === 'paragraph') {
              editor.chain().focus().setParagraph().run();
            } else {
              editor.chain().focus().toggleHeading({ level: Number(val) }).run();
            }
          }}
          value={(() => {
            const activeHeading = headingOptions.find(opt => editor.isActive('heading', { level: opt.level }));
            return activeHeading ? activeHeading.level.toString() : 'paragraph';
          })()}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Paragraph" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Heading</SelectLabel>
              <SelectItem value="paragraph">Paragraph</SelectItem>
              {headingOptions.map(opt => (
                <SelectItem key={opt.level} value={opt.level.toString()}>{`H${opt.level}`}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* Font Size Dropdown */}
        <Select
          onValueChange={val => editor.chain().focus().setFontSize(val).run()}
          value={editor.getAttributes('fontSize').fontSize || ''}
        >
          <SelectTrigger className="w-[110px]">
            <SelectValue placeholder="Font Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Font Size</SelectLabel>
              {fontSizes.map(f => (
                <SelectItem key={f.value} value={f.value}>{f.name}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* Font Family Dropdown */}
        <Select
          onValueChange={val => editor.chain().focus().setFontFamily(val).run()}
          value={editor.getAttributes('fontFamily').fontFamily || ''}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Font Family" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Font Family</SelectLabel>
              {fontFamilies.map(f => (
                <SelectItem key={f.value} value={f.value}>
                  <span style={{ fontFamily: f.value }}>{f.name}</span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* Font styles */}
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={`px-2 py-1 rounded ${editor.isActive("bold") ? "bg-blue-200 dark:bg-blue-700" : ""}`} type="button"><BoldIcon size={18} /></button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`px-2 py-1 rounded ${editor.isActive("italic") ? "bg-blue-200 dark:bg-blue-700" : ""}`} type="button"><ItalicIcon size={18} /></button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`px-2 py-1 rounded ${editor.isActive("underline") ? "bg-blue-200 dark:bg-blue-700" : ""}`} type="button"><UnderlineIcon size={18} /></button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} className={`px-2 py-1 rounded ${editor.isActive("strike") ? "bg-blue-200 dark:bg-blue-700" : ""}`} type="button"><StrikeIcon size={18} /></button>
        <button onClick={() => editor.chain().focus().toggleHighlight().run()} className={`px-2 py-1 rounded ${editor.isActive("highlight") ? "bg-yellow-200 dark:bg-yellow-700" : ""}`} type="button"><Highlighter size={18} /></button>
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`px-2 py-1 rounded ${editor.isActive("codeBlock") ? "bg-blue-200 dark:bg-blue-700" : ""}`} type="button"><CodeIcon size={18} /></button>
        {/* Lists */}
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`px-2 py-1 rounded ${editor.isActive("bulletList") ? "bg-blue-200 dark:bg-blue-700" : ""}`} type="button"><BulletListIcon size={18} /></button>
        {/* Unordered List Style Dropdown */}
        <Select
          onValueChange={val => {
            if (editor.isActive('bulletList')) {
              editor.chain().focus().updateAttributes('bulletList', { listStyleType: val }).run();
            } else {
              window.alert('Please place the cursor inside an unordered list to change its style.');
            }
          }}
          value={editor.getAttributes('bulletList').listStyleType || 'disc'}
        >
          <SelectTrigger className="w-[90px]">
            <SelectValue placeholder="UL Style" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Unordered List</SelectLabel>
              {unorderedListStyles.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>{opt.icon} {opt.name}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`px-2 py-1 rounded ${editor.isActive("orderedList") ? "bg-blue-200 dark:bg-blue-700" : ""}`} type="button"><OrderedListIcon size={18} /></button>
        {/* Ordered List Style Dropdown */}
        <Select
          onValueChange={val => {
            if (editor.isActive('orderedList')) {
              editor.chain().focus().updateAttributes('orderedList', { listStyleType: val }).run();
            } else {
              window.alert('Please place the cursor inside an ordered list to change its style.');
            }
          }}
          value={editor.getAttributes('orderedList').listStyleType || 'decimal'}
        >
          <SelectTrigger className="w-[110px]">
            <SelectValue placeholder="OL Style" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Ordered List</SelectLabel>
              {orderedListStyles.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>{opt.icon} {opt.name}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <button onClick={() => editor.chain().focus().toggleTaskList().run()} className={`px-2 py-1 rounded ${editor.isActive("taskList") ? "bg-blue-200 dark:bg-blue-700" : ""}`} type="button"><TaskListIcon size={18} /></button>
        {/* Blockquote, hr */}
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`px-2 py-1 rounded ${editor.isActive("blockquote") ? "bg-blue-200 dark:bg-blue-700" : ""}`} type="button"><BlockquoteIcon size={18} /></button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className="px-2 py-1 rounded" type="button">HR</button>
        {/* Table */}
        <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} className="px-2 py-1 rounded" type="button"><TableIcon size={18} /></button>
        {/* Link Popover */}
        <Popover open={linkPopoverOpen} onOpenChange={setLinkPopoverOpen}>
          <PopoverTrigger asChild>
            <button onClick={() => {
              setLinkPopoverOpen((open) => !open);
              setLinkUrl(editor.getAttributes('link').href || '');
            }} className={`px-2 py-1 rounded ${editor.isActive("link") ? "bg-blue-200 dark:bg-blue-700" : ""}`} type="button"><LinkIcon size={18} /></button>
          </PopoverTrigger>
          <PopoverContent align="center" sideOffset={8} className="w-80">
            <div className="mb-2 font-semibold text-base">Insert Link</div>
            <input
              type="text"
              placeholder="Paste link URL here..."
              value={linkUrl}
              onChange={e => setLinkUrl(e.target.value)}
              className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 w-full text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                className="bg-blue-600 text-white px-4 py-1.5 rounded-lg font-medium hover:bg-blue-700 transition"
                onClick={handleLinkInsert}
                disabled={!linkUrl}
              >
                Insert
              </button>
              <button
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-1.5 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                onClick={handleLinkUnset}
                disabled={!editor.isActive('link')}
              >
                Remove
              </button>
            </div>
          </PopoverContent>
        </Popover>
        {/* Image Popover */}
        <Popover open={imagePopoverOpen} onOpenChange={setImagePopoverOpen}>
          <PopoverTrigger asChild>
            <button onClick={() => setImagePopoverOpen((open) => !open)} className="px-2 py-1 rounded" type="button"><ImageIcon size={18} /></button>
          </PopoverTrigger>
          <PopoverContent align="center" sideOffset={8} className="w-80">
            <div className="mb-2 font-semibold text-base">Insert Image</div>
            <input
              type="text"
              placeholder="Paste image URL here..."
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 w-full text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              autoFocus
            />
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Width (e.g. 400 or 50%)"
                value={imageWidth}
                onChange={e => setImageWidth(e.target.value)}
                className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 w-1/2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Height (e.g. 300 or 50%)"
                value={imageHeight}
                onChange={e => setImageHeight(e.target.value)}
                className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 w-1/2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Leave blank for default size. Use px (e.g. 400) or % (e.g. 50%).</div>
            <button
              className="bg-blue-600 text-white px-4 py-1.5 rounded-lg font-medium hover:bg-blue-700 transition w-full"
              onClick={handleImageUrlInsert}
              disabled={!imageUrl}
            >
              Insert Image
            </button>
          </PopoverContent>
        </Popover>
        {/* Video Popover */}
        <Popover open={videoPopoverOpen} onOpenChange={setVideoPopoverOpen}>
          <PopoverTrigger asChild>
            <button onClick={() => setVideoPopoverOpen((open) => !open)} className="px-2 py-1 rounded" type="button"><VideoIcon size={18} /></button>
          </PopoverTrigger>
          <PopoverContent align="center" sideOffset={8} className="w-80">
            <div className="mb-2 font-semibold text-base">Insert YouTube Video</div>
            <input
              type="text"
              placeholder="Paste YouTube video URL here..."
              value={videoUrl}
              onChange={e => setVideoUrl(e.target.value)}
              className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 w-full text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              autoFocus
            />
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Width (e.g. 400 or 50%)"
                value={videoWidth}
                onChange={e => setVideoWidth(e.target.value)}
                className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 w-1/2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Height (e.g. 300 or 50%)"
                value={videoHeight}
                onChange={e => setVideoHeight(e.target.value)}
                className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 w-1/2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Leave blank for default size. Use px (e.g. 400) or % (e.g. 50%).</div>
            <button
              className="bg-blue-600 text-white px-4 py-1.5 rounded-lg font-medium hover:bg-blue-700 transition w-full"
              onClick={handleVideoUrlInsert}
              disabled={!videoUrl}
            >
              Insert Video
            </button>
          </PopoverContent>
        </Popover>
        {/* Alignment */}
        <button onClick={() => editor.chain().focus().setTextAlign("left").run()} className={`px-2 py-1 rounded ${editor.isActive({ textAlign: "left" }) ? "bg-blue-200 dark:bg-blue-700" : ""}`} type="button"><AlignLeft size={18} /></button>
        <button onClick={() => editor.chain().focus().setTextAlign("center").run()} className={`px-2 py-1 rounded ${editor.isActive({ textAlign: "center" }) ? "bg-blue-200 dark:bg-blue-700" : ""}`} type="button"><AlignCenter size={18} /></button>
        <button onClick={() => editor.chain().focus().setTextAlign("right").run()} className={`px-2 py-1 rounded ${editor.isActive({ textAlign: "right" }) ? "bg-blue-200 dark:bg-blue-700" : ""}`} type="button"><AlignRight size={18} /></button>
        <button onClick={() => editor.chain().focus().setTextAlign("justify").run()} className={`px-2 py-1 rounded ${editor.isActive({ textAlign: "justify" }) ? "bg-blue-200 dark:bg-blue-700" : ""}`} type="button"><AlignJustify size={18} /></button>
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
          className={`px-2 py-1 rounded ${editor.isActive('subscript') ? 'bg-blue-200 dark:bg-blue-700' : ''}`}
          type="button"
          title="Subscript"
        >
          <SubscriptIcon size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          className={`px-2 py-1 rounded ${editor.isActive('superscript') ? 'bg-blue-200 dark:bg-blue-700' : ''}`}
          type="button"
          title="Superscript"
        >
          <SuperscriptIcon size={18} />
        </button>
         {/* Undo/Redo */}
         <div className="ml-2"></div>
        <button onClick={() => editor.chain().focus().undo().run()} className="px-2 py-1 rounded" type="button"><UndoIcon size={18} /></button>
        <button onClick={() => editor.chain().focus().redo().run()} className="px-2 py-1 rounded" type="button"><RedoIcon size={18} /></button>
      </div>
    </>
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

      <div className="rounded-md border border-gray-200 dark:border-gray-700">
        <MenuBar editor={editor} />
        <div className="overflow-auto max-h-[calc(100vh-250px)]">
          <EditorContent editor={editor} />
        </div>
      </div>

  );
};

export default TiptapEditor;
