"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";


export default function Navbar() {
  const pathname = usePathname();
  const { isDay } = useTheme();

  const color = isDay ? "black" : "white";

  const linkStyle = (active: boolean) => ({
    fontFamily: 'inherit',
    fontSize: '14px',
    color,
    letterSpacing: '0.05em',
    textDecoration: 'none',
    opacity: active ? 1 : 0.5,
  });

  return (
    <header className="p-4 flex items-center justify-between">
      <Link href="/">
        <Image
          src="/alien2.png"
          alt="Back to Home"
          width={80}
          height={80}
          className="w-8 h-8 object-contain"
          style={isDay ? { filter: 'invert(1)' } : undefined}
        />
      </Link>
      <nav className="flex gap-6 items-center">
        <Link href="/waitlist" style={linkStyle(pathname === '/waitlist')}>tattoo</Link>
        <Link href="/gallery" style={linkStyle(pathname === '/gallery' || pathname === '/my-stuff')}>my $tuff</Link>
      </nav>
    </header>
  );
}
