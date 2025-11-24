import ContactHero from "@/components/sections/contact/ContactHero";
import ContactInfo from "@/components/sections/contact/ContactInfo";
import ContactForm from "@/components/sections/contact/ContactForm";
import ContactMap from "@/components/sections/contact/ContactMap";
import ContactSocial from "@/components/sections/contact/ContactSocial";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <ContactHero />
      <ContactInfo />
      <div className="bg-white dark:bg-slate-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactMap />
          </div>
        </div>
      </div>
      <ContactSocial />
    </main>
  );
}
