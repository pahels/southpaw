"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useTheme } from "./components/ThemeProvider";

const REPEAT = 12;

export default function Home() {
  const { isDay } = useTheme();

  useEffect(() => {
    const scrollToBottom = () => window.scrollTo({ top: document.documentElement.scrollHeight });
    scrollToBottom();
    if (document.readyState !== 'complete') {
      window.addEventListener('load', scrollToBottom, { once: true });
    }
  }, []);

  const bgClass = isDay ? "bg-white" : "bg-black";
  const showText = false;
  const invertAlien = isDay;
  const logoFilter = 'invert(0)';

  return (
    <div className={`${bgClass} min-h-screen flex flex-col items-center justify-center md:justify-start relative overflow-hidden`}>

      {/* Repeating SOUTHPAW stack behind the alien */}
      {showText && (
        <div className="absolute pointer-events-none select-none z-0 w-full" style={{ top: '-10%', bottom: '-10%' }}>
          <div className="flex flex-col items-center h-full justify-center">
            {Array.from({ length: REPEAT }).map((_, i) => (
              <Image
                key={i}
                src="/southpaw.png"
                alt=""
                width={1600}
                height={220}
                className="w-full h-auto shrink-0"
                style={{ filter: logoFilter }}
                aria-hidden
              />
            ))}
          </div>
        </div>
      )}

      {/* Alien on top */}
      <Link href="/waitlist" className="group block relative z-10 w-full md:w-[85vw] md:mt-0">
        {/* Mobile: two aliens — top normal, bottom flipped + color inverted */}
        <div className="flex flex-col md:hidden">
          <Image
            src="/alien2.png"
            alt="Enter Gallery"
            width={3600}
            height={3600}
            priority
            style={invertAlien ? { filter: 'invert(1) hue-rotate(180deg) saturate(1.05)' } : undefined}
            className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105 cursor-pointer"
          />
          <Image
            src="/alien2.png"
            alt=""
            width={3600}
            height={3600}
            style={invertAlien
              ? { transform: 'scaleY(-1)' }
              : { filter: 'invert(1) hue-rotate(180deg) saturate(1.05)', transform: 'scaleY(-1)' }}
            className="w-full h-auto object-contain cursor-pointer"
          />
        </div>
        {/* Desktop: single alien, full size, scrollable */}
        <div className="hidden md:block">
          <Image
            src="/alien2.png"
            alt="Enter Gallery"
            width={3600}
            height={3600}
            priority
            style={invertAlien ? { filter: 'invert(1) hue-rotate(180deg) saturate(1.05)' } : undefined}
            className="w-full h-auto object-contain object-top transition-transform duration-300 group-hover:scale-105 cursor-pointer"
          />
        </div>
      </Link>
    </div>
  );
}
