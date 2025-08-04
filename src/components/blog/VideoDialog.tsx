"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

interface VideoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (url: string, options?: { controls?: boolean; autoplay?: boolean; muted?: boolean; loop?: boolean }) => void;
}

export default function VideoDialog({ isOpen, onClose, onConfirm }: VideoDialogProps) {
  const [url, setUrl] = useState("");
  const [controls, setControls] = useState(true);
  const [autoplay, setAutoplay] = useState(false);
  const [muted, setMuted] = useState(false);
  const [loop, setLoop] = useState(false);

  const handleConfirm = () => {
    if (url.trim()) {
      onConfirm(url.trim(), { controls, autoplay, muted, loop });
      handleClose();
    }
  };

  const handleClose = () => {
    setUrl("");
    setControls(true);
    setAutoplay(false);
    setMuted(false);
    setLoop(false);
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleConfirm();
    } else if (e.key === "Escape") {
      handleClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Insert Video</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="video-url">Video URL</Label>
            <Input
              id="video-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="https://example.com/video.mp4"
              autoFocus
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="controls" checked={controls} onChange={(e) => setControls(e.target.checked)} className="h-4 w-4" />
              <Label htmlFor="controls" className="text-sm">
                Show controls
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="autoplay" checked={autoplay} onChange={(e) => setAutoplay(e.target.checked)} className="h-4 w-4" />
              <Label htmlFor="autoplay" className="text-sm">
                Autoplay
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="muted" checked={muted} onChange={(e) => setMuted(e.target.checked)} className="h-4 w-4" />
              <Label htmlFor="muted" className="text-sm">
                Muted
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="loop" checked={loop} onChange={(e) => setLoop(e.target.checked)} className="h-4 w-4" />
              <Label htmlFor="loop" className="text-sm">
                Loop
              </Label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!url.trim()}>
            Insert Video
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
