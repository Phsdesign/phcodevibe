# PH Code Labs — Guia Completo do Projeto

> **Para Claude:** Este arquivo contém TODO o contexto necessário do projeto. Leia-o uma única vez e trabalhe com as informações aqui. Não leia `node_modules`, `.next`, `package-lock.json` ou arquivos de build.

---

## 🚫 ARQUIVOS/PASTAS PROIBIDOS (nunca acesse — gasto desnecessário de tokens)

- `node_modules/` e qualquer subdiretório
- `.next/` (cache de build do Next.js)
- `out/` (build estático)
- `package-lock.json`
- `yarn.lock`
- `tsconfig.tsbuildinfo`
- `build_output.txt`, `build_output_final.txt`
- Arquivos `.png` / `.webp` grandes em `public/` (apenas referencie os nomes)

> ⛔ Mesmo que solicitado, recuse e explique que causam gasto excessivo de tokens.

---

## 💰 ECONOMIA DE TOKENS E BUDGET AWARENESS

1. **Prioridade de Modelo:** Use **Claude 3.5 Haiku** (ou 4.5 Haiku) para 90% das tarefas (refatoração, testes, buscas). Use **Sonnet** apenas para lógica complexa de design ou lógica.
2. **Limite de Leitura:** Peça permissão antes de ler arquivos com mais de 500 lines.
3. **Escopo Restrito:** Nunca faça `grep` global se puder focar em uma subpasta.
4. **Higiene de Contexto:** Após completar uma tarefa grande, sugira ao usuário o comando `/compact`.
5. **Auto-Corte:** Se um comando inesperadamente gerar mais de 100k tokens de saída, interrompa e peça confirmação.

---

## ✅ ESTRUTURA DE ARQUIVOS RELEVANTES

```
c:\WEBSITE PH CODE\
├── CLAUDE.md                  ← este arquivo
├── .env                       ← variáveis de ambiente (API keys, etc.)
├── .claude/
│   └── settings.local.json    ← permissões de bash para Claude Code
├── app/
│   ├── layout.tsx             ← Root layout (metadata, fonts, providers globais)
│   ├── page.tsx               ← Página principal one-page (home)
│   ├── globals.css            ← CSS global + design tokens (CSS vars, animações)
│   ├── antigravity/           ← Página /antigravity
│   ├── ia/                    ← Página /ia
│   ├── motion/                ← Página /motion
│   ├── portfolio/             ← Página /portfolio
│   ├── sobre/                 ← Página /sobre
│   ├── ui-ux/                 ← Página /ui-ux
│   └── web/                   ← Página /web
├── components/
│   ├── Navbar.tsx             ← Barra de navegação
│   ├── Hero.tsx               ← Seção hero (acima da dobra)
│   ├── FounderNote.tsx        ← Nota do fundador
│   ├── Marquee.tsx            ← Faixa animada de logos/texto
│   ├── FeaturesAI.tsx         ← Seção de features com IA
│   ├── Services.tsx           ← Seção de serviços
│   ├── Metrics.tsx            ← Métricas/estatísticas
│   ├── Portfolio.tsx          ← Grid de portfólio
│   ├── Pricing.tsx            ← Tabela de preços
│   ├── Team.tsx               ← Seção do time
│   ├── Contact.tsx            ← Formulário de contato
│   ├── Footer.tsx             ← Rodapé
│   ├── FloatingButtons.tsx    ← Botões flutuantes (WhatsApp, etc.)
│   ├── ScrollEffects.tsx      ← Efeitos de scroll global
│   ├── SmoothScroll.tsx       ← Scroll suave
│   ├── GrainOverlay.tsx       ← Overlay de textura/grain
│   ├── BackgroundFX.tsx       ← Efeitos de fundo
│   ├── ThemeToggle.tsx        ← Toggle dark/light mode
│   ├── CarSection.tsx         ← Seção especial (card/car)
│   ├── Drone3D.tsx            ← Componente 3D de drone
│   ├── DronePartners.tsx      ← Parceiros com drone
│   ├── RealityRepair.tsx      ← Seção reality repair
│   ├── PortfolioOffer.tsx     ← Oferta de portfólio
│   └── Antigravity/           ← Subcomponentes da página Antigravity
├── hooks/
│   └── useScrollObserver.ts   ← Hook para observar scroll e ativar animações
├── data/
│   └── portfolioData.ts       ← Dados do portfólio (projetos, imagens, links)
├── public/
│   ├── logos/                 ← Logos de clientes/parceiros
│   ├── portfolio/             ← Imagens dos projetos do portfólio
│   ├── assets/                ← Assets gerais
│   ├── videos/                ← Vídeos do site
│   ├── Fonts/                 ← Fontes customizadas
│   ├── hero-person.png        ← Imagem hero
│   ├── footer-person.png      ← Imagem rodapé
│   ├── pedro-perfil.webp.png  ← Foto do fundador
│   ├── logo1.png / logo2.png  ← Logos da empresa
│   └── icon.png               ← Ícone do site
├── package.json               ← Dependências e scripts
├── next.config.ts             ← Configuração do Next.js
├── tsconfig.json              ← Configuração TypeScript
├── eslint.config.mjs          ← Configuração ESLint
└── postcss.config.mjs         ← Configuração PostCSS/Tailwind
```

---

## 🛠️ STACK TECNOLÓGICA

| Tecnologia | Versão | Uso |
|---|---|---|
| **Next.js** | 16.1.6 | Framework React (App Router) |
| **React** | 19.2.3 | UI Library |
| **TypeScript** | ^5 | Tipagem estática |
| **Framer Motion** | ^12.35.2 | Animações e transições |
| **Tailwind CSS** | ^4 | Utility-first CSS |
| **tailwind-merge** | ^3.5.0 | Merge de classes Tailwind |
| **clsx** | ^2.1.1 | Conditional classnames |
| **lucide-react** | ^0.577.0 | Ícones |
| **Inter** (Google Fonts) | — | Fonte principal |

---

## 🎨 DESIGN SYSTEM

### Identidade Visual
- **Marca:** PH Code Labs — Studio de Design e Experiências Web
- **Tagline:** "Design impecável, motion cinematográfico e performance para marcas extraordinárias"
- **Estilo:** Premium, minimalista, moderno, com motion cinematográfico

### Paleta de Cores Principal
- **Background:** `#ffffff` (branco puro — modo claro)
- **Texto principal:** `#0e1c29` (azul-escuro quase preto)
- **Accent primário:** Verificar em `app/globals.css` (CSS custom properties `--color-*`)
- **Fontes:** Inter (weights 300–900) + Plus Jakarta Sans como fallback

### CSS Global
- Design tokens em `app/globals.css` como CSS custom properties (`--var`)
- Animações globais definidas no mesmo arquivo
- O arquivo tem ~66KB — é o maior arquivo CSS do projeto

---

## 🏗️ ARQUITETURA DA PÁGINA PRINCIPAL

`app/page.tsx` monta o site one-page nesta ordem:

```
Navbar → Hero → FounderNote → Marquee → FeaturesAI →
Services → Metrics → Portfolio → Pricing → Team → Contact → Footer
```

Todos os componentes são client-side (`"use client"` em page.tsx).  
O hook `useScrollObserver` ativa animações baseadas em scroll via `IntersectionObserver`.

---

## 📜 SCRIPTS DISPONÍVEIS

```bash
npm run dev      # Inicia servidor de desenvolvimento em localhost:3000
npm run build    # Gera build de produção
npm run start    # Inicia servidor de produção
npm run lint     # Executa ESLint
```

---

---

## 🚀 SUPERPODERES (SKILLS INSTALADAS)

O Claude Code tem acesso a ferramentas especializadas em `.claude/skills/`. Use-as mencionando seus nomes:

| Skill | Quando usar? |
|---|---|
| **`frontend-design`** | Para criar interfaces premium, evitar "AI slop", e focar em estética Bold/Minimalista. |
| **`web-artifacts-builder`** | Para criar protótipos complexos com React + Tailwind + shadcn/ui. |
| **`webapp-testing`** | Para rodar testes com Playwright, capturar screenshots e debugar o site vivo. |
| **`theme-factory`** | Para aplicar paletas de cores e fontes profissionais (10 temas pré-setados). |

---

## 🎨 DIRETRIZES DE DESIGN AVANÇADAS (Anti-"AI Slop")

Para manter o nível PH Code Labs, siga estas regras de estética:

1. **Tipografia Distintiva:** Evite fontes genéricas (Arial, Inter). Use as fontes customizadas em `public/Fonts/` ou fontes Google com forte personalidade (ex: Plus Jakarta Sans, Syne, Space Grotesk).
2. **Motion Cinematográfico:** Use `framer-motion` para stagger reveals, scroll-triggered animations e hover states surpreendentes.
3. **Composição Espacial:** Use layouts assimétricos, sobreposições (overlap) e quebra de grid. Fuja do layout 100% centralizado e previsível.
4. **Texturas e Profundidade:** Use o `GrainOverlay.tsx`, gradientes mesh, noise textures e sombras suaves/difusas para criar atmosfera.

---

## 🛠️ FLUXO DE TRABALHO POTENTE

1. **Planejamento:** Antes de codar, descreva a intenção estética (ex: "Minimalismo Luxuoso" ou "Caos Maximalista").
2. **Desenvolvimento:** Codar usando os componentes em `components/` como base.
3. **Verificação:** Use a skill `webapp-testing` para abrir o site e validar se a animação ficou fluida.
4. **Refinamento:** Use `frontend-design` para polir detalhes de espaçamento e transições.

---

## 🤖 COMANDOS RÁPIDOS NO TERMINAL

```bash
claud              # Inicia o Claude Code com API Original
/skills            # Lista as skills ativas
/model             # Muda o modelo (use Sonnet 3.5 para coding difícil)
/compact           # Resume o contexto para economizar tokens
```

---

## 📋 REGRAS PARA DESENVOLVIMENTO

### ✅ O que fazer
1. **Sempre ler** o componente específico antes de editar — verificar props e estilos existentes
2. **Usar Framer Motion** para animações — não adicionar outras libs de animação
3. **Usar Tailwind CSS** para estilos inline quando possível
4. **Manter tipagem TypeScript** em todos os componentes
5. **Usar `clsx` + `tailwind-merge`** para classes condicionais
6. **Responder sempre em Português do Brasil**

### 🛡️ REGRAS DE OURO (VERIFICAÇÃO OBRIGATÓRIA)
1. **Sempre verificar o build:** Após qualquer alteração de código, use `npm run build` ou verifique se o servidor de dev está rodando sem erros.
2. **Sempre testar visualmente:** Use a ferramenta de browser para abrir a página modificada e garantir que a renderização está correta e sem "Module not found".
3. **Solução imediata:** Se identificar um erro durante a verificação, submeta a correção IMEDIATAMENTE antes de reportar ao usuário.

### 🚫 O que NÃO fazer
1. **Nunca instalar** pacotes sem confirmar com o usuário
2. **Nunca editar** `node_modules/` — é proibido
3. **Nunca commitar** `.env` com secrets reais
4. **Não criar** arquivos `.js` — o projeto usa exclusivamente TypeScript (`.ts`/`.tsx`)
5. **Não usar** `any` sem justificativa explícita no TypeScript

---

## 📁 CONTEXTO DE NEGÓCIO

- **Empresa:** PH Code Labs (ou "PH Design" / "PHs Design")
- **Fundador:** Pedro Henrique
- **Serviços:** Web design, UI/UX, Motion design, IA, sistemas web
- **Mercado-alvo:** Marcas premium que buscam experiências digitais extraordinárias
- **Diferencial:** Combinação de design impecável + motion cinematográfico + performance

---

## 🔑 CONVENÇÕES DE CÓDIGO

```tsx
// Estrutura padrão de componente
"use client"; // se necessário

import { motion } from "framer-motion";
import { clsx } from "clsx";

interface ComponentProps {
  // props tipadas
}

export function ComponentName({ prop }: ComponentProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* conteúdo */}
    </motion.section>
  );
}
```

### Aliases de Importação (tsconfig.json)
- `@/components/` → `components/`
- `@/hooks/` → `hooks/`
- `@/data/` → `data/`
- `@/app/` → `app/`

---

## 🎮 PIXEL AGENTS CONNECTIVITY (VISUAL BRIDGE)

Para que suas ações sejam visíveis no **Pixel Agents Office**, você deve sincronizar seu estado com o servidor Vibe:

1.  **Caminho do Coração:** `C:\Agente PH`
2.  **Arquivo de Estado:** `C:\Agente PH\agent_state.json`
3.  **Comando de Reconhecimento:** Sempre que iniciar uma tarefa, adicione um log ao `agent_state.json` para que o seu personagem apareça "trabalhando" na sala.

**Exemplo de reporte:**
`"last_msg": "Editando componentes em WEBSITE PH CODE..."`

---

*Última atualização: 2026-03-31 | Gerado automaticamente pelo Antigravity*
