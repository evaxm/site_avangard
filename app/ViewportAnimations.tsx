"use client";

import { useEffect } from "react";

const animatedBlockSelector = "[data-animate-on-view]";

export default function ViewportAnimations() {
  useEffect(() => {
    const animatedBlocks = Array.from(
      document.querySelectorAll<HTMLElement>(animatedBlockSelector),
    );

    if (!animatedBlocks.length) return;

    if (!("IntersectionObserver" in window)) {
      animatedBlocks.forEach((block) => block.classList.add("is-in-view"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-in-view");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.18,
      },
    );

    animatedBlocks.forEach((block) => observer.observe(block));

    return () => observer.disconnect();
  }, []);

  return null;
}
