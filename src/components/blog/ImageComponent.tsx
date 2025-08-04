import React from "react";
import { NodeViewWrapper } from "@tiptap/react";
import { Node as ProseMirrorNode } from "prosemirror-model";
import { Editor } from "@tiptap/core";
import Image from "next/image";

interface ImageComponentProps {
  node: ProseMirrorNode;
  updateAttributes: (attributes: Record<string, any>) => void;
  deleteNode: () => void;
  editor: Editor;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ node, updateAttributes, deleteNode }) => {
  const { src, alt, title, width, height } = node.attrs;

  return (
    <NodeViewWrapper className="image-component">
      <div className="relative group inline-block max-w-full">
        <Image
          src={src}
          alt={alt || ""}
          title={title || ""}
          width={width || 800}
          height={height || 600}
          className="max-w-full h-auto rounded-lg border border-border shadow-sm"
          style={{ display: "block" }}
          onLoad={(e) => {
            const img = e.target as HTMLImageElement;
            updateAttributes({
              width: img.naturalWidth,
              height: img.naturalHeight,
            });
          }}
          unoptimized={src?.startsWith("data:") || false} // Don't optimize base64 images
          priority={false} // These are content images, not above-the-fold
        />

        {/* Delete button (shown on hover) */}
        <button
          onClick={deleteNode}
          className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-700"
          type="button"
          title="Remove image"
        >
          ×
        </button>

        {/* Caption input */}
        <div className="mt-2">
          <input
            type="text"
            placeholder="Add a caption (optional)..."
            value={alt || ""}
            onChange={(e) => updateAttributes({ alt: e.target.value })}
            className="w-full text-sm text-center text-muted-foreground bg-transparent border-none outline-none placeholder-muted-foreground/60 focus:text-foreground"
          />
        </div>
      </div>
    </NodeViewWrapper>
  );
};

export default ImageComponent;
