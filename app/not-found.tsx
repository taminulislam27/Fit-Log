import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[65vh] max-w-7xl flex-col items-center justify-center gap-4 px-4 text-center">
      <Dumbbell className="h-9 w-9 text-lime" />
      <p className="font-display text-6xl font-bold text-white">404</p>
      <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
        Set not found
      </h1>
      <p className="max-w-sm text-sm text-muted">
        This page skipped leg day and never showed up. Head back to the
        library to find your next lift.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-pill bg-lime px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-lime/90"
      >
        Go to workouts
      </Link>
    </div>
  );
}
