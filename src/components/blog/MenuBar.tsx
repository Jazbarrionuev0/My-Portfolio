"use client";

import { Editor } from "@tiptap/react";
import MenuButton from "./MenuButton";
import LinkDialog from "./LinkDialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/src/components/ui/tooltip";
import { Bold, Italic, Underline, Heading2, List, ListOrdered, Image as ImageIcon, Upload, FileCode2, Link, Video } from "lucide-react";
import { uploadImageAction, uploadVideoAction } from "@/src/actions/upload";
import { toast } from "sonner";
import { useRef, useState } from "react";

export default function MenuBar({
  editor,
  onImageUpload,
  onVideoUpload,
}: {
  editor: Editor | null;
  onImageUpload?: (file: File) => Promise<void>;
  onVideoUpload?: (file: File) => Promise<void>;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");

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

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // If onVideoUpload prop is provided, use it (from BlogEditor)
    if (onVideoUpload) {
      await onVideoUpload(file);
      // Reset the file input
      if (videoInputRef.current) {
        videoInputRef.current.value = "";
      }
      return;
    }

    // Fallback to original upload logic
    // Validate file type
    if (!file.type.startsWith("video/")) {
      toast.error("Please select a valid video file");
      return;
    }

    // Validate file size (max 100MB for videos)
    if (file.size > 100 * 1024 * 1024) {
      toast.error("Video size must be less than 100MB");
      return;
    }

    setIsUploadingVideo(true);
    const uploadToast = toast.loading("Uploading video...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const videoUrl = await uploadVideoAction(formData);

      // Insert the video into the editor
      editor
        .chain()
        .focus()
        .insertContent({
          type: "video",
          attrs: { src: videoUrl, controls: true },
        })
        .run();

      toast.dismiss(uploadToast);
      toast.success("Video uploaded and inserted!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.dismiss(uploadToast);
      toast.error("Failed to upload video. Please try again.");
    } finally {
      setIsUploadingVideo(false);
      // Reset the file input
      if (videoInputRef.current) {
        videoInputRef.current.value = "";
      }
    }
  };

  const handleLinkClick = () => {
    const { from, to } = editor.state.selection;
    const selectedTextContent = editor.state.doc.textBetween(from, to);

    if (editor.isActive("link")) {
      // If already a link, unlink it
      editor.chain().focus().unsetLink().run();
      toast.success("Link removed successfully!");
    } else {
      // If no text is selected, show a toast message
      if (!selectedTextContent.trim()) {
        toast.error("Please select some text first to create a link");
        return;
      }

      // Get current link URL if editing existing link
      const linkAttributes = editor.getAttributes("link");
      const existingUrl = linkAttributes.href || "https://";

      // Set state and show dialog
      setSelectedText(selectedTextContent);
      setCurrentUrl(existingUrl);
      setShowLinkDialog(true);
    }
  };

  const handleLinkConfirm = (url: string) => {
    if (url && url.trim()) {
      editor.chain().focus().setLink({ href: url.trim() }).run();
      toast.success("Link added successfully!");
    }
  };

  const handleImageButtonClick = () => {
    if (isUploadingImage) return;
    fileInputRef.current?.click();
  };

  const handleVideoButtonClick = () => {
    if (isUploadingVideo) return;
    videoInputRef.current?.click();
  };

  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-1 p-3 border-admin-border bg-admin-secondary shadow-sm">
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
            <MenuButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive("underline")}>
              <Underline className="h-4 w-4" />
            </MenuButton>
          </TooltipTrigger>
          <TooltipContent>
            <p>Underline (Ctrl+U)</p>
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
            <MenuButton onClick={handleLinkClick} isActive={editor.isActive("link")}>
              <Link className="h-4 w-4" />
            </MenuButton>
          </TooltipTrigger>
          <TooltipContent>
            <p>{editor.isActive("link") ? "Remove Link" : "Add Link"}</p>
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
            <MenuButton onClick={handleVideoButtonClick} isActive={isUploadingVideo}>
              {isUploadingVideo ? <Upload className="h-4 w-4 animate-spin" /> : <Video className="h-4 w-4" />}
            </MenuButton>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isUploadingVideo ? "Uploading..." : "Upload Video"}</p>
          </TooltipContent>
        </Tooltip>

        {/* Hidden video file input */}
        <input ref={videoInputRef} type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />

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

      {/* Link Dialog */}
      <LinkDialog
        isOpen={showLinkDialog}
        onClose={() => setShowLinkDialog(false)}
        onConfirm={handleLinkConfirm}
        initialUrl={currentUrl}
        selectedText={selectedText}
      />
    </TooltipProvider>
  );
}
