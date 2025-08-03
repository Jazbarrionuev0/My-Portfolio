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
      <NodeViewWrapper className="video-component">
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 my-4">
          <div className="text-center">
            <Play className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 dark:text-gray-400">Video URL is required</p>
            <button
              onClick={handleEdit}
              className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              Add URL
            </button>
          </div>
        </div>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper className="video-component">
      <div className="relative group my-4">
        <video
          src={src}
          title={title || alt}
          controls={controls}
          autoPlay={autoplay}
          muted={muted}
          loop={loop}
          poster={poster}
          className="w-full h-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm max-w-full"
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
