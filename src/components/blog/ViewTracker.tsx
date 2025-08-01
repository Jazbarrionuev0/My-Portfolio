"use client";

import { useEffect, useState, useRef } from "react";
import { incrementBlogPostView } from "@/src/actions/blog";
import { hasViewedPost, markPostAsViewed } from "@/src/hooks/useSessionStorage";

interface ViewTrackerProps {
  slug: string;
  initialViewCount: number;
}

export default function ViewTracker({ slug, initialViewCount }: ViewTrackerProps) {
  const [viewCount, setViewCount] = useState(initialViewCount);
  const timeSpentRef = useRef(0);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    // Check if already viewed in this session
    if (hasViewedPost(slug)) {
      return;
    }

    let scrollTimer: NodeJS.Timeout;
    let timeTimer: NodeJS.Timeout;
    let hasScrolled = false;

    const trackView = async () => {
      try {
        // Mark as viewed in session storage
        markPostAsViewed(slug);

        // Increment view count on server
        const result = await incrementBlogPostView(slug);

        if (result.success && result.viewCount !== undefined) {
          setViewCount(result.viewCount);
        }
      } catch (error) {
        console.error("Failed to track view:", error);
      }
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollPosition / documentHeight) * 100;

      // Track as viewed if user scrolled more than 25% of the article
      if (scrollPercentage > 25) {
        hasScrolled = true;
      }
    };

    const updateTimeSpent = () => {
      timeSpentRef.current = Date.now() - startTimeRef.current;
    };

    // Set up scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Update time spent every second
    timeTimer = setInterval(updateTimeSpent, 1000);

    // Check conditions every 2 seconds
    const checkViewConditions = () => {
      const timeSpent = timeSpentRef.current;

      // Track view if user spent more than 5 seconds on page OR scrolled more than 25%
      if (timeSpent > 5000 || hasScrolled) {
        trackView();
        clearInterval(scrollTimer);
      }
    };

    scrollTimer = setInterval(checkViewConditions, 2000);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimer);
      clearInterval(timeTimer);
    };
  }, [slug]);

  return (
    <span className="flex items-center gap-1">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
      {viewCount} views
    </span>
  );
}
