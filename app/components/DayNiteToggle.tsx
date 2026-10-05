"use client";

import { useTheme } from "./ThemeProvider";

export default function DayNiteToggle() {
  const { isDay, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="fixed bottom-4 right-4 z-[9999]"
      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: '14px', color: isDay ? 'black' : 'white', letterSpacing: '0.05em' }}
    >
      {isDay ? 'nite' : 'day'}
    </button>
  );
}
