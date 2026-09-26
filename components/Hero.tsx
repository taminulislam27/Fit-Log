import Image from "next/image";
import { Dumbbell } from "lucide-react";

export default function Hero() {
  return (
    <section className="overflow-hidden rounded-card border border-line bg-panel">
      <div className="grid grid-cols-1 items-center gap-8 px-6 py-10 sm:px-10 sm:py-14 md:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime">
            Workout Library
          </p>
          <h1 className="mt-3 max-w-md font-display text-4xl font-bold uppercase leading-[1.05] tracking-wide text-white sm:text-5xl">
            Train with intent. Log every set.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-7 inline-flex items-center gap-2 rounded-pill bg-lime px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-lime/90"
          >
            <Dumbbell className="h-4 w-4" />
            Browse Workouts
          </a>
        </div>
        <div className="relative mx-auto h-56 w-56 sm:h-72 sm:w-72">
          <Image
            src="/banner.png"
            alt="Anatomical illustration of a person training on a gym machine"
            fill
            sizes="288px"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
