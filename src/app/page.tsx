"use client";

import { useState, useEffect, useRef } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactForm } from "@/components/ContactForm";
import { Scene } from "@/components/Scene";
import { Logo } from "@/components/Logo";
import CallingNeuralNetwork from "@/components/CallingNeuralNetwork";

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const lastScrollTime = useRef(0);

  // Synchronized scroll lock hook
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLocked]);

  // Touch and Wheel listeners
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      const direction = e.deltaY > 0 ? 1 : -1;

      const activeCard = containerRef.current?.children[activeIndex] as HTMLDivElement;
      if (activeCard) {
        const innerContainer = activeCard.firstElementChild as HTMLDivElement;
        if (innerContainer) {
          const { scrollTop, scrollHeight, clientHeight } = innerContainer;
          const isAtBottom = scrollTop + clientHeight >= scrollHeight - 3;
          const isAtTop = scrollTop <= 3;

          if (direction === 1) { // scrolling down
            if (!isAtBottom && isLocked) {
              return; // scroll inside card
            }
          } else { // scrolling up
            if (!isAtTop && isLocked) {
              return; // scroll inside card
            }
          }
        }
      }

      if (now - lastScrollTime.current < 800) {
        if (isLocked) e.preventDefault();
        return;
      }

      if (isLocked) {
        e.preventDefault();
        if (direction === 1) {
          if (activeIndex < 2) {
            setActiveIndex((prev) => prev + 1);
            lastScrollTime.current = now;
          } else {
            setIsLocked(false);
          }
        } else {
          if (activeIndex > 0) {
            setActiveIndex((prev) => prev - 1);
            lastScrollTime.current = now;
          }
        }
      } else {
        if (window.scrollY <= 5 && direction === -1) {
          setIsLocked(true);
          setActiveIndex(2);

          // Scroll About card inner container to the bottom
          setTimeout(() => {
            const aboutCard = containerRef.current?.children[2] as HTMLDivElement;
            const inner = aboutCard?.firstElementChild as HTMLDivElement;
            if (inner) {
              inner.scrollTop = inner.scrollHeight - inner.clientHeight;
            }
          }, 50);

          lastScrollTime.current = now;
          e.preventDefault();
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY.current) return;
      const touchEndY = e.touches[0].clientY;
      const diff = touchStartY.current - touchEndY; // positive = scroll down

      const now = Date.now();
      const direction = diff > 0 ? 1 : -1;

      const activeCard = containerRef.current?.children[activeIndex] as HTMLDivElement;
      if (activeCard) {
        const innerContainer = activeCard.firstElementChild as HTMLDivElement;
        if (innerContainer) {
          const { scrollTop, scrollHeight, clientHeight } = innerContainer;
          const isAtBottom = scrollTop + clientHeight >= scrollHeight - 8;
          const isAtTop = scrollTop <= 8;

          if (direction === 1) { // swiping up / scrolling down
            if (!isAtBottom && isLocked) {
              return; // scroll inside card
            }
          } else { // swiping down / scrolling up
            if (!isAtTop && isLocked) {
              return; // scroll inside card
            }
          }
        }
      }

      if (Math.abs(diff) > 40) {
        if (now - lastScrollTime.current < 800) {
          if (isLocked) e.preventDefault();
          return;
        }

        if (isLocked) {
          e.preventDefault();
          if (direction === 1) {
            if (activeIndex < 2) {
              setActiveIndex((prev) => prev + 1);
              lastScrollTime.current = now;
            } else {
              setIsLocked(false);
            }
          } else {
            if (activeIndex > 0) {
              setActiveIndex((prev) => prev - 1);
              lastScrollTime.current = now;
            }
          }
        } else {
          if (window.scrollY <= 5 && direction === -1) {
            setIsLocked(true);
            setActiveIndex(2);

            setTimeout(() => {
              const aboutCard = containerRef.current?.children[2] as HTMLDivElement;
              const inner = aboutCard?.firstElementChild as HTMLDivElement;
              if (inner) {
                inner.scrollTop = inner.scrollHeight - inner.clientHeight;
              }
            }, 50);

            lastScrollTime.current = now;
            e.preventDefault();
          }
        }
        touchStartY.current = 0;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [activeIndex, isLocked]);

  const handleNavigate = (section: "hero" | "services" | "about" | "contact") => {
    if (section === "hero") {
      setActiveIndex(0);
      setIsLocked(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (section === "services") {
      setActiveIndex(1);
      setIsLocked(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (section === "about") {
      setActiveIndex(2);
      setIsLocked(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (section === "contact") {
      setIsLocked(false);
      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    }
  };

  const getSectionClass = (index: number) => {
    const base = "absolute inset-0 w-full h-full rounded-[30px] shadow-md transition-all duration-700 ease-in-out overflow-hidden border border-slate-200/50 dark:border-slate-800/50";
    if (index === activeIndex) {
      return `${base} translate-x-0 opacity-100 scale-100 z-20 pointer-events-auto`;
    } else if (index < activeIndex) {
      return `${base} -translate-x-[110%] opacity-0 scale-95 z-10 pointer-events-none`;
    } else {
      return `${base} translate-x-[110%] opacity-0 scale-95 z-10 pointer-events-none`;
    }
  };

  return (
    <>
      <SiteHeader onNavigate={handleNavigate} />
      <CallingNeuralNetwork />

      <main className="flex-1 flex flex-col justify-start">
        {/* Carousel Container */}
        <div className="mx-auto w-[80%] sm:w-[85%] max-w-8xl px-4 py-6 md:py-8">
          <div ref={containerRef} className="relative w-full h-[85vh] sm:h-[80vh] md:h-[75vh] max-h-212.5">

            {/* Slide 0: Hero */}
            <div className={getSectionClass(0)}>
              <div className="relative h-full overflow-y-auto px-6 py-16 sm:py-20 bg-slate-950 text-white flex flex-col justify-center">
                <Scene />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(99,102,241,0.25),transparent_45%),radial-gradient(circle_at_85%_85%,rgba(236,72,153,0.15),transparent_40%),radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.2),transparent_40%)]"
                />

                <div className="relative mx-auto w-full max-w-4xl text-center z-30">
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
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigate("contact");
                      }}
                      className="group relative rounded-full bg-linear-to-r from-indigo-500 to-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:from-indigo-600 hover:to-violet-700 hover:shadow-indigo-500/40 hover:scale-105"
                    >
                      Start your project
                    </a>
                    <a
                      href="#services"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigate("services");
                      }}
                      className="rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                    >
                      See what I build
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 1: Services */}
            <div className={getSectionClass(1)}>
              <div className="relative h-full overflow-y-auto px-6 py-12 sm:py-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
                {/* Soft background light */}
                <div className="absolute left-1/2 top-1/2 -z-10 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-tr from-indigo-500/8 to-violet-500/8 blur-3xl dark:from-indigo-500/5 dark:to-violet-500/5" />

                <div className="mx-auto max-w-2xl text-center">
                  <span className="text-sm font-semibold uppercase tracking-widest text-indigo-500">Expertise</span>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                    What I build
                  </h2>
                  <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
                    One developer, six ways to bring your product to life.
                  </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                  {SERVICES.map((service, index) => (
                    <div
                      key={service.title}
                      className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5 dark:border-slate-800/80 dark:bg-slate-950/40 dark:hover:border-indigo-500/30 backdrop-blur-md"
                    >
                      {/* Accent top gradient line */}
                      <div className="absolute top-0 left-0 h-0.75 w-0 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 group-hover:w-full" />

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-450 dark:text-slate-600">
                          0{index + 1}
                        </span>
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500/30 group-hover:bg-indigo-500 transition-colors" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-450">
                        {service.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Slide 2: About */}
            <div className={getSectionClass(2)}>
              <div className="relative h-full overflow-y-auto px-6 py-12 sm:py-16 bg-slate-100/60 dark:bg-slate-900/40 backdrop-blur-xl">
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="mx-auto max-w-5xl">
                  <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
                    <div>
                      <span className="text-sm font-semibold uppercase tracking-widest text-indigo-500">Biography</span>
                      <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                        About Mina Bekheet
                      </h2>
                      <p className="mt-6 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                        I&apos;m Mina Nady Bekheet, a solo developer who designs and builds websites, SaaS
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
                          className="group relative flex gap-6 rounded-2xl border border-slate-200/60 bg-white p-6 shadow-xs transition-all duration-300 hover:border-indigo-500/40 hover:shadow-md dark:border-slate-850 dark:bg-slate-950/60"
                        >
                          <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-base font-bold text-indigo-600 transition-transform duration-300 group-hover:scale-110 dark:bg-indigo-950/40 dark:text-indigo-400">
                            {item.step}
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {item.title}
                            </h3>
                            <p className="mt-1.5 text-xs text-slate-650 dark:text-slate-450 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Dots Pagination */}
          <div className="flex justify-center items-center gap-2.5 mt-6">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                onClick={() => handleNavigate(idx === 0 ? "hero" : idx === 1 ? "services" : "about")}
                className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === idx
                  ? "w-7 bg-indigo-600 dark:bg-cyan-400"
                  : "w-2.5 bg-slate-300 dark:bg-slate-800 hover:bg-slate-450 dark:hover:bg-slate-700"
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Contact (Standard scrollable section) */}
        <section id="contact" className="relative mx-auto w-full max-w-4xl px-6 py-24 sm:py-32">
          {/* Colorful back glow */}
          <div className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden pointer-events-none">
            <div className="h-100 w-150 rounded-full bg-linear-to-tr from-indigo-500/10 to-pink-500/5 blur-3xl opacity-60" />
          </div>

          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-indigo-500">Contact</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Tell us about your project
            </h2>
            <p className="mt-4 text-base text-slate-650 dark:text-slate-400">
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
