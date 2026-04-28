"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type Slide =
  | { type: "image"; src: string; alt: string; duration?: number; kenBurns?: boolean | string }
  | { type: "video"; src: string; alt: string; duration?: number; kenBurns?: boolean | string };

const heroSlides: Slide[] = [
  { type: "video", src: "/images/cover_photo/will_blocking_video.mp4", alt: "Will Hernandez blocking", duration: 4000 },
  { type: "video", src: "/images/cover_photo/mijos_baseball_video.mp4", alt: "Mijos baseball" },
  { type: "video", src: "/images/cover_photo/ct_boys_video_2.mp4", alt: "Chicos Tóxicos" },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const slide = heroSlides[current];
    const duration = slide.duration || (slide.type === "video" ? 5000 : 6000);

    if (slide.type === "video" && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }

    const id = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, duration);

    return () => clearTimeout(id);
  }, [current]);

  return (
    <>
      {heroSlides.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ${i === current ? "opacity-100" : "opacity-0"}`}
        >
          {slide.type === "image" ? (
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              className={`${slide.kenBurns === "pulse" ? "object-contain p-12 sm:p-20" : "object-cover object-top"} ${
                i === current && slide.kenBurns === true ? "animate-kenburns" : 
                i === current && slide.kenBurns === "pulse" ? "animate-logo-pulse" : ""
              }`}
            />
          ) : (
            <video
              ref={i === current ? videoRef : undefined}
              src={slide.src}
              muted
              playsInline
              preload="auto"
              className="h-full w-full object-cover object-top"
            />
          )}
        </div>
      ))}
    </>
  );
}
