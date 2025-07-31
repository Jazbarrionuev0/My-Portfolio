"use client";

import { Editor } from "@tiptap/react";
import MenuButton from "./MenuButton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/src/components/ui/tooltip";
import { Bold, Italic, Heading1, Heading2, List, ListOrdered, Image as ImageIcon, Code, FileCode2 } from "lucide-react";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-1 mb-6 p-3 border border-gray-200 rounded-lg bg-gray-50/50 shadow-sm">
        <Tooltip>
          <TooltipTrigger asChild>
            <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive("bold")}>
              <Bold className="h-4 w-4" />
            </MenuButton>
          </TooltipTrigger>
          <TooltipContent>
            <p>Bold (Ctrl+B)</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive("italic")}>
              <Italic className="h-4 w-4" />
            </MenuButton>
          </TooltipTrigger>
          <TooltipContent>
            <p>Italic (Ctrl+I)</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive("heading", { level: 1 })}>
              <Heading1 className="h-4 w-4" />
            </MenuButton>
          </TooltipTrigger>
          <TooltipContent>
            <p>Heading 1 (Large title)</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive("heading", { level: 2 })}>
              <Heading2 className="h-4 w-4" />
            </MenuButton>
          </TooltipTrigger>
          <TooltipContent>
            <p>Heading 2 (Medium title)</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive("bulletList")}>
              <List className="h-4 w-4" />
            </MenuButton>
          </TooltipTrigger>
          <TooltipContent>
            <p>Bullet List</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive("orderedList")}>
              <ListOrdered className="h-4 w-4" />
            </MenuButton>
          </TooltipTrigger>
          <TooltipContent>
            <p>Numbered List</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <MenuButton
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .setImage({ src: prompt("Image URL") || "" })
                  .run()
              }
            >
              <ImageIcon className="h-4 w-4" />
            </MenuButton>
          </TooltipTrigger>
          <TooltipContent>
            <p>Insert Image</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <MenuButton onClick={() => editor.chain().focus().toggleCode().run()} isActive={editor.isActive("code")}>
              <Code className="h-4 w-4" />
            </MenuButton>
          </TooltipTrigger>
          <TooltipContent>
            <p>Inline Code</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <MenuButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive("codeBlock")}>
              <FileCode2 className="h-4 w-4" />
            </MenuButton>
          </TooltipTrigger>
          <TooltipContent>
            <p>Code Block</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
