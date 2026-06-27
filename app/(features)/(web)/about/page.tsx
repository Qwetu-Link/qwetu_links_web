import AboutCta from "@/features/public/about/AboutCta";
import AboutHero from "@/features/public/about/AboutHero";
import AboutStats from "@/features/public/about/AboutStats";
import AboutStory from "@/features/public/about/AboutStory";
import AboutValues from "@/features/public/about/AboutValues";

export default function AboutPage() {
  return (
    <main className="bg-white">
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutStats />
      <AboutCta />
    </main>
  );
}
