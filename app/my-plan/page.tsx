"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { useToast } from "@/context/ToastContext";
import { SortKey } from "@/lib/types";
import SortDropdown from "@/components/SortDropdown";
import PlanItemCard from "@/components/PlanItemCard";

type Tab = "today" | "saved";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    doneIds,
    loaded,
    removeFromPlan,
    removeFromSaved,
    markDone,
  } = usePlan();
  const { showToast } = useToast();
  const [tab, setTab] = useState<Tab>("today");
  const [sort, setSort] = useState<SortKey>("duration");

  const minutes = useMemo(
    () => plan.reduce((sum, w) => sum + w.duration, 0),
    [plan]
  );
  const calories = useMemo(
    () => plan.reduce((sum, w) => sum + w.caloriesBurned, 0),
    [plan]
  );

  const activeList = tab === "today" ? plan : saved;
  const sortedList = useMemo(
    () => [...activeList].sort((a, b) => b[sort] - a[sort]),
    [activeList, sort]
  );

  function handleMarkDone(id: number, name: string) {
    markDone(id);
    showToast(`${name} marked as done`);
  }

  function handleRemove(variant: Tab, id: number, name: string) {
    if (variant === "today") {
      removeFromPlan(id);
    } else {
      removeFromSaved(id);
    }
    showToast(`Removed ${name}`);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-1 text-sm text-muted sm:text-base">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-6 grid grid-cols-3 divide-x divide-line rounded-card border border-line bg-panel">
        <Metric label="Exercises" value={plan.length} />
        <Metric label="Minutes" value={minutes} />
        <Metric label="Calories" value={calories} />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex w-fit gap-1 rounded-card border border-line bg-panel p-1">
          <TabButton active={tab === "today"} onClick={() => setTab("today")}>
            Today&apos;s Plan
          </TabButton>
          <TabButton active={tab === "saved"} onClick={() => setTab("saved")}>
            Saved
          </TabButton>
        </div>
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      <div className="mt-6">
        {!loaded ? (
          <p className="py-16 text-center text-sm font-medium uppercase tracking-widest text-muted">
            Loading workouts…
          </p>
        ) : sortedList.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-card border border-dashed border-line py-20 text-center">
            <Dumbbell className="h-7 w-7 text-muted-2" />
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white">
              Nothing Here Yet
            </h2>
            <p className="max-w-xs text-sm text-muted">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-2 rounded-pill bg-lime px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-lime/90"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {sortedList.map((workout) => (
              <PlanItemCard
                key={workout.id}
                workout={workout}
                variant={tab === "today" ? "plan" : "saved"}
                done={doneIds.includes(workout.id)}
                onMarkDone={() => handleMarkDone(workout.id, workout.name)}
                onRemove={() => handleRemove(tab, workout.id, workout.name)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="px-5 py-4 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-wide text-muted">
        {label}
      </p>
      <p className="mt-1 font-display text-2xl font-bold text-white">
        {value}
      </p>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-card px-4 py-1.5 text-sm font-semibold transition ${
        active ? "bg-panel-2 text-white" : "text-muted hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
