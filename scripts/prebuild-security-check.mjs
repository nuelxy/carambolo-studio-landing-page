import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const selfRelativePath = path.join("scripts", "prebuild-security-check.mjs");
const failures = [];
const warnings = [];

function info(message) {
  console.log(`[security:prebuild] ${message}`);
}

function warn(message) {
  warnings.push(message);
  console.warn(`[security:prebuild][warn] ${message}`);
}

function fail(message) {
  failures.push(message);
  console.error(`[security:prebuild][error] ${message}`);
}

function normalizeLineEndings(value) {
  return value.replace(/\r\n/g, "\n");
}

function readTextIfExists(filePath) {
  if (!existsSync(filePath)) {
    return null;
  }

  return normalizeLineEndings(readFileSync(filePath, "utf8"));
}

function walkFiles(dirPath, collected = []) {
  for (const entry of readdirSync(dirPath, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules" || entry.name === "dist") {
      continue;
    }

    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walkFiles(fullPath, collected);
      continue;
    }

    if (entry.isFile()) {
      collected.push(fullPath);
    }
  }

  return collected;
}

function isProbablyTextFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return new Set([
    ".json",
    ".jsonc",
    ".js",
    ".mjs",
    ".cjs",
    ".ts",
    ".tsx",
    ".jsx",
    ".yml",
    ".yaml",
    ".sh",
    ".ps1",
    ".md",
    ".txt",
    ".npmrc",
  ]).has(ext) || path.basename(filePath) === ".npmrc";
}

function detectDenoAllowAll() {
  const packageJsonPath = path.join(repoRoot, "package.json");
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
  for (const [scriptName, scriptCommand] of Object.entries(packageJson.scripts ?? {})) {
    if (/\bdeno\b/.test(scriptCommand) && /--allow-all\b/.test(scriptCommand)) {
      fail(`package.json script "${scriptName}" executa deno com --allow-all.`);
    }
  }

  for (const filePath of walkFiles(repoRoot)) {
    const relativePath = path.relative(repoRoot, filePath);
    if (relativePath === selfRelativePath) {
      continue;
    }

    if (!isProbablyTextFile(filePath)) {
      continue;
    }

    const content = readTextIfExists(filePath);
    if (!content || !/\bdeno\b/.test(content) || !/--allow-all\b/.test(content)) {
      continue;
    }

    fail(`Arquivo do repositório contém uso de deno com --allow-all: ${relativePath}`);
  }
}

function checkRegistryEnv() {
  const envRegistry = process.env.NPM_CONFIG_REGISTRY ?? process.env.npm_config_registry;
  if (!envRegistry) {
    info("Nenhuma registry customizada foi informada por NPM_CONFIG_REGISTRY/npm_config_registry.");
    return;
  }

  if (/^http:\/\//i.test(envRegistry)) {
    fail(`Registry npm insegura detectada via ambiente: ${envRegistry}`);
    return;
  }

  if (!/^https:\/\/registry\.npmjs\.org\/?$/i.test(envRegistry)) {
    warn(`Registry npm customizada via ambiente: ${envRegistry}`);
    return;
  }

  info(`Registry npm em uso: ${envRegistry}`);
}

function checkEsbuildBinaryPath() {
  const esbuildBinaryPath = process.env.ESBUILD_BINARY_PATH;
  if (esbuildBinaryPath) {
    warn(`ESBUILD_BINARY_PATH definido: ${esbuildBinaryPath}`);
  }
}

function checkNpmrc() {
  const npmrcPath = path.join(repoRoot, ".npmrc");
  const npmrc = readTextIfExists(npmrcPath);
  if (!npmrc) {
    info("Arquivo .npmrc nao encontrado no repositório.");
    return;
  }

  const insecureRegistryLines = npmrc
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#") && /registry\s*=/.test(line) && /http:\/\//i.test(line));

  if (insecureRegistryLines.length > 0) {
    fail(`.npmrc contem registry insegura em HTTP: ${insecureRegistryLines.join(" | ")}`);
  }
}

info("Iniciando verificacao defensiva de prebuild.");
checkRegistryEnv();
checkEsbuildBinaryPath();
checkNpmrc();
detectDenoAllowAll();

if (warnings.length === 0) {
  info("Nenhum aviso adicional de seguranca.");
}

if (failures.length > 0) {
  info(`Falha na verificacao defensiva: ${failures.length} problema(s) encontrado(s).`);
  process.exit(1);
}

info("Verificacao defensiva concluida com sucesso.");
