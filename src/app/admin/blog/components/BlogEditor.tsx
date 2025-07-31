"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveBlogPost, updateBlogPost } from "../../../../actions/blog";
import MenuBar from "../../../../components/blog/MenuBar";
import Link from "next/link";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  contentHtml: string | null;
  contentJson: any;
  contentText: string | null;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  published: boolean;
  publishedAt: Date | null;
  readingTime: number | null;
  viewCount: number;
  featuredImage: string | null;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
};

interface BlogEditorProps {
  mode: "create" | "edit";
  post?: Post;
}

export default function BlogEditor({ mode, post }: BlogEditorProps) {
  const [title, setTitle] = useState(post?.title || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [tags, setTags] = useState<string[]>(post?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const router = useRouter();

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: post?.contentJson || "",
    immediatelyRender: false,
    onUpdate: () => {
      setHasChanges(true);
    },
  });

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasChanges]);

  const handleSave = async () => {
    if (!editor || !title.trim()) {
      alert("Please enter a title");
      return;
    }

    setIsSaving(true);

    try {
      const contentData = {
        title: title.trim(),
        excerpt: excerpt.trim() || undefined,
        contentHtml: editor.getHTML(),
        contentJson: JSON.stringify(editor.getJSON()),
        contentText: editor.getText(),
        tags: tags,
      };

      let result;
      if (mode === "create") {
        result = await saveBlogPost(contentData);
      } else {
        result = await updateBlogPost(post!.id, contentData);
      }

      if (result.success) {
        setHasChanges(false);
        alert(`Blog post ${mode === "create" ? "created" : "updated"} successfully!`);
        router.push("/admin/blog");
      } else {
        alert(`Error ${mode === "create" ? "creating" : "updating"} post: ${result.error}`);
      }
    } catch (error) {
      console.error("Save error:", error);
      alert(`Failed to ${mode === "create" ? "create" : "update"} the blog post. Please try again.`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput("");
      setHasChanges(true);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
    setHasChanges(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">{mode === "create" ? "Create New Post" : "Edit Post"}</h2>
          <div className="flex items-center space-x-3">
            <Link href="/admin/blog" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Cancel
            </Link>
            <button
              onClick={handleSave}
              disabled={!editor || (!title.trim() && !editor.getText().trim()) || isSaving}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              {isSaving ? "Saving..." : mode === "create" ? "Create Post" : "Update Post"}
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Title Input */}
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <textarea
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setHasChanges(true);
            }}
            placeholder="Enter your blog post title..."
            className="w-full text-2xl font-bold text-gray-900 placeholder-gray-400 bg-transparent border border-gray-300 rounded-md p-3 outline-none resize-none overflow-hidden leading-tight focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              minHeight: "60px",
              maxHeight: "120px",
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = target.scrollHeight + "px";
            }}
            rows={1}
          />
        </div>

        {/* Excerpt Input */}
        <div className="mb-6">
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt (Optional)
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => {
              setExcerpt(e.target.value);
              setHasChanges(true);
            }}
            placeholder="Write a brief description of your post..."
            className="w-full p-3 border border-gray-300 rounded-md placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            rows={3}
            maxLength={200}
          />
          <p className="mt-1 text-sm text-gray-500">{excerpt.length}/200 characters</p>
        </div>

        {/* Tags Input */}
        <div className="mb-6">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700">
                {tag}
                <button onClick={() => handleRemoveTag(tag)} className="ml-2 text-indigo-600 hover:text-indigo-800">
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a tag..."
              className="flex-1 p-2 border border-gray-300 rounded-l-md placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
            <button
              onClick={handleAddTag}
              type="button"
              className="px-4 py-2 bg-gray-600 text-white rounded-r-md hover:bg-gray-700 transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          {/* Editor Toolbar */}
          <div className="bg-gray-50 border-b border-gray-300">
            <MenuBar editor={editor} />
          </div>

          {/* Editor Content */}
          <div className="p-4">
            <EditorContent
              editor={editor}
              className="min-h-[400px] prose prose-lg max-w-none focus:outline-none"
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: "18px",
                lineHeight: "1.6",
                color: "#374151",
              }}
            />
          </div>
        </div>

        {hasChanges && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-700">You have unsaved changes. Make sure to save before leaving this page.</p>
          </div>
        )}
      </div>
    </div>
  );
}
