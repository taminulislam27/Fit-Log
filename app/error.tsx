"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime">
        Something slipped
      </p>
      <h1 className="font-display text-2xl font-bold uppercase text-white">
        We couldn&apos;t load that
      </h1>
      <p className="max-w-sm text-sm text-muted">
        {error.message || "An unexpected error occurred. Try again."}
      </p>
      <button
        onClick={() => reset()}
        className="mt-2 rounded-pill bg-lime px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-lime/90"
      >
        Try again
      </button>
    </div>
  );
}
