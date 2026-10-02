// main.js — ponto de entrada: registra as rotas e liga cada tela aos seus eventos
import { registrarRota, iniciarRouter, navegar } from './modules/router.js';
import { telaInicio, telaProjetos, telaCadastro, tela404, itemVoluntario, alerta } from './modules/templates.js';
import { ativarValidacaoAoVivo, validarFormulario } from './modules/validacao.js';
import { aplicarMascaras } from './modules/mascaras.js';
import * as storage from './modules/storage.js';
import { iniciarMenu, iniciarModal, mostrarToast, abrirModal } from './modules/ui.js';
import { projetos } from './data/projetos.js';
import { desenharGraficoVoluntarios } from './modules/grafico.js';

// ---------- Tela: início ----------
function montarInicio(app) {
  const total = 60 + storage.listarVoluntarios().length;
  app.querySelector('[data-contador-voluntarios]').textContent = total;
}

// ---------- Tela: projetos (filtro por categoria via delegação de eventos) ----------
function montarProjetos(app) {
  const filtros = app.querySelector('.filtros');
  filtros.addEventListener('click', (e) => {
    const botao = e.target.closest('[data-filtro]');
    if (!botao) return;
    const categoria = botao.dataset.filtro;
    filtros.querySelectorAll('[data-filtro]').forEach((b) => b.setAttribute('aria-pressed', String(b === botao)));
    app.querySelectorAll('#lista-projetos > article').forEach((card) => {
      const p = projetos.find((x) => x.id === card.id);
      card.hidden = categoria !== 'todos' && p.categoria !== categoria;
    });
  });
  // "Quero participar" leva ao cadastro já com o projeto escolhido
  app.addEventListener('click', (e) => {
    const link = e.target.closest('[data-projeto]');
    if (link) sessionStorage.setItem('semear:projeto', link.dataset.projeto);
  });
}

// ---------- Tela: cadastro ----------
function renderizarLista(app) {
  const ul = app.querySelector('#lista-voluntarios');
  const lista = storage.listarVoluntarios();
  ul.innerHTML = lista.length
    ? lista.map(itemVoluntario).join('')
    : '<li class="form__ajuda">Nenhum voluntário cadastrado ainda.</li>';
  desenharGraficoVoluntarios(app.querySelector('#grafico-voluntarios'), lista);
}

function lerDados(form) {
  const dados = Object.fromEntries(new FormData(form));
  dados.areaNome = projetos.find((p) => p.id === dados.area)?.titulo || '';
  delete dados.termos;
  return dados;
}

function montarCadastro(app) {
  const form = app.querySelector('#form-cadastro');
  const enviar = form.querySelector('[type="submit"]');
  const areaAlerta = app.querySelector('#area-alerta');

  aplicarMascaras(form);
  ativarValidacaoAoVivo(form);
  renderizarLista(app);

  // Recupera rascunho salvo e projeto escolhido na tela anterior
  const rascunho = storage.lerRascunho();
  if (rascunho) {
    Object.entries(rascunho).forEach(([nome, valor]) => {
      const campo = form.elements[nome];
      if (campo && campo.type !== 'radio' && nome !== 'termos') campo.value = valor;
    });
  }
  const projetoEscolhido = sessionStorage.getItem('semear:projeto') || rascunho?.area;
  if (projetoEscolhido) {
    const radio = form.querySelector(`[name="area"][value="${projetoEscolhido}"]`);
    if (radio) radio.checked = true;
    sessionStorage.removeItem('semear:projeto');
  }

  // Botão só habilita após aceitar os termos
  form.termos.addEventListener('change', () => { enviar.disabled = !form.termos.checked; });

  // Autosalvamento do rascunho a cada digitação
  form.addEventListener('input', () => storage.salvarRascunho(lerDados(form)));

  form.addEventListener('reset', () => {
    storage.limparRascunho();
    enviar.disabled = true;
    form.querySelectorAll('.form__input').forEach((i) => {
      i.classList.remove('is-valido', 'is-invalido');
      i.removeAttribute('aria-invalid');
    });
    form.querySelectorAll('.form__msg-erro').forEach((s) => { s.textContent = ''; });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validarFormulario(form)) {
      areaAlerta.innerHTML = alerta('erro', 'Verifique o formulário', 'Há campos com erro destacados em vermelho.');
      return;
    }
    try {
      const novo = storage.salvarVoluntario(lerDados(form));
      form.reset();
      areaAlerta.innerHTML = alerta('sucesso', 'Cadastro concluído', `${novo.nome}, seus dados foram salvos.`);
      renderizarLista(app);
      mostrarToast('Cadastro enviado com sucesso!');
      abrirModal('Obrigado por se cadastrar!', `Olá, ${novo.nome.split(' ')[0]}! Nossa equipe entrará em contato em até 5 dias úteis para o projeto ${novo.areaNome}.`);
    } catch (erro) {
      areaAlerta.innerHTML = alerta('erro', 'Não foi possível cadastrar', erro.message);
      mostrarToast(erro.message, 'erro');
    }
  });

  // Remover voluntário (delegação de eventos na lista)
  app.querySelector('#lista-voluntarios').addEventListener('click', (e) => {
    const botao = e.target.closest('[data-remover]');
    if (!botao) return;
    storage.removerVoluntario(botao.dataset.remover);
    renderizarLista(app);
    mostrarToast('Voluntário removido.');
  });
}

// ---------- Inicialização ----------
registrarRota('/inicio', { titulo: 'Início', render: telaInicio, aoMontar: montarInicio });
registrarRota('/projetos', { titulo: 'Projetos Sociais', render: telaProjetos, aoMontar: montarProjetos });
registrarRota('/cadastro', { titulo: 'Seja Voluntário', render: telaCadastro, aoMontar: montarCadastro });
registrarRota('/404', { titulo: 'Página não encontrada', render: tela404 });

iniciarMenu();
iniciarModal();
iniciarRouter('#app');

export { navegar };
