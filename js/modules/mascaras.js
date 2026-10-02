// mascaras.js — formatação automática enquanto o usuário digita
const soNumeros = (v) => v.replace(/\D/g, '');

export const mascaras = {
  cpf: (v) => soNumeros(v).slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2'),
  telefone: (v) => soNumeros(v).slice(0, 11)
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d)(\d{4})$/, '$1-$2'),
  cep: (v) => soNumeros(v).slice(0, 8).replace(/^(\d{5})(\d)/, '$1-$2'),
};

export function aplicarMascaras(form) {
  Object.keys(mascaras).forEach((nome) => {
    const input = form.elements[nome];
    if (!input) return;
    input.addEventListener('input', () => { input.value = mascaras[nome](input.value); });
  });
}
