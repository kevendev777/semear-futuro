// projetos.js — dados dos projetos sociais (separados da apresentação)
export const projetos = [
  {
    id: 'reforco',
    titulo: 'Reforço Escolar',
    categoria: 'Educação',
    classe: 'badge--educacao',
    imagem: 'imagens/criancas-estudando.svg',
    alt: 'Crianças estudando com livros',
    descricao: 'Aulas de português e matemática no contraturno para crianças de 6 a 14 anos.',
    status: { texto: 'Precisa de voluntários', classe: 'badge--urgente' },
  },
  {
    id: 'oficinas',
    titulo: 'Oficinas Culturais',
    categoria: 'Cultura',
    classe: 'badge--cultura',
    imagem: 'imagens/oficinas.svg',
    alt: 'Ilustração de crianças pintando em uma oficina de artes',
    descricao: 'Música, artes e leitura para fortalecer a autoestima e a criatividade.',
    status: { texto: 'Vagas abertas', classe: 'badge--sucesso' },
  },
  {
    id: 'cozinha',
    titulo: 'Cozinha Solidária',
    categoria: 'Alimentação',
    classe: 'badge--alimentacao',
    imagem: 'imagens/cozinha.svg',
    alt: 'Ilustração de panela e pratos servidos na cozinha solidária',
    descricao: 'Refeições nutritivas diárias para crianças e famílias atendidas.',
    status: null,
  },
];
