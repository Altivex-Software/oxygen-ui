#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import readline from 'node:readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkgRoot = path.resolve(__dirname, '..');
const cwd = process.cwd();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n\x1b[1m\x1b[36m✨ Valence UI — AI Assistant Skills Setup\x1b[0m\n');
console.log('Configura las skills y reglas para que tu Asistente de IA entienda');
console.log('y genere componentes de Valence UI automáticamente en este proyecto.\n');

console.log('¿Qué asistente o editor de IA utilizas?');
console.log('  1) \x1b[32mAntigravity / Autonomous Agents\x1b[0m (.agents/skills/)');
console.log('  2) \x1b[32mCursor IDE\x1b[0m (.cursor/rules/)');
console.log('  3) \x1b[32mGitHub Copilot\x1b[0m (.github/copilot-instructions.md)');
console.log('  4) \x1b[32mWindsurf\x1b[0m (.windsurfrules)');
console.log('  5) \x1b[33mTodos los anteriores (Full AI Suite)\x1b[0m\n');

rl.question('Elige una opción [1-5] (default: 5): ', (answer) => {
  const choice = answer.trim() || '5';
  rl.close();

  try {
    if (choice === '1' || choice === '5') {
      installAntigravity();
    }
    if (choice === '2' || choice === '5') {
      installCursor();
    }
    if (choice === '3' || choice === '5') {
      installCopilot();
    }
    if (choice === '4' || choice === '5') {
      installWindsurf();
    }
    console.log('\n\x1b[32m✔ ¡Skills y reglas de Valence UI instaladas correctamente!\x1b[0m');
    console.log('Tu agente de IA ahora tiene acceso a todas las especificaciones y utilidades.\n');
  } catch (err) {
    console.error('\x1b[31m✖ Error instalando skills:\x1b[0m', err.message);
  }
});

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    const parent = path.dirname(dest);
    if (!fs.existsSync(parent)) {
      fs.mkdirSync(parent, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

function installAntigravity() {
  const src = path.join(pkgRoot, 'ai', 'skills');
  const dest = path.join(cwd, '.agents', 'skills');
  if (fs.existsSync(src)) {
    copyRecursiveSync(src, dest);
    console.log('  ✔ Instalado en .agents/skills/ (Valence UI Styles, Forms, Data, Overlays, Nav)');
  }
}

function installCursor() {
  const src = path.join(pkgRoot, 'ai', 'rules', 'cursor', 'valence-ui.mdc');
  const dest = path.join(cwd, '.cursor', 'rules', 'valence-ui.mdc');
  if (fs.existsSync(src)) {
    copyRecursiveSync(src, dest);
    console.log('  ✔ Instalado en .cursor/rules/valence-ui.mdc');
  }
}

function installCopilot() {
  const src = path.join(pkgRoot, 'ai', 'rules', 'copilot', 'copilot-instructions.md');
  const dest = path.join(cwd, '.github', 'copilot-instructions.md');
  if (fs.existsSync(src)) {
    copyRecursiveSync(src, dest);
    console.log('  ✔ Instalado en .github/copilot-instructions.md');
  }
}

function installWindsurf() {
  const src = path.join(pkgRoot, 'ai', 'rules', 'windsurf', '.windsurfrules');
  const dest = path.join(cwd, '.windsurfrules');
  if (fs.existsSync(src)) {
    copyRecursiveSync(src, dest);
    console.log('  ✔ Instalado en .windsurfrules');
  }
}
