import { useEffect, useState } from "react";
import { ChevronDown, Instagram, MapPin, Menu, MessageCircle, Phone, X } from "lucide-react";

import logoAsset from "@/assets/carambolo-logo.png.asset.json";
import heroImg from "@/assets/hero-studio.jpg";
import galBand from "@/assets/gallery-band.jpg";
import galConsole from "@/assets/gallery-console.jpg";
import galDrums from "@/assets/gallery-drums.jpg";
import galGuitar from "@/assets/gallery-guitar.jpg";
import galMic from "@/assets/gallery-mic.jpg";
import galVocal from "@/assets/gallery-vocal.jpg";

import {
  differentials,
  faqs,
  materialPlaceholders,
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
  { src: galDrums, alt: "Placeholder visual para galeria real do estúdio" },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground noise-bg">
      <Header />
      <main>
        <Hero />
        <RecordingFocus />
        <Services />
        <EvaluationOffer />
        <HowItWorks />
        <Differentials />
        <Materials />
        <LeadForm />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/88 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <a href="#top" className="flex items-center gap-2" aria-label="Voltar ao início">
          <img
            src={logoAsset.url}
            alt="Carambolo Studio"
            className="h-10 w-10 rounded-md object-contain"
            width={40}
            height={40}
          />
          <span className="font-display text-xl">
            CARAMBOLO <span className="text-primary">STUDIO</span>
          </span>
        </a>
        <nav
          className="hidden items-center gap-7 text-sm text-muted-foreground lg:flex"
          aria-label="Navegação principal"
        >
          {navigationLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-primary">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#avaliacao"
            onClick={() => trackEvent("cta_gravacao_click", { position: "header" })}
            className="hidden rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-110 md:inline-flex"
          >
            Quero gravar minha música
          </a>
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="rounded-md border border-border p-2 lg:hidden"
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm hover:bg-secondary"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#avaliacao"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground"
            >
              Solicitar avaliação do meu projeto
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[88svh] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="Estúdio preparado para gravação musical no Carambolo Studio"
          className="h-full w-full object-cover opacity-55"
          width={1920}
          height={1080}
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/62 to-background" />
        <div className="absolute inset-0 grid-bg opacity-25" />
      </div>
      <div className="mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-center px-4 pb-16 pt-20 md:px-6 md:pb-20 md:pt-24">
        <div className="max-w-5xl">
          <p className="mb-5 inline-flex rounded-full border border-primary/35 bg-background/55 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Gravação musical em Teresina
          </p>
          <h1 className="font-display text-4xl uppercase leading-[1.04] md:text-6xl lg:text-7xl">
            Do rascunho ao arquivo final: grave sua música com direção técnica, captação
            profissional e orientação em cada etapa.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            Para artistas, bandas e projetos musicais que precisam sair da guia, do ensaio ou da
            ideia e chegar a uma gravação com escopo claro.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#avaliacao"
              onClick={() => trackEvent("cta_gravacao_click", { position: "hero" })}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            >
              Quero gravar minha música
            </a>
            <a
              href={defaultWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("whatsapp_click", { position: "hero", number: WHATSAPP_NUMBER })
              }
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background/70 px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary/60"
            >
              <MessageCircle className="h-4 w-4" />
              Falar com o produtor
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              "Captação",
              "Direção técnica",
              "Mixagem",
              "Masterização",
              "Orientação de projeto",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RecordingFocus() {
  return (
    <section id="gravacao" className="border-t border-border/60 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-[1.1fr_0.9fr] md:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Foco principal
          </p>
          <h2 className="mt-3 font-display text-3xl uppercase leading-tight md:text-5xl">
            A página é sobre gravar música, com orientação antes de entrar na sessão.
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground md:text-lg">
            <p>
              Gravar não é só apertar rec. A captação, a preparação, a escolha de takes e a
              finalização interferem diretamente no resultado.
            </p>
            <p>
              Por isso o primeiro passo é entender o projeto: o que já existe, o que precisa ser
              gravado e quais etapas fazem sentido para a música.
            </p>
          </div>
        </div>
        <ul className="grid gap-3">
          {recordingReasons.map((reason) => (
            <li
              key={reason}
              className="flex items-start gap-3 rounded-lg border border-border bg-card/70 p-4"
            >
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
              <span className="text-sm">{reason}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="border-t border-border/60 bg-card/20 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            O que pode ser gravado
          </p>
          <h2 className="mt-3 font-display text-3xl uppercase leading-tight md:text-5xl">
            Serviços de áudio conectados ao projeto musical.
          </h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCards.map((service) => (
            <article
              key={service.title}
              className="rounded-xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/50"
            >
              <service.icon className="h-7 w-7 text-primary" aria-hidden="true" />
              <h3 className="mt-4 font-display text-xl uppercase">{service.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{service.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function EvaluationOffer() {
  return (
    <section className="border-t border-border/60 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-[0.95fr_1.05fr] md:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Antes do orçamento
          </p>
          <h2 className="mt-3 font-display text-3xl uppercase leading-tight md:text-5xl">
            Entenda o melhor formato de gravação para o seu projeto.
          </h2>
          <p className="mt-6 text-muted-foreground md:text-lg">
            A avaliação inicial organiza informações básicas para evitar orçamento genérico e
            reduzir retrabalho. Ela não substitui uma proposta formal, mas ajuda a definir o
            caminho.
          </p>
        </div>
        <div className="rounded-xl border-2 border-primary/45 bg-card p-6 shadow-[var(--shadow-glow)] md:p-8">
          <h3 className="font-display text-3xl uppercase">O que a avaliação busca esclarecer</h3>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              "Estágio atual da música: ideia, guia, repertório ensaiado ou material pronto.",
              "Tipo de captação: voz, instrumentos, banda, live session ou projeto híbrido.",
              "Etapas necessárias: produção, edição, mixagem, masterização e entrega.",
              "Prazo, referências e arquivos que ajudam a preparar a sessão.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a
            href="#avaliacao"
            onClick={() => trackEvent("avaliacao_projeto_click", { position: "offer" })}
            className="mt-7 inline-flex w-full items-center justify-center rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
          >
            Solicitar avaliação do meu projeto
          </a>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="como-funciona" className="border-t border-border/60 bg-card/20 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Como funciona
          </p>
          <h2 className="mt-3 font-display text-3xl uppercase leading-tight md:text-5xl">
            Um fluxo simples para sair da dúvida e chegar na sessão preparado.
          </h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {processSteps.map(([number, title, desc]) => (
            <article
              key={number}
              className="flex gap-5 rounded-xl border border-border bg-card p-6"
            >
              <span className="font-display text-4xl text-primary">{number}</span>
              <div>
                <h3 className="font-display text-lg uppercase">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
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
  return (
    <section className="border-t border-border/60 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Critérios de escolha
          </p>
          <h2 className="mt-3 font-display text-3xl uppercase leading-tight md:text-5xl">
            O que importa ao escolher onde gravar sua música.
          </h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {differentials.map((item) => (
            <article key={item.title} className="rounded-xl border border-border bg-card p-6">
              <item.icon className="h-7 w-7 text-primary" aria-hidden="true" />
              <h3 className="mt-4 font-display text-xl uppercase">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </article>
          ))}
        </div>
        <a
          href={rehearsalWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            trackEvent("ensaio_click", { number: WHATSAPP_NUMBER });
            trackEvent("whatsapp_click", { position: "rehearsal", number: WHATSAPP_NUMBER });
          }}
          className="mt-8 inline-flex items-center justify-center rounded-md border border-primary/50 px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
        >
          Reservar horário de ensaio
        </a>
      </div>
    </section>
  );
}

function Materials() {
  return (
    <section id="materiais" className="border-t border-border/60 bg-card/20 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Materiais reais
            </p>
            <h2 className="mt-3 font-display text-3xl uppercase leading-tight md:text-5xl">
              Espaços reservados para prova social, enquanto o cara de tabaco não me envia.
            </h2>
            <p className="mt-6 text-muted-foreground md:text-lg">
              Fotos, depoimentos, avaliações e portfólio entrarão apenas quando forem fornecidos ou
              autorizados pelo cliente.
            </p>
            <div className="mt-8 grid gap-3">
              {materialPlaceholders.map((item) => (
                <article
                  key={item.title}
                  className="rounded-lg border border-dashed border-primary/45 bg-background/50 p-4"
                >
                  <div className="flex items-start gap-3">
                    <item.icon
                      className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-display text-lg uppercase">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {galleryImages.map((image, index) => (
              <figure
                key={`${image.src}-${index}`}
                className="overflow-hidden rounded-lg border border-border bg-card"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="aspect-square h-full w-full object-cover"
                  width={480}
                  height={480}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ))}
            <div className="flex min-h-36 items-center justify-center rounded-lg border border-dashed border-primary/45 bg-background/50 p-4 text-center text-sm text-muted-foreground">
              Placeholder para foto real, avaliação ou trecho autorizado.
            </div>
          </div>
        </div>
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("instagram_click", { position: "materials" })}
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <Instagram className="h-4 w-4" />
          Ver Instagram do Carambolo Studio
        </a>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="border-t border-border/60 bg-card/20 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">FAQ</p>
        <h2 className="mt-3 font-display text-3xl uppercase md:text-5xl">Perguntas frequentes</h2>
        <div className="mt-10 divide-y divide-border rounded-xl border border-border bg-card">
          {faqs.map(([question, answer], index) => (
            <button
              key={question}
              type="button"
              onClick={() => setOpen(open === index ? -1 : index)}
              className="w-full px-5 py-5 text-left transition hover:bg-secondary/40"
              aria-expanded={open === index}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-display text-base uppercase md:text-lg">{question}</span>
                <ChevronDown
                  className={`mt-1 h-5 w-5 shrink-0 text-primary transition ${open === index ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </div>
              {open === index && <p className="mt-3 text-sm text-muted-foreground">{answer}</p>}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-border/60 py-20 md:py-32">
      <div className="absolute inset-0 -z-10">
        <img
          src={galConsole}
          alt=""
          className="h-full w-full object-cover opacity-20"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-background/82" />
      </div>
      <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
        <h2 className="font-display text-3xl uppercase leading-tight md:text-6xl">
          Quer gravar sua música com um caminho técnico mais claro?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-muted-foreground md:text-lg">
          Envie as informações do projeto e receba uma orientação inicial sobre captação, sessão e
          etapas de finalização.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="#avaliacao"
            onClick={() => trackEvent("avaliacao_projeto_click", { position: "final" })}
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:brightness-110"
          >
            Solicitar avaliação do meu projeto
          </a>
          <a
            href={defaultWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("whatsapp_click", { position: "final", number: WHATSAPP_NUMBER })
            }
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background/70 px-8 py-4 text-base font-semibold text-foreground transition hover:border-primary/60"
          >
            <MessageCircle className="h-5 w-5" />
            Falar com o produtor
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img
              src={logoAsset.url}
              alt="Carambolo Studio"
              className="h-12 w-12 rounded-md object-contain"
              width={48}
              height={48}
            />
            <div>
              <p className="font-display text-xl">
                CARAMBOLO <span className="text-primary">STUDIO</span>
              </p>
              <p className="text-xs text-muted-foreground">Gravação musical em Teresina/PI</p>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            Do rascunho ao arquivo final: direção técnica, captação profissional e orientação em
            cada etapa.
          </p>
        </div>
        <div className="space-y-3 text-sm">
          <p className="font-display text-xs uppercase tracking-widest text-primary">Contato</p>
          <a
            href={defaultWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("whatsapp_click", { position: "footer", number: WHATSAPP_NUMBER })
            }
            className="flex items-start gap-2 text-muted-foreground hover:text-primary"
          >
            <Phone className="mt-0.5 h-4 w-4 shrink-0" />
            (86) 99994-7314
          </a>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("instagram_click", { position: "footer" })}
            className="flex items-start gap-2 text-muted-foreground hover:text-primary"
          >
            <Instagram className="mt-0.5 h-4 w-4 shrink-0" />
            @carambolostudio
          </a>
        </div>
        <div className="space-y-3 text-sm">
          <p className="font-display text-xs uppercase tracking-widest text-primary">Endereço</p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("map_click", { position: "footer" })}
            className="flex items-start gap-2 text-muted-foreground hover:text-primary"
          >
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              Av. Fernando Pires Leal, 3901
              <br />
              Recanto das Palmeiras
              <br />
              Teresina/PI
            </span>
          </a>
          <p className="text-muted-foreground">Atendimento sob agendamento.</p>
        </div>
      </div>
      <div className="overflow-hidden border-t border-border">
        <iframe
          title="Localização do Carambolo Studio no mapa"
          loading="lazy"
          src="https://maps.google.com/maps?q=Av.%20Fernando%20Pires%20Leal%2C%203901%2C%20Teresina%20PI&t=&z=15&ie=UTF8&iwloc=&output=embed"
          className="h-64 w-full grayscale"
          onLoad={() => trackEvent("map_click", { position: "embed_loaded" })}
        />
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-muted-foreground md:flex-row md:px-6">
          <p>© {new Date().getFullYear()} Carambolo Studio. Todos os direitos reservados.</p>
          <p>Política de privacidade e termos: inserir URLs oficiais quando disponíveis.</p>
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
