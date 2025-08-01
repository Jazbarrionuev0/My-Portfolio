"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveBlogPost, updateBlogPost, getAllTags, getAllCategories, createCategory } from "../../../../../actions/blog";
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
  category: {
    id: string;
    title: string;
  } | null;
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
  const [selectedCategory, setSelectedCategory] = useState<string>(post?.category?.title || "");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(post?.category?.id || "");
  const [tagInput, setTagInput] = useState("");
  const [availableTags, setAvailableTags] = useState<{ id: string; title: string; postCount: number }[]>([]);
  const [availableCategories, setAvailableCategories] = useState<{ id: string; title: string; postCount: number }[]>([]);
  const [filteredTags, setFilteredTags] = useState<{ id: string; title: string; postCount: number }[]>([]);
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
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

  // Fetch available tags and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tagsResult, categoriesResult] = await Promise.all([getAllTags(), getAllCategories()]);

        if (tagsResult.success && tagsResult.tags) {
          const tagsWithCount = tagsResult.tags.map((tag) => ({
            id: tag.id,
            title: tag.title,
            postCount: tag._count.posts,
          }));
          setAvailableTags(tagsWithCount);
        }

        if (categoriesResult.success && categoriesResult.categories) {
          const categoriesWithCount = categoriesResult.categories.map((category) => ({
            id: category.id,
            title: category.title,
            postCount: category._count.posts,
          }));
          setAvailableCategories(categoriesWithCount);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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

    if (!selectedCategoryId) {
      toast.error("Please select a category");
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
        categoryId: selectedCategoryId,
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

  const handleSelectCategory = (categoryId: string) => {
    const category = availableCategories.find((cat) => cat.id === categoryId);
    if (category) {
      setSelectedCategory(category.title);
      setSelectedCategoryId(categoryId);
      setHasChanges(true);
    }
  };

  const handleClearCategory = () => {
    setSelectedCategory("");
    setSelectedCategoryId("");
    setHasChanges(true);
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    setIsCreatingCategory(true);
    try {
      const result = await createCategory(newCategoryName.trim());
      if (result.success && result.category) {
        // Add the new category to available categories
        const newCategory = {
          id: result.category.id,
          title: result.category.title,
          postCount: 0,
        };
        setAvailableCategories((prev) => [...prev, newCategory]);

        // Select the newly created category
        setSelectedCategory(result.category.title);
        setSelectedCategoryId(result.category.id);
        setNewCategoryName("");
        setShowCategoryModal(false);
        setHasChanges(true);

        toast.success("Category created successfully!");
      } else {
        toast.error("Failed to create category");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category");
    } finally {
      setIsCreatingCategory(false);
    }
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

  const handleCategoryKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCreateCategory();
    } else if (e.key === "Escape") {
      setShowCategoryModal(false);
      setNewCategoryName("");
    }
  };

  return (
    <div className="bg-background shadow rounded-lg border border-border">
      <div className="px-6 py-4 border-b border-border">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-foreground">{mode === "create" ? "Create New Post" : "Edit Post"}</h2>
          <div className="flex items-center space-x-3">
            <Link href="/admin/blog" className="text-muted-foreground hover:text-foreground text-sm font-medium">
              Cancel
            </Link>
            <button
              onClick={handleSave}
              disabled={!editor || !title.trim() || !selectedCategoryId || isSaving}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              {isSaving ? "Saving..." : mode === "create" ? "Create Post" : "Update Post"}
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Title Input */}
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
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
            className="w-full text-2xl font-bold text-foreground placeholder-muted-foreground bg-background border border-border rounded-md p-3 outline-none resize-none overflow-hidden leading-tight focus:ring-2 focus:ring-ring focus:border-ring"
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
          <label htmlFor="excerpt" className="block text-sm font-medium text-foreground mb-2">
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
            className="w-full p-3 border border-border rounded-md placeholder-muted-foreground focus:ring-2 focus:ring-ring focus:border-ring outline-none bg-background text-foreground"
            rows={3}
            maxLength={200}
          />
          <p className="mt-1 text-sm text-muted-foreground">{excerpt.length}/200 characters</p>
        </div>

        {/* Category Selection */}
        <div className="mb-6">
          <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
            Category *
          </label>

          <div className="flex gap-2">
            <select
              value={selectedCategoryId}
              onChange={(e) => handleSelectCategory(e.target.value)}
              className="flex-1 p-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-ring outline-none"
            >
              <option value="">Select a category...</option>
              {availableCategories
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title} ({category.postCount} post{category.postCount !== 1 ? "s" : ""})
                  </option>
                ))}
            </select>

            <button
              onClick={() => setShowCategoryModal(true)}
              type="button"
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors whitespace-nowrap"
            >
              Add New
            </button>
          </div>
        </div>

        {/* Tags Input */}
        <div className="mb-6">
          <label htmlFor="tags" className="block text-sm font-medium text-foreground mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
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
              className="flex-1 p-2 border border-border rounded-l-md placeholder-muted-foreground focus:ring-2 focus:ring-ring focus:border-ring outline-none bg-background text-foreground"
            />
            <button
              onClick={() => handleAddTag()}
              type="button"
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-r-md hover:bg-secondary/80 transition-colors"
            >
              Add
            </button>
          </div>

          {/* Tag Suggestions Dropdown */}
          {showTagSuggestions && (
            <div className="relative">
              <div className="absolute top-1 left-0 right-0 bg-popover border border-border rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                {filteredTags.length > 0 ? (
                  <>
                    {!tagInput.trim() && <div className="px-3 py-2 text-xs text-muted-foreground bg-muted border-b border-border">Popular tags:</div>}
                    {filteredTags.map((tag) => (
                      <div
                        key={tag.id}
                        onClick={() => handleAddTag(tag.title)}
                        className="px-3 py-2 hover:bg-accent cursor-pointer flex justify-between items-center"
                      >
                        <span className="text-popover-foreground">{tag.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {tag.postCount} post{tag.postCount !== 1 ? "s" : ""}
                        </span>
                      </div>
                    ))}
                  </>
                ) : null}
                {tagInput.trim() && (
                  <div
                    onClick={() => handleAddTag()}
                    className="px-3 py-2 hover:bg-accent cursor-pointer flex justify-between items-center border-t border-border"
                  >
                    <span className="text-popover-foreground">Create &ldquo;{tagInput.trim()}&rdquo;</span>
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">New tag</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Editor */}
        <div className="border border-border rounded-lg overflow-hidden">
          {/* Editor Toolbar */}
          <div className="bg-muted border-b border-border">
            <MenuBar editor={editor} />
          </div>

          {/* Editor Content */}
          <div className="p-4 bg-background">
            <EditorContent
              editor={editor}
              className="min-h-[400px] prose prose-lg max-w-none focus:outline-none dark:prose-invert"
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: "18px",
                lineHeight: "1.6",
              }}
            />
          </div>
        </div>

        {hasChanges && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md dark:bg-yellow-900/20 dark:border-yellow-800">
            <p className="text-sm text-yellow-700 dark:text-yellow-400">You have unsaved changes. Make sure to save before leaving this page.</p>
          </div>
        )}
      </div>

      {/* Category Creation Modal */}
      {showCategoryModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowCategoryModal(false);
              setNewCategoryName("");
            }
          }}
        >
          <div className="bg-background border border-border rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-border">
              <h3 className="text-lg font-medium text-foreground">Create New Category</h3>
            </div>

            <div className="p-6">
              <label htmlFor="new-category" className="block text-sm font-medium text-foreground mb-2">
                Category Name
              </label>
              <input
                id="new-category"
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyPress={handleCategoryKeyPress}
                placeholder="Enter category name..."
                className="w-full p-3 border border-border rounded-md placeholder-muted-foreground focus:ring-2 focus:ring-ring focus:border-ring outline-none bg-background text-foreground"
                autoFocus
              />
            </div>

            <div className="px-6 py-4 border-t border-border flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowCategoryModal(false);
                  setNewCategoryName("");
                }}
                disabled={isCreatingCategory}
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCategory}
                disabled={!newCategoryName.trim() || isCreatingCategory}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed transition-colors"
              >
                {isCreatingCategory ? "Creating..." : "Create Category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
