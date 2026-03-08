import Image from "next/image";
import Link from "next/link";
import { galleryItems } from "@/lib/gallery";

const fmt = (n?: number) => (typeof n === "number" ? `$${n.toLocaleString()}` : "");

export default function ListingPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = galleryItems.find((x) => x.slug === params.slug);

  if (!item) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold">Not found</p>
          <Link className="mt-4 inline-block text-zinc-400 underline" href="/gallery">
            Back to gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="flex gap-4 items-center">
          <Link href="/" className="text-sm text-zinc-400 hover:text-white">← Home</Link>
          <Link href="/gallery" className="text-sm text-zinc-400 hover:text-white">← Back to gallery</Link>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          {/* Images */}
          <div className="space-y-6">
            {item.images.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-zinc-950"
              >
                <Image
                  src={src}
                  alt={`${item.title} ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>

          {/* Info */}
          <aside className="lg:sticky lg:top-16 h-fit">
            <h1 className="text-3xl font-semibold tracking-tight">{item.title}</h1>
            {item.price ? (
              <p className="mt-3 text-2xl font-semibold">{fmt(item.price)}</p>
            ) : item.priceMin && item.priceMax ? (
              <p className="mt-3 text-2xl font-semibold">{`${fmt(item.priceMin)}–${fmt(item.priceMax)}`}</p>
            ) : item.priceMin ? (
              <p className="mt-3 text-2xl font-semibold">{`From ${fmt(item.priceMin)}`}</p>
            ) : (
              <p className="mt-3 text-2xl font-semibold">Price on request</p>
            )}

            {item.description && (
              <p className="mt-6 text-zinc-300 leading-7">{item.description}</p>
            )}

            <div className="mt-8 space-y-3">
              <button className="w-full bg-white text-black px-6 py-3 font-medium hover:bg-zinc-200 transition">
                Purchase
              </button>
              <button className="w-full border border-white/15 px-6 py-3 font-medium hover:bg-white/5 transition">
                Inquire
              </button>
            </div>

            <p className="mt-6 text-xs text-zinc-500">
              Taxes/shipping calculated at checkout. Limited availability.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}