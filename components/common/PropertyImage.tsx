"use client";

import Image from "next/image";

interface PropertyImageProps {
  src?: string | null;
  alt: string;
  sizes?: string;
  hover?: boolean;
  priority?: boolean;
  className?: string;
  wrapContainer?: boolean;
  containerClassName?: string;
}

const PLACEHOLDER = "/images/placeholder.svg";

export function PropertyImage({
  src,
  alt,
  sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  hover = false,
  priority = false,
  className = "",
  wrapContainer = false,
  containerClassName = "",
}: PropertyImageProps) {
  const resolvedSrc = src && src.trim() !== "" ? src : PLACEHOLDER;

  const img = (
    <Image
      src={resolvedSrc}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized
      className={[
        "object-cover",
        hover ? "transition duration-500 hover:scale-105" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );

  if (wrapContainer) {
    return (
      <div className={`relative overflow-hidden ${containerClassName}`}>
        {img}
      </div>
    );
  }

  return img;
}