"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import { useTheme } from "@/app/components/ThemeProvider";

export default function Waitlist() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus('success');
    } else {
      const data = await res.json();
      setErrorMsg(data.error || 'Something went wrong.');
      setStatus('error');
    }
  };

  const { isDay } = useTheme();
  const inputClass = `w-full bg-transparent border px-3 py-2 text-sm outline-none ${isDay ? 'border-black text-black placeholder-gray-400 focus:border-gray-600' : 'border-white text-white placeholder-gray-600 focus:border-gray-400'}`;

  return (
    <div className={`min-h-screen flex flex-col ${isDay ? 'bg-white text-black' : 'bg-black text-white'}`}>
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {status === 'success' ? (
          <div className="text-center space-y-4">
            <p className="text-xl tracking-widest uppercase">you&apos;re on the list.</p>
            <p className="text-gray-400 text-sm">Looking forward to tattooing you! I will contact you when availability opens up.</p>
            <Link href="/" className="block mt-6 text-xs text-gray-500 underline underline-offset-4">back home</Link>
          </div>
        ) : (
          <div className="w-full max-w-sm space-y-8">
            <div className="space-y-1">
              <h1 className="text-xl tracking-widest uppercase">Tattoo Interest List</h1>
              <p className="text-gray-500 text-xs">Excited to get inked?</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="firstName"
                  placeholder="first name"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
                <input
                  name="lastName"
                  placeholder="last name"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
              <input
                name="email"
                type="email"
                placeholder="email"
                value={form.email}
                onChange={handleChange}
                required
                className={inputClass}
              />
              <input
                name="phone"
                type="tel"
                placeholder="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className={inputClass}
              />

              {status === 'error' && (
                <p className="text-red-400 text-xs">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className={`w-full border text-sm py-2 px-4 tracking-widest uppercase transition-colors disabled:opacity-50 ${isDay ? 'border-black text-black hover:bg-black hover:text-white' : 'border-white text-white hover:bg-white hover:text-black'}`}
              >
                {status === 'loading' ? 'submitting...' : 'join waitlist'}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
