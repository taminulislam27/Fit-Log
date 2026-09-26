import Hero from "@/components/Hero";
import Library from "@/components/Library";
import { getWorkouts } from "@/lib/api";

export default async function HomePage() {
  const workouts = await getWorkouts();

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      <Hero />
      <Library workouts={workouts} />
    </div>
  );
}
