'use client';
import { useEffect } from "react";

export function useHideZIndex100000() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      const hideTargets = () => {
        const elements = document.querySelectorAll("*");

        elements.forEach((el) => {
          const style = window.getComputedStyle(el);
          if (style.zIndex === "100000") {
            (el as HTMLElement).style.display = "none";
            console.log("Hidden element with z-index 100000:", el);
          }
        });
      };

      hideTargets();

      // Theo dõi các phần tử thêm sau render (VD: overlay)
      const observer = new MutationObserver(hideTargets);
      observer.observe(document.body, { childList: true, subtree: true });

      return () => observer.disconnect();
    }, 0); // Chạy sau toàn bộ effect khác

    return () => clearTimeout(timeout);
  }, []);
}
