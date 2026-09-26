"use client";

import { CalendarPlus, Bookmark, BookmarkCheck, Check } from "lucide-react";
import { Workout } from "@/lib/types";
import { PLAN_CAP, usePlan } from "@/context/PlanContext";
import { useToast } from "@/context/ToastContext";

export default function DetailActions({ workout }: { workout: Workout }) {
  const { addToPlan, addToSaved, isInPlan, isInSaved, plan, loaded } =
    usePlan();
  const { showToast } = useToast();

  const inPlan = isInPlan(workout.id);
  const inSaved = isInSaved(workout.id);
  const planFull = plan.length >= PLAN_CAP;

  function handleAddToPlan() {
    if (inPlan) return;
    const added = addToPlan(workout);
    if (added) {
      showToast("Added to today's plan");
    } else {
      showToast(`Today's plan is full — cap of ${PLAN_CAP} lifts`);
    }
  }

  function handleSave() {
    if (inSaved) return;
    addToSaved(workout);
    showToast("Saved for later");
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        onClick={handleAddToPlan}
        disabled={!loaded || inPlan || planFull}
        className="flex items-center justify-center gap-2 rounded-pill bg-lime px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-lime/90 disabled:cursor-not-allowed disabled:bg-lime/30 disabled:text-black/50"
      >
        {inPlan ? (
          <Check className="h-4 w-4" />
        ) : (
          <CalendarPlus className="h-4 w-4" />
        )}
        {inPlan ? "In today's plan" : planFull ? "Plan is full" : "Add to today's plan"}
      </button>
      <button
        onClick={handleSave}
        disabled={!loaded || inSaved}
        className="flex items-center justify-center gap-2 rounded-pill border border-line bg-transparent px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:border-muted-2 disabled:cursor-not-allowed disabled:text-muted-2"
      >
        {inSaved ? (
          <BookmarkCheck className="h-4 w-4" />
        ) : (
          <Bookmark className="h-4 w-4" />
        )}
        {inSaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}
