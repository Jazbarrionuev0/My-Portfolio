"use client";

import { Editor } from "@tiptap/react";
import MenuButton from "./MenuButton";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1 mb-6 p-3 border border-gray-200 rounded-lg bg-gray-50/50 shadow-sm">
      <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive("bold")}>
        <strong>B</strong>
      </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive("italic")}>
        <em>I</em>
      </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive("heading", { level: 1 })}>
        H1
      </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive("heading", { level: 2 })}>
        H2
      </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive("bulletList")}>
        • List
      </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive("orderedList")}>
        1. Numbers
      </MenuButton>
      <MenuButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .setImage({ src: prompt("Image URL") || "" })
            .run()
        }
      >
        🖼️ Image
      </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().toggleCode().run()} isActive={editor.isActive("code")}>
        {"</>"} Code
      </MenuButton>

      <MenuButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive("codeBlock")}>
        {"{ }"} Block
      </MenuButton>
    </div>
  );
}
