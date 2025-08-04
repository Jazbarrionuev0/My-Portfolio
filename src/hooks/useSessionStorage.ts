import { useEffect, useState } from "react";

export function useSessionStorage(key: string, initialValue: any = null) {
  // State to store our value
  const [storedValue, setStoredValue] = useState(initialValue);

  // Return a wrapped version of useState's setter function that persists the new value to sessionStorage
  const setValue = (value: any) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to session storage
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      // Get from session storage by key
      if (typeof window !== "undefined") {
        const item = window.sessionStorage.getItem(key);
        // Parse stored json or if none return initialValue
        setStoredValue(item ? JSON.parse(item) : initialValue);
      }
    } catch (error) {
      // If error also return initialValue
      console.error(error);
      setStoredValue(initialValue);
    }
  }, [key, initialValue]);

  return [storedValue, setValue];
}

export function hasViewedPost(slug: string): boolean {
  if (typeof window === "undefined") return false;

  try {
    return window.sessionStorage.getItem(`blog_viewed_${slug}`) === "true";
  } catch (error) {
    console.error("Error checking session storage:", error);
    return false;
  }
}

export function markPostAsViewed(slug: string): void {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.setItem(`blog_viewed_${slug}`, "true");
  } catch (error) {
    console.error("Error setting session storage:", error);
  }
}
