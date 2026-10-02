// storage.js — camada única de acesso ao localStorage
const CHAVE_VOLUNTARIOS = 'semear:voluntarios';
const CHAVE_RASCUNHO = 'semear:rascunho';

function ler(chave, padrao) {
  try {
    const bruto = localStorage.getItem(chave);
    return bruto ? JSON.parse(bruto) : padrao;
  } catch {
    return padrao; // JSON corrompido ou storage bloqueado (modo privado)
  }
}

function gravar(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
    return true;
  } catch {
    return false; // cota cheia ou storage indisponível
  }
}

export const listarVoluntarios = () => ler(CHAVE_VOLUNTARIOS, []);

export function salvarVoluntario(dados) {
  const lista = listarVoluntarios();
  if (lista.some((v) => v.cpf === dados.cpf)) {
    throw new Error('Já existe um voluntário cadastrado com este CPF.');
  }
  const novo = { id: Date.now().toString(36), criadoEm: new Date().toISOString(), ...dados };
  lista.push(novo);
  if (!gravar(CHAVE_VOLUNTARIOS, lista)) throw new Error('Não foi possível salvar neste navegador.');
  return novo;
}

export function removerVoluntario(id) {
  gravar(CHAVE_VOLUNTARIOS, listarVoluntarios().filter((v) => v.id !== id));
}

export const lerRascunho = () => ler(CHAVE_RASCUNHO, null);
export const salvarRascunho = (dados) => gravar(CHAVE_RASCUNHO, dados);
export const limparRascunho = () => { try { localStorage.removeItem(CHAVE_RASCUNHO); } catch {} };
