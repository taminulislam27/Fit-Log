import { Workout } from "@/lib/types";

export default function SpecsTable({ workout }: { workout: Workout }) {
  const rows: [string, string][] = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", String(workout.sets)],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", String(workout.rating)],
  ];

  return (
    <div className="overflow-hidden rounded-card border border-line">
      {rows.map(([label, value], i) => (
        <div
          key={label}
          className={`flex items-center justify-between px-4 py-3 text-sm ${
            i % 2 === 0 ? "bg-panel" : "bg-panel-2"
          }`}
        >
          <span className="font-medium uppercase tracking-wide text-muted">
            {label}
          </span>
          <span className="font-semibold text-white">{value}</span>
        </div>
      ))}
    </div>
  );
}
