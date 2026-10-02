# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [3.0.1] - 2026-10-02
### Corrigido
- Contraste do botão secundário no estado `:hover` (texto branco sobre `#C17900` ficava abaixo de 4,5:1).

## [3.0.0] - 2026-10-02
### Adicionado
- Barra de acessibilidade: aumentar/diminuir fonte e tema de alto contraste (preferências salvas).
- *Focus trap* no modal e conteúdo de fundo com `inert`.
- Script de build (`npm run build`) com minificação de HTML, CSS, JS e SVG.
- Deploy automático no GitHub Pages via GitHub Actions.
- README e CHANGELOG.

## [2.0.0] - 2026-10-01
### Adicionado
- SPA com roteamento por hash e templates dinâmicos.
- Validação de formulário em tempo real, máscaras e cálculo de CPF.
- Persistência de voluntários e rascunho no `localStorage`.
- Gráfico de voluntários por projeto com Chart.js.

## [1.0.0] - 2026-10-01
### Adicionado
- Páginas semânticas: início, projetos sociais e cadastro.
- Design system (cores, tipografia, espaçamentos), grid de 12 colunas e 5 breakpoints.
- Menu responsivo com dropdown e hambúrguer, cards, formulário e componentes de feedback.
