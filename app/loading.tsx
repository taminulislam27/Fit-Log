import { Dumbbell } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <Dumbbell className="h-8 w-8 animate-pulse text-lime" />
      <p className="text-sm font-medium uppercase tracking-widest text-muted">
        Loading workouts…
      </p>
    </div>
  );
}
