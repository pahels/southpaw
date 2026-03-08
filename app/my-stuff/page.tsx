import Image from "next/image";
import Link from "next/link";

export default function MyStuff() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="p-4">
        <Link href="/">
          <Image
            src="/alien2.png"
            alt="Back to Home"
            width={80}
            height={80}
            className="w-8 h-8 object-contain"
          />
        </Link>
      </header>

      <main className="p-6">
        <h1 className="text-2xl font-bold">My Stuff</h1>
        <p className="mt-4">This is the My Stuff page. Click the tiny alien in the top-left to go back home.</p>
      </main>
    </div>
  );
}
