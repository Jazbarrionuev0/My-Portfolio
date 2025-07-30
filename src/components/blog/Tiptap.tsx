"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import MenuBar from "./MenuBar";
import { useState } from "react";

const Tiptap = () => {
  const [title, setTitle] = useState("");

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: "",
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  const handleSave = () => {
    if (!editor) return;

    const contentData = {
      title: title,
      html: editor.getHTML(),
      json: editor.getJSON(),
      text: editor.getText(),
    };

    console.log("Saving content:", contentData);

    // You can also show an alert or update state to show saved content
    alert(`Saved!\nTitle: ${title}\nContent Length: ${editor.getText().length} characters`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Title Input */}
      <div className="mb-6">
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tell your story..."
          className="w-full text-4xl font-bold text-gray-900 placeholder-gray-400 bg-transparent border-none outline-none resize-none overflow-hidden leading-tight"
          style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            minHeight: "80px",
            maxHeight: "200px",
          }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "auto";
            target.style.height = target.scrollHeight + "px";
          }}
          rows={1}
        />
        <div className="h-px bg-gray-200 mt-4"></div>
      </div>

      {/* Editor Toolbar */}
      <MenuBar editor={editor} />

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="min-h-[400px] prose prose-lg max-w-none focus:outline-none"
        style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontSize: "20px",
          lineHeight: "1.6",
          color: "#374151",
        }}
      />

      <div className="mb-4 flex justify-end">
        <button
          onClick={handleSave}
          disabled={!editor || (!title.trim() && !editor.getText().trim())}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Save Draft
        </button>
      </div>
    </div>
  );
};

export default Tiptap;
