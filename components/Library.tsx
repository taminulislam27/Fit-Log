"use client";

import { useMemo, useState } from "react";
import { SortKey, Workout } from "@/lib/types";
import SortDropdown from "@/components/SortDropdown";
import WorkoutCard from "@/components/WorkoutCard";

export default function Library({ workouts }: { workouts: Workout[] }) {
  const [sort, setSort] = useState<SortKey>("duration");

  const sorted = useMemo(() => {
    return [...workouts].sort((a, b) => b[sort] - a[sort]);
  }, [workouts, sort]);

  return (
    <section id="library" className="scroll-mt-20 py-14 sm:py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white">
            The Library
          </h2>
          <p className="mt-1 text-sm text-muted">
            Twelve lifts covering every major muscle group.
          </p>
        </div>
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  );
}
