"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ImageLightboxProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  triggerLabel: string;
  children: ReactNode;
};

export default function ImageLightbox({
  src,
  alt,
  width,
  height,
  triggerLabel,
  children,
}: ImageLightboxProps) {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        className="construction-image-link"
        type="button"
        aria-label={triggerLabel}
        data-lightbox-src={src}
        onClick={() => setOpen(true)}
      >
        {children}
        <span className="image-zoom-mark" aria-hidden="true">＋</span>
      </button>

      {open && createPortal(
        <div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <button
            ref={closeButtonRef}
            className="image-lightbox-close"
            type="button"
            aria-label="Закрыть увеличенное изображение"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
          <figure className="image-lightbox-content">
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              unoptimized
              sizes="100vw"
            />
            <figcaption>{alt}</figcaption>
          </figure>
        </div>,
        document.body,
      )}
    </>
  );
}
