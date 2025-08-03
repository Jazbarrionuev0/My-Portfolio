"use client";

import React from "react";
import { NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import { Play, Trash2, Edit } from "lucide-react";

const VideoComponent: React.FC<NodeViewProps> = ({ node, updateAttributes, deleteNode }) => {
  const { src, alt, title, controls, autoplay, muted, loop, poster } = node.attrs;
  const [hasError, setHasError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false); // Start with false

  // Add debugging
  console.log("VideoComponent rendering with:", { src, controls, autoplay, muted, loop });

  const handleDelete = () => {
    deleteNode();
  };

  const handleEdit = () => {
    const newSrc = prompt("Enter video URL:", src);
    if (newSrc !== null) {
      updateAttributes({ src: newSrc });
      setHasError(false);
      setIsLoading(false);
    }
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error("Video failed to load:", src, e);
    setHasError(true);
    setIsLoading(false);
  };

  const handleVideoLoad = () => {
    console.log("Video loaded successfully:", src);
    setHasError(false);
    setIsLoading(false);
  };

  // Reset states when src changes
  React.useEffect(() => {
    if (src) {
      setHasError(false);
      setIsLoading(false);
    }
  }, [src]);

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
        {/* Loading state */}
        {isLoading && (
          <div className="absolute inset-0 bg-admin-secondary border border-admin-border rounded-lg flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-admin-primary mx-auto mb-2"></div>
              <p className="text-admin-muted text-sm">Loading video...</p>
            </div>
          </div>
        )}

        {/* Error state */}
        {hasError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <Play className="h-12 w-12 text-red-400 mx-auto mb-2" />
            <p className="text-red-600 mb-2">Failed to load video</p>
            <p className="text-red-500 text-sm mb-3">URL: {src}</p>
            <button onClick={handleEdit} className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
              Update URL
            </button>
          </div>
        )}

        {/* Video element */}
        <video
          src={src}
          title={title || alt}
          controls={controls !== false} // Ensure controls are always shown
          autoPlay={autoplay}
          muted={muted}
          loop={loop}
          poster={poster}
          preload="metadata" // Add preload to help with loading
          className="w-full h-auto rounded-lg border border-admin-border shadow-sm max-w-full transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 bg-black"
          style={{
            maxHeight: "400px",
            minHeight: "200px", // Add minimum height so you can see something
            display: hasError ? "none" : "block", // Hide if error
          }}
          onError={handleVideoError}
          onLoadedMetadata={() => {
            console.log("Video metadata loaded:", src);
            setIsLoading(false);
            setHasError(false);
          }}
        >
          Your browser does not support the video tag.
        </video>

        {/* Overlay with controls - positioned at top-right corner, not covering video */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors shadow-lg"
              title="Edit video URL"
            >
              <Edit className="h-3 w-3" />
            </button>
            <button
              onClick={handleDelete}
              className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors shadow-lg"
              title="Delete video"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </NodeViewWrapper>
  );
};

export default VideoComponent;
