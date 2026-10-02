// grafico.js — integração com a biblioteca externa Chart.js (v4)
// A biblioteca é carregada por <script defer src="js/vendor/chart.umd.min.js"> no index.html
// e fica disponível como window.Chart. Este módulo é o único lugar que conversa com ela.
import { projetos } from '../data/projetos.js';

let instancia = null; // guarda o gráfico para destruí-lo antes de recriar (evita vazamento)

export function desenharGraficoVoluntarios(canvas, voluntarios) {
  if (!canvas) return;
  if (!window.Chart) { // biblioteca não carregou: mostra texto alternativo
    canvas.replaceWith(Object.assign(document.createElement('p'), {
      className: 'form__ajuda', textContent: 'Gráfico indisponível no momento.',
    }));
    return;
  }

  const contagem = projetos.map((p) => voluntarios.filter((v) => v.area === p.id).length);
  const estilo = getComputedStyle(document.documentElement);
  const cor = (nome) => estilo.getPropertyValue(nome).trim(); // usa as variáveis do design system

  if (instancia) instancia.destroy();
  instancia = new window.Chart(canvas, {
    type: 'bar',
    data: {
      labels: projetos.map((p) => p.titulo),
      datasets: [{
        label: 'Voluntários por projeto',
        data: contagem,
        backgroundColor: [cor('--cor-destaque'), cor('--cor-primaria-clara'), cor('--cor-secundaria')],
        borderRadius: 6,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
    },
  });

  // Resumo textual para leitores de tela
  canvas.setAttribute('aria-label',
    projetos.map((p, i) => `${p.titulo}: ${contagem[i]}`).join('; '));
}
