# Carambolo Studio Landing Page

Landing page institucional do **Carambolo Studio**, focada em captação de leads para gravação musical, produção musical, ensaio, podcast, locução e projetos de áudio em Teresina/PI.

O projeto apresenta os serviços do estúdio, explica o processo de avaliação inicial, exibe prova social com avaliações do Google e envia os dados do formulário diretamente para o WhatsApp com mensagem pré-preenchida.

## Tecnologias

* React 19
* TypeScript
* Vite
* Tailwind CSS 4
* Radix UI
* Lucide React
* ESLint
* Prettier
* Vercel

## Requisitos

* Node.js instalado
* npm instalado

O projeto possui `package-lock.json`, portanto o gerenciador recomendado é o `npm`.

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

Gera a versão de produção em `dist/`.

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

```bash
npm run api
```

Executa localmente a API auxiliar de avaliações do Google em:

```txt
http://localhost:3333
```

## Estrutura principal

```txt
src/
  assets/                  # Imagens, logo e arquivos visuais da landing page
  components/
    landing/               # Componentes principais da landing page
      IntroLoader.tsx      # Tela inicial de carregamento
      LandingPage.tsx      # Estrutura visual e seções da página
      LeadForm.tsx         # Formulário de avaliação inicial
      data.ts              # Textos, cards, FAQs, etapas e listas de conteúdo
      tracking.ts          # Função de disparo de eventos
      whatsapp.ts          # Configuração e montagem dos links do WhatsApp
    ui/                    # Componentes reutilizáveis de interface
  hooks/                   # Hooks auxiliares
  lib/                     # Utilitários e configurações
  main.tsx                 # Entrada principal da aplicação React
  styles.css               # Estilos globais e tema visual

public/
  data/
    google-reviews.json    # Cache público usado pela landing para exibir avaliações

server/
  google-reviews.cjs       # Script/API local para buscar e cachear avaliações do Google
  find-place-id.cjs        # Script auxiliar para localizar Place ID
  cache/
    google-reviews-cache.json
```

## Principais seções da landing page

* Intro loader com transição inicial
* Header com menu lateral compacto
* Hero com chamada principal para gravação musical
* Bloco de foco em gravação e orientação técnica
* Cards de serviços
* Sala de ensaio
* Oferta de avaliação inicial gratuita
* Etapas de funcionamento
* Diferenciais do estúdio
* Galeria de imagens
* Prova social com avaliações do Google
* Área externa e estacionamento
* Formulário de lead com abertura automática do WhatsApp
* FAQ
* CTA final
* Rodapé com Instagram, WhatsApp, endereço e mapa

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

Textos, listas, cards, etapas, diferenciais e FAQs podem ser ajustados principalmente em:

```txt
src/components/landing/data.ts
```

As seções visuais, CTAs, links externos, endereço, Instagram, mapa e estrutura geral ficam em:

```txt
src/components/landing/LandingPage.tsx
```

O formulário fica em:

```txt
src/components/landing/LeadForm.tsx
```

Os metadados principais de SEO ficam em:

```txt
index.html
```

## Avaliações do Google

A landing page está publicada como site estático. Por isso, ela não consome diretamente uma rota `/api` em produção.

As avaliações exibidas na página são carregadas a partir de:

```txt
public/data/google-reviews.json
```

Esse arquivo é gerado a partir do cache localizado em:

```txt
server/cache/google-reviews-cache.json
```

Para atualizar o JSON público manualmente:

```bash
mkdir -p public/data
cp server/cache/google-reviews-cache.json public/data/google-reviews.json
```

Depois rode:

```bash
npm run build
```

E publique as alterações:

```bash
git add -A
git commit -m "Atualiza cache público das avaliações do Google"
git push
```

## API local de avaliações do Google

O arquivo:

```txt
server/google-reviews.cjs
```

executa uma API local para buscar avaliações via Google Places API e salvar cache semanal.

Para usar localmente, crie um arquivo `.env` na raiz do projeto com:

```env
GOOGLE_PLACES_API_KEY=
GOOGLE_PLACE_ID=
API_PORT=3333
```

Depois rode:

```bash
npm run api
```

A API local ficará disponível em:

```txt
http://localhost:3333/api/google-reviews
```

O `.env` não deve ser enviado ao GitHub.

Use o arquivo `.env.example` apenas como modelo de variáveis necessárias.

## Assets

As imagens usadas pela landing page ficam em:

```txt
src/assets/
```

Imagens públicas ou arquivos estáticos acessados diretamente pelo navegador ficam em:

```txt
public/
```

## SEO

O arquivo `index.html` configura:

* título da página;
* descrição;
* palavras-chave;
* robots;
* tags Open Graph;
* tags Twitter;
* viewport;
* idioma da página.

Antes da publicação definitiva em domínio próprio, ajuste os metadados para incluir a URL final do domínio.

O rodapé também inclui marcação estruturada `LocalBusiness` via JSON-LD dentro de `LandingPage.tsx`.

## Tracking

Os principais cliques e interações chamam a função `trackEvent`, localizada em:

```txt
src/components/landing/tracking.ts
```

Atualmente, ela centraliza eventos para facilitar integração futura com ferramentas como:

* Google Analytics 4;
* Google Tag Manager;
* Meta Pixel;
* outra solução de mensuração.

## Deploy na Vercel

O projeto deve ser configurado na Vercel como aplicação Vite estática.

Configuração recomendada:

```txt
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

Não usar `TanStack Start` como preset neste projeto, pois a landing foi convertida para build estático com Vite.

## Build de produção

Para gerar os arquivos de produção:

```bash
npm run build
```

O build final será gerado em:

```txt
dist/
```

Para testar o resultado localmente:

```bash
npm run preview
```

## Fluxo de versionamento

Antes de alterações grandes, recomenda-se criar uma tag e uma branch de backup:

```bash
git tag antes-alteracao-landing
git branch backup/antes-alteracao-landing
git push origin antes-alteracao-landing
git push origin backup/antes-alteracao-landing
```

Para restaurar arquivos específicos de uma versão anterior:

```bash
git restore --source=antes-alteracao-landing -- src/components/landing/LandingPage.tsx
```

Para restaurar também formulário e dados:

```bash
git restore --source=antes-alteracao-landing -- src/components/landing/LandingPage.tsx src/components/landing/LeadForm.tsx src/components/landing/data.ts
```

## Checklist antes da publicação

* Confirmar número oficial do WhatsApp
* Confirmar endereço e link do mapa
* Confirmar Instagram oficial
* Confirmar imagens finais em `src/assets/`
* Confirmar cache público das avaliações em `public/data/google-reviews.json`
* Testar formulário de lead
* Testar botões de WhatsApp
* Testar links de mapa e Instagram
* Revisar textos comerciais em `data.ts`
* Revisar política de privacidade e termos
* Ajustar domínio final nos metadados de SEO
* Integrar analytics/tracking, se necessário
* Rodar `npm run lint`
* Rodar `npm run build`
* Conferir deploy na Vercel

## Status

O projeto está em versão funcional de landing page estática, com deploy preparado para Vercel, formulário com WhatsApp, prova social via cache público de avaliações do Google, seções comerciais completas e estrutura pronta para ajustes finais de conteúdo, domínio e tracking.
