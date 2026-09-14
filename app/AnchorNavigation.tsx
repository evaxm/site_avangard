"use client";

import { useEffect } from "react";

export function AnchorNavigation() {
  useEffect(() => {
    const releasePointerFocus = (event: MouseEvent) => {
      if (event.detail === 0 || !(event.target instanceof Element)) return;

      const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;

      const target = document.getElementById(
        decodeURIComponent(link.hash.slice(1)),
      );
      if (!target) return;

      requestAnimationFrame(() => {
        target.tabIndex = -1;
        target.focus({ preventScroll: true });
      });
    };

    document.addEventListener("click", releasePointerFocus);
    return () => document.removeEventListener("click", releasePointerFocus);
  }, []);

  return null;
}
