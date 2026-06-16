import { FormEvent, useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";

import { trackEvent } from "./tracking";
import { createWhatsAppUrl } from "./whatsapp";

type LeadFormState = {
  nome: string;
  whatsapp: string;
  cidade: string;
  instagram: string;
  servico: string;
  tipoProjeto: string;
  etapaMusica: string;
  formato: string;
  referencias: string;
  prazo: string;
  necessidades: string[];
  horasEnsaio: string;
  pessoasPodcast: string;
  filmagem: string;
  detalhes: string;
};

const initialForm: LeadFormState = {
  nome: "",
  whatsapp: "",
  cidade: "",
  instagram: "",
  servico: "",
  tipoProjeto: "",
  etapaMusica: "",
  formato: "",
  referencias: "",
  prazo: "",
  necessidades: [],
  horasEnsaio: "",
  pessoasPodcast: "",
  filmagem: "",
  detalhes: "",
};

const inputClass =
  "mt-2 min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/30";

const labelClass = "text-sm font-medium text-foreground";

function clean(value: string) {
  return value.trim() || "Não informado";
}

function getMessageIntro(servico: string) {
  switch (servico) {
    case "Podcast":
      return "Olá, quero receber uma orientação para gravar podcast, locução ou conteúdo falado no Carambolo Studio.";

    case "Ensaio":
      return "Olá, quero consultar horários para ensaio no Carambolo Studio.";

    case "Gravação":
      return "Olá, quero receber uma avaliação inicial para gravar minha música no Carambolo Studio.";

    case "Produção musical":
      return "Olá, quero receber uma orientação para produção musical no Carambolo Studio.";

    case "Outro":
      return "Olá, quero conversar sobre um projeto de áudio no Carambolo Studio.";

    default:
      return "Olá, quero receber uma avaliação inicial no Carambolo Studio.";
  }
}

function buildWhatsAppMessage(form: LeadFormState) {
  const lines = [
    getMessageIntro(form.servico),
    "",
    `Nome: ${clean(form.nome)}`,
    `WhatsApp: ${clean(form.whatsapp)}`,
    `Cidade/Estado: ${clean(form.cidade)}`,
    `Instagram: ${clean(form.instagram)}`,
    `Serviço escolhido: ${clean(form.servico)}`,
  ];

  if (form.servico === "Gravação" || form.servico === "Produção musical") {
    lines.push(
      `Tipo de projeto: ${clean(form.tipoProjeto)}`,
      `Etapa da música: ${clean(form.etapaMusica)}`,
      `Formato desejado: ${clean(form.formato)}`,
      `Referências: ${clean(form.referencias)}`,
      `Prazo desejado: ${clean(form.prazo)}`,
    );
  }

  if (form.servico === "Produção musical") {
    lines.push(
      `Necessidades: ${form.necessidades.length ? form.necessidades.join(", ") : "Não informado"}`,
    );
  }

  if (form.servico === "Ensaio") {
    lines.push(`Horas previstas: ${clean(form.horasEnsaio)}`);
  }

  if (form.servico === "Podcast") {
    lines.push(
      `Quantidade de pessoas: ${clean(form.pessoasPodcast)}`,
      `Vídeo/filmagem: ${clean(form.filmagem)}`,
    );
  }

  lines.push(
    `Detalhes adicionais: ${clean(form.detalhes)}`,
    "",
    "Confirmação: li e concordo com os Termos de Uso e a Política de Privacidade do Carambolo Studio.",
    "",
    "Gostaria de entender o melhor formato, prazo e orçamento para esse projeto.",
  );

  return lines.join("\n");
}

export function LeadForm() {
  const [form, setForm] = useState<LeadFormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [acceptedLegal, setAcceptedLegal] = useState(false);
  const [legalError, setLegalError] = useState("");

  const whatsappUrl = useMemo(() => createWhatsAppUrl(buildWhatsAppMessage(form)), [form]);

  function setField<K extends keyof LeadFormState>(field: K, value: LeadFormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function toggleNeed(need: string) {
    setForm((current) => ({
      ...current,
      necessidades: current.necessidades.includes(need)
        ? current.necessidades.filter((item) => item !== need)
        : [...current.necessidades, need],
    }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!acceptedLegal) {
      setLegalError(
        "Você precisa aceitar os Termos de Uso e a Política de Privacidade antes de enviar.",
      );

      trackEvent("legal_acceptance_missing", {
        service: form.servico || "not_provided",
      });

      return;
    }

    setLegalError("");

    trackEvent("form_submit", {
      service: form.servico || "not_provided",
      projectType: form.tipoProjeto || "not_provided",
      hasInstagram: Boolean(form.instagram.trim()),
      legalAccepted: true,
    });

    trackEvent("avaliacao_projeto_click", {
      service: form.servico || "empty",
      legalAccepted: true,
    });

    setSubmitted(true);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  const isRecording = form.servico === "Gravação";
  const isProduction = form.servico === "Produção musical";
  const isPodcast = form.servico === "Podcast";
  const isRehearsal = form.servico === "Ensaio";
  const isOther = form.servico === "Outro";

  return (
    <section
      id="avaliacao"
      className="relative overflow-hidden border-t border-border/60 bg-background py-16 md:py-24"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,oklch(0.72_0.16_85/0.12),transparent_36%)]" />

      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Avaliação inicial
          </p>

          <h2 className="mt-4 font-display text-3xl uppercase leading-tight md:text-5xl">
            Receba uma orientação inicial para o seu projeto
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Preencha o briefing e fale com o produtor pelo WhatsApp.
          </p>
        </div>

        <div className="relative mt-10">
          <div className="pointer-events-none absolute -inset-[1px] overflow-hidden rounded-xl">
            <div className="absolute -inset-1 rounded-xl bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_288deg,rgba(250,204,21,0.95)_318deg,rgba(250,204,21,0.45)_338deg,transparent_360deg)] opacity-90 animate-[spin_5s_linear_infinite] motion-reduce:animate-none" />
            <div className="absolute -inset-1 rounded-xl bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_288deg,rgba(250,204,21,0.85)_318deg,rgba(250,204,21,0.25)_338deg,transparent_360deg)] opacity-60 blur-md animate-[spin_5s_linear_infinite] motion-reduce:animate-none" />
          </div>

          <form
            onSubmit={onSubmit}
            className="relative z-10 space-y-5 rounded-xl border border-primary/20 bg-card p-5 md:p-8"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <label className={labelClass}>
                Nome*
                <input
                  required
                  maxLength={100}
                  className={inputClass}
                  value={form.nome}
                  onChange={(event) => setField("nome", event.target.value)}
                  placeholder="Seu nome completo"
                  autoComplete="name"
                />
              </label>

              <label className={labelClass}>
                WhatsApp*
                <input
                  required
                  maxLength={20}
                  className={inputClass}
                  value={form.whatsapp}
                  onChange={(event) => setField("whatsapp", event.target.value)}
                  placeholder="(86) 99999-9999"
                  inputMode="tel"
                  autoComplete="tel"
                />
              </label>

              <label className={labelClass}>
                Cidade/Estado*
                <input
                  required
                  maxLength={80}
                  className={inputClass}
                  value={form.cidade}
                  onChange={(event) => setField("cidade", event.target.value)}
                  placeholder="Teresina/PI"
                  autoComplete="address-level2"
                />
              </label>

              <label className={labelClass}>
                Instagram
                <input
                  maxLength={80}
                  className={inputClass}
                  value={form.instagram}
                  onChange={(event) => setField("instagram", event.target.value)}
                  placeholder="@seuarroba ou link do perfil"
                />
              </label>
            </div>

            <label className={labelClass}>
              Quero falar sobre*
              <select
                required
                className={inputClass}
                value={form.servico}
                onChange={(event) => setField("servico", event.target.value)}
              >
                <option value="">Selecione uma opção</option>
                <option value="Gravação">Gravar uma música</option>
                <option value="Produção musical">Produção musical</option>
                <option value="Ensaio">Ensaio de banda ou artista</option>
                <option value="Podcast">Podcast, locução ou voz</option>
                <option value="Outro">Outro projeto de áudio</option>
              </select>
            </label>

            {(isRecording || isProduction) && (
              <div className="space-y-5 rounded-lg border border-border bg-background/50 p-5">
                <label className={labelClass}>
                  Tipo de projeto
                  <select
                    className={inputClass}
                    value={form.tipoProjeto}
                    onChange={(event) => setField("tipoProjeto", event.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option>Voz</option>
                    <option>Instrumento</option>
                    <option>Banda completa</option>
                    <option>Single</option>
                    <option>EP ou repertório curto</option>
                    <option>Álbum</option>
                    <option>Live session</option>
                    <option>Não sei ainda</option>
                  </select>
                </label>

                <label className={labelClass}>
                  Em que etapa a música está?
                  <select
                    className={inputClass}
                    value={form.etapaMusica}
                    onChange={(event) => setField("etapaMusica", event.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option>Tenho apenas uma ideia inicial</option>
                    <option>Tenho guia ou rascunho gravado no celular</option>
                    <option>Tenho letra e melodia prontas</option>
                    <option>A música já está ensaiada</option>
                    <option>A banda já tem repertório definido</option>
                    <option>Preciso de ajuda para estruturar a música</option>
                  </select>
                </label>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className={labelClass}>
                    Você já sabe o que precisa?
                    <select
                      className={inputClass}
                      value={form.formato}
                      onChange={(event) => setField("formato", event.target.value)}
                    >
                      <option value="">Selecione</option>
                      <option>Quero apenas gravar voz ou instrumento</option>
                      <option>Quero gravar e editar</option>
                      <option>Quero gravar, mixar e masterizar</option>
                      <option>Quero um projeto completo</option>
                      <option>Não sei ainda, preciso de orientação</option>
                    </select>
                  </label>

                  <label className={labelClass}>
                    Prazo desejado
                    <select
                      className={inputClass}
                      value={form.prazo}
                      onChange={(event) => setField("prazo", event.target.value)}
                    >
                      <option value="">Selecione</option>
                      <option>O quanto antes</option>
                      <option>Até 15 dias</option>
                      <option>Até 30 dias</option>
                      <option>Tenho uma data de lançamento</option>
                      <option>Sem data definida</option>
                    </select>
                  </label>
                </div>

                <label className={labelClass}>
                  Referências musicais
                  <textarea
                    maxLength={400}
                    rows={3}
                    className={inputClass}
                    value={form.referencias}
                    onChange={(event) => setField("referencias", event.target.value)}
                    placeholder="Artistas, músicas, links ou estilos que ajudam a explicar o som que você quer alcançar"
                  />
                </label>
              </div>
            )}

            {isProduction && (
              <fieldset className="rounded-lg border border-border bg-background/50 p-5">
                <legend className="px-1 text-sm font-medium text-foreground">
                  Quais etapas você imagina que o projeto precisa?
                </legend>

                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {[
                    "Arranjo",
                    "Beat/base instrumental",
                    "Músicos",
                    "Captação",
                    "Edição",
                    "Afinação vocal",
                    "Mixagem",
                    "Masterização",
                    "Projeto completo",
                    "Não sei ainda",
                  ].map((need) => (
                    <label
                      key={need}
                      className="flex cursor-pointer items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/10"
                    >
                      <input
                        type="checkbox"
                        className="accent-primary"
                        checked={form.necessidades.includes(need)}
                        onChange={() => toggleNeed(need)}
                      />
                      {need}
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {isRehearsal && (
              <label className={labelClass}>
                Quantas horas pretende reservar?
                <select
                  className={inputClass}
                  value={form.horasEnsaio}
                  onChange={(event) => setField("horasEnsaio", event.target.value)}
                >
                  <option value="">Selecione</option>
                  {Array.from({ length: 12 }, (_, index) => `${index + 1}h`).map((hours) => (
                    <option key={hours}>{hours}</option>
                  ))}
                </select>
              </label>
            )}

            {isPodcast && (
              <div className="grid gap-5 md:grid-cols-2">
                <label className={labelClass}>
                  Quantidade de pessoas
                  <input
                    className={inputClass}
                    value={form.pessoasPodcast}
                    onChange={(event) => setField("pessoasPodcast", event.target.value)}
                    placeholder="Ex.: 2 hosts e 1 convidado"
                  />
                </label>

                <label className={labelClass}>
                  Quer falar também sobre vídeo/filmagem?
                  <select
                    className={inputClass}
                    value={form.filmagem}
                    onChange={(event) => setField("filmagem", event.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option>Sim</option>
                    <option>Não</option>
                    <option>Quero entender as opções</option>
                  </select>
                </label>
              </div>
            )}

            <label className={labelClass}>
              {isOther ? "Conte livremente o que você precisa" : "Detalhes adicionais"}
              <textarea
                maxLength={600}
                rows={4}
                className={inputClass}
                value={form.detalhes}
                onChange={(event) => setField("detalhes", event.target.value)}
                placeholder="Conte o que você quer gravar, em que ponto o projeto está, se já tem referência e qual resultado espera alcançar."
              />
            </label>

            <div>
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-background/50 p-4 text-left text-sm leading-6 text-muted-foreground transition has-[:checked]:border-primary/60 has-[:checked]:bg-primary/10">
                <input
                  type="checkbox"
                  required
                  checked={acceptedLegal}
                  onChange={(event) => {
                    setAcceptedLegal(event.target.checked);

                    if (event.target.checked) {
                      setLegalError("");
                    }
                  }}
                  onInvalid={(event) => {
                    event.preventDefault();
                    setLegalError(
                      "Você precisa aceitar os Termos de Uso e a Política de Privacidade antes de enviar.",
                    );
                  }}
                  aria-describedby={legalError ? "legal-consent-error" : "legal-consent-help"}
                  className="mt-1 h-4 w-4 shrink-0 accent-primary"
                />

                <span id="legal-consent-help">
                  Li e concordo com os{" "}
                  <a
                    href="/termos-de-uso"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    Termos de Uso
                  </a>{" "}
                  e com a{" "}
                  <a
                    href="/politica-de-privacidade"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    Política de Privacidade
                  </a>
                  . Estou ciente de que meus dados serão usados para atendimento e avaliação inicial
                  do projeto.
                </span>
              </label>

              {legalError && (
                <p
                  id="legal-consent-error"
                  role="alert"
                  className="mt-2 text-sm font-medium text-red-400"
                >
                  {legalError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            >
              <MessageCircle className="h-4 w-4" />
              Receber avaliação no WhatsApp
            </button>

            <p className="text-center text-xs text-muted-foreground" aria-live="polite">
              {submitted
                ? "O WhatsApp foi aberto com sua mensagem pronta. Se o navegador bloqueou a abertura, toque novamente no botão."
                : "As informações servem apenas para o produtor entender seu projeto antes da primeira resposta."}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
