import { notFound } from "next/navigation";
import { programs } from "@/constants/programs";
import ProgramDetails from "@/components/sections/programs/ProgramDetails";
import ApplyCTA from "@/components/sections/ApplyCTA";

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  const program = programs.find((p) => p.id === id);

  if (!program) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <ProgramDetails program={program} />
      <ApplyCTA />
    </main>
  );
}
