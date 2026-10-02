// ui.js — componentes de interface reutilizáveis: menu, toast e modal

export function iniciarMenu() {
  const nav = document.querySelector('.menu');
  const toggle = document.querySelector('.menu-toggle');
  if (!nav || !toggle) return;

  const fechar = () => {
    nav.classList.remove('menu--aberto');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
  };

  toggle.addEventListener('click', () => {
    const aberto = nav.classList.toggle('menu--aberto');
    toggle.setAttribute('aria-expanded', String(aberto));
    toggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  });

  // Fecha ao escolher um link (na SPA a página não recarrega) e com Esc
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) fechar(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fechar(); });
}

export function mostrarToast(mensagem, tipo = 'sucesso') {
  const area = document.querySelector('.toast-area');
  const toast = document.createElement('div');
  toast.className = `toast toast--${tipo}`;
  toast.setAttribute('role', 'status');
  const icone = document.createElement('span');
  icone.setAttribute('aria-hidden', 'true');
  icone.textContent = tipo === 'sucesso' ? '✔' : '✖';
  const texto = document.createElement('span');
  texto.textContent = mensagem; // textContent: nunca interpreta HTML
  const fechar = document.createElement('button');
  fechar.className = 'toast__fechar';
  fechar.setAttribute('aria-label', 'Fechar notificação');
  fechar.innerHTML = '&times;';
  fechar.addEventListener('click', () => toast.remove());
  toast.append(icone, texto, fechar);
  area.appendChild(toast);
  setTimeout(() => toast.remove(), 5000);
}

let ultimoFoco = null;
export function abrirModal(titulo, texto) {
  const modal = document.getElementById('modal');
  modal.querySelector('#modal-titulo').textContent = titulo;
  modal.querySelector('#modal-texto').textContent = texto;
  ultimoFoco = document.activeElement;
  modal.classList.add('modal--aberto');
  modal.querySelector('[data-fechar]').focus();
}

export function iniciarModal() {
  const modal = document.getElementById('modal');
  const fechar = () => {
    modal.classList.remove('modal--aberto');
    if (ultimoFoco) ultimoFoco.focus(); // devolve o foco para onde o usuário estava
  };
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.closest('[data-fechar]')) fechar();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('modal--aberto')) fechar();
  });
}
