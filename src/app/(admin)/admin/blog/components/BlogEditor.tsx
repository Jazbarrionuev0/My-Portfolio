"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveBlogPost, updateBlogPost, getAllTags } from "../../../../../actions/blog";
import MenuBar from "../../../../../components/blog/MenuBar";
import Link from "next/link";
import { toast } from "sonner";

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
  tags: {
    id: string;
    title: string;
  }[];
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
  const [tags, setTags] = useState<string[]>(post?.tags?.map((tag) => tag.title) || []);
  const [tagInput, setTagInput] = useState("");
  const [availableTags, setAvailableTags] = useState<{ id: string; title: string; postCount: number }[]>([]);
  const [filteredTags, setFilteredTags] = useState<{ id: string; title: string; postCount: number }[]>([]);
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
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

  // Fetch available tags on component mount
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const result = await getAllTags();
        if (result.success && result.tags) {
          const tagsWithCount = result.tags.map((tag) => ({
            id: tag.id,
            title: tag.title,
            postCount: tag._count.posts,
          }));
          setAvailableTags(tagsWithCount);
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  // Filter tags based on input
  useEffect(() => {
    if (showTagSuggestions) {
      if (tagInput.trim()) {
        const filtered = availableTags.filter((tag) => tag.title.toLowerCase().includes(tagInput.toLowerCase()) && !tags.includes(tag.title));
        setFilteredTags(filtered);
      } else {
        // Show most popular tags when no input
        const filtered = availableTags
          .filter((tag) => !tags.includes(tag.title))
          .sort((a, b) => b.postCount - a.postCount)
          .slice(0, 5);
        setFilteredTags(filtered);
      }
    } else {
      setFilteredTags([]);
    }
  }, [tagInput, availableTags, tags, showTagSuggestions]);

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
      toast.error("Please enter a title");
      return;
    }

    setIsSaving(true);

    // Show loading toast
    const loadingToast = toast.loading(`${mode === "create" ? "Creating" : "Updating"} blog post...`);

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
        toast.dismiss(loadingToast);

        // Show success toast and wait before navigation
        toast.success(`Blog post ${mode === "create" ? "created" : "updated"} successfully!`, {
          description: mode === "create" ? "Your new blog post has been created as a draft." : "Your changes have been saved.",
          duration: 4000, // Show for 4 seconds
        });

        // Navigate after showing the toast
        setTimeout(() => {
          router.push("/admin/blog");
        }, 2000);
      } else {
        toast.dismiss(loadingToast);
        toast.error(`Failed to ${mode === "create" ? "create" : "update"} post`, {
          description: result.error,
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.dismiss(loadingToast);
      toast.error(`Failed to ${mode === "create" ? "create" : "update"} the blog post`, {
        description: "Please try again or contact support if the problem persists.",
        duration: 5000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddTag = (tagTitle?: string) => {
    const tag = (tagTitle || tagInput).trim();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput("");
      setShowTagSuggestions(false);
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
      if (filteredTags.length > 0) {
        handleAddTag(filteredTags[0].title);
      } else {
        handleAddTag();
      }
    } else if (e.key === "Escape") {
      setShowTagSuggestions(false);
    }
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagInputFocus = () => {
    setShowTagSuggestions(true);
  };

  const handleTagInputBlur = () => {
    // Delay hiding suggestions to allow clicks on suggestions
    setTimeout(() => setShowTagSuggestions(false), 200);
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
              onChange={handleTagInputChange}
              onFocus={handleTagInputFocus}
              onBlur={handleTagInputBlur}
              onKeyPress={handleKeyPress}
              placeholder="Add a tag..."
              className="flex-1 p-2 border border-gray-300 rounded-l-md placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
            <button
              onClick={() => handleAddTag()}
              type="button"
              className="px-4 py-2 bg-gray-600 text-white rounded-r-md hover:bg-gray-700 transition-colors"
            >
              Add
            </button>
          </div>

          {/* Tag Suggestions Dropdown */}
          {showTagSuggestions && (
            <div className="relative">
              <div className="absolute top-1 left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                {filteredTags.length > 0 ? (
                  <>
                    {!tagInput.trim() && <div className="px-3 py-2 text-xs text-gray-500 bg-gray-50 border-b">Popular tags:</div>}
                    {filteredTags.map((tag) => (
                      <div
                        key={tag.id}
                        onClick={() => handleAddTag(tag.title)}
                        className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                      >
                        <span className="text-gray-900">{tag.title}</span>
                        <span className="text-xs text-gray-500">
                          {tag.postCount} post{tag.postCount !== 1 ? "s" : ""}
                        </span>
                      </div>
                    ))}
                  </>
                ) : null}
                {tagInput.trim() && (
                  <div
                    onClick={() => handleAddTag()}
                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex justify-between items-center border-t"
                  >
                    <span className="text-gray-900">Create &ldquo;{tagInput.trim()}&rdquo;</span>
                    <span className="text-xs text-green-600 font-medium">New tag</span>
                  </div>
                )}
              </div>
            </div>
          )}
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
