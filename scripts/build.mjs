// scripts/build.mjs — gera a pasta dist/ otimizada para produção
// HTML, CSS, JS e SVG minificados, mantendo a mesma estrutura de pastas.
import { readdir, readFile, writeFile, mkdir, rm, copyFile, stat } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { minify as minificarJS } from 'terser';
import CleanCSS from 'clean-css';
import { minify as minificarHTML } from 'html-minifier-terser';
import { optimize as otimizarSVG } from 'svgo';

const ORIGEM = '.';
const DESTINO = 'dist';
const ENTRADAS = ['index.html', 'html', 'css', 'js', 'imagens'];
let antes = 0;
let depois = 0;

async function* arquivos(caminho) {
  const info = await stat(caminho);
  if (info.isFile()) { yield caminho; return; }
  for (const item of await readdir(caminho)) yield* arquivos(join(caminho, item));
}

async function processar(arquivo) {
  const saida = join(DESTINO, arquivo);
  await mkdir(dirname(saida), { recursive: true });
  const original = await readFile(arquivo, 'utf8');
  let resultado = original;

  switch (extname(arquivo)) {
    case '.js':
      if (arquivo.includes('vendor')) { await copyFile(arquivo, saida); return; } // biblioteca já minificada
      resultado = (await minificarJS(original, { module: true, compress: true, mangle: true })).code;
      break;
    case '.css':
      resultado = new CleanCSS({ level: 2 }).minify(original).styles;
      break;
    case '.html':
      resultado = await minificarHTML(original, {
        collapseWhitespace: true, removeComments: true, minifyCSS: true, minifyJS: true,
      });
      break;
    case '.svg':
      resultado = otimizarSVG(original, { multipass: true }).data;
      break;
    default:
      await copyFile(arquivo, saida);
      return;
  }
  antes += Buffer.byteLength(original);
  depois += Buffer.byteLength(resultado);
  await writeFile(saida, resultado);
}

await rm(DESTINO, { recursive: true, force: true });
for (const entrada of ENTRADAS) {
  for await (const arquivo of arquivos(join(ORIGEM, entrada))) await processar(arquivo);
}
const kb = (b) => (b / 1024).toFixed(1);
console.log(`Build concluído em ./${DESTINO}: ${kb(antes)} KB -> ${kb(depois)} KB (${(100 - (depois / antes) * 100).toFixed(1)}% menor, sem contar o Chart.js já minificado)`);
