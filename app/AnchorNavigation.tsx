"use client";

import { useEffect } from "react";

function scrollToAnchor(hash: string) {
  const id = decodeURIComponent(hash.slice(1));
  const target = document.getElementById(id);

  if (!target) return;

  const header = document.querySelector<HTMLElement>(".site-header");
  const headerOffset = (header?.getBoundingClientRect().height ?? 0) + 12;
  const targetTop = window.scrollY + target.getBoundingClientRect().top;

  // A fragment can keep re-anchoring the document while the page layout changes.
  // Remove it before scrolling so the visitor can move freely after navigation.
  window.history.replaceState(
    window.history.state,
    "",
    `${window.location.pathname}${window.location.search}`,
  );
  window.scrollTo({ top: Math.max(0, targetTop - headerOffset), behavior: "auto" });
}

export default function AnchorNavigation() {
  useEffect(() => {
    const initialHash = window.location.hash;
    if (initialHash) {
      window.requestAnimationFrame(() => scrollToAnchor(initialHash));
    }

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      const hash = link?.getAttribute("href");

      if (!hash || hash === "#") return;
      if (!document.getElementById(decodeURIComponent(hash.slice(1)))) return;

      event.preventDefault();
      scrollToAnchor(hash);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
