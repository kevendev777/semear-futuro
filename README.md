# Instituto Semear Futuro 🌱

Plataforma web da ONG **Instituto Semear Futuro** (Recife/PE), que atende crianças e famílias com reforço escolar, oficinas culturais e cozinha solidária. O site apresenta a organização, divulga os projetos sociais e permite o **cadastro de voluntários**.

Projeto acadêmico da disciplina **Desenvolvimento Front-End para Web** (Cruzeirodosul Virtual), construído ao longo das Experiências Práticas I a IV.

> **Demonstração:** https://kevendev777.github.io/semear-futuro/

---

## Funcionalidades

- **SPA (Single Page Application)** com roteamento por hash: `#/inicio`, `#/projetos`, `#/cadastro`.
- **Templates dinâmicos** em JavaScript gerados a partir de dados (`js/data/projetos.js`).
- **Filtro de projetos** por categoria.
- **Cadastro de voluntários** com validação em tempo real (nome, e-mail, CPF com dígito verificador, telefone, idade mínima, CEP) e máscaras automáticas.
- **Persistência no `localStorage`**: lista de voluntários e rascunho do formulário.
- **Gráfico** de voluntários por projeto com [Chart.js](https://www.chartjs.org/).
- **Componentes de feedback**: alertas, toast, modal e badges.
- **Acessibilidade (WCAG 2.1 AA)**: navegação por teclado, link "pular para o conteúdo", foco visível, modal com *focus trap*, ajuste de tamanho de fonte e tema de alto contraste.
- **Layout responsivo** mobile-first com CSS Grid de 12 colunas e 5 breakpoints.

## Tecnologias

HTML5 semântico · CSS3 (custom properties, Grid, Flexbox) · JavaScript ES2020 (ES Modules) · Chart.js 4 · Node.js (build) · GitHub Actions + GitHub Pages (deploy)

## Estrutura de pastas

```
semear-futuro/
├── index.html              # shell da SPA (ponto de entrada)
├── html/                   # versões estáticas (fallback sem JavaScript)
├── css/
│   ├── reset.css
│   └── style.css           # design system, layout, componentes e acessibilidade
├── imagens/                # SVGs otimizados
├── js/
│   ├── main.js             # inicialização e comportamento de cada tela
│   ├── estatico.js         # interações das páginas estáticas
│   ├── data/projetos.js    # dados dos projetos sociais
│   ├── modules/            # router, templates, validacao, mascaras, storage, ui, grafico, acessibilidade
│   └── vendor/             # Chart.js
├── scripts/build.mjs       # build de produção (gera dist/)
└── .github/workflows/      # deploy automático
```

## Como executar localmente

Pré-requisito: [Node.js](https://nodejs.org/) 18 ou superior (para o build). Os ES Modules **não funcionam abrindo o arquivo direto (file://)**; use um servidor local.

```bash
git clone https://github.com/kevendev777/semear-futuro.git
cd semear-futuro
npm install          # instala as ferramentas de build
npm run dev          # servidor local em http://localhost:5173
```

Alternativa sem Node: extensão **Live Server** do VS Code, ou `python -m http.server`.

## Build de produção

```bash
npm run build        # gera a pasta dist/ com HTML, CSS, JS e SVG minificados
npm run preview      # testa a versão de produção em http://localhost:4173
```

## Deploy

O workflow `.github/workflows/deploy.yml` executa o build e publica a pasta `dist/` no **GitHub Pages** a cada push na branch `main`.

1. No GitHub, acesse **Settings → Pages** e em *Source* selecione **GitHub Actions**.
2. Faça push (ou merge de uma release) na `main`.
3. Acompanhe na aba **Actions**; ao final, o link do site aparece no job *deploy*.

## Fluxo de trabalho (GitFlow)

| Branch | Uso |
|---|---|
| `main` | código em produção; cada versão recebe uma tag (`v1.0.0`, `v2.0.0`, `v3.0.0`…) |
| `develop` | integração contínua das funcionalidades |
| `feature/*` | uma branch por funcionalidade, criada a partir de `develop` e integrada via Pull Request |
| `release/*` | preparação de uma versão antes de ir para `main` |
| `hotfix/*` | correções urgentes criadas a partir de `main` |

Os commits seguem o padrão **Conventional Commits**: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `build:`, `ci:`, `chore:`. O histórico de versões está no [CHANGELOG](CHANGELOG.md).

## Acessibilidade

Auditado com axe-core (regras WCAG 2.0/2.1 A e AA, sem violações nas três telas) e testado com navegação somente por teclado. Principais pontos:

- contraste mínimo de 4,5:1 em todo texto (paleta documentada em `css/style.css`);
- `lang="pt-BR"`, hierarquia de títulos sem saltos, landmarks (`header`, `nav`, `main`, `footer`);
- `alt` descritivo em imagens; ícones decorativos com `aria-hidden`;
- erros de formulário ligados aos campos com `aria-describedby` e anunciados com `aria-live`;
- respeito a `prefers-reduced-motion`.

## Manutenção

- **Novo projeto social:** adicione um objeto em `js/data/projetos.js`; cards, filtros e opções do formulário são gerados automaticamente.
- **Nova tela:** crie a função de template em `templates.js` e registre a rota em `main.js` com `registrarRota()`.
- **Cores e fontes:** altere as variáveis em `:root` no início de `css/style.css`.

## Autor

Keven Patrocinio dos Santos — Engenharia de Software, Cruzeiro do Sul Virtual.

## Licença

MIT
