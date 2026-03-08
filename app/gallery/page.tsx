// app/gallery/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { galleryItems } from "@/lib/gallery";

const fmt = (n: number) => `$${n.toLocaleString()}`;

function displayPrice(item: {
  price?: number;
  priceMin?: number;
  priceMax?: number;
}) {
  if (item.priceMin != null && item.priceMax != null) {
    return `${fmt(item.priceMin)}–${fmt(item.priceMax)}`;
  }
  if (item.price != null) {
    return fmt(item.price);
  }
  return ""; // or "Price on request"
}

/**
 * Small utility to assign varied widths to items for an editorial look.
 * You can tune the percentages here.
 */
function widthClassFor(index: number) {
  const choices = ["w-[70%]", "w-[85%]", "w-[60%]"];
  return choices[index % choices.length];
}

/**
 * Deterministic vertical offset so items don't all start in the exact same row,
 * but keep it stable across renders.
 */
function initialYOffsetFor(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  // map hash -> 0..600 px
  return (h % 600) - 100;
}

export default function GalleryPage() {
  const [dayMode, setDayMode] = useState(false);
  // scrollY used for parallax drift
  const [scrollY, setScrollY] = useState(0);
  const [isMd, setIsMd] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsMd(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMd(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    setScrollY(window.scrollY);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className={`${dayMode ? "bg-white text-black" : "bg-black text-white"} min-h-screen px-8 lg:px-16 py-20 relative`}>
      {/* Day/nite toggle */}
      <button
        aria-pressed={dayMode}
        aria-label={dayMode ? "Switch to night mode" : "Switch to day mode"}
        onClick={() => setDayMode((s) => !s)}
        className="fixed top-4 right-4 z-20 inline-flex items-center justify-center cursor-pointer"
        style={{ background: 'none', border: 'none', color: dayMode ? '#000' : '#fff', padding: 0, fontSize: '14px', letterSpacing: '0.05em' }}
      >
        {dayMode ? 'nite' : 'day'}
      </button>
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <h1 className="text-5xl font-serif leading-tight tracking-tight mb-4 font-ibm-mono">
            My $tuff
          </h1>
          <h2 className="text-sm font-serif leading-tight tracking-tight mb-4 font-ibm-mono">
            Message for inquiry/purchase: @p4hel, pahel.srivastava@gmail.com
          </h2>
          <div className="mb-6">
            <Link href="/" className={`text-sm mr-4 ${dayMode ? "text-zinc-500 hover:text-black" : "text-zinc-400 hover:text-white"}`}>← Home</Link>
            <Link href="/gallery" className={`text-sm ${dayMode ? "text-zinc-500 hover:text-black" : "text-zinc-400 hover:text-white"}`}>Gallery</Link>
          </div>
        </header>

        <div className="relative">
          {/* Use CSS grid so items can span all columns when needed (hero/full-width for multiplier>=3) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-12">
            {galleryItems.map((item, i) => {
              const index = i;
              const y0 = initialYOffsetFor(item.slug);
              const speed = 0.05 + (index % 5) * 0.015;
              const manualYOffset = (item as any).yOffset ?? 0;
              // Only apply parallax on md+ screens; on mobile keep translateY=0 to avoid overlap
              const translateY = isMd ? Math.round((scrollY * speed + y0 + manualYOffset) * 0.6) : 0;
              const isLighter = item.cover?.includes("lighter_cases_1.png");
              const baseWidthClass = widthClassFor(index);
              const multiplier = (item as any).sizeMultiplier ?? 1;
              const fullWidth = multiplier >= 3;
              // allow fractional multipliers: anything >=2 and <3 uses two-column layout
              const twoCol = multiplier >= 2 && multiplier < 3;
              const colSpanClass = fullWidth
                ? "col-span-1 md:col-span-3"
                : twoCol
                ? "col-span-1 md:col-span-2"
                : "col-span-1";
              // Drive visible size via inline maxWidth so fractional multipliers work
              const baseMaxWidth = 400; // px baseline per grid cell
              const itemMaxWidth = Math.round(baseMaxWidth * multiplier);
              const finalWidthClass = isLighter ? "w-[95%]" : "w-full";
              const priceText = displayPrice(item);
              const gridCol = isMd && item.gridColumn ? item.gridColumn : undefined;

              return (
                <div
                  key={item.slug}
                  className={`${colSpanClass}`}
                  style={gridCol ? { gridColumn: gridCol } : undefined}
                >
                  <Link
                    href={`/gallery/${item.slug}`}
                    className="group block break-inside-avoid focus:outline-none"
                    aria-label={`${item.title}${priceText ? ` — ${priceText}` : ""}`}
                  >
                    <div
                      style={{ transform: `translateY(${translateY}px)`, maxWidth: `${itemMaxWidth}px` }}
                      className={`${finalWidthClass} mx-auto transition-transform duration-700 will-change-transform`}
                    >
                      <div className="overflow-visible">
                        <Image
                          src={item.cover}
                          alt={item.title}
                          width={Math.round((isLighter ? 2800 : 1400) * multiplier)}
                          height={Math.round((isLighter ? 2000 : 1000) * multiplier)}
                          style={undefined}
                          className="w-full h-auto transition-transform duration-500 group-hover:-translate-y-3 group-focus:-translate-y-3"
                          priority={false}
                        />
                      </div>

                      <div className="mt-4">
                        <h2 className={`${fullWidth ? "text-3xl" : "text-xl"} font-medium font-ibm-mono`}>{item.title}</h2>
                        {priceText && (
                          <p className={`mt-1 font-ibm-mono ${dayMode ? "text-zinc-500" : "text-zinc-400"}`}>{priceText}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}