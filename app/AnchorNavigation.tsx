"use client";

import { useEffect } from "react";

export function AnchorNavigation() {
  useEffect(() => {
    const releasePointerFocus = (event: MouseEvent) => {
      if (event.detail === 0 || !(event.target instanceof Element)) return;

      const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;

      link.blur();
    };

    document.addEventListener("click", releasePointerFocus);
    return () => document.removeEventListener("click", releasePointerFocus);
  }, []);

  return null;
}
