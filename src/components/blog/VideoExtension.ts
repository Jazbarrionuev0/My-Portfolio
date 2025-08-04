import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import VideoComponent from "./VideoComponent";

export interface VideoOptions {
  inline: boolean;
  allowBase64: boolean;
  HTMLAttributes: Record<string, any>;
}

export const VideoExtension = Node.create<VideoOptions>({
  name: "video",

  addOptions() {
    return {
      inline: false,
      allowBase64: false,
      HTMLAttributes: {},
    };
  },

  inline() {
    return this.options.inline;
  },

  group() {
    return this.options.inline ? "inline" : "block";
  },

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: null,
      },
      height: {
        default: null,
      },
      controls: {
        default: true,
      },
      autoplay: {
        default: false,
      },
      muted: {
        default: false,
      },
      loop: {
        default: false,
      },
      poster: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "video[src]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    // For public display, force autoplay, loop, muted, and no controls
    const publicAttributes = {
      ...HTMLAttributes,
      controls: false, // No controls on public site
      autoplay: true, // Autoplay on public site
      muted: true, // Muted for autoplay to work
      loop: true, // Loop continuously
      playsinline: true, // For mobile compatibility
      style: "max-width: 100%; height: auto; border-radius: 0.5rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); margin: 1rem 0;",
    };

    return ["video", mergeAttributes(this.options.HTMLAttributes, publicAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(VideoComponent);
  },
});
