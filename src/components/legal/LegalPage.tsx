import { Link } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

type LegalPageProps = {
  title: string;
  updatedAt: string;
  children: string;
};

export function LegalPage({ title, updatedAt, children }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-background text-foreground noise-bg">
      <section className="border-b border-border/60 bg-card/20 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <Link
            to="/"
            className="text-sm font-semibold text-primary transition hover:underline"
          >
            ← Voltar para o site
          </Link>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Carambolo Studio
          </p>

          <h1 className="mt-3 font-display text-4xl uppercase leading-tight md:text-6xl">
            {title}
          </h1>

          <p className="mt-4 text-sm text-muted-foreground">
            Última atualização: {updatedAt}
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <article className="mx-auto max-w-4xl px-4 text-sm leading-7 text-muted-foreground md:px-6 md:text-base md:leading-8">
          <ReactMarkdown
            remarkPlugins={[remarkBreaks]}
            components={{
              h1: ({ children }) => (
                <h2 className="mb-6 mt-2 font-display text-3xl uppercase leading-tight text-foreground md:text-4xl">
                  {children}
                </h2>
              ),
              h2: ({ children }) => (
                <h3 className="mb-4 mt-10 text-xl font-bold text-foreground">
                  {children}
                </h3>
              ),
              h3: ({ children }) => (
                <h4 className="mb-3 mt-8 text-lg font-semibold text-foreground">
                  {children}
                </h4>
              ),
              p: ({ children }) => (
                <p className="mb-5 text-muted-foreground">{children}</p>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-foreground">
                  {children}
                </strong>
              ),
              a: ({ children, href }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary underline underline-offset-4"
                >
                  {children}
                </a>
              ),
              ul: ({ children }) => (
                <ul className="mb-5 ml-6 list-disc space-y-2">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-5 ml-6 list-decimal space-y-2">{children}</ol>
              ),
              li: ({ children }) => <li>{children}</li>,
            }}
          >
            {children}
          </ReactMarkdown>
        </article>
      </section>
    </main>
  );
}