// acessibilidade.js — preferências de leitura: tamanho da fonte e alto contraste
// As escolhas ficam salvas no localStorage e são reaplicadas a cada visita.
const CHAVE = 'semear:preferencias';
const ESCALAS = [100, 112.5, 125, 150]; // % do tamanho base (16px)

function lerPrefs() {
  try { return JSON.parse(localStorage.getItem(CHAVE)) || { escala: 0, contraste: false }; }
  catch { return { escala: 0, contraste: false }; }
}

function salvarPrefs(prefs) {
  try { localStorage.setItem(CHAVE, JSON.stringify(prefs)); } catch { /* storage indisponível */ }
}

function aplicar(prefs) {
  const raiz = document.documentElement;
  raiz.style.fontSize = `${ESCALAS[prefs.escala]}%`;
  raiz.classList.toggle('alto-contraste', prefs.contraste);
  const btnContraste = document.querySelector('[data-a11y="contraste"]');
  if (btnContraste) btnContraste.setAttribute('aria-pressed', String(prefs.contraste));
  const status = document.getElementById('a11y-status');
  if (status) status.textContent = `Fonte em ${ESCALAS[prefs.escala]}%${prefs.contraste ? ', alto contraste ativado' : ''}.`;
}

export function iniciarAcessibilidade() {
  const prefs = lerPrefs();
  aplicar(prefs);

  document.querySelector('.barra-a11y')?.addEventListener('click', (e) => {
    const acao = e.target.closest('[data-a11y]')?.dataset.a11y;
    if (!acao) return;
    if (acao === 'aumentar') prefs.escala = Math.min(prefs.escala + 1, ESCALAS.length - 1);
    if (acao === 'diminuir') prefs.escala = Math.max(prefs.escala - 1, 0);
    if (acao === 'contraste') prefs.contraste = !prefs.contraste;
    aplicar(prefs);
    salvarPrefs(prefs);
  });
}
