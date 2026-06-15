import { Link } from "@tanstack/react-router";

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
        <article className="mx-auto max-w-4xl whitespace-pre-wrap px-4 text-sm leading-7 text-muted-foreground md:px-6 md:text-base md:leading-8">
          {children}
        </article>
      </section>
    </main>
  );
}