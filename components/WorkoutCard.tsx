import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/lib/types";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-card border border-line bg-panel transition hover:border-lime/40"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-panel-2">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-pill bg-lime px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-black"
            >
              {tag}
            </span>
          ))}
        </div>
        <div>
          <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white">
            {workout.name}
          </h3>
          <p className="mt-0.5 text-sm text-muted">{workout.equipment}</p>
        </div>
        <div className="mt-auto flex items-center gap-4 border-t border-line pt-3 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-lime" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1.5">
            <Flame className="h-4 w-4 text-lime" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="h-4 w-4 text-lime" />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
