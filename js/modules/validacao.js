// validacao.js — regras de consistência do formulário e feedback ao usuário

export function cpfValido(cpf) {
  const n = cpf.replace(/\D/g, '');
  if (n.length !== 11 || /^(\d)\1{10}$/.test(n)) return false;
  const digito = (fatorInicial) => {
    let soma = 0;
    for (let i = 0; i < fatorInicial - 1; i++) soma += Number(n[i]) * (fatorInicial - i);
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };
  return digito(10) === Number(n[9]) && digito(11) === Number(n[10]);
}

function idade(dataISO) {
  const nasc = new Date(dataISO);
  const hoje = new Date();
  let anos = hoje.getFullYear() - nasc.getFullYear();
  const m = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) anos--;
  return anos;
}

// Cada regra devolve uma mensagem de erro ou '' quando o valor é válido
export const regras = {
  nome: (v) => (v.trim().split(/\s+/).length < 2 ? 'Informe nome e sobrenome.' : ''),
  email: (v) => (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? 'Digite um e-mail válido, ex.: nome@email.com.' : ''),
  cpf: (v) => (!cpfValido(v) ? 'CPF inválido. Confira os números digitados.' : ''),
  telefone: (v) => (v.replace(/\D/g, '').length < 10 ? 'Telefone incompleto. Use DDD + número.' : ''),
  nascimento: (v) => (!v ? 'Informe sua data de nascimento.' : idade(v) < 16 ? 'É preciso ter 16 anos ou mais para ser voluntário.' : ''),
  cep: (v) => (!/^\d{5}-\d{3}$/.test(v) ? 'CEP deve ter 8 números, ex.: 50000-000.' : ''),
  cidade: (v) => (v.trim().length < 2 ? 'Informe sua cidade.' : ''),
};

export function validarCampo(input) {
  const regra = regras[input.name];
  if (!regra) return true;
  const msg = input.value.trim() === '' ? 'Este campo é obrigatório.' : regra(input.value);
  const saida = document.getElementById(`erro-${input.id}`);
  input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  input.classList.toggle('is-invalido', !!msg);
  input.classList.toggle('is-valido', !msg);
  if (saida) saida.textContent = msg;
  return !msg;
}

export function validarFormulario(form) {
  const campos = Object.keys(regras).map((n) => form.elements[n]).filter(Boolean);
  const invalidos = campos.filter((c) => !validarCampo(c));
  if (invalidos.length) invalidos[0].focus(); // leva o usuário ao primeiro erro
  return invalidos.length === 0;
}

// Valida ao sair do campo (blur) e, depois do primeiro erro, a cada digitação
export function ativarValidacaoAoVivo(form) {
  Object.keys(regras).forEach((nome) => {
    const input = form.elements[nome];
    if (!input) return;
    input.addEventListener('blur', () => validarCampo(input));
    input.addEventListener('input', () => {
      if (input.getAttribute('aria-invalid') === 'true') validarCampo(input);
    });
  });
}
