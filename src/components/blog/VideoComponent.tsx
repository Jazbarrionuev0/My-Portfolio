"use client";

import React from "react";
import { NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import { Play, Trash2, Edit } from "lucide-react";

const VideoComponent: React.FC<NodeViewProps> = ({ node, updateAttributes, deleteNode }) => {
  const { src, alt, title, controls, autoplay, muted, loop, poster } = node.attrs;

  const handleDelete = () => {
    deleteNode();
  };

  const handleEdit = () => {
    const newSrc = prompt("Enter video URL:", src);
    if (newSrc !== null) {
      updateAttributes({ src: newSrc });
    }
  };

  if (!src) {
    return (
      <NodeViewWrapper className="relative my-4">
        <div className="flex items-center justify-center bg-admin-secondary border-2 border-dashed border-admin-border rounded-lg p-8 my-4">
          <div className="text-center">
            <Play className="h-12 w-12 text-admin-muted mx-auto mb-2" />
            <p className="text-admin-muted">Video URL is required</p>
            <button onClick={handleEdit} className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
              Add URL
            </button>
          </div>
        </div>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper className="relative my-4">
      <div className="relative group">
        <video
          src={src}
          title={title || alt}
          controls={controls}
          autoPlay={autoplay}
          muted={muted}
          loop={loop}
          poster={poster}
          className="w-full h-auto rounded-lg border border-admin-border shadow-sm max-w-full transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
          style={{ maxHeight: "400px" }}
        >
          Your browser does not support the video tag.
        </video>

        {/* Overlay with controls - only visible on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
              title="Edit video URL"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
              title="Delete video"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </NodeViewWrapper>
  );
};

export default VideoComponent;
