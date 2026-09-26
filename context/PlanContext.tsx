"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Workout } from "@/lib/types";

export const PLAN_CAP = 5;

const PLAN_KEY = "fitlog:plan";
const SAVED_KEY = "fitlog:saved";
const DONE_KEY = "fitlog:done";

interface PlanContextValue {
  plan: Workout[];
  saved: Workout[];
  doneIds: number[];
  loaded: boolean;
  isInPlan: (id: number) => boolean;
  isInSaved: (id: number) => boolean;
  isDone: (id: number) => boolean;
  addToPlan: (workout: Workout) => boolean;
  addToSaved: (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markDone: (id: number) => void;
}

const PlanContext = createContext<PlanContextValue | undefined>(undefined);

function readList(key: string): Workout[] {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Workout[]) : [];
  } catch {
    return [];
  }
}

function readIds(key: string): number[] {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
}

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setPlan(readList(PLAN_KEY));
    setSaved(readList(SAVED_KEY));
    setDoneIds(readIds(DONE_KEY));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan, loaded]);

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, loaded]);

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(DONE_KEY, JSON.stringify(doneIds));
  }, [doneIds, loaded]);

  const isInPlan = useCallback(
    (id: number) => plan.some((w) => w.id === id),
    [plan]
  );
  const isInSaved = useCallback(
    (id: number) => saved.some((w) => w.id === id),
    [saved]
  );
  const isDone = useCallback(
    (id: number) => doneIds.includes(id),
    [doneIds]
  );

  const addToPlan = useCallback(
    (workout: Workout) => {
      if (plan.some((w) => w.id === workout.id)) return false;
      if (plan.length >= PLAN_CAP) return false;
      setPlan((prev) =>
        prev.some((w) => w.id === workout.id) ? prev : [...prev, workout]
      );
      return true;
    },
    [plan]
  );

  const addToSaved = useCallback(
    (workout: Workout) => {
      if (saved.some((w) => w.id === workout.id)) return false;
      setSaved((prev) =>
        prev.some((w) => w.id === workout.id) ? prev : [...prev, workout]
      );
      return true;
    },
    [saved]
  );

  const removeFromPlan = useCallback((id: number) => {
    setPlan((prev) => prev.filter((w) => w.id !== id));
    setDoneIds((prev) => prev.filter((d) => d !== id));
  }, []);

  const removeFromSaved = useCallback((id: number) => {
    setSaved((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const markDone = useCallback((id: number) => {
    setDoneIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const value = useMemo(
    () => ({
      plan,
      saved,
      doneIds,
      loaded,
      isInPlan,
      isInSaved,
      isDone,
      addToPlan,
      addToSaved,
      removeFromPlan,
      removeFromSaved,
      markDone,
    }),
    [
      plan,
      saved,
      doneIds,
      loaded,
      isInPlan,
      isInSaved,
      isDone,
      addToPlan,
      addToSaved,
      removeFromPlan,
      removeFromSaved,
      markDone,
    ]
  );

  return (
    <PlanContext.Provider value={value}>{children}</PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within a PlanProvider");
  return ctx;
}