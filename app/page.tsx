"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const REPEAT = 12;
// mode 0: black bg, no text
// mode 1: white bg, black text visible
// mode 2: white bg, black text, inverted alien

export default function Home() {
  const [mode, setMode] = useState(0);
  const cycle = () => setMode((m) => (m + 1) % 3);

  const bgClass = mode === 0 ? "bg-black" : "bg-white";
  const showText = mode === 1;
  const invertAlien = mode !== 0; // invert on white backgrounds (modes 1 & 2), normal on black
  const logoFilter = 'invert(0)';
  const cursorFilter = mode === 0 ? 'invert(1)' : mode === 1 ? 'invert(0) sepia(1) saturate(10) hue-rotate(0deg)' : 'invert(0)'; // white on black, red on white+text, black on plain white

  return (
    <div className={`${bgClass} min-h-screen flex justify-center relative overflow-hidden`}>
      {/* Toggle button — no background, just the cursor image */}
      <button
        onClick={cycle}
        className="fixed top-4 right-4 z-[9999] inline-flex items-center justify-center"
        style={{ background: 'none', border: 'none', padding: 0 }}
      >
        <Image
          src="/cursor2.png"
          alt="cycle mode"
          width={56}
          height={56}
          style={{ filter: cursorFilter }}
        />
      </button>

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
      <Link href="/gallery" className="group block relative z-10">
        <div>
          <Image
            src="/alien2.png"
            alt="Enter Gallery"
            width={3600}
            height={3600}
            priority
            style={invertAlien ? { filter: 'invert(1) hue-rotate(180deg) saturate(1.05)' } : undefined}
            className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105 cursor-pointer"
          />
        </div>
      </Link>
    </div>
  );
}
