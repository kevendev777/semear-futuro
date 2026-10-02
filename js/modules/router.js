// router.js — navegação SPA baseada em hash (#/rota)
const rotas = {};
let app;
let primeiraCarga = true;

export function registrarRota(caminho, { titulo, render, aoMontar }) {
  rotas[caminho] = { titulo, render, aoMontar };
}

function rotaAtual() {
  const hash = window.location.hash.replace(/^#/, '') || '/inicio';
  const [caminho, ancora] = hash.split('#');
  return { caminho, ancora };
}

export function renderizar() {
  const { caminho, ancora } = rotaAtual();
  const rota = rotas[caminho] || rotas['/404'];

  // 1) limpa o contêiner e injeta o novo fragmento
  app.innerHTML = '';
  app.insertAdjacentHTML('afterbegin', rota.render());

  // 2) atualiza título da aba e o link ativo do menu
  document.title = `${rota.titulo} | Instituto Semear Futuro`;
  document.querySelectorAll('[data-link]').forEach((link) => {
    const ativo = link.getAttribute('href') === `#${caminho}`;
    if (ativo) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  // 3) liga os eventos específicos da tela recém-criada
  if (rota.aoMontar) rota.aoMontar(app);

  // 4) acessibilidade: foco no título da nova tela e rolagem
  //    (na primeira carga o foco fica no início da página, para o "Pular para o conteúdo")
  const destino = ancora ? document.getElementById(ancora) : app.querySelector('h1');
  const moverFoco = !primeiraCarga || ancora;
  primeiraCarga = false;
  if (destino && moverFoco) {
    destino.setAttribute('tabindex', '-1');
    destino.focus({ preventScroll: true });
    destino.scrollIntoView({ block: 'start' });
  }
}

export function navegar(caminho) {
  window.location.hash = caminho; // dispara o evento hashchange
}

export function iniciarRouter(seletor) {
  app = document.querySelector(seletor);
  window.addEventListener('hashchange', renderizar);
  renderizar(); // primeira carga (inclusive links diretos / F5)
}
