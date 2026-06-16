import { createFileRoute } from "@tanstack/react-router";

import heroPreload768 from "@/assets/optimized/hero-studio-768.avif";
import heroPreload1280 from "@/assets/optimized/hero-studio-1280.avif";
import heroPreload1600 from "@/assets/optimized/hero-studio-1600.avif";
import heroPreview from "@/assets/optimized/hero-studio-1600.jpg";
import { LandingPage } from "@/components/landing/LandingPage";

const pageTitle = "Carambolo Studio | Gravação Musical em Teresina";
const pageDescription =
  "Grave sua música em Teresina com direção técnica, captação profissional e orientação do rascunho ao arquivo final. Solicite uma avaliação inicial do seu projeto.";
// Trocar por URL absoluta quando o domínio final estiver definido.
const canonicalHref = "/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: pageTitle },
      { name: "description", content: pageDescription },
      {
        name: "keywords",
        content:
          "estúdio de gravação em Teresina, gravação musical, captação vocal, produção musical, mixagem, masterização, Carambolo Studio",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: pageDescription },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:url", content: canonicalHref },
      { property: "og:image", content: heroPreview },
      { name: "twitter:title", content: pageTitle },
      { name: "twitter:description", content: pageDescription },
      { name: "twitter:image", content: heroPreview },
    ],
    links: [
      { rel: "canonical", href: canonicalHref },
      {
        rel: "preload",
        href: heroPreload1600,
        as: "image",
        type: "image/avif",
        imageSrcSet: `${heroPreload768} 768w, ${heroPreload1280} 1280w, ${heroPreload1600} 1600w`,
        imageSizes: "100vw",
      },
    ],
  }),
  component: LandingPage,
});
