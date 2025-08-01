"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ImageExtension } from "../../../../../components/blog/ImageExtension";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { saveBlogPost, updateBlogPost, getAllTags, getAllCategories, createCategory } from "../../../../../actions/blog";
import { uploadImageAction } from "../../../../../actions/upload";
import MenuBar from "../../../../../components/blog/MenuBar";
import Link from "next/link";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../components/ui/select";
import NextImage from "next/image";
import { ImageIcon } from "lucide-react";

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
  const [featuredImage, setFeaturedImage] = useState<string | null>(post?.featuredImage || null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastAutoSave, setLastAutoSave] = useState<Date | null>(null);
  const router = useRouter();

  // Ref for auto-save timeout
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastChangeTimeRef = useRef<number>(0);

  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExtension.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg border border-border shadow-sm my-4",
        },
      }),
    ],
    content: post?.contentJson || "",
    immediatelyRender: false,
    onUpdate: () => {
      setHasChanges(true);
      lastChangeTimeRef.current = Date.now();
    },
  });

  // Track editor content changes separately
  useEffect(() => {
    if (editor) {
      const handleUpdate = () => {
        setHasChanges(true);
        lastChangeTimeRef.current = Date.now();
      };

      editor.on("update", handleUpdate);

      return () => {
        editor.off("update", handleUpdate);
      };
    }
  }, [editor]);

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

  // Auto-save functionality
  const performAutoSave = useCallback(async () => {
    if (!editor || !title.trim() || !selectedCategoryId || isSaving || isAutoSaving) {
      return;
    }

    setIsAutoSaving(true);

    try {
      const contentData = {
        title: title.trim(),
        excerpt: excerpt.trim() || undefined,
        contentHtml: editor.getHTML(),
        contentJson: JSON.stringify(editor.getJSON()),
        contentText: editor.getText(),
        tags: tags,
        categoryId: selectedCategoryId,
        featuredImage: featuredImage,
      };

      let result;
      if (mode === "create") {
        result = await saveBlogPost(contentData);
      } else {
        result = await updateBlogPost(post!.id, contentData);
      }

      if (result.success) {
        setHasChanges(false);
        setLastAutoSave(new Date());
        // Don't show toast for auto-save to avoid interrupting user
      }
    } catch (error) {
      console.error("Auto-save error:", error);
      // Silently fail for auto-save
    } finally {
      setIsAutoSaving(false);
    }
  }, [editor, title, selectedCategoryId, isSaving, isAutoSaving, excerpt, tags, featuredImage, mode, post]);

  // Auto-save functionality with proper debouncing
  const scheduleAutoSave = useCallback(() => {
    // Clear existing timeout
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    // Only schedule if we have the required fields and are not already saving
    if (title.trim() && selectedCategoryId && !isSaving && !isAutoSaving) {
      autoSaveTimeoutRef.current = setTimeout(() => {
        // Double-check that enough time has passed since last change
        const timeSinceLastChange = Date.now() - lastChangeTimeRef.current;
        if (timeSinceLastChange >= 5000) {
          performAutoSave();
        } else {
          // If not enough time has passed, schedule again
          setTimeout(() => scheduleAutoSave(), 5000 - timeSinceLastChange);
        }
      }, 5000);
    }
  }, [title, selectedCategoryId, isSaving, isAutoSaving, performAutoSave]);

  // Effect to handle auto-save scheduling
  useEffect(() => {
    if (hasChanges) {
      lastChangeTimeRef.current = Date.now();
      scheduleAutoSave();
    }
  }, [hasChanges, scheduleAutoSave]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, []);

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
        featuredImage: featuredImage,
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
      lastChangeTimeRef.current = Date.now();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
    setHasChanges(true);
    lastChangeTimeRef.current = Date.now();
  };

  const handleSelectCategory = (categoryId: string) => {
    const category = availableCategories.find((cat) => cat.id === categoryId);
    if (category) {
      setSelectedCategory(category.title);
      setSelectedCategoryId(categoryId);
      setHasChanges(true);
      lastChangeTimeRef.current = Date.now();
    }
  };

  const handleClearCategory = () => {
    setSelectedCategory("");
    setSelectedCategoryId("");
    setHasChanges(true);
    lastChangeTimeRef.current = Date.now();
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
        lastChangeTimeRef.current = Date.now();

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    // Validate file size (max 20MB)
    if (file.size > 20 * 1024 * 1024) {
      toast.error("Image size must be less than 20MB");
      return;
    }

    setIsUploadingImage(true);
    const uploadToast = toast.loading("Uploading image...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const imageUrl = await uploadImageAction(formData);
      setFeaturedImage(imageUrl);
      setHasChanges(true);
      lastChangeTimeRef.current = Date.now();
      toast.dismiss(uploadToast);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.dismiss(uploadToast);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setFeaturedImage(null);
    setHasChanges(true);
    lastChangeTimeRef.current = Date.now();
  };

  const handleEditorImageUpload = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    // Validate file size (max 20MB)
    if (file.size > 20 * 1024 * 1024) {
      toast.error("Image size must be less than 20MB");
      return;
    }

    const uploadToast = toast.loading("Uploading image...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const imageUrl = await uploadImageAction(formData);

      // Insert the image into the editor
      if (editor) {
        editor.chain().focus().setImage({ src: imageUrl }).run();
      }

      toast.dismiss(uploadToast);
      toast.success("Image uploaded and inserted!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.dismiss(uploadToast);
      toast.error("Failed to upload image. Please try again.");
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length === 0) {
      toast.error("No image files found in drop");
      return;
    }

    // Upload all image files
    for (const file of imageFiles) {
      await handleEditorImageUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    // Only set dragging to false if we're leaving the editor container
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  };

  return (
    <div className="bg-background shadow rounded-lg border border-border">
      <div className="px-6 py-4 border-b border-border">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-foreground">{mode === "create" ? "Create New Post" : "Edit Post"}</h2>
          <div className="flex items-center space-x-3">
            {/* Auto-save status */}
            <div className="text-sm text-muted-foreground">
              {isAutoSaving ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-3 w-3 text-muted-foreground"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Auto-saving...
                </span>
              ) : lastAutoSave ? (
                <span>Auto-saved at {lastAutoSave.toLocaleTimeString()}</span>
              ) : null}
            </div>

            <Link href="/admin/blog" className="text-muted-foreground hover:text-foreground text-sm font-medium">
              Cancel
            </Link>
            <button
              onClick={handleSave}
              disabled={!editor || !title.trim() || !selectedCategoryId || isSaving || isAutoSaving || !hasChanges}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              {isSaving ? "Saving..." : isAutoSaving ? "Auto-saving..." : mode === "create" ? "Create Post" : "Update Post"}
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
              lastChangeTimeRef.current = Date.now();
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

        {/* Featured Image */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">Featured Image</label>

          {featuredImage ? (
            <div className="space-y-3">
              <div className="relative group">
                <NextImage
                  src={featuredImage}
                  alt="Featured image preview"
                  width={800}
                  height={400}
                  className="w-full h-48 object-cover rounded-lg border border-border"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center">
                  <button
                    onClick={handleRemoveImage}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-red-700"
                  >
                    Remove Image
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="featured-image-replace"
                  className="cursor-pointer inline-flex items-center px-3 py-2 border border-border rounded-md text-sm font-medium text-foreground bg-background hover:bg-accent transition-colors"
                >
                  Replace Image
                </label>
                <input
                  id="featured-image-replace"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploadingImage}
                  className="hidden"
                />
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <div className="space-y-2">
                <svg className="mx-auto h-12 w-12 text-muted-foreground" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="text-sm text-muted-foreground">
                  <label htmlFor="featured-image-upload" className="cursor-pointer font-medium text-primary hover:text-primary/90">
                    Click to upload
                  </label>
                  <span> or drag and drop</span>
                </div>
                <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 20MB</p>
              </div>
              <input
                id="featured-image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploadingImage}
                className="hidden"
              />
            </div>
          )}

          {isUploadingImage && <div className="mt-2 text-sm text-muted-foreground">Uploading image...</div>}
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
              lastChangeTimeRef.current = Date.now();
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
            <Select value={selectedCategoryId} onValueChange={handleSelectCategory}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select a category..." />
              </SelectTrigger>
              <SelectContent>
                {availableCategories
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.title} ({category.postCount} post{category.postCount !== 1 ? "s" : ""})
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

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
            <MenuBar editor={editor} onImageUpload={handleEditorImageUpload} />
          </div>

          {/* Editor Content */}
          <div
            className={`p-4 bg-background cursor-text relative transition-all duration-200 ${
              isDragging ? "bg-blue-50 dark:bg-blue-950/20 border-2 border-dashed border-blue-300 dark:border-blue-600" : ""
            }`}
            onClick={(e) => {
              // Only focus if clicking on the container itself, not on editor content
              if (e.target === e.currentTarget && editor) {
                editor.commands.focus("end");
              }
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
          >
            <EditorContent
              editor={editor}
              className="min-h-[400px] prose prose-lg max-w-none focus:outline-none dark:prose-invert"
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: "18px",
                lineHeight: "1.6",
              }}
            />

            {/* Drag overlay */}
            {isDragging && (
              <div className="absolute inset-0 flex items-center justify-center bg-blue-50/90 dark:bg-blue-950/90 border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg pointer-events-none">
                <div className="text-center">
                  <ImageIcon className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                  <p className="text-blue-700 dark:text-blue-300 font-medium">Drop images here to upload</p>
                  <p className="text-blue-600 dark:text-blue-400 text-sm">PNG, JPG, GIF up to 20MB</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {hasChanges && !isAutoSaving && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md dark:bg-yellow-900/20 dark:border-yellow-800">
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              You have unsaved changes.{" "}
              {title.trim() && selectedCategoryId
                ? "Auto-save will occur in 5 seconds of inactivity."
                : "Make sure to add a title and select a category to enable auto-save."}
            </p>
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
