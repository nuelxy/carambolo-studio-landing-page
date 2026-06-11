import { useEffect, useState, useRef } from "react";
import { IntroLoader } from "./IntroLoader";
import {
  Check,
  ChevronDown,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Star,
  Mic,
  Play,
  X,
} from "lucide-react";

import logoAsset from "@/assets/carambolo-logo.png";
import heroImg from "@/assets/hero-studio-web.jpg";
import galBand from "@/assets/gallery-band.jpg";
import galConsole from "@/assets/gallery-console.jpg";
import galDrums from "@/assets/gallery-drums.jpg";
import galGuitar from "@/assets/gallery-guitar.jpg";
import galMic from "@/assets/gallery-mic.jpg";
import galVocal from "@/assets/gallery-vocal.jpg";
import parkingImg from "@/assets/parking-studio.jpg";

import {
  differentials,
  faqs,
  navigationLinks,
  processSteps,
  recordingReasons,
  serviceCards,
} from "./data";
import { LeadForm } from "./LeadForm";
import { trackEvent } from "./tracking";
import { defaultWhatsAppUrl, rehearsalWhatsAppUrl, WHATSAPP_NUMBER } from "./whatsapp";

const instagramUrl = "https://www.instagram.com/carambolostudio";
const mapsUrl =
  "https://maps.google.com/?q=Av.+Fernando+Pires+Leal,+3901,+Recanto+das+Palmeiras,+Teresina,+PI";

const galleryImages = [
  { src: galMic, alt: "Microfone em estúdio para captação musical" },
  { src: galConsole, alt: "Console de áudio em estúdio de gravação" },
  { src: galVocal, alt: "Ambiente de gravação vocal" },
  { src: galGuitar, alt: "Guitarra pronta para gravação" },
  { src: galDrums, alt: "Bateria preparada para captação" },
  { src: galBand, alt: "Banda em ambiente de gravação" },
  { src: parkingImg, alt: "Área externa e estacionamento do Carambolo Studio" },
];

export function LandingPage() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <IntroLoader onFinish={() => setShowIntro(false)} />}

      <div
        className={
          showIntro
            ? "min-h-screen bg-background text-foreground noise-bg opacity-0"
            : "min-h-screen bg-background text-foreground noise-bg opacity-100 transition-opacity duration-700"
        }
      >
        <Header />

        <main>
          <Hero />
          <RecordingFocus />
          <Services />
          <Rehearsal />
          <EvaluationOffer />
          <HowItWorks />
          <Differentials />
          <Gallery />
          <SocialProof />
          <ParkingAccess />

          <section id="avaliacao">
            <LeadForm />
          </section>

          <FAQ />
          <FinalCTA />
        </main>

        <Footer />
        <MobileStickyCTA />
      </div>
    </>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-[#050505]">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <a href="#top" className="flex items-center gap-2" aria-label="Voltar ao início">
          <img
            src={logoAsset}
            alt="Carambolo Studio"
            className="h-10 w-10 rounded-md object-contain"
            width={40}
            height={40}
          />

          <span className="font-display text-xl">
            CARAMBOLO <span className="text-primary">STUDIO</span>
          </span>
        </a>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className="rounded-md border border-primary p-2 text-primary transition hover:bg-primary hover:text-primary-foreground"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {open && (
          <div className="absolute right-4 top-[calc(100%+12px)] z-50 w-[min(340px,calc(100vw-2rem))] rounded-xl border border-border bg-[#050505] p-5 shadow-2xl md:right-6">
            <div className="flex items-center justify-between">
              <span className="font-display text-base">
                CARAMBOLO <span className="text-primary">STUDIO</span>
              </span>

              <button
                type="button"
                aria-label="Fechar menu"
                className="rounded-md border border-primary bg-primary p-2 text-primary-foreground transition hover:brightness-110"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="mt-6 flex flex-col gap-1" aria-label="Menu lateral">
              {navigationLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-sm text-muted-foreground transition hover:bg-primary/10 hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              href="#avaliacao"
              onClick={() => {
                trackEvent("cta_gravacao_click", { position: "header_dropdown_menu" });
                setOpen(false);
              }}
              className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
            >
              Quero gravar minha música
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

function Hero() {
  const processSteps = [
    {
      number: "01",
      title: "Ideia",
      label: "Direção criativa",
    },
    {
      number: "02",
      title: "Captação",
      label: "Voz, take e presença",
    },
    {
      number: "03",
      title: "Finalização",
      label: "Mix pronta para lançar",
    },
  ];

  return (
    <section id="top" className="relative isolate min-h-[88svh] overflow-hidden bg-background">
      <style>{`
        @keyframes caramboloSignal {
          0% {
            transform: translateX(-120%);
            opacity: 0;
          }
          18% {
            opacity: 1;
          }
          82% {
            opacity: 1;
          }
          100% {
            transform: translateX(320%);
            opacity: 0;
          }
        }

        @keyframes caramboloEq {
          0%, 100% {
            transform: scaleY(0.45);
            opacity: 0.45;
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
          }
        }

        @keyframes caramboloGlow {
          0%, 100% {
            opacity: 0.35;
            transform: scale(1);
          }
          50% {
            opacity: 0.95;
            transform: scale(1.18);
          }
        }

        .hero-flow {
          position: relative;
          border-radius: 1.35rem;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background:
            linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.025)),
            rgba(0, 0, 0, 0.22);
          box-shadow: 0 24px 80px -52px rgba(255, 199, 0, 0.65);
          backdrop-filter: blur(18px);
          overflow: hidden;
        }

        .hero-flow::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 15% 50%, rgba(255, 199, 0, 0.18), transparent 24%),
            radial-gradient(circle at 50% 50%, rgba(255, 199, 0, 0.11), transparent 28%),
            radial-gradient(circle at 85% 50%, rgba(255, 199, 0, 0.16), transparent 24%);
          opacity: 0.72;
          pointer-events: none;
        }

        .hero-flow-track {
          position: absolute;
          left: 2rem;
          right: 2rem;
          top: 50%;
          height: 1px;
          overflow: hidden;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.24), transparent);
          transform: translateY(-50%);
        }

        .hero-flow-track span {
          position: absolute;
          top: -1px;
          bottom: -1px;
          left: 0;
          width: 34%;
          background: linear-gradient(90deg, transparent, rgba(255, 199, 0, 0.95), transparent);
          animation: caramboloSignal 3.4s ease-in-out infinite;
        }

        .hero-step {
          position: relative;
          min-height: 6.25rem;
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(7, 7, 7, 0.42);
          padding: 0.95rem;
          outline: none;
          transition:
            transform 220ms ease,
            border-color 220ms ease,
            background 220ms ease,
            box-shadow 220ms ease;
        }

        .hero-step:hover,
        .hero-step:focus-visible {
          transform: translateY(-5px);
          border-color: rgba(255, 199, 0, 0.66);
          background: rgba(255, 199, 0, 0.09);
          box-shadow: 0 22px 54px -34px rgba(255, 199, 0, 0.95);
        }

        .hero-step::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(255,255,255,0.16), transparent 42%);
          opacity: 0;
          transition: opacity 220ms ease;
          pointer-events: none;
        }

        .hero-step:hover::after,
        .hero-step:focus-visible::after {
          opacity: 1;
        }

        .hero-step-orb {
          position: absolute;
          right: 0.85rem;
          top: 0.85rem;
          width: 0.55rem;
          height: 0.55rem;
          border-radius: 999px;
          background: rgb(255, 199, 0);
          box-shadow: 0 0 22px rgba(255, 199, 0, 0.85);
          animation: caramboloGlow 2.2s ease-in-out infinite;
        }

        .hero-eq {
          position: absolute;
          right: 0.85rem;
          bottom: 0.85rem;
          display: flex;
          align-items: end;
          gap: 0.18rem;
          height: 1.15rem;
        }

        .hero-eq span {
          width: 0.18rem;
          height: 100%;
          border-radius: 999px;
          background: rgba(255, 199, 0, 0.88);
          transform-origin: bottom;
          animation: caramboloEq 1.15s ease-in-out infinite;
        }

        .hero-eq span:nth-child(2) {
          animation-delay: 120ms;
        }

        .hero-eq span:nth-child(3) {
          animation-delay: 240ms;
        }

        .hero-eq span:nth-child(4) {
          animation-delay: 360ms;
        }

        .hero-eq span:nth-child(5) {
          animation-delay: 480ms;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-flow-track span,
          .hero-step-orb,
          .hero-eq span {
            animation: none;
          }
        }
      `}</style>

      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Estúdio preparado para gravação musical no Carambolo Studio"
          className="h-full w-full object-cover object-[58%_45%] opacity-100 sm:object-[56%_45%] lg:object-center"
          width={1920}
          height={1080}
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.13_0.005_60/0.9)_0%,oklch(0.13_0.005_60/0.7)_38%,oklch(0.13_0.005_60/0.34)_68%,oklch(0.13_0.005_60/0.1)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_73%_34%,oklch(0.83_0.17_88/0.2),transparent_31%),linear-gradient(180deg,oklch(0.13_0.005_60/0.18)_0%,transparent_42%,oklch(0.13_0.005_60/0.64)_100%)]" />
        <div className="absolute inset-0 grid-bg opacity-[0.07]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-center px-4 pb-14 pt-24 md:px-6 md:pb-20 md:pt-28">
        <div className="max-w-[46rem]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Estúdio de gravação em Teresina
          </div>

          <h1 className="mt-7 max-w-[43rem] text-[clamp(2.65rem,5.5vw,5.85rem)] font-medium leading-[0.98] tracking-normal text-foreground">
            Sua música pronta para ser lançada.
          </h1>

          <p className="mt-4 font-display text-[clamp(1.7rem,3.2vw,3rem)] uppercase leading-none tracking-normal text-primary">
            Com direção, intenção e acabamento.
          </p>

          <p className="mt-7 max-w-[32rem] text-base leading-7 text-foreground/82 md:text-lg md:leading-8">
            Aqui sua música sai do papel e vira faixa.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#avaliacao"
              onClick={() => trackEvent("cta_gravacao_click", { position: "hero" })}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_22px_70px_-26px_oklch(0.83_0.17_88/0.9)] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            >
              Quero gravar minha música
            </a>

            <a
              href={defaultWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { position: "hero", number: WHATSAPP_NUMBER })}
              className="inline-flex items-center justify-center gap-2 rounded-md border-[1.5px] border-white/85 bg-white/[0.08] px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur-md transition hover:border-primary/80 hover:bg-white/[0.16] hover:text-foreground"
            >
              <MessageCircle className="h-4 w-4" />
              Tirar dúvidas
            </a>
          </div>

          <div className="mt-10 hidden max-w-[40rem] sm:block">
            <div className="hero-flow p-2" aria-label="Processo de produção musical: ideia, captação e finalização">
              <div className="hero-flow-track" aria-hidden="true">
                <span />
              </div>

              <div className="relative grid grid-cols-3 gap-2">
                {processSteps.map((step) => (
                  <div key={step.title} className="hero-step" tabIndex={0}>
                    <span className="hero-step-orb" aria-hidden="true" />

                    <div className="relative z-10">
                      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-primary/80">
                        {step.number}
                      </p>

                      <p className="mt-2 font-display text-lg uppercase leading-none text-foreground">
                        {step.title}
                      </p>

                      <p className="mt-2 max-w-[8.5rem] text-xs leading-5 text-foreground/62">
                        {step.label}
                      </p>
                    </div>

                    <div className="hero-eq" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RecordingFocus() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const bullets = [
    "Para quem quer lançar um single.",
    "Para quem precisa gravar voz ou instrumentos.",
    "Para bandas que querem registrar um projeto.",
    "Para artistas que precisam de portfólio.",
    "Para músicos que vão participar de edital, festival ou concurso.",
    "Para quem quer transformar uma ideia em uma música finalizada.",
  ];

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.28,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gravacao"
      className="border-t border-border/60 py-20 md:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <h2
          className={`font-display text-3xl uppercase leading-tight transition-all duration-700 ease-out md:text-5xl ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          Sua música não precisa ficar presa no{" "}
          <span className="text-primary">áudio de WhatsApp</span>, no ensaio ou no papel.
        </h2>

        <div className="mt-6 space-y-4 text-muted-foreground md:text-lg">
          <p
            className={`transition-all duration-700 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{
              transitionDelay: isVisible ? "180ms" : "0ms",
            }}
          >
            Você pode ter uma letra anotada, uma melodia gravada no celular, ou uma música autoral
            que ainda precisa ganhar forma, ou só a vontade de começar.
          </p>

          <p
            className={`transition-all duration-700 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{
              transitionDelay: isVisible ? "300ms" : "0ms",
            }}
          >
            Gravar não é apenas apertar <span className="text-primary">“rec”</span>. Uma boa
            gravação depende de captação, direção, preparação, edição, mixagem e decisões técnicas
            que afetam diretamente o resultado final.
          </p>

          <p
            className={`transition-all duration-700 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{
              transitionDelay: isVisible ? "420ms" : "0ms",
            }}
          >
            No Carambolo Studio, você recebe orientação para entender o melhor caminho para o seu
            projeto antes de investir tempo e dinheiro em uma sessão.
          </p>
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {bullets.map((b, index) => (
            <li
              key={b}
              className={`group flex items-start gap-3 rounded-lg border border-border bg-card/60 p-4 transition-all duration-700 ease-out hover:-translate-y-1 hover:border-primary/55 hover:bg-primary/[0.035] hover:shadow-[0_0_30px_rgba(234,179,8,0.10)] ${
                isVisible
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-5 scale-95 opacity-0"
              }`}
              style={{
                transitionDelay: isVisible ? `${560 + index * 90}ms` : "0ms",
              }}
            >
              <Check
                className={`mt-0.5 h-5 w-5 shrink-0 text-primary transition-transform duration-500 ease-out group-hover:scale-110 ${
                  isVisible ? "scale-100" : "scale-75"
                }`}
                aria-hidden="true"
              />

              <span className="text-sm font-medium">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="border-t border-border/60 bg-card/20 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div
          className={`max-w-3xl transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            O que você pode gravar
          </p>

          <h2 className="mt-3 font-display text-3xl uppercase leading-tight md:text-5xl">
            Gravação para artistas, bandas, criadores e empresas.
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCards.map((service, index) => (
            <article
              key={service.title}
              className={`group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-700 ease-out hover:-translate-y-1 hover:border-primary/60 hover:bg-primary/[0.035] hover:shadow-[0_0_35px_rgba(234,179,8,0.12)] ${
                isVisible
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-8 scale-95 opacity-0"
              }`}
              style={{
                transitionDelay: isVisible ? `${160 + index * 80}ms` : "0ms",
              }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-primary/10 blur-3xl" />
              </div>

              <service.icon
                className="relative z-10 h-7 w-7 text-primary transition-transform duration-500 ease-out group-hover:scale-110"
                aria-hidden="true"
              />

              <h3 className="relative z-10 mt-4 font-display text-xl uppercase transition-colors duration-300 group-hover:text-primary">
                {service.title}
              </h3>

              <p className="relative z-10 mt-2 text-sm text-muted-foreground">
                {service.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Rehearsal() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const features = [
    "Sala para até 7 pessoas",
    "Bateria disponível",
    "Amplificadores",
    "Microfones",
    "Mesa de som",
    "Ar-condicionado",
    "Isolamento acústico",
    "Estacionamento próprio",
    "Agendamento por hora",
    "Pacotes mensais",
    "Desconto para banda fixa",
  ];

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ensaio"
      className="border-t border-border/60 py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-[0.95fr_1.05fr] md:px-6">
        <figure
          className={`relative min-h-[420px] overflow-hidden rounded-2xl border border-border bg-card transition-all duration-1000 ease-out md:min-h-[560px] ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <img
            src={galDrums}
            alt="Sala de ensaio do Carambolo Studio"
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-out ${
              isVisible ? "scale-100" : "scale-110"
            }`}
            width={900}
            height={900}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-background/10 to-transparent" />
        </figure>

        <div>
          <div
            className={`transition-all duration-700 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Sala de ensaio
            </p>

            <h2 className="mt-3 font-display text-3xl uppercase leading-tight md:text-5xl">
              Precisa ensaiar antes de gravar?
            </h2>

            <p className="mt-5 max-w-xl text-muted-foreground md:text-lg">
              O Carambolo Studio também recebe bandas e músicos que precisam preparar repertório,
              show, gravação ou apresentação com estrutura adequada.
            </p>
          </div>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {features.map((feature, index) => (
              <li
                key={feature}
                className={`flex items-center gap-2 text-sm text-muted-foreground transition-all duration-700 ease-out ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{
                  transitionDelay: isVisible ? `${120 + index * 45}ms` : "0ms",
                }}
              >
                <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div
            className={`relative mt-7 overflow-hidden rounded-xl border border-primary/30 bg-primary/5 p-5 transition-all duration-700 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100 shadow-[0_0_35px_rgba(234,179,8,0.12)]"
                : "translate-y-8 opacity-0"
            }`}
            style={{
              transitionDelay: isVisible ? "650ms" : "0ms",
            }}
          >
            <div
              className={`absolute inset-0 z-10 bg-[#050505] transition-transform duration-1000 ease-in-out ${
                isVisible ? "translate-x-full" : "translate-x-0"
              }`}
              style={{
                transitionDelay: isVisible ? "950ms" : "0ms",
              }}
              aria-hidden="true"
            />

            <div className="relative z-0">
              <p className="text-sm text-muted-foreground">Ensaio a partir de</p>

              <p className="mt-1 font-display text-4xl text-primary">
                R$ 50
                <span className="ml-1 text-base text-muted-foreground">/hora</span>
              </p>
            </div>
          </div>

          <a
            href={rehearsalWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackEvent("ensaio_click", {
                position: "rehearsal_section",
                number: WHATSAPP_NUMBER,
              });
              trackEvent("whatsapp_click", {
                position: "rehearsal_section",
                number: WHATSAPP_NUMBER,
              });
            }}
            className={`mt-7 inline-flex items-center justify-center rounded-md border border-primary/50 px-6 py-3 text-sm font-semibold text-primary transition-all duration-700 ease-out hover:bg-primary hover:text-primary-foreground ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
            style={{
              transitionDelay: isVisible ? "900ms" : "0ms",
            }}
          >
            Reservar horário de ensaio
          </a>
        </div>
      </div>
    </section>
  );
}

function EvaluationOffer() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const items = [
    "Entendimento do projeto musical.",
    "Orientação sobre o melhor formato de gravação.",
    "Indicação do tipo de pacote mais adequado.",
    "Direcionamento sobre captação, edição, mixagem e masterização.",
    "Orientação inicial sobre próximos passos para lançamento, quando aplicável.",
    "Indicação de parceiros para capa, audiovisual ou distribuição, quando necessário.",
  ];

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-border/60 py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-2 md:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Oferta principal
          </p>

          <h2 className="mt-3 font-display text-3xl uppercase leading-tight md:text-5xl">
            Antes de gravar, entenda o{" "}
            <span className="text-primary">melhor formato</span> para o seu projeto.
          </h2>

          <div className="mt-6 space-y-4 text-muted-foreground md:text-lg">
            <p>
              Cada música tem uma necessidade diferente. Algumas precisam apenas de captação vocal.
              Outras exigem produção musical, músicos parceiros, edição, afinação, mixagem,
              masterização ou planejamento completo.
            </p>

            <p>
              Por isso, o primeiro passo é uma{" "}
              <strong className="text-foreground">avaliação inicial do projeto</strong>. Você
              conversa com o produtor, explica o que quer gravar e recebe uma orientação sobre o
              melhor formato para transformar sua ideia em uma gravação profissional.
            </p>
          </div>
        </div>

        <div
          className={`rounded-2xl border-2 border-primary/50 bg-card p-6 shadow-[var(--shadow-glow)] transition-all duration-700 md:p-8 ${
            isVisible
              ? "animate-[offerPulse_1.4s_ease-in-out_2] border-primary/80 shadow-[0_0_45px_rgba(234,179,8,0.22)]"
              : ""
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
            <Star className="h-4 w-4 fill-primary" />
            Gratuito
          </div>

          <h3 className="mt-3 font-display text-3xl uppercase">
            Avaliação inicial gratuita
          </h3>

          <ul className="mt-6 space-y-3">
            {items.map((i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>{i}</span>
              </li>
            ))}
          </ul>

          <a
            href="#avaliacao"
            onClick={() => trackEvent("cta_solicitar_avaliacao")}
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
          >
            Solicitar avaliação do meu projeto
          </a>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            Você não precisa chegar sabendo tudo. O produtor te orienta.
          </p>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.22,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="como-funciona"
      className="border-t border-border/60 bg-card/20 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div
          className={`max-w-3xl transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Como funciona
          </p>

          <h2 className="mt-3 font-display text-3xl uppercase leading-tight md:text-5xl">
            Um processo claro para você saber exatamente o que acontece em cada etapa.
          </h2>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {processSteps.map((step, index) => (
            <div
              key={step.n}
              className={`group flex gap-5 rounded-xl border border-border bg-card p-6 transition-all duration-700 ease-out hover:border-primary/45 hover:bg-primary/[0.03] ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{
                transitionDelay: isVisible ? `${180 + index * 90}ms` : "0ms",
              }}
            >
              <div
                className={`font-display text-4xl text-primary transition-transform duration-500 ease-out group-hover:scale-110 ${
                  isVisible ? "scale-100" : "scale-90"
                }`}
              >
                {step.n}
              </div>

              <div>
                <h3 className="font-display text-lg uppercase">{step.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.d}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`mt-10 flex flex-col gap-3 transition-all duration-700 ease-out sm:flex-row ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{
            transitionDelay: isVisible ? `${220 + processSteps.length * 90}ms` : "0ms",
          }}
        >
          <a
            href="#avaliacao"
            onClick={() => trackEvent("avaliacao_projeto_click", { position: "how_it_works" })}
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
          >
            Solicitar avaliação do meu projeto
          </a>

          <a
            href={defaultWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("whatsapp_click", {
                position: "how_it_works",
                number: WHATSAPP_NUMBER,
              })
            }
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background/70 px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary/60"
          >
            <MessageCircle className="h-4 w-4" />
            Falar com o produtor
          </a>
        </div>
      </div>
    </section>
  );
}

function Differentials() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.22,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="border-t border-border/60 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div
          className={`max-w-3xl transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Diferencial
          </p>

          <h2 className="mt-3 font-display text-3xl uppercase leading-tight md:text-5xl">
            Qualidade em cada aspecto. Mais do que apertar 'rec':{" "}
            <span className="text-primary">direção técnica</span> para o seu projeto soar
            profissional
          </h2>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {differentials.map((item, index) => (
            <article
              key={item.title}
              className={`group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-700 ease-out hover:-translate-y-1 hover:border-primary/60 hover:bg-primary/[0.035] hover:shadow-[0_0_35px_rgba(234,179,8,0.12)] ${
                isVisible
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-8 scale-95 opacity-0"
              }`}
              style={{
                transitionDelay: isVisible ? `${160 + index * 90}ms` : "0ms",
              }}
            >
              <div
                className={`pointer-events-none absolute inset-y-0 -left-24 z-0 w-16 rotate-12 bg-primary/15 blur-md transition-transform duration-1000 ease-out ${
                  isVisible ? "translate-x-[28rem]" : "translate-x-0"
                }`}
                style={{
                  transitionDelay: isVisible ? `${420 + index * 90}ms` : "0ms",
                }}
                aria-hidden="true"
              />

              <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-primary/10 blur-3xl" />
              </div>

              <div className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary transition-all duration-500 ease-out group-hover:scale-110 group-hover:bg-primary/15 group-hover:shadow-[0_0_24px_rgba(234,179,8,0.16)]">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </div>

              <h3 className="relative z-10 mt-4 font-display text-xl uppercase leading-tight transition-colors duration-300 group-hover:text-primary">
                {item.title}
              </h3>

              <p className="relative z-10 mt-2 text-sm leading-6 text-muted-foreground">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [googleData, setGoogleData] = useState<{
    name: string;
    rating: number;
    totalReviews: number;
    googleUrl: string;
    reviews: {
      authorName: string;
      rating: number;
      text: string;
      relativeTime: string;
      profilePhotoUrl?: string;
    }[];
    cache?: {
      status: "fresh" | "updated" | "stale" | "fallback";
      updatedAt?: string;
      nextUpdateAt?: string;
      warning?: string;
    };
  } | null>(null);

  const fallbackReviews = [
    {
      authorName: "Cliente Carambolo Studio",
      rating: 5,
      text: "Atendimento técnico, ambiente profissional e orientação durante todo o processo de gravação.",
      relativeTime: "Depoimento real",
    },
    {
      authorName: "Artista independente",
      rating: 5,
      text: "Estrutura completa para transformar uma ideia em uma gravação com qualidade.",
      relativeTime: "Projeto musical",
    },
    {
      authorName: "Banda atendida",
      rating: 5,
      text: "Espaço organizado, acompanhamento técnico e boa estrutura para ensaio e gravação.",
      relativeTime: "Sessão no estúdio",
    },
  ];

  const reviewsToShow =
    googleData?.reviews && googleData.reviews.length > 0
      ? googleData.reviews.slice(0, 3)
      : fallbackReviews;

  const rating = googleData?.rating ?? 4.8;
  const totalReviews = googleData?.totalReviews ?? 135;
  const googleUrl = googleData?.googleUrl || mapsUrl;

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.22,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadGoogleReviews() {
      try {
        const response = await fetch("/data/google-reviews.json", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar avaliações do Google");
        }

        const payload = await response.json();

        const normalizedData = payload?.data
          ? {
              ...payload.data,
              cache: {
                status: "fresh" as const,
                updatedAt: payload.updatedAt,
              },
            }
          : payload;

        if (!cancelled) {
          setGoogleData(normalizedData);
        }
      } catch (error) {
        console.error("Erro ao carregar avaliações do Google:", error);

        if (!cancelled) {
          setGoogleData(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadGoogleReviews();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="provas"
      className="border-t border-border/60 bg-card/20 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div
          className={`max-w-3xl transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            O que dizem por aí
          </p>

          <h2 className="mt-3 font-display text-3xl uppercase leading-tight md:text-5xl">
            Projetos reais, artistas reais, gravações reais.
          </h2>

          <p className="mt-4 text-muted-foreground md:text-lg">
            Carambolo Studio já recebeu artistas, bandas e projetos de diferentes estilos
            musicais, com clientes recorrentes e trabalhos lançados em plataformas digitais.
          </p>
        </div>

        <div
          className={`mt-10 overflow-hidden rounded-2xl border border-primary/40 bg-card transition-all duration-700 ease-out ${
            isVisible
              ? "translate-y-0 opacity-100 shadow-[0_0_45px_rgba(234,179,8,0.12)]"
              : "translate-y-8 opacity-0"
          }`}
          style={{
            transitionDelay: isVisible ? "180ms" : "0ms",
          }}
        >
          <div className="relative p-6 md:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Avaliação no Google
                </p>

                <div className="mt-4 flex flex-wrap items-end gap-4">
                  <p className="font-display text-6xl leading-none text-primary">
                    {isLoading ? "..." : rating.toFixed(1)}
                  </p>

                  <div className="pb-1">
                    <div className="flex gap-1 text-primary">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className="h-5 w-5 fill-primary" />
                      ))}
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {isLoading
                        ? "Carregando avaliações..."
                        : `${totalReviews} avaliações públicas no Google`}
                    </p>
                  </div>
                </div>

                {googleData?.reviews && googleData.reviews.length > 0 && (
                  <p className="mt-4 text-xs text-muted-foreground">
                    Dados carregados do cache público das avaliações do Google
                  </p>
                )}
              </div>

              <a
                href={googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("google_reviews_click", { position: "social_proof" })}
                className="inline-flex items-center justify-center rounded-md border border-primary/50 px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                Ver avaliações no Google
              </a>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {reviewsToShow.map((review, index) => {
            const initial = review.authorName?.trim()?.charAt(0)?.toUpperCase() || "C";
            const starsCount = Math.max(1, Math.min(5, Math.round(review.rating || 5)));

            return (
              <article
                key={`${review.authorName}-${index}`}
                className={`group flex min-h-[290px] flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all duration-700 ease-out hover:-translate-y-1 hover:border-primary/60 hover:bg-primary/[0.035] hover:shadow-[0_0_35px_rgba(234,179,8,0.12)] ${
                  isVisible
                    ? "translate-y-0 scale-100 opacity-100"
                    : "translate-y-8 scale-95 opacity-0"
                }`}
                style={{
                  transitionDelay: isVisible ? `${320 + index * 120}ms` : "0ms",
                }}
              >
                <div>
                  <div className="flex gap-1 text-primary">
                    {Array.from({ length: starsCount }).map((_, starIndex) => (
                      <Star key={starIndex} className="h-4 w-4 fill-primary" />
                    ))}
                  </div>

                  <p className="mt-6 text-sm leading-6 text-muted-foreground">
                    “
                    {review.text ||
                      "Avaliação positiva sobre a experiência no Carambolo Studio."}
                    ”
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/40 bg-primary/10 font-display text-lg text-primary transition group-hover:border-primary/70 group-hover:bg-primary/15">
  <span className="absolute inset-0 flex items-center justify-center">
    {initial}
  </span>

  {review.profilePhotoUrl && (
    <img
      src={review.profilePhotoUrl}
      alt=""
      className="relative z-10 h-full w-full rounded-full object-cover"
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={(event) => {
        event.currentTarget.style.display = "none";
      }}
    />
  )}
</div>

                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {review.authorName || "Cliente Carambolo Studio"}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {review.relativeTime || "Avaliação no Google"}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div
          className={`mt-8 flex justify-center transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{
            transitionDelay: isVisible ? "760ms" : "0ms",
          }}
        >
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("google_reviews_all_click", { position: "social_proof" })}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
          >
            Conferir todas as avaliações
          </a>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const imgs = [
    {
      src: galConsole,
      alt: "Mesa de som do Carambolo Studio",
      label: "Mesa de som",
      description: "Controle técnico para captação, edição e finalização.",
    },
    {
      src: galMic,
      alt: "Microfone profissional no Carambolo Studio",
      label: "Captação vocal",
      description: "Microfones preparados para voz, locução e instrumentos.",
    },
    {
      src: galVocal,
      alt: "Sessão de gravação vocal no estúdio",
      label: "Gravação de voz",
      description: "Ambiente direcionado para performance e interpretação.",
    },
    {
      src: galGuitar,
      alt: "Guitarra e amplificador no estúdio",
      label: "Instrumentos",
      description: "Estrutura para gravação de guitarra, baixo e arranjos.",
    },
    {
      src: galDrums,
      alt: "Sala de ensaio com bateria",
      label: "Sala de ensaio",
      description: "Espaço para bandas, preparação e captação ao vivo.",
    },
    {
      src: galBand,
      alt: "Banda em sessão no Carambolo Studio",
      label: "Bandas e projetos",
      description: "Registro de banda, live session e produção musical.",
    },
  ];

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.22,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="materiais"
      className="border-t border-border/60 bg-card/20 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div
            className={`max-w-3xl transition-all duration-700 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Galeria
            </p>

            <h2 className="mt-3 font-display text-3xl uppercase leading-tight md:text-5xl">
              Por dentro do Carambolo Studio.
            </h2>

            <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
              Estrutura real para captação, ensaio, produção e finalização musical.
            </p>
          </div>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("instagram_click", { position: "gallery" })}
            className={`inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-700 ease-out hover:underline ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
            style={{
              transitionDelay: isVisible ? "180ms" : "0ms",
            }}
          >
            <Instagram className="h-4 w-4" />
            @carambolostudio
          </a>
        </div>

        <div className="mt-10 grid auto-rows-[210px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[240px] lg:grid-cols-4">
          {imgs.map((image, index) => (
            <figure
              key={`${image.alt}-${index}`}
              className={`group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-700 ease-out hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_0_35px_rgba(234,179,8,0.12)] ${
                index === 0 ? "sm:col-span-2 sm:row-span-2" : ""
              } ${
                index === 5 ? "lg:col-span-2" : ""
              } ${
                isVisible
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-8 scale-95 opacity-0"
              }`}
              style={{
                transitionDelay: isVisible ? `${220 + index * 90}ms` : "0ms",
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                width={900}
                height={900}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />

              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-primary/15 blur-3xl" />
              </div>

              <figcaption className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                <p className="font-display text-xl uppercase text-foreground">
                  {image.label}
                </p>

                <p className="mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
                  {image.description}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function ParkingAccess() {
  return (
    <section className="border-t border-border/60 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-[0.9fr_1.1fr] md:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Chegada ao estúdio
          </p>

          <h2 className="mt-3 font-display text-3xl uppercase leading-tight md:text-5xl">
            Área externa e estacionamento no local.
          </h2>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("map_click", { position: "parking_section" })
            }
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-md border border-primary/50 px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            <MapPin className="h-4 w-4" />
            Ver localização no mapa
          </a>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -inset-5 rounded-[1.75rem] bg-primary/10 blur-3xl" />

          <figure className="relative overflow-hidden rounded-[1.35rem] border border-primary/35 bg-card shadow-[0_22px_70px_rgba(0,0,0,0.42),0_0_34px_rgba(250,204,21,0.08)]">
            <div className="pointer-events-none absolute inset-0 z-10 rounded-[1.35rem] ring-1 ring-inset ring-white/10" />
            <div className="pointer-events-none absolute inset-0 z-10 rounded-[1.35rem] bg-[linear-gradient(135deg,rgba(250,204,21,0.16),transparent_28%,transparent_70%,rgba(250,204,21,0.1))]" />

            <img
              src={parkingImg}
              alt="Estacionamento e fachada externa do Carambolo Studio"
              className="h-[360px] w-full object-cover md:h-[480px]"
              width={1200}
              height={800}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      className="relative overflow-hidden border-t border-border/60 bg-background py-20 md:py-28"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,oklch(0.72_0.16_85/0.08),transparent_34%)]" />

      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            FAQ
          </p>

          <h2 className="mt-3 font-display text-3xl uppercase leading-tight md:text-5xl">
            Dúvidas antes de gravar?
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            O que você precisa saber antes de reservar seu horário no estúdio.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map(([question, answer], index) => {
            const isOpen = open === index;

            return (
              <button
                key={question}
                type="button"
                onClick={() => setOpen(isOpen ? -1 : index)}
                className={`group w-full rounded-xl border px-5 py-5 text-left transition ${
                  isOpen
                    ? "border-primary/40 bg-primary/[0.04] shadow-[0_0_30px_rgba(250,204,21,0.08)]"
                    : "border-border bg-card hover:border-primary/25 hover:bg-secondary/30"
                }`}
                aria-expanded={isOpen}
              >
                <div className="flex items-start justify-between gap-5">
                  <span
                    className={`font-sans text-base font-semibold leading-snug tracking-normal transition [text-shadow:none] md:text-lg ${
                      isOpen ? "text-foreground" : "text-foreground/90"
                    }`}
                  >
                    {question}
                  </span>

                  <span
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition ${
                      isOpen
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "border-border text-primary group-hover:border-primary/35"
                    }`}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </span>
                </div>

                {isOpen && (
                  <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed tracking-normal text-muted-foreground [text-shadow:none]">
                    {answer}
                  </p>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-8 rounded-xl border border-border bg-card p-5 md:flex md:items-center md:justify-between md:gap-6">
          <div>
            <p className="font-sans text-base font-semibold leading-snug tracking-normal text-foreground [text-shadow:none]">
              Ainda ficou alguma dúvida?
            </p>

            <p className="mt-2 font-sans text-sm leading-relaxed tracking-normal text-muted-foreground [text-shadow:none]">
              Envie seu briefing e receba uma orientação inicial para o seu
              projeto.
            </p>
          </div>

          <a
            href="#avaliacao"
            className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110 md:mt-0 md:w-auto"
          >
            Receber orientação
          </a>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const finalSteps = [
    {
      number: "01",
      title: "Envie o projeto",
      text: "Conte o que quer gravar e em que estágio a música está.",
    },
    {
      number: "02",
      title: "Receba direção",
      text: "O produtor indica o melhor caminho para a sessão.",
    },
    {
      number: "03",
      title: "Grave com rota",
      text: "Você chega no estúdio com clareza sobre o próximo passo.",
    },
  ];

  return (
    <section className="relative isolate overflow-hidden border-t border-border/60 py-16 md:py-24">
      <style>{`
        @keyframes finalSignal {
          0% {
            transform: translateX(-110%);
            opacity: 0;
          }
          18% {
            opacity: 1;
          }
          82% {
            opacity: 1;
          }
          100% {
            transform: translateX(260%);
            opacity: 0;
          }
        }

        @keyframes finalPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(255, 199, 0, 0.28);
          }
          50% {
            box-shadow: 0 0 0 9px rgba(255, 199, 0, 0);
          }
        }

        .final-card {
          position: relative;
          overflow: hidden;
          border-radius: 1.6rem;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background:
            radial-gradient(circle at 12% 8%, rgba(255, 199, 0, 0.15), transparent 30%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.025)),
            rgba(5, 5, 5, 0.8);
          box-shadow: 0 34px 110px -76px rgba(255, 199, 0, 0.78);
          backdrop-filter: blur(18px);
        }

        .final-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 44px 44px;
          mask-image: linear-gradient(90deg, black, transparent 82%);
          pointer-events: none;
        }

        .final-signal {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 1px;
          overflow: hidden;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent);
        }

        .final-signal span {
          position: absolute;
          inset-block: -1px;
          left: 0;
          width: 38%;
          background: linear-gradient(90deg, transparent, rgba(255, 199, 0, 0.95), transparent);
          animation: finalSignal 3.4s ease-in-out infinite;
        }

        .final-pulse {
          animation: finalPulse 2.2s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .final-signal span,
          .final-pulse {
            animation: none;
          }
        }
      `}</style>

      <div className="absolute inset-0 -z-10">
        <img
          src={galConsole}
          alt=""
          className="h-full w-full object-cover opacity-18"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.13_0.005_60/0.96)_0%,oklch(0.13_0.005_60/0.88)_52%,oklch(0.13_0.005_60/0.76)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,oklch(0.83_0.17_88/0.18),transparent_32%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="final-card p-6 md:p-9 lg:p-11">
          <div className="final-signal" aria-hidden="true">
            <span />
          </div>

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-primary">
                <span className="final-pulse h-2 w-2 rounded-full bg-primary" />
                Próximo passo
              </div>

              <h2 className="mt-6 max-w-[34rem] font-display text-[clamp(2.25rem,4vw,4.35rem)] uppercase leading-[1.08] tracking-[-0.02em] text-foreground">
                <span className="block">Grave com direção.</span>
                <span className="block text-primary">Lance com estratégia.</span>
              </h2>

              <p className="mt-5 max-w-[35rem] text-sm leading-7 text-foreground/72 md:text-base md:leading-8">
                Envie o estágio do seu projeto e receba uma orientação inicial para gravar com mais
                clareza, menos tentativa e mais resultado.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#avaliacao"
                  onClick={() => trackEvent("avaliacao_projeto_click", { position: "final" })}
                  className="group inline-flex items-center justify-center gap-2 rounded-md bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-[0_24px_80px_-30px_oklch(0.83_0.17_88/0.95)] transition hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                >
                  Solicitar avaliação do meu projeto
                  <span className="transition group-hover:translate-x-1">→</span>
                </a>

                <a
                  href={defaultWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("whatsapp_click", { position: "final", number: WHATSAPP_NUMBER })
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white/18 bg-white/[0.06] px-7 py-4 text-sm font-semibold text-foreground backdrop-blur-md transition hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/10"
                >
                  <MessageCircle className="h-5 w-5" />
                  Falar com o produtor
                </a>
              </div>

              
            </div>

            <div className="rounded-[1.35rem] border border-white/12 bg-black/35 p-5 backdrop-blur-md">
              <div className="mb-6">
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-primary">
                  Rota da gravação
                </p>
                <p className="mt-2 font-display text-2xl uppercase leading-none text-foreground">
                  Do briefing ao estúdio
                </p>
              </div>

              <div className="relative space-y-5">
                <div className="absolute left-[1.05rem] top-5 bottom-5 w-px bg-gradient-to-b from-primary/70 via-white/16 to-primary/30" />

                {finalSteps.map((step) => (
                  <div key={step.number} className="relative flex gap-4">
                    <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/45 bg-background text-[0.68rem] font-bold text-primary">
                      {step.number}
                    </span>

                    <div className="pb-1">
                      <h3 className="font-display text-lg uppercase leading-none text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-[25rem] text-sm leading-6 text-foreground/60">
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-2xl border border-primary/20 bg-primary/[0.07] px-4 py-3">
                <p className="text-sm leading-6 text-foreground/72">
                  Não precisa chegar com tudo pronto. Traga sua voz, sua melodia ou sua música quase finalizada, o resto nós cuidamos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const footerWhatsAppMessage =
    "Olá, quero falar com o Carambolo Studio sobre uma gravação/ensaio.";

  const footerWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    footerWhatsAppMessage,
  )}`;

  const currentYear = new Date().getFullYear();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Carambolo Studio",
    description: "Gravação musical, ensaio e produção em Teresina/PI.",
    telephone: "+5586999947314",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Fernando Pires Leal, 3901",
      addressLocality: "Teresina",
      addressRegion: "PI",
      addressCountry: "BR",
    },
    sameAs: [instagramUrl],
    areaServed: "Teresina/PI",
    ...(typeof window !== "undefined" ? { url: window.location.origin } : {}),
  };

  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,oklch(0.72_0.16_85/0.1),transparent_34%)]" />

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-14">
        <div className="rounded-2xl border border-border bg-card/70 p-4 md:p-5">
          <div className="grid gap-5 lg:grid-cols-[1.25fr_0.8fr_1fr_auto] lg:items-center">
            <div className="flex items-center gap-3">
              <img
                src={logoAsset}
                alt="Carambolo Studio"
                className="h-11 w-11 rounded-md object-contain"
                width={44}
                height={44}
                loading="lazy"
                decoding="async"
              />

              <div>
                <p className="font-display text-lg uppercase leading-none">
                  Carambolo <span className="text-primary">Studio</span>
                </p>

                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Gravação musical, ensaio e produção em Teresina/PI.
                </p>
              </div>
            </div>

            <nav
              aria-label="Links de contato do rodapé"
              className="space-y-2 text-sm"
            >
              <p className="font-display text-[0.68rem] uppercase tracking-[0.18em] text-primary">
                Contato
              </p>

              <a
                href="tel:+5586999947314"
                onClick={() =>
                  trackEvent("phone_click", {
                    position: "footer",
                    number: WHATSAPP_NUMBER,
                  })
                }
                className="flex items-center gap-2 text-muted-foreground transition hover:text-primary"
              >
                <Phone className="h-4 w-4 shrink-0" />
                <span>(86) 99994-7314</span>
              </a>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("instagram_click", { position: "footer" })
                }
                className="flex items-center gap-2 text-muted-foreground transition hover:text-primary"
              >
                <Instagram className="h-4 w-4 shrink-0" />
                <span>@carambolostudio</span>
              </a>
            </nav>

            <div className="space-y-2 text-sm">
              <p className="font-display text-[0.68rem] uppercase tracking-[0.18em] text-primary">
                Endereço
              </p>

              <address className="not-italic">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("map_click", { position: "footer_address" })
                  }
                  className="flex items-start gap-2 text-muted-foreground transition hover:text-primary"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />

                  <span>
                    Av. Fernando Pires Leal, 3901
                    <br />
                    Recanto das Palmeiras, Teresina/PI
                  </span>
                </a>
              </address>

              <p className="text-xs text-muted-foreground">
                Atendimento sob agendamento.
              </p>
            </div>

            <div className="lg:justify-self-end">
              <a
                href={footerWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("whatsapp_click", {
                    position: "footer_cta",
                    number: WHATSAPP_NUMBER,
                  })
                }
                className="inline-flex w-full items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background lg:w-auto"
              >
                Falar com o estúdio
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card/70">
          <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
            <div>
              <p className="font-display text-xs uppercase tracking-[0.18em] text-primary">
                Localização
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Recanto das Palmeiras, Teresina/PI
              </p>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("map_click", { position: "footer_map_button" })
              }
              className="hidden rounded-md border border-primary/40 px-4 py-2 text-xs font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground sm:inline-flex"
            >
              Abrir no Google Maps
            </a>
          </div>

          <iframe
            title="Localização do Carambolo Studio no mapa"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=Av.%20Fernando%20Pires%20Leal%2C%203901%2C%20Teresina%20PI&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="h-64 w-full grayscale md:h-72"
            onLoad={() =>
              trackEvent("map_embed_loaded", { position: "footer" })
            }
          />

          <div className="border-t border-border p-4 sm:hidden">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("map_click", {
                  position: "footer_map_button_mobile",
                })
              }
              className="inline-flex w-full items-center justify-center rounded-md border border-primary/40 px-4 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              Abrir no Google Maps
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:px-6">
          <p>
            © {currentYear} Carambolo Studio. Todos os direitos reservados.
          </p>

          <nav
            aria-label="Links do rodapé"
            className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4"
          >
            <a
              href="/politica-de-privacidade"
              className="transition hover:text-primary"
            >
              Política de privacidade
            </a>

            <a href="/termos" className="transition hover:text-primary">
              Termos
            </a>

            <span className="hidden text-border sm:inline">|</span>

            <span>Direção técnica para projetos de áudio em Teresina/PI.</span>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function MobileStickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const firedMilestones = new Set<number>();

    function onScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const percent = scrollable > 0 ? Math.round((window.scrollY / scrollable) * 100) : 0;
      setShow(window.scrollY > 420);

      [25, 50, 75, 90].forEach((milestone) => {
        if (percent >= milestone && !firedMilestones.has(milestone)) {
          firedMilestones.add(milestone);
          trackEvent("scroll_depth", { percent: milestone });
          if (milestone === 50) {
            trackEvent("scroll_50");
          }
        }
      });
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur transition md:hidden ${show ? "translate-y-0" : "translate-y-full"}`}
    >
      <a
        href="#avaliacao"
        onClick={() => trackEvent("cta_gravacao_click", { position: "mobile_sticky" })}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-semibold text-primary-foreground"
      >
        Quero gravar minha música
      </a>
    </div>
  );
}
