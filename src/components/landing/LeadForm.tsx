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
      return "Olá, quero solicitar uma avaliação para gravação de podcast no Carambolo Studio.";

    case "Ensaio":
      return "Olá, quero reservar um horário de ensaio no Carambolo Studio.";

    case "Gravação":
      return "Olá, quero solicitar uma avaliação para gravação musical no Carambolo Studio.";

    case "Produção musical":
      return "Olá, quero solicitar uma avaliação para produção musical no Carambolo Studio.";

    case "Outro":
      return "Olá, quero solicitar uma avaliação no Carambolo Studio.";

    default:
      return "Olá, quero solicitar uma avaliação no Carambolo Studio.";
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
      `Precisa de filmagem: ${clean(form.filmagem)}`,
    );
  }

  lines.push(`Detalhes adicionais: ${clean(form.detalhes)}`);

  return lines.join("\n");
}

export function LeadForm() {
  const [form, setForm] = useState<LeadFormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);

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
    trackEvent("form_submit", {
      service: form.servico || "not_provided",
      projectType: form.tipoProjeto || "not_provided",
      hasInstagram: Boolean(form.instagram.trim()),
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
    <section id="avaliacao" className="border-t border-border/60 bg-card/20 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Avaliação inicial
          </p>
          <h2 className="mt-3 font-display text-3xl uppercase leading-tight md:text-5xl">
            Solicitar avaliação do meu projeto
          </h2>
          <p className="mt-3 text-muted-foreground">
            Responda as perguntas principais e o WhatsApp abrirá com uma mensagem pronta para o
            produtor entender seu projeto.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Campos marcados com * são obrigatórios.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-10 space-y-5 rounded-xl border border-border bg-card p-5 md:p-8"
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
            Serviço de interesse*
            <select
              required
              className={inputClass}
              value={form.servico}
              onChange={(event) => setField("servico", event.target.value)}
            >
              <option value="">Selecione uma opção</option>
              <option>Gravação</option>
              <option>Produção musical</option>
              <option>Ensaio</option>
              <option>Podcast</option>
              <option>Outro</option>
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
                  <option>Banda</option>
                  <option>Single</option>
                  <option>EP</option>
                  <option>Álbum</option>
                  <option>Live session</option>
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
                  <option>Tenho uma ideia inicial</option>
                  <option>Tenho guia ou rascunho gravado</option>
                  <option>Tenho letra e melodia prontas</option>
                  <option>A banda já ensaiou o repertório</option>
                  <option>Preciso de ajuda para estruturar</option>
                </select>
              </label>
              <div className="grid gap-5 md:grid-cols-2">
                <label className={labelClass}>
                  Formato desejado
                  <select
                    className={inputClass}
                    value={form.formato}
                    onChange={(event) => setField("formato", event.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option>Captação simples</option>
                    <option>Captação com edição</option>
                    <option>Projeto com mixagem</option>
                    <option>Projeto completo</option>
                    <option>Quero orientação</option>
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
                  placeholder="Artistas, músicas ou sonoridades que ajudam a explicar o projeto"
                />
              </label>
            </div>
          )}

          {isProduction && (
            <fieldset className="rounded-lg border border-border bg-background/50 p-5">
              <legend className="px-1 text-sm font-medium text-foreground">
                Você acredita que precisa de quais etapas?
              </legend>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  "Arranjo",
                  "Beat",
                  "Músicos",
                  "Captação",
                  "Edição",
                  "Mixagem",
                  "Masterização",
                  "Projeto completo",
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
              Quantas horas você imagina reservar?
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
                Precisa de filmagem?
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
              placeholder="Conte o que quer gravar, dúvidas, agenda ou qualquer informação importante"
            />
          </label>

          <button
            type="submit"
            onClick={() =>
              trackEvent("avaliacao_projeto_click", { service: form.servico || "empty" })
            }
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            <MessageCircle className="h-4 w-4" />
            Enviar meu projeto
          </button>

          <p className="text-center text-xs text-muted-foreground" aria-live="polite">
            {submitted
              ? "WhatsApp aberto com os dados do formulário. Se o navegador bloqueou, toque novamente no botão."
              : "As informações serão usadas apenas para iniciar a conversa no WhatsApp."}
          </p>
        </form>
      </div>
    </section>
  );
}
