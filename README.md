# Carambolo Studio Landing Page

Landing page institucional do **Carambolo Studio**, focada em captação de leads para gravação musical, produção, ensaio e podcast em Teresina/PI.

O projeto apresenta os serviços do estúdio, explica o processo de avaliação inicial e envia os dados do formulário diretamente para o WhatsApp com uma mensagem pré-preenchida.

## Tecnologias

- React 19
- TypeScript
- Vite
- TanStack Start / TanStack Router
- Tailwind CSS 4
- Radix UI
- Lucide React
- ESLint
- Prettier

## Requisitos

- Node.js instalado
- npm instalado

> O projeto já possui `package-lock.json`, então o gerenciador recomendado é o `npm`.

## Como rodar localmente

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Depois, acesse a URL exibida no terminal. Em geral:

```bash
http://localhost:5173
```

## Scripts disponíveis

```bash
npm run dev
```

Roda o projeto em modo desenvolvimento.

```bash
npm run build
```

Gera a versão de produção.

```bash
npm run build:dev
```

Gera o build usando o modo de desenvolvimento.

```bash
npm run preview
```

Executa uma prévia local do build.

```bash
npm run lint
```

Executa a análise com ESLint.

```bash
npm run format
```

Formata os arquivos com Prettier.

## Estrutura principal

```txt
src/
  assets/                  # Imagens, logo e arquivos visuais da landing page
  components/
    landing/               # Componentes principais da landing page
      LandingPage.tsx      # Estrutura visual e seções da página
      LeadForm.tsx         # Formulário de avaliação inicial
      data.ts              # Textos, cards, FAQs e listas de conteúdo
      tracking.ts          # Função de disparo de eventos
      whatsapp.ts          # Configuração e montagem dos links do WhatsApp
    ui/                    # Componentes reutilizáveis de interface
  hooks/                   # Hooks auxiliares
  lib/                     # Utilitários e configurações
  routes/                  # Rotas do TanStack Router
  styles.css               # Estilos globais e tema visual
```

## Principais seções da landing page

- Hero com chamada principal para gravação musical
- Bloco de foco em gravação e orientação técnica
- Cards de serviços
- Oferta de avaliação inicial
- Etapas de funcionamento
- Diferenciais do estúdio
- Materiais e placeholders para assets reais
- Formulário de lead com abertura automática do WhatsApp
- FAQ
- CTA final
- Rodapé com Instagram, WhatsApp, endereço e mapa

## Formulário e WhatsApp

O formulário fica em:

```txt
src/components/landing/LeadForm.tsx
```

Ao enviar, ele:

1. coleta os dados preenchidos;
2. monta uma mensagem estruturada;
3. dispara eventos de tracking;
4. abre o WhatsApp com a mensagem pronta para envio.

O número e os links do WhatsApp ficam em:

```txt
src/components/landing/whatsapp.ts
```

## Conteúdo editável

Textos, listas, cards, etapas e FAQs podem ser ajustados principalmente em:

```txt
src/components/landing/data.ts
```

As seções visuais, CTAs, links externos, endereço, Instagram e mapa ficam em:

```txt
src/components/landing/LandingPage.tsx
```

Metadados de SEO, título da página, descrição, canonical e Open Graph ficam em:

```txt
src/routes/index.tsx
```

## Assets

As imagens usadas pela landing page ficam em:

```txt
src/assets/
```

Também existe a pasta:

```txt
logotipos/
```

Use essas pastas para substituir imagens temporárias por fotos reais do estúdio, portfólio, bastidores, depoimentos e identidade final do cliente.

## SEO

A rota inicial configura:

- título da página;
- descrição;
- palavras-chave;
- canonical;
- tags Open Graph;
- tags Twitter;
- preload da imagem principal.

Antes de publicar, ajuste o `canonicalHref` em `src/routes/index.tsx` para a URL absoluta do domínio final.

## Tracking

Os principais cliques e interações chamam a função `trackEvent`, localizada em:

```txt
src/components/landing/tracking.ts
```

Atualmente, ela centraliza os eventos para facilitar integração futura com ferramentas como Google Analytics, Meta Pixel, Tag Manager ou outra solução de mensuração.

## Build de produção

Para gerar os arquivos de produção:

```bash
npm run build
```

Para testar o resultado localmente:

```bash
npm run preview
```

## Checklist antes da publicação

- Substituir imagens placeholder por assets reais do Carambolo Studio
- Confirmar número oficial do WhatsApp
- Confirmar endereço e link do mapa
- Ajustar domínio final no `canonicalHref`
- Inserir URLs oficiais de política de privacidade e termos
- Integrar ferramenta de analytics/tracking, se necessário
- Rodar `npm run lint`
- Rodar `npm run build`

## Status

O projeto está pronto para receber os assets reais, ajustes finais de conteúdo, domínio definitivo e integrações de tracking.
