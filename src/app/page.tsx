"use client";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactForm } from "@/components/ContactForm";
import { Scene } from "@/components/Scene";
import { Logo } from "@/components/Logo";

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
    description: "Business process automations built with n8n or Power Automate to save your team hours every week.",
  },
  {
    title: "AI agent apps",
    description: "Applications powered by AI agents that take action, not just answer questions.",
  },
];

const PROCESS = [
  { step: "01", title: "Tell me about your project", description: "Fill out the form below with what you need." },
  { step: "02", title: "I review & reach out", description: "I personally review your request and reply within 48 hours." },
  { step: "03", title: "I build & ship", description: "From design to deployment, I build it with you." },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">

        {/* Hero */}
        <section className="relative overflow-hidden bg-slate-950 py-20 sm:py-28">
          <Scene />
          {/* Creative radial gradients for ambient lighting */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(99,102,241,0.25),transparent_45%),radial-gradient(circle_at_85%_85%,rgba(236,72,153,0.15),transparent_40%),radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.2),transparent_40%)]"
          />

          <div className="relative mx-auto max-w-6xl px-6 text-center">

            {/* Hero Logo */}
            <div className="flex justify-center mb-6">
              <Logo size={72} className="drop-shadow-[0_0_15px_rgba(6,182,212,0.4)] dark:drop-shadow-[0_0_20px_rgba(6,182,212,0.65)] animate-pulse" />
            </div>

            {/* Status Badge */}
            <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold tracking-wider uppercase text-indigo-300">
                Available for New Projects
              </span>
            </div>

            <h1 className="mx-auto mt-2 max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl sm:leading-tight lg:text-7xl">
              I build the <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">software</span> behind your <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-indigo-400">next big idea.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-slate-300 sm:text-lg">
              Websites, SaaS applications, custom apps, immersive 3D experiences, business
              automations, and AI agent apps — designed and engineered end to end, by one
              developer.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#contact"
                className="group relative rounded-full bg-linear-to-r from-indigo-500 to-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:from-indigo-600 hover:to-violet-700 hover:shadow-indigo-500/40 hover:scale-105"
              >
                Start your project
              </a>
              <a
                href="#services"
                className="rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              >
                See what I build
              </a>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
          {/* Soft background light */}
          <div className="absolute left-1/2 top-1/2 -z-10 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-3xl" />

          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-indigo-500">Expertise</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              What I build
            </h2>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
              One developer, six ways to bring your product to life.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, index) => (
              <div
                key={service.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/40 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5 dark:border-slate-800/80 dark:bg-slate-950/40 dark:hover:border-indigo-500/30 backdrop-blur-md"
              >
                {/* Accent top gradient line */}
                <div className="absolute top-0 left-0 h-0.75 w-0 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 group-hover:w-full" />

                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-600">
                    0{index + 1}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500/30 group-hover:bg-indigo-500 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* About & Process */}
        <section id="about" className="relative overflow-hidden bg-slate-50/50 py-24 sm:py-32 dark:bg-slate-900/20">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="text-sm font-semibold uppercase tracking-widest text-indigo-500">Biography</span>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                  About Mina Bekheet
                </h2>
                <p className="mt-6 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                  I&apos;m Mina Bekheet, a solo developer who designs and builds websites, SaaS
                  applications, custom apps, and business automations. I combine solid
                  engineering with a strong design sense — including immersive 3D experiences
                  built with Three.js — to help you launch a product that looks great and works
                  reliably.
                </p>
                <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                  Whether you already have a brand and design system or need me to create one
                  from scratch, I tailor the engagement to where you are today and take care of
                  the rest.
                </p>
              </div>

              {/* Connected Process Flow */}
              <div className="relative flex flex-col gap-6">
                {/* Vertical connecting line */}
                <div className="absolute left-12 top-10 bottom-10 w-0.5 bg-slate-200 dark:bg-slate-800/80 hidden sm:block" />

                {PROCESS.map((item) => (
                  <div
                    key={item.step}
                    className="group relative flex gap-6 rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all duration-300 hover:border-indigo-500/40 hover:shadow-md dark:border-slate-850 dark:bg-slate-950/60"
                  >
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-base font-bold text-indigo-600 transition-transform duration-300 group-hover:scale-110 dark:bg-indigo-950/40 dark:text-indigo-400">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="relative mx-auto max-w-4xl px-6 py-24 sm:py-32">
          {/* Colorful back glow */}
          <div className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden pointer-events-none">
            <div className="h-100 w-150 rounded-full bg-linear-to-tr from-indigo-500/10 to-pink-500/5 blur-3xl opacity-60" />
          </div>

          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-indigo-500">Contact</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Tell us about your project
            </h2>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
              Answer a few questions and I&apos;ll get back to you within 48 hours.
            </p>
          </div>

          <div className="mt-12 rounded-3xl border border-slate-200/80 bg-white/60 p-6 shadow-xl backdrop-blur-md sm:p-10 dark:border-slate-800/80 dark:bg-slate-950/60">
            <ContactForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
