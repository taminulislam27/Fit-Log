"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, Check, X } from "lucide-react";
import { Workout } from "@/lib/types";

export default function PlanItemCard({
  workout,
  variant,
  done,
  onMarkDone,
  onRemove,
}: {
  workout: Workout;
  variant: "plan" | "saved";
  done?: boolean;
  onMarkDone?: () => void;
  onRemove: () => void;
}) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-card border border-line bg-panel p-4 sm:flex-row sm:items-center ${
        done ? "opacity-60" : ""
      }`}
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-card bg-panel-2">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-display text-base font-bold uppercase tracking-wide text-white">
          {workout.name}
        </h3>
        <p className="text-sm text-muted">{workout.equipment}</p>
        <div className="mt-1.5 flex items-center gap-3 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-lime" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame className="h-3.5 w-3.5 text-lime" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-lime" />
            {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 self-stretch sm:self-auto">
        <Link
          href={`/workout/${workout.id}`}
          className="flex flex-1 items-center justify-center rounded-pill border border-line px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition hover:border-muted-2 sm:flex-none"
        >
          View Details
        </Link>
        {variant === "plan" && (
          <button
            onClick={onMarkDone}
            disabled={done}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-pill bg-lime px-4 py-2 text-xs font-bold uppercase tracking-wide text-black transition hover:bg-lime/90 disabled:cursor-not-allowed disabled:bg-lime/30 disabled:text-black/50 sm:flex-none"
          >
            <Check className="h-3.5 w-3.5" />
            {done ? "Done" : "Mark as Done"}
          </button>
        )}
        <button
          onClick={onRemove}
          aria-label={`Remove ${workout.name}`}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-pill text-muted-2 transition hover:bg-panel-2 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
