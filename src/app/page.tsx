import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactForm } from "@/components/ContactForm";

const SERVICES = [
  {
    title: "Websites",
    description: "Portfolios, marketing sites, and business websites that load fast and convert.",
  },
  {
    title: "SaaS applications",
    description: "Multi-tenant SaaS products, from first prototype to production-ready platform.",
  },
  {
    title: "Custom applications",
    description: "Bespoke web and internal applications built around how your business works.",
  },
  {
    title: "3D websites",
    description: "Immersive, interactive experiences built with Three.js for standout visuals.",
  },
  {
    title: "Automations",
    description: "Business process automations built with n8n to save your team hours every week.",
  },
  {
    title: "AI agent apps",
    description: "Applications powered by AI agents that take action, not just answer questions.",
  },
];

const PROCESS = [
  { step: "01", title: "Tell us about your project", description: "Fill out the form below with what you need." },
  { step: "02", title: "We review & reach out", description: "Our team reviews your request and replies within 48 hours." },
  { step: "03", title: "We build & ship", description: "From design to deployment, we build it with you." },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-slate-950">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.35),transparent_50%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.25),transparent_45%)]"
          />
          <div className="relative mx-auto max-w-6xl px-6 py-28 text-center sm:py-36">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
              CodeMeter
            </p>
            <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
              We build the software behind your next big idea.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
              Websites, SaaS applications, custom apps, immersive 3D experiences, business
              automations, and AI agent apps — designed and engineered end to end.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#contact"
                className="rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400"
              >
                Start your project
              </a>
              <a
                href="#services"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                See what we build
              </a>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto max-w-6xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              What we build
            </h2>
            <p className="mt-4 text-base text-slate-600">
              One team, six ways to bring your product to life.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-slate-200 p-6 shadow-sm transition hover:border-indigo-200 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-slate-900">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  About CodeMeter
                </h2>
                <p className="mt-6 text-base leading-relaxed text-slate-600">
                  CodeMeter is a software company that designs and builds websites, SaaS
                  applications, custom apps, and business automations. We combine solid
                  engineering with a strong design sense — including immersive 3D experiences
                  built with Three.js — to help companies launch products that look great and
                  work reliably.
                </p>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  Whether you already have a brand and design system or need us to create one
                  from scratch, we tailor the engagement to where you are today and take care of
                  the rest.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {PROCESS.map((item) => (
                  <div
                    key={item.step}
                    className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <span className="text-2xl font-bold text-indigo-500">{item.step}</span>
                    <div>
                      <h3 className="font-semibold text-slate-900">{item.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-3xl px-6 py-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Tell us about your project
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Answer a few questions and our team will get back to you within 48 hours.
            </p>
          </div>
          <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            <ContactForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
