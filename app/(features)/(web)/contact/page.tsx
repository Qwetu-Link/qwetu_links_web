import ContactCards from "@/features/public/contact/ContactCards";
import ContactForm from "@/features/forms/ContactForm";
import ContactHero from "@/features/public/contact/ContactHero";
import ContactSidebar from "@/features/public/contact/ContactSidebar";

export default function ContactPage() {
  return (
    <main className="bg-white">
      <ContactHero />
      <ContactCards />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr]">
          <ContactForm />
          <ContactSidebar />
        </div>
      </section>
    </main>
  );
}
