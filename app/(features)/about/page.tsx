import AboutCta from "./_components/AboutCta";
import AboutHero from "./_components/AboutHero";
import AboutStats from "./_components/AboutStats";
import AboutStory from "./_components/AboutStory";
import AboutValues from "./_components/AboutValues";

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
