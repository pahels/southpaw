"use client";

import Navbar from "@/app/components/Navbar";
import { useTheme } from "@/app/components/ThemeProvider";

export default function MyStuff() {
  const { isDay } = useTheme();

  return (
    <div className={`min-h-screen ${isDay ? 'bg-white text-black' : 'bg-black text-white'}`}>
      <Navbar />

      <main className="p-6">
        <h1 className="text-2xl font-bold">My Stuff</h1>
        <p className="mt-4">This is the My Stuff page. Click the tiny alien in the top-left to go back home.</p>
      </main>
    </div>
  );
}
