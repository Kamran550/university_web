import ELibraryHero from "@/components/sections/e-library/ELibraryHero";
import ELibraryLogos from "@/components/sections/e-library/ELibraryLogos";
import ApplyCTA from "@/components/sections/ApplyCTA";

export default function ELibraryPage() {
  return (
    <main className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <ELibraryHero />
      <ELibraryLogos />
      <ApplyCTA />
    </main>
  );
}

