// Instituto Semear Futuro — interações básicas
document.addEventListener('DOMContentLoaded', () => {
  // Menu hambúrguer
  const nav = document.querySelector('.menu');
  const toggle = document.querySelector('.menu-toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', () => {
      const aberto = nav.classList.toggle('menu--aberto');
      toggle.setAttribute('aria-expanded', aberto);
      toggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    });
  }

  // Toast
  window.mostrarToast = (mensagem) => {
    const area = document.querySelector('.toast-area');
    if (!area) return;
    const toast = document.createElement('div');
    toast.className = 'toast toast--sucesso';
    toast.setAttribute('role', 'status');
    toast.innerHTML = `<span aria-hidden="true">✔</span><span>${mensagem}</span>
      <button class="toast__fechar" aria-label="Fechar notificação">&times;</button>`;
    toast.querySelector('button').addEventListener('click', () => toast.remove());
    area.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
  };

  // Modal
  const modal = document.getElementById('modal-confirmacao');
  const abrirModal = () => { modal.classList.add('modal--aberto'); modal.querySelector('button').focus(); };
  const fecharModal = () => modal.classList.remove('modal--aberto');
  if (modal) {
    modal.querySelectorAll('[data-fechar]').forEach(b => b.addEventListener('click', fecharModal));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') fecharModal(); });
  }

  // Formulário de cadastro
  const form = document.querySelector('#form-cadastro');
  if (form) {
    const termos = form.querySelector('#termos');
    const enviar = form.querySelector('[type="submit"]');
    const atualizar = () => { enviar.disabled = !termos.checked; };
    termos.addEventListener('change', atualizar);
    atualizar();
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      abrirModal();
      mostrarToast('Cadastro enviado com sucesso!');
      form.reset();
      atualizar();
    });
  }
});
