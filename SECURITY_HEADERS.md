# Security Headers

Este projeto sera hospedado como site estatico em Apache/Hostinger. A configuracao de cabecalhos e fallback de SPA fica em `public/.htaccess`, que o Vite copia para a raiz de `dist` durante `npm run build`.

## Cabecalhos implementados

- `X-Content-Type-Options: nosniff`: reduz risco de MIME sniffing em navegadores.
- `Referrer-Policy: strict-origin-when-cross-origin`: envia o referer completo apenas na mesma origem e limita dados enviados para origens externas.
- `X-Frame-Options: DENY`: impede incorporacao do site em iframe por outros dominios.
- `Cross-Origin-Opener-Policy: same-origin`: isola a janela do site de contextos cross-origin.
- `Permissions-Policy: geolocation=(), camera=(), microphone=(), payment=(), usb=()`: bloqueia APIs sensiveis que o site nao utiliza.
- `Strict-Transport-Security: max-age=86400`: instrui navegadores a usar HTTPS por 1 dia. O header e enviado somente em HTTPS por expressao do Apache 2.4.
- `Content-Security-Policy-Report-Only`: registra violacoes de CSP sem bloquear recursos nesta primeira etapa.

Esta CSP em `Report-Only` nao define `report-uri` nem `report-to`. Nesta etapa, a observacao das violacoes acontece principalmente pelo console/devtools do navegador; nenhum relatorio e enviado para coletor remoto.

## CSP atual

```http
Content-Security-Policy-Report-Only: default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self'; img-src 'self' data: blob: https://lh3.googleusercontent.com; font-src 'self' https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; connect-src 'self'; frame-src https://www.google.com https://maps.google.com; require-trusted-types-for 'script'
```

`upgrade-insecure-requests` foi removido desta politica `Report-Only`, porque navegadores ignoram essa diretiva em modo de relatorio. A Hostinger pode continuar enviando uma CSP efetiva separada com `upgrade-insecure-requests`.

## Dominios externos autorizados

- `https://fonts.googleapis.com` em `style-src`: stylesheet das fontes Google usada em `src/routes/__root.tsx`.
- `https://fonts.gstatic.com` em `font-src`: arquivos das fontes Google carregadas pela stylesheet.
- `https://lh3.googleusercontent.com` em `img-src`: fotos de perfil presentes em `public/data/google-reviews.json`.
- `https://www.google.com` em `frame-src`: autorizado exclusivamente para o iframe do mapa, porque o embed carregado pelo Google Maps resolve recursos nesse host.
- `https://maps.google.com` em `frame-src`: origem declarada no `src` do iframe de mapa no rodape da landing page.

GA4, GTM, Meta Pixel e Microsoft Clarity nao foram autorizados na CSP porque nao ha scripts reais instalados. O arquivo `src/components/landing/tracking.ts` so prepara `dataLayer`, `gtag` e `fbq` quando existirem globalmente.

## Limitacoes identificadas

- A aplicacao usa varios estilos inline React. Por isso, `style-src` inclui `'unsafe-inline'` nesta etapa.
- Ha `dangerouslySetInnerHTML` para JSON-LD em `src/components/landing/LandingPage.tsx` e para estilos dinamicos de grafico em `src/components/ui/chart.tsx`.
- Nao foram encontrados `innerHTML`, `document.write` ou `insertAdjacentHTML`.
- `require-trusted-types-for 'script'` esta apenas em `Report-Only`, para observar compatibilidade antes de qualquer bloqueio.
- Trusted Types ainda apresenta violacoes conhecidas e nao deve ser ativado em modo bloqueante nesta etapa.
- Origem TrustedHTML 1: `src/components/landing/LandingPage.tsx`, linhas do footer com `<script type="application/ld+json">` e `dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}`. Correcao separada proposta: substituir a injecao inline por estrategia compativel com Trusted Types ou por mecanismo de renderizacao de JSON-LD validado antes de ativar bloqueio.
- Origem TrustedHTML 2: `src/components/ui/chart.tsx`, componente `ChartStyle`, que injeta `<style dangerouslySetInnerHTML>` para variaveis CSS dinamicas de Recharts em `[data-chart=...]`. Correcao separada proposta: refatorar estilos dinamicos para CSS custom properties via `style`/classes ou criar uma solucao especifica para estilos de chart antes de ativar bloqueio.
- `script-src 'self'` em modo `Report-Only` pode reportar o JSON-LD inline. Antes de bloquear a CSP, mover esse JSON-LD para uma estrategia com nonce/hash ou outro padrao compativel.

## SPA fallback e HTTPS

O `.htaccess` redireciona HTTP para HTTPS com `301` quando `%{HTTPS} !=on`. Depois disso, `/termos` redireciona para a rota canonica `/termos-de-uso`, arquivos e diretorios reais sao servidos diretamente, e rotas como `/`, `/politica-de-privacidade` e `/termos-de-uso` caem em `index.html`, preservando o TanStack Router.

## Ativar CSP em modo de bloqueio

1. Fazer deploy com `Content-Security-Policy-Report-Only`.
2. Coletar violacoes pelo console/devtools do navegador em todas as paginas e fluxos principais, ou adicionar um coletor remoto antes caso o projeto passe a usar `report-uri` ou `report-to`.
3. Resolver reports de JSON-LD inline e de qualquer estilo/script dinamico sem abrir `script-src` com `'unsafe-inline'`.
4. Confirmar que fontes, imagens de reviews, mapa, formulario e CTAs do WhatsApp continuam funcionando.
5. Trocar `Content-Security-Policy-Report-Only` por `Content-Security-Policy`.
6. Manter `object-src 'none'`, `frame-ancestors 'none'` e `script-src` sem wildcard, `unsafe-eval` ou `data:`.

## Evolucao gradual de HSTS

1. Comecar com `max-age=86400`, sem `includeSubDomains` e sem `preload`.
2. Validar por alguns dias que todo o dominio responde corretamente em HTTPS.
3. Aumentar para `max-age=604800`.
4. Depois de nova validacao, considerar `max-age=31536000`.
5. Usar `includeSubDomains` e `preload` somente quando todos os subdominios estiverem prontos para HTTPS permanente.

## Verificacao pos-deploy

```bash
curl -I https://carambolostudio.com.br/
curl -I http://carambolostudio.com.br/
curl -I https://carambolostudio.com.br/politica-de-privacidade
curl -I https://carambolostudio.com.br/termos-de-uso
```

A resposta HTTPS deve mostrar os cabecalhos de seguranca. A resposta HTTP deve redirecionar para HTTPS. As paginas juridicas nao devem responder `404`. Validar tambem o redirecionamento legado:

```bash
curl -I https://carambolostudio.com.br/termos
```

`/termos` deve responder com `301` para `/termos-de-uso`.

## Ajustar CSP para GA4 e Clarity

Quando GA4/GTM forem instalados, adicionar somente os hosts usados pelo snippet real. Em geral, isso pode envolver `https://www.googletagmanager.com` em `script-src` e endpoints do Google Analytics em `connect-src`, mas a decisao deve ser feita olhando o codigo instalado e os reports do navegador.

Quando Microsoft Clarity for instalado, adicionar somente os hosts usados pelo snippet real, normalmente em `script-src`, `connect-src` e possivelmente `img-src`. Nao liberar Clarity antes de o script existir no projeto.
