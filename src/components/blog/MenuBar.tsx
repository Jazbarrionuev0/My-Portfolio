"use client";

import { Editor } from "@tiptap/react";
import MenuButton from "./MenuButton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/src/components/ui/tooltip";
import { Bold, Italic, Heading1, Heading2, List, ListOrdered, Image as ImageIcon, Code, FileCode2, Upload } from "lucide-react";
import { uploadImageAction } from "@/src/actions/upload";
import { toast } from "sonner";
import { useRef, useState } from "react";

export default function MenuBar({ editor, onImageUpload }: { editor: Editor | null; onImageUpload?: (file: File) => Promise<void> }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  if (!editor) {
    return null;
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // If onImageUpload prop is provided, use it (from BlogEditor)
    if (onImageUpload) {
      await onImageUpload(file);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    // Fallback to original upload logic
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

      // Insert the image into the editor
      editor.chain().focus().setImage({ src: imageUrl }).run();

      toast.dismiss(uploadToast);
      toast.success("Image uploaded and inserted!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.dismiss(uploadToast);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setIsUploadingImage(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleImageButtonClick = () => {
    if (isUploadingImage) return;
    fileInputRef.current?.click();
  };

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
            <MenuButton onClick={handleImageButtonClick} isActive={isUploadingImage}>
              {isUploadingImage ? <Upload className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-4 w-4" />}
            </MenuButton>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isUploadingImage ? "Uploading..." : "Insert Image"}</p>
          </TooltipContent>
        </Tooltip>

        {/* Hidden file input */}
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

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
