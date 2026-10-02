// templates.js — funções que geram o HTML das telas e componentes reutilizáveis
import { projetos } from '../data/projetos.js';

// Escapa texto vindo do usuário/localStorage antes de ir para o HTML (evita XSS)
export const esc = (txt = '') =>
  String(txt).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// ---------- Componentes ----------
export const badge = (texto, classe) => `<span class="badge ${classe}">${esc(texto)}</span>`;

export const alerta = (tipo, titulo, texto) => {
  const icones = { sucesso: '✔', erro: '✖', aviso: '⚠', info: 'ℹ' };
  return `
    <div class="alerta alerta--${tipo}" role="${tipo === 'erro' ? 'alert' : 'status'}">
      <span class="alerta__icone" aria-hidden="true">${icones[tipo]}</span>
      <div><strong>${esc(titulo)}</strong><p>${esc(texto)}</p></div>
    </div>`;
};

export const cardProjeto = (p) => `
  <article class="col-12 col-md-6 col-lg-4" id="${p.id}">
    <div class="card">
      <div class="card__imagem"><img src="${p.imagem}" alt="${esc(p.alt)}" width="480" height="270"></div>
      <div class="card__corpo">
        <div class="card__tags">${badge(p.categoria, p.classe)}${p.status ? badge(p.status.texto, p.status.classe) : ''}</div>
        <h3>${esc(p.titulo)}</h3>
        <p>${esc(p.descricao)}</p>
      </div>
      <div class="card__acoes">
        <a class="btn btn--primario" href="#/cadastro" data-projeto="${p.id}">Quero participar</a>
      </div>
    </div>
  </article>`;

const campo = ({ id, rotulo, tipo = 'text', obrigatorio = true, ajuda = '', extra = '' }) => `
  <div class="form__campo">
    <label ${obrigatorio ? 'class="obrigatorio"' : ''} for="${id}">${rotulo}</label>
    <input class="form__input" type="${tipo}" id="${id}" name="${id}" placeholder=" " ${obrigatorio ? 'required' : ''}
      aria-describedby="${ajuda ? `ajuda-${id} ` : ''}erro-${id}" ${extra}>
    ${ajuda ? `<span class="form__ajuda" id="ajuda-${id}">${ajuda}</span>` : ''}
    <span class="form__msg-erro" id="erro-${id}" aria-live="polite"></span>
  </div>`;

// ---------- Telas ----------
export const telaInicio = () => `
  <section class="hero" aria-labelledby="titulo-hero">
    <div class="container">
      <h1 id="titulo-hero">Instituto Semear Futuro</h1>
      <p>Plantando educação, alimento e esperança para crianças e famílias da nossa comunidade.</p>
      <div class="grupo-botoes">
        <a class="btn btn--secundario" href="#/cadastro">Quero ser voluntário</a>
        <a class="btn btn--contorno" href="#/projetos">Conhecer projetos</a>
      </div>
    </div>
  </section>
  <section class="secao" aria-labelledby="titulo-sobre">
    <div class="container grid">
      <div class="col-12 col-lg-7">
        <h2 id="titulo-sobre">Quem somos</h2>
        <p>O Instituto Semear Futuro é uma organização sem fins lucrativos fundada em 2015, em Recife (PE). Atendemos mais de 400 crianças e 150 famílias por ano com reforço escolar, alimentação e formação cidadã.</p>
        <div class="grid">
          <article class="col-12 col-sm-6"><h3>Missão</h3><p>Promover o desenvolvimento integral de crianças e adolescentes por meio da educação, da alimentação saudável e do fortalecimento dos vínculos familiares.</p></article>
          <article class="col-12 col-sm-6"><h3>Visão</h3><p>Ser referência regional em transformação social comunitária até 2030.</p></article>
        </div>
      </div>
      <figure class="col-12 col-lg-5">
        <img src="imagens/criancas-estudando.svg" alt="Ilustração de crianças estudando juntas em uma mesa com livros" width="480" height="270">
        <figcaption>Turma do reforço escolar no espaço comunitário do Instituto.</figcaption>
      </figure>
    </div>
  </section>
  <section class="secao secao--alt" aria-labelledby="titulo-impacto">
    <div class="container">
      <h2 id="titulo-impacto">Nosso impacto</h2>
      <div class="grid">
        <div class="impacto col-12 col-sm-6 col-lg-3"><strong>400+</strong>crianças atendidas</div>
        <div class="impacto col-12 col-sm-6 col-lg-3"><strong>150</strong>famílias acompanhadas</div>
        <div class="impacto col-12 col-sm-6 col-lg-3"><strong>12 mil</strong>refeições por ano</div>
        <div class="impacto col-12 col-sm-6 col-lg-3"><strong data-contador-voluntarios>60</strong>voluntários cadastrados</div>
      </div>
    </div>
  </section>`;

export const telaProjetos = () => `
  <section class="secao" aria-labelledby="titulo-projetos">
    <div class="container">
      <h1 id="titulo-projetos">Projetos Sociais</h1>
      <p>Conheça as frentes de atuação do Instituto Semear Futuro.</p>
      <div class="filtros" role="group" aria-label="Filtrar projetos por categoria">
        <button class="btn btn--contorno filtro" type="button" data-filtro="todos" aria-pressed="true">Todos</button>
        ${[...new Set(projetos.map((p) => p.categoria))]
          .map((c) => `<button class="btn btn--contorno filtro" type="button" data-filtro="${c}" aria-pressed="false">${c}</button>`)
          .join('')}
      </div>
      <div class="grid" id="lista-projetos">${projetos.map(cardProjeto).join('')}</div>
    </div>
  </section>`;

export const telaCadastro = () => `
  <section class="secao" aria-labelledby="titulo-cadastro">
    <div class="container grid">
      <div class="col-12 col-lg-8">
        <h1 id="titulo-cadastro">Cadastro de Voluntário</h1>
        <div id="area-alerta">${alerta('info', 'Antes de começar', 'Campos marcados com * são obrigatórios. Seu rascunho é salvo automaticamente neste navegador.')}</div>
        <form class="form form--js" id="form-cadastro" novalidate>
          <fieldset>
            <legend>Dados pessoais</legend>
            ${campo({ id: 'nome', rotulo: 'Nome completo', extra: 'autocomplete="name"' })}
            <div class="form__linha">
              ${campo({ id: 'email', rotulo: 'E-mail', tipo: 'email', extra: 'autocomplete="email"' })}
              ${campo({ id: 'cpf', rotulo: 'CPF', ajuda: 'Somente números; a máscara é aplicada automaticamente.', extra: 'inputmode="numeric" maxlength="14"' })}
            </div>
            <div class="form__linha">
              ${campo({ id: 'telefone', rotulo: 'Telefone', tipo: 'tel', ajuda: 'Ex.: (81) 99999-0000', extra: 'inputmode="numeric" maxlength="15"' })}
              ${campo({ id: 'nascimento', rotulo: 'Data de nascimento', tipo: 'date' })}
            </div>
            <div class="form__linha">
              ${campo({ id: 'cep', rotulo: 'CEP', extra: 'inputmode="numeric" maxlength="9"' })}
              ${campo({ id: 'cidade', rotulo: 'Cidade' })}
            </div>
          </fieldset>
          <fieldset>
            <legend>Como deseja ajudar?</legend>
            ${projetos.map((p, i) => `<label class="form__opcao"><input type="radio" name="area" value="${p.id}" ${i === 0 ? 'checked' : ''}> ${p.titulo}</label>`).join('')}
          </fieldset>
          <label class="form__opcao"><input type="checkbox" id="termos" name="termos"> Li e aceito o termo de voluntariado.</label>
          <div class="grupo-botoes">
            <button class="btn btn--primario" type="submit" disabled>Enviar cadastro</button>
            <button class="btn btn--contorno" type="reset">Limpar</button>
          </div>
        </form>
      </div>
      <aside class="col-12 col-lg-4" aria-labelledby="titulo-lista">
        <div class="card"><div class="card__corpo">
          <h2 id="titulo-lista">Voluntários cadastrados</h2>
          <p class="form__ajuda">Dados salvos no localStorage deste navegador.</p>
          <div class="grafico"><canvas id="grafico-voluntarios" role="img"></canvas></div>
          <ul class="lista-voluntarios" id="lista-voluntarios"></ul>
        </div></div>
      </aside>
    </div>
  </section>`;

export const itemVoluntario = (v) => `
  <li class="lista-voluntarios__item">
    <div><strong>${esc(v.nome)}</strong><br><small>${esc(v.cidade)} · ${esc(v.areaNome)}</small></div>
    <button class="btn-icone" type="button" data-remover="${v.id}" aria-label="Remover ${esc(v.nome)}">✕</button>
  </li>`;

export const tela404 = () => `
  <section class="secao"><div class="container">
    <h1>Página não encontrada</h1>
    <p>O endereço acessado não existe. <a href="#/inicio">Voltar para o início</a>.</p>
  </div></section>`;
