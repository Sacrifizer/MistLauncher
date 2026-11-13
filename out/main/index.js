"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const electron = require("electron");
const path = require("node:path");
const node_fs = require("node:fs");
const os = require("node:os");
const fflate = require("fflate");
const node_crypto = require("node:crypto");
const node_stream = require("node:stream");
const promises = require("node:stream/promises");
const node_child_process = require("node:child_process");
const node_util = require("node:util");
const node_zlib = require("node:zlib");
const promises$1 = require("node:fs/promises");
const APP_NAME = "Mist Launcher";
const APP_VERSION = "0.1.26";
const DEFAULT_SETTINGS = {
  theme: "dark",
  accent: "#9fb8c8",
  density: "comfortable",
  fontScale: 1,
  reducedMotion: "system",
  language: "en-US",
  gameRoot: null,
  defaultMemoryMb: 4096,
  autoJava: true,
  javaPath: null,
  jvmArgs: "",
  downloadConcurrency: 6,
  keepLauncherOpen: true,
  showGameLog: false,
  confirmBeforeDelete: true,
  backupReminders: true,
  backupBeforeModpackUpdate: true,
  microsoftClientId: null,
  telemetry: false,
  lastInstallationId: null,
  recentInstallations: [],
  sidebarCollapsed: false,
  showSnapshots: true,
  onboarded: false
};
const MOJANG_RUNTIME_PLATFORMS = {
  "win32-x64": "windows-x64",
  "win32-ia32": "windows-x86",
  "win32-arm64": "windows-arm64",
  "darwin-x64": "mac-os",
  "darwin-arm64": "mac-os-arm64",
  "linux-x64": "linux",
  "linux-ia32": "linux-i386"
};
const EVENTS_CHANNEL = "mist:event";
const INVOKE_CHANNEL = "mist:invoke";
const MIST_DATA_DIR = process.env.MIST_DATA_DIR || process.env.SACRIFY_DATA_DIR;
const MIST_MS_CLIENT_ID = process.env.MIST_MS_CLIENT_ID || process.env.SACRIFY_MS_CLIENT_ID;
const MIST_CURSEFORGE_API_KEY = process.env.MIST_CURSEFORGE_API_KEY || process.env.SACRIFY_CURSEFORGE_API_KEY;
const MIST_WORLD_CHAT_URL = process.env.MIST_WORLD_CHAT_URL || process.env.SACRIFY_WORLD_CHAT_URL;
const MIST_CONTACT = process.env.MIST_CONTACT || process.env.SACRIFY_CONTACT;
const MIST_SCREENSHOTS = process.env.MIST_SCREENSHOTS || process.env.SACRIFY_SCREENSHOTS;
const MIST_VERIFY = process.env.MIST_VERIFY || process.env.SACRIFY_VERIFY;
class AppError extends Error {
  code;
  detail;
  hint;
  constructor(code, message, options) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.detail = options?.detail ?? null;
    this.hint = options?.hint ?? null;
    if (options?.cause) this.cause = options.cause;
  }
}
function errorMessage(error) {
  if (error instanceof AppError) return error.message;
  if (error instanceof Error) return error.message;
  return String(error);
}
function explainError(error) {
  if (error instanceof AppError) return { message: error.message, hint: error.hint };
  const message = errorMessage(error);
  const lower = message.toLowerCase();
  if (lower.includes("enotfound") || lower.includes("eai_again")) {
    return { message: "The download server could not be reached.", hint: "Check your internet connection, DNS, or proxy and try again." };
  }
  if (lower.includes("etimedout") || lower.includes("timeout")) {
    return { message: "The server took too long to respond.", hint: "Retry the operation. If it keeps failing, try a different network or VPN." };
  }
  if (lower.includes("enospc")) {
    return { message: "There is not enough free disk space.", hint: "Free up space on the drive that holds your Mist Launcher data, then retry." };
  }
  if (lower.includes("eacces") || lower.includes("eperm")) {
    return {
      message: "Windows or your filesystem denied access to a file.",
      hint: "Close the game and any program using the folder, then retry. Avoid running the launcher as administrator."
    };
  }
  if (lower.includes("404")) {
    return { message: "The requested file is no longer available at that source.", hint: "The project may have been removed or the version deleted. Pick another version." };
  }
  if (lower.includes("429")) {
    return { message: "The content provider is rate limiting requests.", hint: "Wait a minute and try again. Adding a CurseForge API key raises your limit." };
  }
  return { message, hint: null };
}
const MAX_FILE_BYTES = 8 * 1024 * 1024;
const MAX_ENTRIES = 3e3;
const PATTERNS = [
  { re: /("(?:access_token|refresh_token|client_secret|authorization|token|mc_access_token|device_code)"\s*:\s*")[^"]+"/gi, replace: '$1[redacted]"' },
  { re: /(Bearer\s+)[A-Za-z0-9._~+/=-]{8,}/g, replace: "$1[redacted]" },
  { re: /(XBL3\.0\s+x=)[^;\s]+;[A-Za-z0-9._~+/=-]+/gi, replace: "$1[redacted]" },
  { re: /eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}/g, replace: "[redacted-jwt]" },
  { re: /("?(?:password|passwd|secret|api[_-]?key)"?\s*[:=]\s*"?)[^\s",}]{4,}/gi, replace: "$1[redacted]" },
  { re: /\b[A-Z0-9]{4}-[A-Z0-9]{4}\b/g, replace: "[redacted-code]" }
];
class AppLogger {
  constructor(file) {
    this.file = file;
    try {
      if (node_fs.existsSync(file) && node_fs.statSync(file).size > MAX_FILE_BYTES) {
        node_fs.renameSync(file, `${file}.1`);
      }
    } catch {
    }
    try {
      this.stream = node_fs.createWriteStream(file, { flags: "a" });
      this.stream.on("error", () => {
        this.stream = null;
      });
    } catch {
      this.stream = null;
    }
    this.info("launcher", "Log session started");
  }
  file;
  stream = null;
  entries = [];
  secrets = /* @__PURE__ */ new Set();
  notifyTimer = null;
  onChange = null;
  setChangeListener(listener) {
    this.onChange = listener;
  }
  addSecret(value) {
    if (!value || value.length < 8) return;
    this.secrets.add(value);
  }
  redact(text2) {
    let output = text2;
    for (const { re, replace } of PATTERNS) output = output.replace(re, replace);
    for (const secret of this.secrets) {
      if (!secret) continue;
      output = output.split(secret).join("[redacted]");
    }
    return output;
  }
  write(level, scope, message, meta) {
    let line = this.redact(message);
    if (meta !== void 0) {
      try {
        line += ` ${this.redact(typeof meta === "string" ? meta : JSON.stringify(meta))}`;
      } catch {
        line += " [unserializable metadata]";
      }
    }
    const entry = {
      ts: (/* @__PURE__ */ new Date()).toISOString(),
      level,
      scope,
      message: line
    };
    this.entries.push(entry);
    if (this.entries.length > MAX_ENTRIES) this.entries.splice(0, this.entries.length - MAX_ENTRIES);
    if (this.stream) {
      this.stream.write(`[${entry.ts}] ${level.toUpperCase().padEnd(5)} ${scope}: ${line}
`);
    }
    if (this.onChange && !this.notifyTimer) {
      this.notifyTimer = setTimeout(() => {
        this.notifyTimer = null;
        this.onChange?.();
      }, 400);
    }
    if (level === "error") {
      if (process.env.NODE_ENV !== "production") process.stderr.write(`[${scope}] ${line}
`);
    }
  }
  debug(scope, message, meta) {
    this.write("debug", scope, message, meta);
  }
  info(scope, message, meta) {
    this.write("info", scope, message, meta);
  }
  warn(scope, message, meta) {
    this.write("warn", scope, message, meta);
  }
  error(scope, message, meta) {
    this.write("error", scope, message, meta);
  }
  tail(limit = 500) {
    return this.entries.slice(-limit);
  }
  path() {
    return this.file;
  }
  close() {
    this.stream?.end();
    this.stream = null;
  }
}
function safeSegment(segment) {
  const clean = segment.replace(/[<>:"/\\|?*\u0000-\u001f]/g, "_").replace(/^\.+$/, "_");
  if (!clean || clean === "." || clean === ".." || clean !== segment) {
    return clean || "unnamed";
  }
  return clean;
}
function resolveInside(root, ...child) {
  const base = path.resolve(root);
  const target = path.resolve(base, ...child);
  const relative = path.relative(base, target);
  if (relative === "" || relative.startsWith("..") || path.isAbsolute(relative)) {
    if (relative === "") return target;
    throw new Error(`Blocked path traversal outside ${base}: ${child.join("/")}`);
  }
  return target;
}
function isInside(root, target) {
  const base = path.resolve(root);
  const resolved = path.resolve(target);
  const relative = path.relative(base, resolved);
  return relative === "" || !relative.startsWith("..") && !path.isAbsolute(relative);
}
class Paths {
  dataDir;
  configDir;
  logsDir;
  cacheDir;
  backupsDir;
  installationsDir;
  defaultGameRoot;
  overrideRoot = null;
  constructor(dataDir) {
    const appData = electron.app.getPath("appData");
    const mistDataDir = path.join(appData, "Mist Launcher");
    const legacyDataDir = path.join(appData, "Sacrify Launcher");
    if (!dataDir && !MIST_DATA_DIR && node_fs.existsSync(legacyDataDir) && !node_fs.existsSync(mistDataDir)) {
      try { node_fs.renameSync(legacyDataDir, mistDataDir); } catch { /* Keep using legacy data in place if it cannot be moved. */ }
    }
    this.dataDir = dataDir ?? MIST_DATA_DIR ?? (node_fs.existsSync(legacyDataDir) && !node_fs.existsSync(mistDataDir) ? legacyDataDir : mistDataDir);
    this.configDir = path.join(this.dataDir, "config");
    this.logsDir = path.join(this.dataDir, "logs");
    this.cacheDir = path.join(this.dataDir, "cache");
    this.backupsDir = path.join(this.dataDir, "backups");
    this.installationsDir = path.join(this.dataDir, "installations");
    this.defaultGameRoot = path.join(this.dataDir, "minecraft");
    this.ensure();
  }
  /** Settings can point the shared Minecraft root somewhere else. */
  setGameRoot(root) {
    this.overrideRoot = root && root.trim() ? root.trim() : null;
  }
  ensure() {
    for (const dir of [this.dataDir, this.configDir, this.logsDir, this.cacheDir, this.backupsDir, this.installationsDir]) {
      node_fs.mkdirSync(dir, { recursive: true });
    }
  }
  get settingsFile() {
    return path.join(this.configDir, "settings.json");
  }
  get installationsFile() {
    return path.join(this.configDir, "installations.json");
  }
  get accountsFile() {
    return path.join(this.configDir, "accounts.json");
  }
  get secretsFile() {
    return path.join(this.configDir, "secrets.bin");
  }
  get launcherLogFile() {
    return path.join(this.logsDir, "launcher.log");
  }
  get backupIndexFile() {
    return path.join(this.configDir, "backups.json");
  }
  gameRoot(override) {
    const root = override || this.overrideRoot || this.defaultGameRoot;
    node_fs.mkdirSync(root, { recursive: true });
    return root;
  }
  versionDir(versionId, root) {
    return path.join(this.gameRoot(root), "versions", safeSegment(versionId));
  }
  libraryDir(root) {
    return path.join(this.gameRoot(root), "libraries");
  }
  assetsDir(root) {
    return path.join(this.gameRoot(root), "assets");
  }
  runtimeDir(root) {
    return path.join(this.gameRoot(root), "runtime");
  }
  rootLogsDir(root) {
    return path.join(this.gameRoot(root), "logs");
  }
  rootCrashDir(root) {
    return path.join(this.gameRoot(root), "crash-reports");
  }
  instanceDir(installationId) {
    return path.join(this.installationsDir, safeSegment(installationId));
  }
  installationBackups(installationId) {
    return path.join(this.backupsDir, safeSegment(installationId));
  }
  exists(target) {
    return node_fs.existsSync(target);
  }
}
const CONTACT = MIST_CONTACT || "local-build";
const USER_AGENT = `MistLauncher/${APP_VERSION} (${CONTACT})`;
function assertSafeUrl(raw, allowLocalhost = false) {
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new AppError("bad-url", `Invalid URL: ${raw}`);
  }
  const local = allowLocalhost && (url.hostname === "127.0.0.1" || url.hostname === "localhost");
  if (url.protocol !== "https:" && !(local && url.protocol === "http:")) {
    throw new AppError("insecure-url", `Refusing to contact an insecure URL: ${raw}`);
  }
  return url;
}
function sleep(ms, signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(new AppError("cancelled", "The operation was cancelled."));
      },
      { once: true }
    );
  });
}
class HttpClient {
  constructor(logger) {
    this.logger = logger;
  }
  logger;
  async request(url, init = {}, options = {}) {
    assertSafeUrl(url, options.allowLocalhost);
    const timeout = AbortSignal.timeout(options.timeoutMs ?? 3e4);
    const signal = options.signal ? AbortSignal.any([options.signal, timeout]) : timeout;
    const retries = options.retries ?? 2;
    let lastError;
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url, {
          ...init,
          signal,
          redirect: "follow",
          headers: {
            "User-Agent": USER_AGENT,
            Accept: "application/json, text/plain, */*",
            ...options.headers,
            ...init.headers
          }
        });
        if (response.status === 429 || response.status >= 500) {
          if (attempt < retries) {
            const retryAfter = Number(response.headers.get("retry-after"));
            await sleep(Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1e3 : 500 * (attempt + 1), options.signal);
            continue;
          }
        }
        return response;
      } catch (error) {
        lastError = error;
        if (options.signal?.aborted) throw new AppError("cancelled", "The operation was cancelled.");
        if (attempt < retries) {
          await sleep(400 * (attempt + 1), options.signal);
          continue;
        }
      }
    }
    this.logger.warn("http", `Request failed: ${url.split("?")[0]}`, {
      reason: lastError instanceof Error ? lastError.message : String(lastError)
    });
    throw new AppError("network", `Could not reach ${new URL(url).host}. Check your connection and retry.`, {
      cause: lastError
    });
  }
  async json(url, options = {}) {
    const response = await this.request(url, { method: "GET" }, options);
    if (!response.ok) {
      const body = await response.text().catch(() => "");
      throw new AppError(
        `http-${response.status}`,
        `Request to ${new URL(url).host} failed with HTTP ${response.status}.`,
        { detail: body.slice(0, 500) }
      );
    }
    return await response.json();
  }
  async text(url, options = {}) {
    const response = await this.request(url, { method: "GET" }, options);
    if (!response.ok) {
      throw new AppError(`http-${response.status}`, `Request failed with HTTP ${response.status}.`);
    }
    return response.text();
  }
  async postJson(url, body, options = {}) {
    const response = await this.request(
      url,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(body)
      },
      { retries: 0, ...options }
    );
    const text2 = await response.text();
    if (!response.ok) {
      let parsed = {};
      try {
        parsed = JSON.parse(text2);
      } catch {
      }
      const message = typeof parsed.error_description === "string" && parsed.error_description || typeof parsed.error === "string" && parsed.error || typeof parsed.message === "string" && parsed.message || `Request failed with HTTP ${response.status}.`;
      throw new AppError(`auth-${response.status}`, message, { detail: text2.slice(0, 500) });
    }
    return JSON.parse(text2);
  }
}
class SecureStore {
  constructor(file, logger) {
    this.file = file;
    this.logger = logger;
  }
  file;
  logger;
  data = {};
  available = false;
  backend = "unavailable";
  async init() {
    try {
      const storage = electron.safeStorage;
      this.available = typeof storage.isAsyncEncryptionAvailable === "function" ? await storage.isAsyncEncryptionAvailable() : electron.safeStorage.isEncryptionAvailable();
    } catch {
      this.available = false;
    }
    try {
      if (process.platform === "linux" && typeof electron.safeStorage.getSelectedStorageBackend === "function") {
        this.backend = electron.safeStorage.getSelectedStorageBackend();
      } else {
        this.backend = process.platform === "win32" ? "Windows DPAPI" : process.platform === "darwin" ? "macOS Keychain" : "libsecret";
      }
    } catch {
      this.backend = "unknown";
    }
    if (!this.available) {
      this.logger.warn("secure-store", "OS encryption is unavailable; credentials will remain in memory for this session only.");
      return;
    }
    try {
      const raw = await node_fs.promises.readFile(this.file, "utf8");
      const envelope = JSON.parse(raw);
      if (envelope.v !== 1 || !envelope.payload) return;
      const decrypted = electron.safeStorage.decryptString(Buffer.from(envelope.payload, "base64"));
      this.data = JSON.parse(decrypted);
      this.logger.info("secure-store", `Loaded encrypted secrets (${Object.keys(this.data).length} entries) using ${this.backend}.`);
    } catch (error) {
      const code = error.code;
      if (code === "ENOENT") {
        this.logger.debug("secure-store", "No encrypted secret store exists yet.");
        return;
      }
      this.logger.warn("secure-store", "Encrypted secret store could not be read and will be reset.", {
        reason: error instanceof Error ? error.message : String(error)
      });
      this.data = {};
    }
  }
  isAvailable() {
    return this.available;
  }
  backendName() {
    return this.backend;
  }
  get(key) {
    return this.data[key] ?? null;
  }
  async set(key, value) {
    if (value === null || value === "") delete this.data[key];
    else this.data[key] = value;
    await this.persist();
  }
  async delete(key) {
    delete this.data[key];
    await this.persist();
  }
  keys() {
    return Object.keys(this.data);
  }
  async persist() {
    if (!this.available) {
      this.logger.debug("secure-store", "Skipping persistence because OS encryption is unavailable.");
      return;
    }
    if (Object.keys(this.data).length === 0) {
      await node_fs.promises.rm(this.file, { force: true });
      return;
    }
    try {
      const payload = electron.safeStorage.encryptString(JSON.stringify(this.data)).toString("base64");
      const envelope = { v: 1, payload };
      const tmp = `${this.file}.tmp`;
      await node_fs.promises.writeFile(tmp, JSON.stringify(envelope), { mode: 384 });
      await node_fs.promises.rename(tmp, this.file);
    } catch (error) {
      this.logger.error("secure-store", "Failed to persist encrypted secrets.", {
        reason: error instanceof Error ? error.message : String(error)
      });
      throw error;
    }
  }
}
async function ensureDir(dir) {
  await node_fs.promises.mkdir(dir, { recursive: true });
}
async function pathExists(target) {
  try {
    await node_fs.promises.access(target);
    return true;
  } catch {
    return false;
  }
}
async function readJson(file, fallback) {
  try {
    const raw = await node_fs.promises.readFile(file, "utf8");
    return JSON.parse(raw.replace(/^\uFEFF/, ""));
  } catch {
    return fallback;
  }
}
async function writeJsonAtomic(file, value, mode) {
  await ensureDir(path.dirname(file));
  const tmp = `${file}.${process.pid}.${Date.now()}.tmp`;
  await node_fs.promises.writeFile(tmp, JSON.stringify(value, null, 2), { encoding: "utf8", mode });
  await node_fs.promises.rename(tmp, file);
}
async function hashFile(file, algorithm) {
  return new Promise((resolve, reject) => {
    const hash = node_crypto.createHash(algorithm);
    const stream = node_fs.createReadStream(file);
    stream.on("error", reject);
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("end", () => resolve(hash.digest("hex")));
  });
}
async function fileSize(file) {
  try {
    const stat = await node_fs.promises.stat(file);
    return stat.isFile() ? stat.size : 0;
  } catch {
    return 0;
  }
}
async function directorySize(dir) {
  let total = 0;
  const entries = await node_fs.promises.readdir(dir, { withFileTypes: true }).catch(() => []);
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) total += await directorySize(full);
    else if (entry.isFile()) total += await fileSize(full);
  }
  return total;
}
async function copyDirectory(src, dest, filter) {
  await ensureDir(dest);
  const entries = await node_fs.promises.readdir(src, { withFileTypes: true }).catch(() => []);
  for (const entry of entries) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    const relative = path.relative(src, from).split(path.sep).join("/");
    if (filter && !filter(relative)) continue;
    if (entry.isDirectory()) await copyDirectory(from, to, filter);
    else if (entry.isFile()) await node_fs.promises.copyFile(from, to);
  }
}
async function listFilesRecursive(dir, options) {
  const out = [];
  async function walk(current) {
    const entries = await node_fs.promises.readdir(current, { withFileTypes: true }).catch(() => []);
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      const relative = path.relative(dir, full).split(path.sep).join("/");
      if (entry.isDirectory()) await walk(full);
      else if (entry.isFile()) out.push(relative);
    }
  }
  await walk(dir);
  return out;
}
async function trashPath(target) {
  if (!await pathExists(target)) return;
  const { shell } = await import("electron");
  await shell.trashItem(target);
}
async function removePath(target) {
  await node_fs.promises.rm(target, { recursive: true, force: true, maxRetries: 3 });
}
async function extractZip(archive, destDir) {
  const raw = await node_fs.promises.readFile(archive);
  const entries = fflate.unzipSync(new Uint8Array(raw));
  const written = [];
  await ensureDir(destDir);
  for (const [name, data] of Object.entries(entries)) {
    const normalized = name.replace(/\\/g, "/");
    if (!normalized || normalized.endsWith("/")) {
      const dir = resolveInside(destDir, normalized);
      await ensureDir(dir);
      continue;
    }
    if (normalized.startsWith("/") || /^[a-zA-Z]:/.test(normalized)) {
      throw new Error(`Archive contains an absolute path and was rejected: ${name}`);
    }
    const target = resolveInside(destDir, normalized);
    await ensureDir(path.dirname(target));
    await node_fs.promises.writeFile(target, data);
    written.push(normalized);
  }
  return written;
}
async function readZipEntry(archive, entry) {
  const entries = await readZipEntries(archive, [entry]);
  return entries.get(entry) ?? null;
}
async function readZipEntries(archive, names) {
  const wanted = new Set(names);
  const out = /* @__PURE__ */ new Map();
  try {
    const raw = await node_fs.promises.readFile(archive);
    const entries = fflate.unzipSync(new Uint8Array(raw), { filter: (file) => wanted.has(file.name) });
    for (const [name, data] of Object.entries(entries)) out.set(name, Buffer.from(data));
  } catch {
  }
  return out;
}
async function zipDirectory(dir, outFile, onProgress) {
  await ensureDir(path.dirname(outFile));
  const files = await listFilesRecursive(dir);
  const out = node_fs.createWriteStream(outFile);
  const zip = new fflate.Zip((error, chunk, final) => {
    if (error) out.destroy(error);
    else out.write(Buffer.from(chunk));
    if (final) out.end();
  });
  let done = 0;
  for (const relative of files) {
    const data = await node_fs.promises.readFile(path.join(dir, relative));
    const entry = new fflate.ZipDeflate(relative.split(path.sep).join("/"), { level: 6 });
    zip.add(entry);
    entry.push(new Uint8Array(data), true);
    done += 1;
    onProgress?.(done, files.length);
  }
  zip.end();
  await promises.finished(out);
}
async function extractZipStreaming(archive, destDir) {
  const { Unzip, UnzipInflate } = await import("fflate");
  await ensureDir(destDir);
  const pending = [];
  let count = 0;
  let failure = null;
  const unzip = new Unzip();
  unzip.register(UnzipInflate);
  unzip.onfile = (file) => {
    const normalized = file.name.replace(/\\/g, "/");
    if (normalized.startsWith("/") || /^[a-zA-Z]:/.test(normalized) || normalized.split("/").includes("..")) {
      failure = new Error(`Archive contains an unsafe path: ${file.name}`);
      return;
    }
    const target = resolveInside(destDir, normalized);
    if (normalized.endsWith("/")) {
      pending.push(ensureDir(target));
      return;
    }
    pending.push(
      (async () => {
        await ensureDir(path.dirname(target));
        const out = node_fs.createWriteStream(target);
        await new Promise((resolve, reject) => {
          file.ondata = (error, chunk, final) => {
            if (error) {
              out.destroy(error);
              reject(error);
              return;
            }
            if (chunk.length) out.write(Buffer.from(chunk));
            if (final) out.end(resolve);
          };
          file.start();
        });
      })()
    );
    count += 1;
  };
  const input = node_fs.createReadStream(archive);
  for await (const chunk of input) {
    unzip.push(new Uint8Array(chunk), false);
  }
  unzip.push(new Uint8Array(0), true);
  await Promise.all(pending);
  if (failure) throw failure;
  return count;
}
const fsx = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  copyDirectory,
  directorySize,
  ensureDir,
  extractZip,
  extractZipStreaming,
  fileSize,
  hashFile,
  listFilesRecursive,
  pathExists,
  readJson,
  readZipEntries,
  readZipEntry,
  removePath,
  trashPath,
  writeJsonAtomic,
  zipDirectory
}, Symbol.toStringTag, { value: "Module" }));
const MAX_JOBS = 40;
class DownloadJob {
  constructor(id, spec, concurrency, emit, logger) {
    this.concurrency = concurrency;
    this.emit = emit;
    this.logger = logger;
    this.id = id;
    this.meta = {
      id,
      kind: spec.kind,
      title: spec.title,
      subtitle: spec.subtitle ?? null,
      source: spec.source ?? null,
      status: "queued",
      phase: null,
      totalBytes: 0,
      doneBytes: 0,
      speedBps: 0,
      etaSeconds: null,
      itemsTotal: 0,
      itemsDone: 0,
      error: null,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      installationId: spec.installationId ?? null,
      cancellable: spec.cancellable !== false
    };
  }
  concurrency;
  emit;
  logger;
  id;
  meta;
  controller = new AbortController();
  items = [];
  cursor = 0;
  phase = null;
  lastEmit = 0;
  emitTimer = null;
  lastSampleBytes = 0;
  lastSampleAt = Date.now();
  speed = 0;
  completedBytesTotal = 0;
  retryFn = null;
  get status() {
    return this.meta.status;
  }
  /** Aborts when the user cancels this job. */
  get signal() {
    return this.controller.signal;
  }
  setRetry(fn) {
    this.retryFn = fn;
  }
  requestRetry() {
    if (!this.retryFn) throw new AppError("no-retry", "This task cannot be retried automatically. Start it again from its screen.");
    void this.retryFn();
  }
  setSubtitle(subtitle) {
    this.meta.subtitle = subtitle;
    this.touch();
  }
  setSource(source) {
    this.meta.source = source;
    this.touch();
  }
  setPhase(phase) {
    this.phase = phase;
    this.meta.phase = phase;
    this.touch();
  }
  addMany(items) {
    for (const item of items) {
      const total = typeof item.size === "number" && item.size > 0 ? item.size : null;
      this.items.push({ item, received: 0, total, done: false, started: false });
      if (total) this.meta.totalBytes += total;
      this.meta.itemsTotal += 1;
    }
    this.touch();
  }
  add(item) {
    this.addMany([item]);
  }
  /** Bytes added later (e.g. after resolving a file size). */
  addBytes(bytes) {
    if (bytes > 0) this.meta.totalBytes += bytes;
  }
  start() {
    if (this.meta.status === "queued") {
      this.meta.status = "running";
      this.meta.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
      this.lastSampleAt = Date.now();
      this.emitNow();
    }
  }
  async run() {
    this.start();
    this.setPhase(this.phase ?? "Downloading");
    if (this.meta.status === "cancelled") throw new AppError("cancelled", "The download was cancelled.");
    const workers = [];
    const workerCount = Math.min(this.concurrency, Math.max(1, this.pendingCount()));
    for (let i = 0; i < workerCount; i++) workers.push(this.worker());
    await Promise.all(workers);
    if (this.controller.signal.aborted) throw new AppError("cancelled", "The download was cancelled.");
    if (this.pendingCount() === 0 && this.items.length > 0 && this.meta.status === "running") {
      this.setPhase("Verifying files");
    }
  }
  pendingCount() {
    let count = 0;
    for (const state of this.items) if (!state.done && !state.started) count += 1;
    return count;
  }
  nextState() {
    for (const state of this.items) {
      if (!state.done && !state.started) {
        state.started = true;
        return state;
      }
    }
    return null;
  }
  async worker() {
    while (true) {
      const state = this.nextState();
      if (!state) return;
      if (this.controller.signal.aborted) throw new AppError("cancelled", "The download was cancelled.");
      await this.download(state);
    }
  }
  async download(state) {
    const { item } = state;
    const destination = item.dest;
    await ensureDir(path.dirname(destination));
    if (await pathExists(destination)) {
      const existingOk = await this.verifyExisting(destination, item);
      if (existingOk) {
        state.received = state.total ?? (await node_fs.promises.stat(destination)).size;
        state.done = true;
        this.completedBytesTotal += state.received;
        this.meta.doneBytes = this.completedBytesTotal;
        this.meta.itemsDone += 1;
        this.touch();
        return;
      }
    }
    const temp = `${destination}.mist-part`;
    let received = 0;
    let responseSize = null;
    let attempt = 0;
    const maxAttempts = 3;
    while (true) {
      if (attempt > 0) {
        received = 0;
        state.received = 0;
        this.meta.doneBytes = this.completedBytesTotal;
        this.touch();
      }
      try {
        assertSafeUrl(item.url);
        const response = await fetch(item.url, {
          signal: AbortSignal.any([this.controller.signal, AbortSignal.timeout(15 * 6e4)]),
          // Preserve Mojang's published byte counts and hashes even through
          // proxies that otherwise transparently decompress binary assets.
          headers: { "User-Agent": USER_AGENT, "Accept-Encoding": "identity" },
          redirect: "follow"
        });
        if (!response.ok || !response.body) {
          throw new AppError(
            `download-${response.status}`,
            `Download failed with HTTP ${response.status} for ${item.label ?? path.basename(destination)}.`,
            { detail: item.url }
          );
        }
        const lengthHeader = Number(response.headers.get("content-length"));
        responseSize = Number.isFinite(lengthHeader) && lengthHeader > 0 ? lengthHeader : null;
        if (state.total == null && responseSize) {
          state.total = responseSize;
          this.meta.totalBytes += responseSize;
        }
        const hash = node_crypto.createHash("sha1");
        const meter = new node_stream.Transform({
          transform: (chunk, _encoding, callback) => {
            received += chunk.length;
            hash.update(chunk);
            state.received = received;
            this.meta.doneBytes = this.completedBytesTotal + received;
            this.touch();
            callback(null, chunk);
          }
        });
        await promises.pipeline(node_stream.Readable.fromWeb(response.body), meter, node_fs.createWriteStream(temp));
        if (this.controller.signal.aborted) {
          throw new AppError("cancelled", "The download was cancelled.");
        }
        if (item.size && item.size > 0 && received !== item.size) {
          throw new AppError(
            "size-mismatch",
            `${item.label ?? path.basename(destination)} was incomplete (${received} of ${item.size} bytes).`
          );
        }
        const actualSha1 = hash.digest("hex");
        if (item.sha1 && actualSha1.toLowerCase() !== item.sha1.toLowerCase()) {
          throw new AppError("hash-mismatch", `Checksum verification failed for ${item.label ?? path.basename(destination)}.`);
        }
        if (item.sha512) {
          const actualSha512 = await hashFile(temp, "sha512");
          if (actualSha512.toLowerCase() !== item.sha512.toLowerCase()) {
            throw new AppError("hash-mismatch", `SHA-512 verification failed for ${item.label ?? path.basename(destination)}.`);
          }
        }
        await node_fs.promises.rename(temp, destination);
        state.received = received;
        state.done = true;
        state.total = received;
        this.completedBytesTotal += received;
        this.meta.doneBytes = this.completedBytesTotal;
        this.meta.itemsDone += 1;
        this.touch();
        return;
      } catch (error) {
        if (this.controller.signal.aborted) {
          await node_fs.promises.rm(temp, { force: true }).catch(() => void 0);
          throw new AppError("cancelled", "The download was cancelled.");
        }
        if (error instanceof AppError && error.code === "cancelled") throw error;
        await node_fs.promises.rm(temp, { force: true }).catch(() => void 0);
        const isLast = attempt >= maxAttempts - 1;
        if (isLast) {
          const explained = explainError(error);
          this.logger.warn("download", "Giving up on file", {
            url: item.url.split("?")[0],
            reason: errorMessage(error)
          });
          throw new AppError("download-failed", explained.message, {
            detail: item.url,
            hint: explained.hint ?? "Retry the task. If it keeps failing, check the provider status page and your connection."
          });
        }
        attempt += 1;
        this.logger.warn("download", `Retrying (${attempt}/${maxAttempts - 1}) ${item.url.split("?")[0]}`);
        await new Promise((resolve) => setTimeout(resolve, 350 * attempt));
      }
    }
  }
  async verifyExisting(file, item) {
    try {
      const stat = await node_fs.promises.stat(file);
      if (stat.size === 0) return false;
      if (item.size && stat.size !== item.size) return false;
      if (item.sha1) {
        const sha1 = await hashFile(file, "sha1");
        if (sha1.toLowerCase() !== item.sha1.toLowerCase()) return false;
      }
      if (item.sha512) {
        const sha512 = await hashFile(file, "sha512");
        if (sha512.toLowerCase() !== item.sha512.toLowerCase()) return false;
      }
      return true;
    } catch {
      return false;
    }
  }
  touch() {
    this.meta.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    if (this.meta.status !== "running") {
      this.emitNow();
      return;
    }
    const now = Date.now();
    const elapsed = now - this.lastSampleAt;
    if (elapsed >= 500) {
      const delta = Math.max(0, this.meta.doneBytes - this.lastSampleBytes);
      const instant = delta / (elapsed / 1e3);
      this.speed = this.speed === 0 ? instant : this.speed * 0.65 + instant * 0.35;
      this.lastSampleBytes = this.meta.doneBytes;
      this.lastSampleAt = now;
      this.meta.speedBps = Math.round(this.speed);
      const remaining = Math.max(0, this.meta.totalBytes - this.meta.doneBytes);
      this.meta.etaSeconds = this.speed > 1024 ? Math.round(remaining / this.speed) : null;
    }
    if (now - this.lastEmit > 150) this.emitNow();
    else if (!this.emitTimer) {
      this.emitTimer = setTimeout(() => {
        this.emitTimer = null;
        this.emitNow();
      }, 160);
    }
  }
  emitNow() {
    this.lastEmit = Date.now();
    this.emit(this.meta);
  }
  complete(phase = "Completed") {
    if (this.meta.status === "cancelled" || this.meta.status === "error") return;
    this.meta.status = "done";
    this.meta.phase = phase;
    this.meta.totalBytes = Math.max(this.meta.totalBytes, this.meta.doneBytes);
    this.meta.doneBytes = this.meta.totalBytes;
    this.meta.speedBps = 0;
    this.meta.etaSeconds = 0;
    this.meta.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    this.clearTimer();
    this.emitNow();
    this.logger.info("downloads", `${this.meta.title} completed`);
  }
  fail(error) {
    if (this.meta.status === "cancelled" || this.meta.status === "done") return;
    const explained = explainError(error);
    this.meta.status = "error";
    this.meta.error = explained.hint ? `${explained.message} ${explained.hint}` : explained.message;
    this.meta.speedBps = 0;
    this.meta.etaSeconds = null;
    this.meta.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    this.clearTimer();
    this.emitNow();
    this.logger.error("downloads", `${this.meta.title} failed: ${explained.message}`);
  }
  cancel() {
    if (this.meta.status === "done" || this.meta.status === "error") return;
    this.meta.status = "cancelled";
    this.meta.phase = "Cancelled";
    this.meta.speedBps = 0;
    this.meta.etaSeconds = null;
    this.controller.abort();
    this.clearTimer();
    this.emitNow();
    this.logger.info("downloads", `${this.meta.title} cancelled`);
  }
  snapshot() {
    return { ...this.meta };
  }
  clearTimer() {
    if (this.emitTimer) {
      clearTimeout(this.emitTimer);
      this.emitTimer = null;
    }
  }
}
class DownloadManager {
  constructor(logger, emitJobs, concurrency = 6) {
    this.logger = logger;
    this.emitJobs = emitJobs;
    this.concurrency = concurrency;
  }
  logger;
  emitJobs;
  jobs = /* @__PURE__ */ new Map();
  order = [];
  concurrency;
  notifyTimer = null;
  setConcurrency(value) {
    this.concurrency = Math.max(1, Math.min(16, value));
  }
  create(spec) {
    const id = `job_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
    const job = new DownloadJob(id, spec, this.concurrency, (meta) => this.scheduleEmit(meta), this.logger);
    this.jobs.set(id, job);
    this.order.push(id);
    this.prune();
    this.scheduleEmit(job.snapshot());
    return job;
  }
  get(id) {
    return this.jobs.get(id);
  }
  list() {
    return this.order.map((id) => this.jobs.get(id)).filter((job) => Boolean(job)).map((job) => job.snapshot()).reverse();
  }
  active() {
    return this.list().filter((job) => job.status === "running" || job.status === "queued");
  }
  cancel(id) {
    this.jobs.get(id)?.cancel();
  }
  retry(id) {
    const job = this.jobs.get(id);
    if (!job) return;
    if (job.status !== "error") return;
    job.requestRetry();
  }
  clearFinished() {
    for (const id of [...this.order]) {
      const job = this.jobs.get(id);
      if (!job) continue;
      if (job.status === "done" || job.status === "cancelled" || job.status === "error") {
        this.jobs.delete(id);
        const index = this.order.indexOf(id);
        if (index >= 0) this.order.splice(index, 1);
      }
    }
    this.emitJobs(this.list());
  }
  scheduleEmit(meta) {
    if (this.notifyTimer) return;
    this.notifyTimer = setTimeout(() => {
      this.notifyTimer = null;
      this.emitJobs(this.list());
    }, 120);
  }
  prune() {
    while (this.order.length > MAX_JOBS) {
      const oldest = this.order[0];
      const job = oldest ? this.jobs.get(oldest) : void 0;
      if (!oldest) break;
      if (job && (job.status === "running" || job.status === "queued")) break;
      this.jobs.delete(oldest);
      this.order.shift();
    }
  }
}
const THEMES = ["dark", "light", "system"];
const DENSITIES = ["comfortable", "compact"];
class SettingsStore {
  constructor(paths, logger) {
    this.paths = paths;
    this.logger = logger;
  }
  paths;
  logger;
  settings = { ...DEFAULT_SETTINGS };
  async load() {
    const stored = await readJson(this.paths.settingsFile, {});
    this.settings = this.sanitize({ ...DEFAULT_SETTINGS, ...stored }, false);
    return this.get();
  }
  get() {
    return { ...this.settings, recentInstallations: [...this.settings.recentInstallations] };
  }
  async update(patch) {
    const merged = { ...this.settings, ...patch };
    this.settings = this.sanitize(merged, true);
    await writeJsonAtomic(this.paths.settingsFile, this.settings);
    this.logger.info("settings", "Settings updated.", Object.keys(patch));
    return this.get();
  }
  async reset() {
    this.settings = { ...DEFAULT_SETTINGS };
    await writeJsonAtomic(this.paths.settingsFile, this.settings);
    this.logger.info("settings", "Settings reset to defaults.");
    return this.get();
  }
  sanitize(input, strict) {
    const out = { ...input };
    if (!THEMES.includes(out.theme)) out.theme = DEFAULT_SETTINGS.theme;
    if (!DENSITIES.includes(out.density)) out.density = DEFAULT_SETTINGS.density;
    if (!["system", "reduce", "no-preference"].includes(out.reducedMotion)) out.reducedMotion = "system";
    out.accent = DEFAULT_SETTINGS.accent;
    out.fontScale = clampNumber(out.fontScale, 0.85, 1.35, 1);
    out.downloadConcurrency = Math.round(clampNumber(out.downloadConcurrency, 1, 16, 6));
    out.defaultMemoryMb = Math.round(clampNumber(out.defaultMemoryMb, 512, 65536, 4096));
    out.jvmArgs = typeof out.jvmArgs === "string" ? out.jvmArgs.slice(0, 4e3) : "";
    out.javaPath = typeof out.javaPath === "string" && out.javaPath.trim() ? out.javaPath.trim() : null;
    out.gameRoot = typeof out.gameRoot === "string" && out.gameRoot.trim() ? out.gameRoot.trim() : null;
    out.language = typeof out.language === "string" && out.language ? out.language : "en-US";
    out.recentInstallations = Array.isArray(out.recentInstallations) ? out.recentInstallations.filter((id) => typeof id === "string").slice(0, 8) : [];
    out.lastInstallationId = typeof out.lastInstallationId === "string" ? out.lastInstallationId : null;
    if (out.microsoftClientId != null) {
      const value = String(out.microsoftClientId).trim();
      if (!value) out.microsoftClientId = null;
      else if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)) {
        if (strict) {
          throw new AppError("settings-invalid", "That Microsoft client ID is not a valid application (client) ID.", {
            hint: 'Use the "Application (client) ID" GUID from your Microsoft Entra app registration.'
          });
        }
        out.microsoftClientId = null;
      } else out.microsoftClientId = value;
    }
    if (strict && out.gameRoot) {
      if (!isAbsolutePath(out.gameRoot)) {
        throw new AppError("settings-invalid", "The game directory must be an absolute path.");
      }
    }
    return out;
  }
}
function clampNumber(value, min, max, fallback) {
  const num2 = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(num2)) return fallback;
  return Math.min(max, Math.max(min, num2));
}
function isAbsolutePath(value) {
  return /^[a-zA-Z]:[\\/]/.test(value) || value.startsWith("/") || value.startsWith("\\\\");
}
class AccountStore {
  constructor(paths, secure, logger) {
    this.paths = paths;
    this.secure = secure;
    this.logger = logger;
  }
  paths;
  secure;
  logger;
  data = { current: null, accounts: [] };
  tokens = /* @__PURE__ */ new Map();
  async load() {
    this.data = await readJson(this.paths.accountsFile, { current: null, accounts: [] });
    if (!Array.isArray(this.data.accounts)) this.data.accounts = [];
    for (const account of this.data.accounts) {
      const raw = this.secure.get(`account.${account.uuid}`);
      if (!raw) continue;
      try {
        this.tokens.set(account.uuid, JSON.parse(raw));
      } catch {
        this.logger.warn("auth", `Stored token bundle for ${account.name} could not be parsed.`);
      }
    }
    if (this.data.current && !this.data.accounts.some((account) => account.uuid === this.data.current)) {
      this.data.current = null;
    }
  }
  list() {
    return this.data.accounts.map((account) => ({ ...account }));
  }
  current() {
    return this.data.accounts.find((account) => account.uuid === this.data.current) ?? null;
  }
  currentId() {
    return this.data.current;
  }
  get(uuid) {
    return this.data.accounts.find((account) => account.uuid === uuid) ?? null;
  }
  getTokens(uuid) {
    return this.tokens.get(uuid) ?? null;
  }
  async add(summary, tokens) {
    const existing = this.data.accounts.find((account) => account.uuid === summary.uuid);
    if (existing) {
      Object.assign(existing, summary);
    } else {
      this.data.accounts.push(summary);
    }
    this.data.current = summary.uuid;
    this.tokens.set(summary.uuid, tokens);
    await this.secure.set(`account.${summary.uuid}`, JSON.stringify(tokens));
    await this.persist();
    this.logger.info("auth", `Added Microsoft account ${summary.name}.`);
    return { ...summary };
  }
  /** Persist offline account metadata only; it has no token bundle or password. */
  async addOffline(summary) {
    const existing = this.data.accounts.find((account) => account.uuid === summary.uuid);
    if (existing) Object.assign(existing, summary);
    else this.data.accounts.push(summary);
    this.data.current = summary.uuid;
    this.tokens.delete(summary.uuid);
    await this.persist();
    this.logger.info("auth", `Added offline account ${summary.name}.`);
    return { ...summary };
  }
  async saveTokens(uuid, tokens) {
    this.tokens.set(uuid, tokens);
    await this.secure.set(`account.${uuid}`, JSON.stringify(tokens));
  }
  async update(uuid, patch) {
    const account = this.data.accounts.find((item) => item.uuid === uuid);
    if (!account) return null;
    Object.assign(account, patch);
    await this.persist();
    return { ...account };
  }
  async select(uuid) {
    const account = this.data.accounts.find((item) => item.uuid === uuid);
    if (!account) return null;
    this.data.current = uuid;
    account.lastUsedAt = (/* @__PURE__ */ new Date()).toISOString();
    await this.persist();
    return { ...account };
  }
  async remove(uuid) {
    this.data.accounts = this.data.accounts.filter((account) => account.uuid !== uuid);
    this.tokens.delete(uuid);
    await this.secure.delete(`account.${uuid}`);
    if (this.data.current === uuid) this.data.current = this.data.accounts[0]?.uuid ?? null;
    await this.persist();
  }
  async persist() {
    await writeJsonAtomic(this.paths.accountsFile, this.data);
  }
}
function newFlowId() {
  return node_crypto.randomUUID();
}
const AUTHORITY = "https://login.microsoftonline.com/consumers/oauth2/v2.0";
const SCOPE = "XboxLive.signin offline_access openid profile";
const MC_LOGIN = "https://api.minecraftservices.com/authentication/login_with_xbox";
const MC_PROFILE = "https://api.minecraftservices.com/minecraft/profile";
const MC_ENTITLEMENTS = "https://api.minecraftservices.com/entitlements/mcstore";
const XBL_AUTH = "https://user.auth.xboxlive.com/user/authenticate";
const XSTS_AUTH = "https://xsts.auth.xboxlive.com/xsts/authorize";
const CLIENT_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const OFFLINE_NAME_PATTERN = /^[A-Za-z0-9_]{3,16}$/;
function offlineUuid(name) {
  const bytes = node_crypto.createHash("md5").update(`OfflinePlayer:${name}`, "utf8").digest();
  bytes[6] = bytes[6] & 15 | 48;
  bytes[8] = bytes[8] & 63 | 128;
  const hex = bytes.toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
class AuthService {
  constructor(deps) {
    this.deps = deps;
  }
  deps;
  flows = /* @__PURE__ */ new Map();
  clientId() {
    const env = MIST_MS_CLIENT_ID?.trim();
    if (env && CLIENT_ID_PATTERN.test(env)) return { id: env, source: "env" };
    const secure = this.deps.secure.get("microsoft.clientId");
    if (secure && CLIENT_ID_PATTERN.test(secure)) return { id: secure, source: "settings" };
    const setting = this.deps.getSettings().microsoftClientId?.trim();
    if (setting && CLIENT_ID_PATTERN.test(setting)) return { id: setting, source: "settings" };
    return { id: null, source: "none" };
  }
  status() {
    const { id, source } = this.clientId();
    return {
      configured: Boolean(id),
      source,
      clientIdHint: id ? `${id.slice(0, 8)}…${id.slice(-4)}` : null,
      redirectNote: "Mist Launcher uses the device-code flow, so no redirect URL has to be registered."
    };
  }
  list() {
    return this.deps.accounts.list();
  }
  current() {
    return this.deps.accounts.current();
  }
  async select(uuid) {
    const account = await this.deps.accounts.select(uuid);
    this.deps.onAccountChanged(account);
    return account;
  }
  async remove(uuid) {
    await this.deps.accounts.remove(uuid);
    this.deps.onAccountChanged(this.deps.accounts.current());
  }
  /** Add a local username-only account for singleplayer, LAN, and offline-mode testing. */
  async addOffline(username) {
    const name = username.trim();
    if (!OFFLINE_NAME_PATTERN.test(name)) {
      throw new AppError("invalid-username", "Usernames must be 3–16 characters using only letters, numbers, and underscores.", {
        hint: "Example: Steve_123"
      });
    }
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const uuid = offlineUuid(name);
    const summary = {
      id: uuid,
      uuid,
      name,
      kind: "offline",
      addedAt: now,
      lastUsedAt: now,
      skinUrl: null,
      ownsGame: null,
      sessionExpiresAt: null,
      needsReauth: false
    };
    const saved = await this.deps.accounts.addOffline(summary);
    this.deps.onAccountChanged(saved);
    this.deps.logger.info("auth", `Offline test account ${name} is active.`);
    return saved;
  }
  async beginDeviceCode() {
    const { id: clientId } = this.clientId();
    if (!clientId) {
      throw new AppError("auth-not-configured", "Microsoft sign-in is not configured yet.", {
        hint: "Add a Microsoft Entra app client ID in Settings → Accounts. See docs/AUTH_SETUP.md for the 5 minute setup.",
        detail: "MIST_MS_CLIENT_ID"
      });
    }
    const body = new URLSearchParams({ client_id: clientId, scope: SCOPE });
    const response = await this.deps.http.request(`${AUTHORITY}/devicecode`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString()
    });
    const text2 = await response.text();
    if (!response.ok) {
      let detail = text2;
      try {
        const parsed = JSON.parse(text2);
        detail = parsed.error_description || parsed.error || text2;
      } catch {
      }
      throw new AppError("auth-device-code", "Microsoft rejected the sign-in request.", {
        detail: detail.slice(0, 400),
        hint: 'Confirm the app registration is a public client and has "Allow public client flows" enabled.'
      });
    }
    const data = JSON.parse(text2);
    const flow = {
      id: newFlowId(),
      clientId,
      deviceCode: data.device_code,
      interval: Math.max(3, data.interval || 5),
      expiresAt: Date.now() + (data.expires_in || 900) * 1e3,
      createdAt: Date.now()
    };
    this.flows.set(flow.id, flow);
    this.deps.logger.info("auth", "Started Microsoft device-code sign-in flow.");
    return {
      flowId: flow.id,
      userCode: data.user_code,
      verificationUri: data.verification_uri || "https://www.microsoft.com/link",
      verificationUriComplete: null,
      expiresAt: new Date(flow.expiresAt).toISOString(),
      intervalSeconds: flow.interval
    };
  }
  cancelFlow(flowId) {
    this.flows.delete(flowId);
  }
  async pollDeviceCode(flowId) {
    const flow = this.flows.get(flowId);
    if (!flow) return { status: "error", error: "This sign-in attempt is no longer active. Start again." };
    if (Date.now() > flow.expiresAt) {
      this.flows.delete(flowId);
      return { status: "error", error: "The sign-in code expired. Start again to get a fresh code." };
    }
    const body = new URLSearchParams({
      client_id: flow.clientId,
      grant_type: "urn:ietf:params:oauth:grant-type:device_code",
      device_code: flow.deviceCode
    });
    let payload;
    let statusCode = 200;
    try {
      const response = await this.deps.http.request(`${AUTHORITY}/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString()
      });
      statusCode = response.status;
      payload = await response.json();
    } catch (error) {
      return { status: "error", error: error instanceof Error ? error.message : "Microsoft sign-in failed." };
    }
    if (statusCode >= 400) {
      const code = String(payload.error ?? "");
      if (code === "authorization_pending") return { status: "pending" };
      if (code === "slow_down") {
        flow.interval += 5;
        return { status: "pending", slowDown: true };
      }
      if (code === "expired_token") {
        this.flows.delete(flowId);
        return { status: "error", error: "The sign-in code expired. Start again." };
      }
      if (code === "authorization_declined") {
        this.flows.delete(flowId);
        return { status: "error", error: "The sign-in request was declined in the browser." };
      }
      this.flows.delete(flowId);
      const description = String(payload.error_description ?? payload.error ?? "Microsoft sign-in failed.");
      return { status: "error", error: description.split("\n")[0].slice(0, 300) };
    }
    this.flows.delete(flowId);
    const token = payload;
    if (!token.access_token || !token.refresh_token) {
      return { status: "error", error: "Microsoft returned an incomplete token response. Check that offline_access is allowed." };
    }
    try {
      const account = await this.completeSignIn(token);
      return { status: "complete", account };
    } catch (error) {
      return { status: "error", error: error instanceof Error ? error.message : "Minecraft authentication failed." };
    }
  }
  async completeSignIn(token) {
    const msExpiresAt = Date.now() + token.expires_in * 1e3;
    const chain = await this.xboxChain(token.access_token);
    const mcToken = await this.minecraftLogin(chain.xstsToken, chain.uhs);
    const { profile, ownsGame } = await this.minecraftProfile(mcToken.accessToken);
    const stored = {
      msAccessToken: token.access_token,
      msRefreshToken: token.refresh_token ?? "",
      msExpiresAt,
      mcAccessToken: mcToken.accessToken,
      mcExpiresAt: Date.now() + mcToken.expiresIn * 1e3,
      xuid: chain.xuid,
      uhs: chain.uhs,
      ownsGame
    };
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const summary = {
      id: profile.id,
      uuid: profile.id,
      name: profile.name,
      kind: "microsoft",
      addedAt: now,
      lastUsedAt: now,
      skinUrl: profile.skins?.[0]?.url ?? null,
      ownsGame,
      sessionExpiresAt: new Date(stored.mcExpiresAt).toISOString(),
      needsReauth: false
    };
    const saved = await this.deps.accounts.add(summary, stored);
    this.deps.onAccountChanged(saved);
    this.deps.logger.info("auth", `Microsoft account ${summary.name} signed in.`);
    return saved;
  }
  async xboxChain(msAccessToken) {
    const xbl = await this.deps.http.postJson(XBL_AUTH, {
      Properties: {
        AuthMethod: "RPS",
        SiteName: "user.auth.xboxlive.com",
        RpsTicket: `d=${msAccessToken}`
      },
      RelyingParty: "http://auth.xboxlive.com",
      TokenType: "JWT"
    });
    const uhs = xbl.DisplayClaims?.xui?.[0]?.uhs;
    if (!xbl.Token || !uhs) throw new AppError("xbox-auth", "Xbox Live rejected the Microsoft token.");
    let xsts;
    try {
      xsts = await this.deps.http.postJson(XSTS_AUTH, {
        Properties: { SandboxId: "RETAIL", UserTokens: [xbl.Token] },
        RelyingParty: "rp://api.minecraftservices.com/",
        TokenType: "JWT"
      });
    } catch (error) {
      const detail = error instanceof AppError ? error.detail ?? "" : "";
      const xerr = /XErr[^0-9]*(\d{7,})/i.exec(detail)?.[1] ?? "";
      const known = {
        "2148916233": "This Microsoft account has no Xbox profile. Sign in at xbox.com once, then retry.",
        "2148916235": "Xbox Live is not available in this account’s country or region.",
        "2148916236": "This account needs adult verification before it can use Xbox Live.",
        "2148916237": "This account needs adult verification before it can use Xbox Live.",
        "2148916238": "This is a child account. An adult must add it to a Microsoft family group first.",
        "2148916227": "This Xbox account has been banned from Xbox Live."
      };
      throw new AppError(
        "xbox-auth",
        known[xerr] ?? "Xbox Live authorization failed for this Microsoft account.",
        { detail: xerr || detail.slice(0, 300), hint: "Check the account at xbox.com, then try signing in again." }
      );
    }
    const xuid = xsts.DisplayClaims?.xui?.[0]?.xid ?? null;
    return { xstsToken: xsts.Token, uhs, xuid };
  }
  async minecraftLogin(xstsToken, uhs) {
    const data = await this.deps.http.postJson(MC_LOGIN, {
      identityToken: `XBL3.0 x=${uhs};${xstsToken}`
    });
    if (!data.access_token) throw new AppError("minecraft-auth", "Minecraft Services did not return an access token.");
    return { accessToken: data.access_token, expiresIn: data.expires_in ?? 86400 };
  }
  async minecraftProfile(mcAccessToken) {
    let response;
    try {
      response = await this.deps.http.request(
        MC_PROFILE,
        { headers: { Authorization: `Bearer ${mcAccessToken}` } },
        { retries: 0 }
      );
    } catch (error) {
      throw new AppError("minecraft-profile", "Minecraft Services could not be reached.", { cause: error });
    }
    if (response.status === 404) {
      throw new AppError(
        "no-minecraft",
        "This Microsoft account does not own Minecraft: Java Edition.",
        { hint: "Sign in with the Microsoft account that purchased the game, or buy it at minecraft.net." }
      );
    }
    if (!response.ok) {
      throw new AppError("minecraft-profile", `Minecraft profile request failed (HTTP ${response.status}).`, {
        hint: "Try again in a moment. Repeated failures can be caused by an Xbox Live outage."
      });
    }
    const profile = await response.json();
    let entitlements;
    try {
      entitlements = await this.deps.http.json(MC_ENTITLEMENTS, {
        headers: { Authorization: `Bearer ${mcAccessToken}` },
        retries: 0
      });
    } catch (error) {
      throw new AppError(
        "minecraft-entitlement-check",
        "Minecraft ownership could not be verified.",
        { hint: "Check your connection and sign in again. Mist Launcher will not launch the game until Minecraft ownership is confirmed.", cause: error }
      );
    }
    if (!Array.isArray(entitlements.items)) {
      throw new AppError("minecraft-entitlement-check", "Minecraft ownership could not be verified.", {
        hint: "Minecraft Services returned an incomplete ownership response. Try signing in again."
      });
    }
    const ownsGame = hasJavaEditionEntitlement(entitlements.items);
    return { profile, ownsGame };
  }
  async refreshMicrosoft(tokens, clientId) {
    if (!tokens.msRefreshToken) {
      throw new AppError("reauth", "Your Microsoft session expired. Sign in again.", { hint: "Open Accounts and add the account again." });
    }
    const body = new URLSearchParams({
      client_id: clientId,
      grant_type: "refresh_token",
      refresh_token: tokens.msRefreshToken,
      scope: SCOPE
    });
    let payload;
    try {
      const response = await this.deps.http.request(`${AUTHORITY}/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString()
      });
      payload = await response.json();
      if (!response.ok) {
        throw new AppError("reauth", "Your Microsoft session expired. Sign in again.", {
          detail: String(payload.error_description ?? payload.error ?? ""),
          hint: "Open Accounts and add the account again."
        });
      }
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("reauth", "Could not refresh your Microsoft session.", { cause: error });
    }
    const accessToken = String(payload.access_token ?? "");
    const refreshToken = String(payload.refresh_token ?? tokens.msRefreshToken);
    const expiresIn = Number(payload.expires_in ?? 3600);
    if (!accessToken) throw new AppError("reauth", "Microsoft returned an empty session. Sign in again.");
    const chain = await this.xboxChain(accessToken);
    const mc = await this.minecraftLogin(chain.xstsToken, chain.uhs);
    return {
      ...tokens,
      msAccessToken: accessToken,
      msRefreshToken: refreshToken,
      msExpiresAt: Date.now() + expiresIn * 1e3,
      mcAccessToken: mc.accessToken,
      mcExpiresAt: Date.now() + mc.expiresIn * 1e3,
      xuid: chain.xuid ?? tokens.xuid,
      uhs: chain.uhs
    };
  }
  /** Return a valid Minecraft access token, refreshing it when needed. */
  async getLaunchAuth() {
    const account = this.current();
    if (!account) {
      throw new AppError("no-account", "Sign in with a Microsoft account to play.", {
        hint: "Minecraft: Java Edition requires a Microsoft account that owns the game."
      });
    }
    if (account.kind === "offline") {
      return {
        accessToken: "offline",
        uuid: account.uuid,
        name: account.name,
        xuid: null,
        clientId: null,
        userType: "legacy"
      };
    }
    let tokens = this.deps.accounts.getTokens(account.uuid);
    if (!tokens) {
      await this.markReauth(account.uuid);
      throw new AppError("reauth", "Your saved session is missing. Sign in again.", { hint: "Open Accounts and add the account again." });
    }
    if (account.ownsGame !== true) {
      throw new AppError(
        "no-entitlement",
        "This account’s Minecraft: Java Edition ownership has not been confirmed.",
        { hint: "Sign in again while connected so Minecraft Services can verify ownership. Mist Launcher cannot launch until the entitlement is confirmed." }
      );
    }
    if (tokens.mcExpiresAt - Date.now() < 5 * 6e4) {
      const { id: clientId } = this.clientId();
      if (!clientId) {
        throw new AppError("auth-not-configured", "Microsoft sign-in is not configured, so the session cannot be refreshed.", {
          hint: "Add your Microsoft Entra client ID in Settings → Accounts."
        });
      }
      try {
        tokens = await this.refreshMicrosoft(tokens, clientId);
        await this.deps.accounts.saveTokens(account.uuid, tokens);
        await this.deps.accounts.update(account.uuid, {
          sessionExpiresAt: new Date(tokens.mcExpiresAt).toISOString(),
          needsReauth: false
        });
      } catch (error) {
        await this.markReauth(account.uuid);
        throw error;
      }
    }
    return {
      accessToken: tokens.mcAccessToken,
      uuid: account.uuid,
      name: account.name,
      xuid: tokens.xuid,
      clientId: this.clientId().id,
      userType: "msa"
    };
  }
  async refresh(uuid) {
    const account = this.deps.accounts.get(uuid);
    if (!account) throw new AppError("account-missing", "That account was not found.");
    const tokens = this.deps.accounts.getTokens(uuid);
    if (!tokens) {
      await this.markReauth(uuid);
      throw new AppError("reauth", "This account has no saved session. Sign in again.");
    }
    const { id: clientId } = this.clientId();
    if (!clientId) {
      throw new AppError("auth-not-configured", "Add a Microsoft client ID before refreshing accounts.", {
        hint: "Settings → Accounts → Microsoft sign-in."
      });
    }
    const refreshed = await this.refreshMicrosoft(tokens, clientId);
    await this.deps.accounts.saveTokens(uuid, refreshed);
    const updated = await this.deps.accounts.update(uuid, {
      sessionExpiresAt: new Date(refreshed.mcExpiresAt).toISOString(),
      needsReauth: false
    });
    this.deps.onAccountChanged(updated);
    if (!updated) throw new AppError("account-missing", "That account was not found.");
    return updated;
  }
  async markReauth(uuid) {
    const updated = await this.deps.accounts.update(uuid, { needsReauth: true, ownsGame: null });
    if (updated) this.deps.onAccountChanged(updated);
  }
  /** Session state for the UI, without exposing any token material. */
  async sessionInfo(uuid) {
    const tokens = this.deps.accounts.getTokens(uuid);
    if (!tokens) return { sessionExpiresAt: null, needsReauth: true };
    return {
      sessionExpiresAt: new Date(tokens.mcExpiresAt).toISOString(),
      needsReauth: tokens.mcExpiresAt < Date.now() && !tokens.msRefreshToken
    };
  }
}
function hasJavaEditionEntitlement(items) {
  return items.some((item) => item.name === "product_minecraft" || item.name === "game_minecraft");
}
function currentOs() {
  const platform = process.platform;
  const name = platform === "win32" ? "windows" : platform === "darwin" ? "osx" : "linux";
  const arch = process.arch === "arm64" ? "arm64" : process.arch === "ia32" ? "x86" : "x86_64";
  return {
    name,
    arch,
    version: process.getSystemVersion?.() ?? "10.0",
    platform
  };
}
const DEFAULT_FEATURES = {
  is_demo_user: false,
  has_custom_resolution: false,
  has_quick_plays_support: false,
  is_quick_play_singleplayer: false,
  is_quick_play_multiplayer: false,
  is_quick_play_realms: false
};
function osMatches(rule, os2) {
  if (rule.name && rule.name !== os2.name) return false;
  if (rule.arch) {
    if (rule.arch === "x86" && os2.arch !== "x86") return false;
    if (rule.arch !== "x86" && rule.arch !== os2.arch) return false;
  }
  if (rule.version) {
    try {
      if (!new RegExp(rule.version).test(os2.version)) return false;
    } catch {
      return false;
    }
  }
  return true;
}
function rulesAllow(rules, os2 = currentOs(), features = DEFAULT_FEATURES) {
  if (!rules || rules.length === 0) return true;
  let allowed = false;
  for (const rule of rules) {
    if (rule.os && !osMatches(rule.os, os2)) continue;
    if (rule.features) {
      let matches = true;
      for (const [key, expected] of Object.entries(rule.features)) {
        if (features[key] !== expected) {
          matches = false;
          break;
        }
      }
      if (!matches) continue;
    }
    allowed = rule.action === "allow";
  }
  return allowed;
}
function argumentValue(entry, os2 = currentOs(), features = DEFAULT_FEATURES) {
  if (typeof entry === "string") return [entry];
  if (entry.rules && !rulesAllow(entry.rules, os2, features)) return [];
  return Array.isArray(entry.value) ? entry.value : [entry.value];
}
function inferJavaMajor(releaseTime, javaVersion) {
  if (javaVersion?.majorVersion) return javaVersion.majorVersion;
  const year = releaseTime ? new Date(releaseTime).getUTCFullYear() : 2015;
  if (year >= 2026) return 25;
  if (year >= 2025) return 21;
  if (year >= 2024) return 21;
  if (year >= 2022) return 17;
  if (year >= 2021) return 17;
  if (year >= 2020) return 8;
  return 8;
}
const VERSION_MANIFEST_URL = "https://piston-meta.mojang.com/mc/game/version_manifest_v2.json";
const JSON_ACCEPT = { Accept: "application/json" };
class MinecraftMeta {
  constructor(paths, http, logger) {
    this.paths = paths;
    this.http = http;
    this.logger = logger;
  }
  paths;
  http;
  logger;
  cacheFile(...parts) {
    return path.join(this.paths.cacheDir, ...parts);
  }
  async manifest(force = false) {
    const cache = this.cacheFile("version_manifest_v2.json");
    if (!force) {
      const cached = await readJson(cache, null);
      if (cached?.versions?.length) return cached;
    }
    try {
      const fresh = await this.http.json(VERSION_MANIFEST_URL, {
        timeoutMs: 45e3,
        headers: JSON_ACCEPT
      });
      fresh.fetchedAt = (/* @__PURE__ */ new Date()).toISOString();
      await writeJsonAtomic(cache, fresh);
      this.logger.info("mojang", `Fetched version manifest (${fresh.versions.length} versions).`);
      return fresh;
    } catch (error) {
      const cached = await readJson(cache, null);
      if (cached?.versions?.length) {
        this.logger.warn("mojang", "Using cached version manifest because the network request failed.");
        return cached;
      }
      throw new AppError("manifest-unavailable", "Could not load the Minecraft version list.", {
        hint: "Check your internet connection and try again. The official version manifest is at piston-meta.mojang.com.",
        cause: error
      });
    }
  }
  async list(force = false) {
    const manifest = await this.manifest(force);
    const installed = new Set(await this.installedIds());
    return manifest.versions.map((entry) => ({
      id: entry.id,
      type: normalizeType(entry.type),
      releaseTime: entry.releaseTime,
      installed: installed.has(entry.id),
      url: entry.url
    }));
  }
  async installedIds() {
    const base = path.join(this.paths.gameRoot(), "versions");
    const entries = await node_fs.promises.readdir(base, { withFileTypes: true }).catch(() => []);
    const ids = [];
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const jsonPath = path.join(base, entry.name, `${entry.name}.json`);
      try {
        await node_fs.promises.access(jsonPath);
        ids.push(entry.name);
      } catch {
      }
    }
    return ids;
  }
  async installedVersionJson(id) {
    const jsonPath = path.join(this.paths.versionDir(id), `${safeSegment(id)}.json`);
    return readJson(jsonPath, null);
  }
  /**
   * Fetch remote metadata, but prefer an installed copy so loader profiles
   * (which only exist locally) resolve correctly.
   */
  async getVersionJson(id, options = {}) {
    const local = await this.installedVersionJson(id);
    if (local && !options.force) return { ...local, __meta: { source: "local", fetchedAt: (/* @__PURE__ */ new Date()).toISOString() } };
    const cache = this.cacheFile("versions", `${safeSegment(id)}.json`);
    if (!options.force) {
      const cached = await readJson(cache, null);
      if (cached?.id) return cached;
    }
    const manifest = await this.manifest();
    const entry = manifest.versions.find((version) => version.id === id);
    if (!entry) {
      throw new AppError("version-not-found", `Minecraft version "${id}" was not found in Mojang's version manifest.`, {
        hint: "Refresh the version list. Loader profiles must be installed before they can be resolved."
      });
    }
    const raw = await this.http.json(entry.url, { timeoutMs: 45e3, headers: JSON_ACCEPT });
    const enriched = { ...raw, __meta: { source: "remote", fetchedAt: (/* @__PURE__ */ new Date()).toISOString() } };
    await writeJsonAtomic(cache, enriched);
    return enriched;
  }
  /** Merge an inheritsFrom chain into one launchable description. */
  async resolve(id) {
    const chain = [];
    let currentId = id;
    const seen = /* @__PURE__ */ new Set();
    while (currentId) {
      if (seen.has(currentId)) {
        throw new AppError("version-loop", `Version "${currentId}" inherits from itself. The installation is corrupted.`);
      }
      seen.add(currentId);
      const json = await this.getVersionJson(currentId);
      chain.push(json);
      currentId = json.inheritsFrom;
    }
    const child = chain[0];
    if (!child) throw new AppError("version-not-found", `Unknown version ${id}.`);
    let base = child;
    for (const version of chain) {
      if (version.downloads?.client?.url) {
        base = version;
        break;
      }
    }
    const libraries = [];
    const libraryNames = /* @__PURE__ */ new Set();
    for (const version of chain) {
      for (const library of version.libraries ?? []) {
        if (libraryNames.has(library.name)) continue;
        libraryNames.add(library.name);
        libraries.push(library);
      }
    }
    const gameArgs = [];
    const jvmArgs = [];
    for (const version of [...chain].reverse()) {
      if (version.arguments?.game) gameArgs.push(...version.arguments.game);
      if (version.arguments?.jvm) jvmArgs.push(...version.arguments.jvm);
    }
    const assetIndex = child.assetIndex ?? chain.find((version) => version.assetIndex)?.assetIndex;
    const assets = child.assets ?? chain.find((version) => version.assets)?.assets ?? "legacy";
    const downloads = child.downloads ? { ...child.downloads } : {};
    for (const version of chain) {
      if (!downloads.client && version.downloads?.client) downloads.client = version.downloads.client;
      if (!downloads.server && version.downloads?.server) downloads.server = version.downloads.server;
    }
    if (!downloads.client && base.downloads?.client) downloads.client = base.downloads.client;
    const mainClass = child.mainClass ?? chain.find((version) => version.mainClass)?.mainClass;
    if (!mainClass) {
      throw new AppError("invalid-version", `Version "${id}" has no main class and cannot be launched.`);
    }
    const releaseTime = child.releaseTime ?? base.releaseTime ?? (/* @__PURE__ */ new Date()).toISOString();
    const javaMajor = inferJavaMajor(releaseTime, child.javaVersion ?? base.javaVersion);
    return {
      id,
      baseId: base.id,
      type: normalizeType(child.type),
      releaseTime,
      mainClass,
      assets,
      assetIndex,
      downloads,
      libraries,
      arguments: { game: gameArgs, jvm: jvmArgs },
      minecraftArguments: child.minecraftArguments ?? chain.find((version) => version.minecraftArguments)?.minecraftArguments ?? null,
      javaVersion: child.javaVersion ?? base.javaVersion,
      javaMajor,
      logging: child.logging ?? chain.find((version) => version.logging)?.logging,
      complianceLevel: child.complianceLevel ?? 1,
      chain: chain.map((version) => version.id)
    };
  }
  /** Libraries that should be placed on the classpath for this machine. */
  classpathLibraries(resolved) {
    const out = [];
    for (const library of resolved.libraries) {
      if (library.rules && !rulesAllow(library.rules)) continue;
      const artifact = library.downloads?.artifact;
      let download = artifact?.url ? artifact : null;
      let relative = artifact?.path ?? null;
      if (!download && library.url) {
        const mavenPath = mavenPathFor(library.name);
        if (mavenPath) {
          relative = mavenPath;
          download = {
            url: joinUrl(library.url, mavenPath),
            sha1: library.sha1,
            size: library.size,
            path: mavenPath
          };
        }
      }
      if (!download || !relative) continue;
      if (library.natives) continue;
      out.push({ library, download: { ...download, path: relative }, path: this.libraryPath({ ...download, path: relative }) });
    }
    return out;
  }
  libraryPath(download) {
    const relative = download.path ?? deriveMavenPath(download.url);
    return path.join(this.paths.libraryDir(), ...relative.split("/"));
  }
  async assetIndex(resolved) {
    if (!resolved.assetIndex) {
      return { id: resolved.assets, objects: {}, totalSize: 0 };
    }
    const cache = this.cacheFile("asset-indexes", `${safeSegment(resolved.assetIndex.id)}.json`);
    const cached = await readJson(cache, null);
    if (cached?.objects) return cached;
    const raw = await this.http.json(resolved.assetIndex.url, { timeoutMs: 6e4, headers: JSON_ACCEPT });
    let totalSize = 0;
    for (const object of Object.values(raw.objects)) totalSize += object.size || 0;
    const index = {
      id: resolved.assetIndex.id,
      objects: raw.objects,
      map_to_resources: raw.map_to_resources,
      virtual: raw.virtual,
      totalSize
    };
    await writeJsonAtomic(cache, index);
    return index;
  }
  async detail(id) {
    const resolved = await this.resolve(id);
    const warnings = [];
    if (!resolved.downloads.client?.url) {
      warnings.push("Mojang does not publish a client jar for this version id. It may be a loader profile that inherits from a missing base version.");
    }
    let assetCount = 0;
    let assetSize = 0;
    try {
      const index = await this.assetIndex(resolved);
      assetCount = Object.keys(index.objects).length;
      assetSize = index.totalSize;
    } catch (error) {
      warnings.push(`Asset index could not be loaded: ${error instanceof Error ? error.message : String(error)}`);
    }
    if (resolved.chain.length > 1) {
      warnings.push(`This profile inherits from ${resolved.chain.slice(1).join(" → ")}.`);
    }
    return {
      id,
      type: resolved.type,
      releaseTime: resolved.releaseTime,
      javaMajor: resolved.javaMajor,
      javaComponent: resolved.javaVersion?.component ?? null,
      assets: resolved.assets,
      mainClass: resolved.mainClass,
      libraryCount: resolved.libraries.length,
      clientSize: resolved.downloads.client?.size ?? 0,
      assetCount,
      assetSize,
      complianceLevel: resolved.complianceLevel,
      warnings
    };
  }
  /** Resolve arguments, dropping rule-gated entries for other platforms. */
  jvmArguments(resolved) {
    return resolved.arguments.jvm.flatMap((entry) => argumentValue(entry));
  }
  gameArguments(resolved) {
    return resolved.arguments.game.flatMap((entry) => argumentValue(entry));
  }
}
function normalizeType(type) {
  if (type === "release" || type === "snapshot" || type === "old_beta" || type === "old_alpha") return type;
  return "snapshot";
}
function deriveMavenPath(url) {
  try {
    const parsed = new URL(url);
    const segments = parsed.pathname.split("/").filter(Boolean);
    return segments.slice(-4).join("/");
  } catch {
    return path.basename(url);
  }
}
function mavenPathFor(name, classifier) {
  const parts = name.split(":");
  if (parts.length < 3) return null;
  const [group, artifact, version] = parts;
  const extra = parts[3];
  const file = `${artifact}-${version}${extra ? `-${extra}` : ""}.jar`;
  return [group.replace(/\./g, "/"), artifact, version, file].join("/");
}
function joinUrl(base, relative) {
  return `${base.replace(/\/+$/, "")}/${relative.replace(/^\/+/, "")}`;
}
const execFileAsync = node_util.promisify(node_child_process.execFile);
const RUNTIME_MANIFEST = "https://launchermeta.mojang.com/v1/products/java-runtime/2ec0cc96c44e5a76b9c8b7c39df7210883d12871/all.json";
class JavaManager {
  constructor(paths, http, downloads, logger) {
    this.paths = paths;
    this.http = http;
    this.downloads = downloads;
    this.logger = logger;
  }
  paths;
  http;
  downloads;
  logger;
  cache = null;
  platformKey() {
    const key = `${process.platform}-${process.arch}`;
    return MOJANG_RUNTIME_PLATFORMS[key] ?? "windows-x64";
  }
  runtimeRoot(component) {
    return path.join(this.paths.runtimeDir(), component, this.platformKey());
  }
  async detect(force = false) {
    if (!force && this.cache && Date.now() - this.cache.at < 6e4) return this.cache.list;
    const candidates = /* @__PURE__ */ new Set();
    if (process.env.JAVA_HOME) {
      candidates.add(path.join(process.env.JAVA_HOME, "bin", javaBinary()));
    }
    const runtimeDir = this.paths.runtimeDir();
    const components = await node_fs.promises.readdir(runtimeDir, { withFileTypes: true }).catch(() => []);
    for (const component of components) {
      if (!component.isDirectory()) continue;
      const platformDir = path.join(runtimeDir, component.name, this.platformKey());
      const binary = await findJavaBinary(platformDir);
      if (binary) candidates.add(binary);
    }
    try {
      const command = process.platform === "win32" ? "where" : "which";
      const { stdout } = await execFileAsync(command, ["java"], { timeout: 5e3, windowsHide: true });
      for (const line of stdout.split(/\r?\n/)) if (line.trim()) candidates.add(line.trim());
    } catch {
    }
    for (const common of commonJavaRoots()) {
      const binary = await findJavaBinary(common, 4);
      if (binary) candidates.add(binary);
    }
    const infos = [];
    const seen = /* @__PURE__ */ new Set();
    for (const candidate of candidates) {
      const resolved = path.resolve(candidate);
      if (seen.has(resolved)) continue;
      seen.add(resolved);
      if (!await pathExists(resolved)) continue;
      const info = await this.probe(resolved);
      if (info) infos.push(info);
    }
    infos.sort((a, b) => (b.major ?? 0) - (a.major ?? 0));
    this.cache = { at: Date.now(), list: infos };
    this.logger.info("java", `Detected ${infos.length} Java runtime(s).`, infos.map((info) => `${info.major}:${info.path}`));
    return infos;
  }
  async probe(binary) {
    try {
      const { stderr, stdout } = await execFileAsync(binary, ["-XshowSettings:properties", "-version"], {
        timeout: 8e3,
        windowsHide: true,
        maxBuffer: 1024 * 1024
      });
      const output = `${stderr}
${stdout}`;
      const version = /java\.version\s*=\s*(.+)/.exec(output)?.[1]?.trim() ?? "";
      const vendor = /java\.vendor\s*=\s*(.+)/.exec(output)?.[1]?.trim() ?? "";
      const arch = /os\.arch\s*=\s*(.+)/.exec(output)?.[1]?.trim() ?? "";
      const majorMatch = /(?:java|openjdk) version "([^"]+)"/.exec(output);
      const rawVersion = version || majorMatch?.[1] || "";
      const major = parseMajor(rawVersion);
      return {
        path: binary,
        major,
        version: rawVersion || "unknown",
        vendor: vendor || "Unknown",
        source: binary.includes(`${path.sep}runtime${path.sep}`) ? "mojang" : "system",
        arch
      };
    } catch {
      return null;
    }
  }
  async status(requiredMajor, preferredPath) {
    const candidates = await this.detect();
    if (preferredPath) {
      const probed = await this.probe(preferredPath);
      if (probed) candidates.unshift({ ...probed, source: "custom" });
    }
    const compatible = (requiredMajor != null ? candidates.find((java) => java.major === requiredMajor) : void 0) ?? (requiredMajor != null ? candidates.find((java) => (java.major ?? 0) >= requiredMajor) : candidates[0]) ?? null;
    const component = requiredMajor != null ? componentForMajor(requiredMajor) : null;
    return {
      requiredMajor,
      candidates,
      mojangRuntimeInstalled: component ? await pathExists(this.runtimeRoot(component)) : false,
      mojangRuntimeComponent: component,
      compatible
    };
  }
  /**
   * Ensure a Java runtime that satisfies `major` exists. Installs Mojang's
   * official runtime for the exact version when no system Java matches.
   */
  async ensure(component, major, jobTitle, installationId = null) {
    const detected = await this.detect();
    const exact = detected.find((java) => java.major === major);
    if (exact) return exact;
    const newer = detected.find((java) => (java.major ?? 0) > major);
    if (newer) {
      this.logger.warn("java", `No Java ${major} found; using Java ${newer.major} at ${newer.path}.`);
      return newer;
    }
    const runtimeComponent = component || componentForMajor(major);
    if (!runtimeComponent) {
      throw new AppError("java-missing", `Java ${major} is required but was not found on this computer.`, {
        hint: "Install a matching JDK (for example from Adoptium), then select it in Settings → Java."
      });
    }
    const existingBinary = await findJavaBinary(this.runtimeRoot(runtimeComponent));
    if (existingBinary) {
      const info = await this.probe(existingBinary);
      if (info) return info;
    }
    this.logger.info("java", `Installing Mojang runtime ${runtimeComponent} (Java ${major}).`);
    return this.installRuntime(runtimeComponent, jobTitle, installationId);
  }
  /** Ensure an exact Java major for tools that reject newer compatible runtimes. */
  async ensureExact(component, major, jobTitle, installationId = null) {
    const detected = await this.detect();
    const exact = detected.find((java) => java.major === major);
    if (exact) return exact;
    const runtimeComponent = component || componentForMajor(major);
    if (!runtimeComponent) {
      throw new AppError("java-missing", `Java ${major} is required but was not found on this computer.`, {
        hint: "Install the matching Java runtime or let Mist Launcher download Mojang’s runtime, then retry."
      });
    }
    const existingBinary = await findJavaBinary(this.runtimeRoot(runtimeComponent));
    if (existingBinary) {
      const info = await this.probe(existingBinary);
      if (info?.major === major) return info;
    }
    this.logger.info("java", `Installing exact Mojang runtime ${runtimeComponent} (Java ${major}).`);
    const installed = await this.installRuntime(runtimeComponent, jobTitle, installationId);
    if (installed.major !== major) {
      throw new AppError("java-runtime-version", `Mojang’s ${runtimeComponent} runtime reported Java ${installed.major ?? "unknown"}; Java ${major} is required.`);
    }
    return installed;
  }
  async installRuntime(component, jobTitle, installationId = null) {
    const platformMap = await this.http.json(RUNTIME_MANIFEST, {
      timeoutMs: 45e3
    });
    const platform = this.platformKey();
    const components = platformMap[platform]?.[component];
    const entry = components?.[0];
    if (!entry) {
      throw new AppError("java-unavailable", `Mojang does not publish the "${component}" runtime for ${platform}.`, {
        hint: "Install Java manually and select it in Settings → Java."
      });
    }
    const manifest = await this.http.json(entry.manifest.url, {
      timeoutMs: 45e3
    });
    const dest = this.runtimeRoot(component);
    await ensureDir(dest);
    const job = this.downloads.create({
      kind: "java",
      title: jobTitle,
      subtitle: `Official Java runtime ${entry.version.name}`,
      source: `Mojang · ${new URL(entry.manifest.url).host}`,
      installationId
    });
    job.setRetry(() => {
      void this.installRuntime(component, jobTitle, installationId);
    });
    try {
      job.setPhase("Downloading Java runtime");
      const downloads = Object.entries(manifest.files).filter(([, file]) => file.type === "file" && file.downloads?.raw).map(([relative, file]) => ({
        url: file.downloads.raw.url,
        dest: path.join(dest, relative),
        sha1: file.downloads.raw.sha1,
        size: file.downloads.raw.size,
        label: relative
      }));
      job.addMany(downloads);
      await job.run();
      job.setPhase("Configuring runtime");
      for (const [relative, file] of Object.entries(manifest.files)) {
        const target = path.join(dest, relative);
        if (file.type === "directory") {
          await ensureDir(target);
        } else if (file.type === "link" && file.target && process.platform !== "win32") {
          await ensureDir(path.dirname(target));
          await node_fs.promises.rm(target, { force: true }).catch(() => void 0);
          await node_fs.promises.symlink(file.target, target).catch(() => void 0);
        }
        if (file.executable && process.platform !== "win32" && file.type === "file") {
          await node_fs.promises.chmod(target, 493).catch(() => void 0);
        }
      }
      const binary = await findJavaBinary(dest);
      if (!binary) {
        throw new AppError("java-install-failed", "The Java runtime was downloaded but its executable could not be located.");
      }
      if (process.platform !== "win32") await node_fs.promises.chmod(binary, 493).catch(() => void 0);
      const info = await this.probe(binary);
      if (!info) {
        throw new AppError("java-install-failed", "The downloaded Java runtime did not start correctly.", {
          hint: "Retry the installation. If it keeps failing, install Java manually and select it in Settings."
        });
      }
      this.cache = null;
      job.complete("Java ready");
      return { ...info, source: "mojang" };
    } catch (error) {
      job.fail(error);
      throw error;
    }
  }
  async pickCustom() {
    const { dialog } = await import("electron");
    const result = await dialog.showOpenDialog({
      title: "Select a Java executable",
      properties: ["openFile"],
      filters: process.platform === "win32" ? [{ name: "Java executable", extensions: ["exe"] }] : [{ name: "All files", extensions: ["*"] }]
    });
    const file = result.filePaths[0];
    if (!file) return null;
    const info = await this.probe(file);
    if (!info) throw new AppError("java-invalid", "That file is not a working Java executable.", { hint: "Choose the java or java.exe binary inside a JDK." });
    return { ...info, source: "custom" };
  }
}
function javaBinary() {
  return process.platform === "win32" ? "java.exe" : "java";
}
function parseMajor(version) {
  const modern = /^(\d+)(?:\.|$)/.exec(version);
  if (!modern) return null;
  const first = Number(modern[1]);
  if (first === 1) {
    const legacy = /^1\.(\d+)/.exec(version);
    return legacy ? Number(legacy[1]) : 1;
  }
  return first;
}
function componentForMajor(major) {
  const map = {
    8: "jre-legacy",
    16: "java-runtime-alpha",
    17: "java-runtime-beta",
    21: "java-runtime-delta",
    25: "java-runtime-epsilon"
  };
  return map[major] ?? null;
}
function commonJavaRoots() {
  if (process.platform === "win32") {
    const roots = [];
    for (const base of [process.env["ProgramFiles"], process.env["ProgramFiles(x86)"], process.env["LOCALAPPDATA"]]) {
      if (!base) continue;
      roots.push(path.join(base, "Java"), path.join(base, "Eclipse Adoptium"), path.join(base, "Microsoft"), path.join(base, "Zulu"));
      roots.push(path.join(base, "Programs", "Eclipse Adoptium"));
    }
    return roots;
  }
  if (process.platform === "darwin") {
    return ["/Library/Java/JavaVirtualMachines", "/System/Library/Java/JavaVirtualMachines"];
  }
  return ["/usr/lib/jvm", "/usr/java", "/opt/java", "/opt/jdk", "/snap/jdk"];
}
async function findJavaBinary(root, depth = 6) {
  if (depth < 0) return null;
  const direct = path.join(root, "bin", javaBinary());
  if (await pathExists(direct)) return direct;
  const macHome = path.join(root, "Contents", "Home", "bin", javaBinary());
  if (await pathExists(macHome)) return macHome;
  let entries;
  try {
    entries = await node_fs.promises.readdir(root, { withFileTypes: true });
  } catch {
    return null;
  }
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const found = await findJavaBinary(path.join(root, entry.name), depth - 1);
    if (found) return found;
  }
  return null;
}
class VersionInstaller {
  constructor(paths, meta, downloads, logger) {
    this.paths = paths;
    this.meta = meta;
    this.downloads = downloads;
    this.logger = logger;
  }
  paths;
  meta;
  downloads;
  logger;
  inflight = /* @__PURE__ */ new Map();
  markerPath(versionId) {
    const directory = this.paths.versionDir(versionId);
    const current = path.join(directory, ".mist-install.json");
    const legacy = path.join(directory, ".sacrify-install.json");
    return node_fs.existsSync(current) || !node_fs.existsSync(legacy) ? current : legacy;
  }
  async isInstalled(versionId) {
    const marker = await readJson(this.markerPath(versionId), null);
    if (!marker) return false;
    const json = await this.meta.installedVersionJson(versionId);
    if (!json) return false;
    const baseDir = this.paths.versionDir(marker.baseId);
    if (!await pathExists(path.join(baseDir, `${safeSegment(marker.baseId)}.jar`))) return false;
    return true;
  }
  async status(versionId) {
    const json = await this.meta.installedVersionJson(versionId);
    const marker = await readJson(this.markerPath(versionId), null);
    const baseId = marker?.baseId ?? json?.inheritsFrom ?? versionId;
    const hasClient = await pathExists(path.join(this.paths.versionDir(baseId), `${safeSegment(baseId)}.jar`));
    return {
      id: versionId,
      installed: Boolean(json && hasClient && marker),
      hasJson: Boolean(json),
      hasClient,
      sizeBytes: await directorySize(this.paths.versionDir(versionId)),
      installedAt: marker?.installedAt ?? null
    };
  }
  /**
   * Ensure a version is fully installed. Concurrent callers share one install.
   * When `job` is provided, progress is reported on it.
   */
  async ensure(versionId, options = {}) {
    if (!options.force && await this.isInstalled(versionId)) return;
    const existing = this.inflight.get(versionId);
    if (existing) return existing;
    const promise = this.runInstall(versionId, options.job, options.force ?? false).finally(() => {
      this.inflight.delete(versionId);
    });
    this.inflight.set(versionId, promise);
    return promise;
  }
  /** Queue a background install and return its job immediately. */
  start(versionId, options = {}) {
    const job = this.downloads.create({
      kind: "game",
      title: options.title ?? `Installing Minecraft ${versionId}`,
      subtitle: "Official Mojang files",
      source: "Mojang · piston-meta.mojang.com"
    });
    return { job, completion: this.ensure(versionId, { job }) };
  }
  async runInstall(versionId, job, force) {
    const owned = !job;
    const activeJob = job ?? this.downloads.create({
      kind: "game",
      title: `Installing Minecraft ${versionId}`,
      subtitle: "Official Mojang files",
      source: "Mojang · piston-meta.mojang.com"
    });
    if (owned) {
      activeJob.setRetry(() => {
        void this.ensure(versionId, { force: true }).catch(() => void 0);
      });
    }
    try {
      activeJob.setPhase("Resolving version metadata");
      activeJob.start();
      const resolved = await this.meta.resolve(versionId);
      this.logger.info("installer", `Installing ${versionId} (base ${resolved.baseId}, java ${resolved.javaMajor}).`);
      await this.saveChainJson(resolved);
      activeJob.setPhase("Downloading game files");
      await this.downloadClientJar(resolved, activeJob, force);
      await this.downloadLibraries(resolved, activeJob, force);
      activeJob.setPhase("Extracting natives");
      const nativesDir = await this.extractNatives(versionId, resolved, activeJob, force);
      activeJob.setPhase("Downloading assets");
      const assetCount = await this.downloadAssets(resolved, activeJob, force);
      activeJob.setPhase("Downloading logging configuration");
      await this.downloadLogging(resolved, activeJob);
      const marker = {
        versionId,
        installedAt: (/* @__PURE__ */ new Date()).toISOString(),
        baseId: resolved.baseId,
        libraries: resolved.libraries.length,
        assets: assetCount,
        javaMajor: resolved.javaMajor
      };
      await writeJsonAtomic(this.markerPath(versionId), marker);
      this.logger.info("installer", `Installed ${versionId} (${nativesDir ? "natives ready" : "no natives"}).`);
      activeJob.complete("Ready to play");
    } catch (error) {
      activeJob.fail(error);
      throw error;
    }
  }
  async saveChainJson(resolved) {
    for (const id of resolved.chain) {
      const dir = this.paths.versionDir(id);
      const jsonPath = path.join(dir, `${safeSegment(id)}.json`);
      if (await pathExists(jsonPath)) continue;
      const raw = await this.meta.getVersionJson(id);
      await ensureDir(dir);
      await writeJsonAtomic(jsonPath, raw);
      this.logger.info("installer", `Saved version metadata for ${id}.`);
    }
  }
  async downloadClientJar(resolved, job, force) {
    const client = resolved.downloads.client;
    if (!client?.url) {
      throw new AppError("client-missing", `Mojang did not provide a client jar for ${resolved.id}.`, {
        hint: "The loader profile may inherit from a version that is not installed. Reinstall the base version."
      });
    }
    const dir = this.paths.versionDir(resolved.baseId);
    const dest = path.join(dir, `${safeSegment(resolved.baseId)}.jar`);
    await ensureDir(dir);
    if (!force && await pathExists(dest)) {
      const stat = await node_fs.promises.stat(dest);
      if (!client.size || stat.size === client.size) return;
    }
    job.add({
      url: client.url,
      dest,
      sha1: client.sha1,
      size: client.size,
      label: `Minecraft ${resolved.baseId} client`
    });
    await job.run();
  }
  async downloadLibraries(resolved, job, force) {
    const items = [];
    for (const library of this.meta.classpathLibraries(resolved)) {
      const dest = library.path;
      if (!force && await pathExists(dest)) {
        const stat = await node_fs.promises.stat(dest);
        if (!library.download.size || stat.size === library.download.size) continue;
      }
      items.push({
        url: library.download.url,
        dest,
        sha1: library.download.sha1,
        size: library.download.size,
        label: library.library.name
      });
    }
    if (items.length) {
      this.logger.info("installer", `Downloading ${items.length} libraries for ${resolved.id}.`);
      job.addMany(items);
      await job.run();
    }
  }
  nativeClassifier(library) {
    if (!library?.natives) return null;
    const os2 = currentOs();
    const template = library.natives[os2.name];
    if (!template) return null;
    const archBits = os2.arch === "x86" ? "32" : "64";
    const classifier = template.replace("${arch}", archBits);
    const download = library.downloads?.classifiers?.[classifier];
    if (!download) return null;
    return { classifier, download };
  }
  async extractNatives(versionId, resolved, job, force) {
    const nativesDir = path.join(this.paths.versionDir(versionId), "natives");
    const nativeItems = [];
    const nativeJars = [];
    for (const library of resolved.libraries) {
      if (!library.natives) continue;
      if (library.rules && !rulesAllow(library.rules)) continue;
      const native = this.nativeClassifier(library);
      if (!native || !native.download?.url) continue;
      const dest = path.join(this.paths.libraryDir(), ...(native.download.path ?? "").split("/"));
      nativeJars.push({ library, path: dest });
      if (!force && await pathExists(dest)) continue;
      nativeItems.push({
        url: native.download.url,
        dest,
        sha1: native.download.sha1,
        size: native.download.size,
        label: `${library.name} natives`
      });
    }
    if (nativeItems.length) {
      job.addMany(nativeItems);
      await job.run();
    }
    if (nativeJars.length === 0) return false;
    await node_fs.promises.rm(nativesDir, { recursive: true, force: true });
    await ensureDir(nativesDir);
    for (const native of nativeJars) {
      if (!await pathExists(native.path)) continue;
      const excluded = native.library.extract?.exclude ?? ["META-INF/"];
      try {
        await extractZipFiltered(native.path, nativesDir, excluded);
      } catch (error) {
        this.logger.warn("installer", `Could not extract natives from ${native.library.name}.`, {
          reason: error instanceof Error ? error.message : String(error)
        });
      }
    }
    return true;
  }
  async downloadAssets(resolved, job, force) {
    const index = await this.meta.assetIndex(resolved);
    const assetIndexDir = path.join(this.paths.assetsDir(), "indexes");
    await ensureDir(assetIndexDir);
    const indexPath = path.join(assetIndexDir, `${safeSegment(resolved.assets)}.json`);
    if (resolved.assetIndex) {
      const indexDownload = {
        url: resolved.assetIndex.url,
        dest: indexPath,
        sha1: resolved.assetIndex.sha1,
        size: resolved.assetIndex.size,
        label: `Asset index ${resolved.assets}`
      };
      if (force || !await pathExists(indexPath)) {
        job.add(indexDownload);
        await job.run();
      }
    }
    const objectsDir = path.join(this.paths.assetsDir(), "objects");
    const items = [];
    for (const [name, object] of Object.entries(index.objects)) {
      const dest = path.join(objectsDir, object.hash.slice(0, 2), object.hash);
      if (!force && await pathExists(dest)) {
        const stat = await node_fs.promises.stat(dest);
        if (stat.size === object.size) continue;
      }
      items.push({
        url: `https://resources.download.minecraft.net/${object.hash.slice(0, 2)}/${object.hash}`,
        dest,
        sha1: object.hash,
        size: object.size,
        label: name
      });
    }
    if (items.length) {
      this.logger.info("installer", `Downloading ${items.length} assets (${items.length} files) for ${resolved.id}.`);
      job.addMany(items);
      await job.run();
    }
    if (index.virtual || index.map_to_resources) {
      job.setPhase("Building legacy asset tree");
      const virtualRoot = index.virtual ? path.join(this.paths.assetsDir(), "virtual", safeSegment(resolved.assets)) : path.join(this.paths.gameRoot(), "resources");
      for (const [name, object] of Object.entries(index.objects)) {
        const source = path.join(objectsDir, object.hash.slice(0, 2), object.hash);
        const dest = resolveInside(virtualRoot, ...name.split("/"));
        if (!await pathExists(source)) continue;
        await ensureDir(path.dirname(dest));
        if (!await pathExists(dest)) await node_fs.promises.copyFile(source, dest);
      }
    }
    return Object.keys(index.objects).length;
  }
  async downloadLogging(resolved, job) {
    const logging = resolved.logging?.client;
    if (!logging) return;
    const dir = path.join(this.paths.assetsDir(), "log_configs");
    await ensureDir(dir);
    const dest = path.join(dir, logging.file.id);
    if (await pathExists(dest)) {
      const stat = await node_fs.promises.stat(dest);
      if (stat.size === logging.file.size) return;
    }
    job.add({
      url: logging.file.url,
      dest,
      sha1: logging.file.sha1,
      size: logging.file.size,
      label: "Log4j configuration"
    });
    await job.run();
  }
  /** Hash a downloaded file to show verification state in diagnostics. */
  async hash(file) {
    const { hashFile: hashFile2 } = await Promise.resolve().then(() => fsx);
    return hashFile2(file, "sha1");
  }
}
async function extractZipFiltered(archive, dest, excludePrefixes) {
  const { unzipSync } = await import("fflate");
  const raw = await node_fs.promises.readFile(archive);
  const entries = unzipSync(new Uint8Array(raw));
  for (const [name, data] of Object.entries(entries)) {
    const normalized = name.replace(/\\/g, "/");
    if (!normalized || normalized.endsWith("/")) continue;
    if (excludePrefixes.some((prefix) => normalized.startsWith(prefix))) continue;
    if (path.isAbsolute(normalized) || normalized.split("/").includes("..")) continue;
    const target = resolveInside(dest, ...normalized.split("/"));
    await ensureDir(path.dirname(target));
    await node_fs.promises.writeFile(target, data);
  }
}
class NbtReader {
  constructor(data) {
    this.data = data;
  }
  data;
  offset = 0;
  u8() {
    return this.data.readUInt8(this.offset++);
  }
  i8() {
    return this.data.readInt8(this.offset++);
  }
  i16() {
    const n = this.data.readInt16BE(this.offset);
    this.offset += 2;
    return n;
  }
  i32() {
    const n = this.data.readInt32BE(this.offset);
    this.offset += 4;
    return n;
  }
  string() {
    const n = this.data.readUInt16BE(this.offset);
    this.offset += 2;
    const s = this.data.toString("utf8", this.offset, this.offset + n);
    this.offset += n;
    return s;
  }
  skip(type) {
    const length = (n) => {
      this.offset += n;
    };
    switch (type) {
      case 1:
        length(1);
        break;
      case 2:
        length(2);
        break;
      case 3:
      case 5:
        length(4);
        break;
      case 4:
      case 6:
        length(8);
        break;
      case 7: {
        const n = this.i32();
        length(n);
        break;
      }
      case 8: {
        const n = this.data.readUInt16BE(this.offset);
        this.offset += 2 + n;
        break;
      }
      case 9: {
        const element = this.u8();
        const n = this.i32();
        for (let i = 0; i < n; i++) this.skip(element);
        break;
      }
      case 10:
        while (true) {
          const child = this.u8();
          if (child === 0) break;
          this.string();
          this.skip(child);
        }
        break;
      case 11: {
        const n = this.i32();
        length(n * 4);
        break;
      }
      case 12: {
        const n = this.i32();
        length(n * 8);
        break;
      }
      default:
        throw new Error(`Unsupported NBT tag ${type}`);
    }
    if (this.offset > this.data.length) throw new Error("Minecraft server list is truncated.");
  }
}
function nbtString(name, value) {
  const n = Buffer.from(name, "utf8");
  const v = Buffer.from(value, "utf8");
  const header = Buffer.alloc(3);
  header[0] = 8;
  header.writeUInt16BE(n.length, 1);
  const length = Buffer.alloc(2);
  length.writeUInt16BE(v.length);
  return Buffer.concat([header, n, length, v]);
}
function nbtByte(name, value) {
  const n = Buffer.from(name, "utf8");
  const header = Buffer.alloc(3);
  header[0] = 1;
  header.writeUInt16BE(n.length, 1);
  return Buffer.concat([header, n, Buffer.from([value & 255])]);
}
function newServerCompound(server) {
  return Buffer.concat([
    nbtString("name", server.name),
    nbtString("ip", server.port === 25565 ? server.address : `${server.address}:${server.port}`),
    nbtByte("acceptTextures", 0),
    Buffer.from([0])
  ]);
}
function listTag(name, entries) {
  const encoded = Buffer.from(name, "utf8");
  const header = Buffer.alloc(8 + encoded.length);
  header[0] = 9;
  header.writeUInt16BE(encoded.length, 1);
  encoded.copy(header, 3);
  let offset = 3 + encoded.length;
  header[offset++] = 10;
  header.writeInt32BE(entries.length, offset);
  return Buffer.concat([header, ...entries]);
}
function emptyServerFile(server) {
  const root = Buffer.from([10, 0, 0]);
  return Buffer.concat([root, listTag("servers", [newServerCompound(server)]), Buffer.from([0])]);
}
function appendServer(input, server) {
  const reader = new NbtReader(input);
  if (reader.u8() !== 10) throw new Error("Minecraft server list has an unsupported NBT root.");
  const rootNameLength = input.readUInt16BE(reader.offset);
  reader.offset += 2;
  const rootName = input.subarray(reader.offset, reader.offset + rootNameLength);
  reader.offset += rootNameLength;
  const tags = [];
  let existing = null;
  while (reader.offset < input.length) {
    const start = reader.offset;
    const type = reader.u8();
    if (type === 0) break;
    const name = reader.string();
    if (type === 9 && name === "servers") {
      const elementType = reader.u8();
      const count = reader.i32();
      const entries2 = [];
      for (let index = 0; index < count; index++) {
        const entryStart = reader.offset;
        reader.skip(elementType);
        entries2.push(input.subarray(entryStart, reader.offset));
      }
      existing = entries2;
    } else {
      reader.skip(type);
      tags.push(input.subarray(start, reader.offset));
    }
  }
  const entry = newServerCompound(server);
  const entries = existing ?? [];
  const wanted = `${server.address.toLowerCase()}:${server.port}`;
  const duplicate = entries.some((raw) => raw.toString("utf8").toLowerCase().includes(wanted) || server.port === 25565 && raw.toString("utf8").toLowerCase().includes(server.address.toLowerCase()));
  if (!duplicate) entries.push(entry);
  const rootHeader = Buffer.alloc(3 + rootName.length);
  rootHeader[0] = 10;
  rootHeader.writeUInt16BE(rootName.length, 1);
  rootName.copy(rootHeader, 3);
  return Buffer.concat([rootHeader, ...tags, listTag("servers", entries), Buffer.from([0])]);
}
async function addServerToMinecraftList(gameDir, server) {
  await ensureDir(gameDir);
  const file = path.join(gameDir, "servers.dat");
  const temp = `${file}.mist-tmp`;
  let output;
  try {
    const current = await promises$1.readFile(file);
    const raw = current[0] === 31 && current[1] === 139 ? node_zlib.gunzipSync(current) : current;
    output = appendServer(raw, server);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    output = emptyServerFile(server);
  }
  await promises$1.writeFile(temp, node_zlib.gzipSync(output));
  await promises$1.rename(temp, file);
}
class GameLauncher {
  constructor(paths, meta, java, installer, logger, options) {
    this.paths = paths;
    this.meta = meta;
    this.java = java;
    this.installer = installer;
    this.logger = logger;
    this.options = options;
  }
  paths;
  meta;
  java;
  installer;
  logger;
  options;
  running = /* @__PURE__ */ new Map();
  states() {
    return [...this.running.values()].map((game) => ({ ...game.state }));
  }
  state(installationId) {
    const game = this.running.get(installationId);
    if (game) return { ...game.state };
    return { installationId, running: false, pid: null, startedAt: null, exitCode: null };
  }
  isRunning(installationId) {
    return this.running.has(installationId);
  }
  async plan(installationId, auth) {
    const installation = await this.requireInstallation(installationId);
    const resolved = await this.meta.resolve(installation.loader.profileId || installation.gameVersion);
    const javaStatus = await this.java.status(resolved.javaMajor, installation.javaPath || this.options.getSettings().javaPath);
    const javaPath = javaStatus.compatible?.path ?? "";
    return this.buildPlan(installation, resolved, javaPath, auth ?? this.placeholderAuth(), false);
  }
  async play(installationId, auth, server) {
    const installation = await this.requireInstallation(installationId);
    if (this.running.has(installationId)) {
      return { ok: false, installationId, plan: null, error: "This installation is already running.", pid: null };
    }
    try {
      const resolved = await this.meta.resolve(installation.loader.profileId || installation.gameVersion);
      const settings = this.options.getSettings();
      const availableJava = await this.java.status(resolved.javaMajor, installation.javaPath || settings.javaPath);
      if (!availableJava.compatible && !settings.autoJava) {
        throw new AppError(
          "java-missing",
          `Java ${resolved.javaMajor} is required for Minecraft ${installation.gameVersion}, but no compatible runtime was found.`,
          {
            hint: "Enable “Install Mojang’s Java runtime automatically” in Settings → Game & Java, or select a matching JDK for this installation."
          }
        );
      }
      await this.installer.ensure(installation.loader.profileId || installation.gameVersion);
      const javaInfo = await this.java.ensure(
        resolved.javaVersion?.component ?? null,
        resolved.javaMajor,
        `Installing Java ${resolved.javaMajor} for Minecraft ${installation.gameVersion}`,
        installationId
      );
      const javaPath = installation.javaPath || settings.javaPath || javaInfo.path;
      if (server) await addServerToMinecraftList(installation.gameDir, server);
      const plan = await this.buildPlan(installation, resolved, javaPath, auth, true, server);
      if (plan.missing.length > 0) {
        throw new AppError("files-missing", "Required game files are missing.", {
          hint: plan.missing.slice(0, 3).join(" · ")
        });
      }
      const pid = await this.spawnGame(installation, plan);
      return { ok: true, installationId, plan, error: null, pid };
    } catch (error) {
      this.logger.error("launch", `Launch failed for ${installation.name}: ${errorMessage(error)}`);
      return { ok: false, installationId, plan: null, error: errorMessage(error), pid: null };
    }
  }
  async kill(installationId) {
    const game = this.running.get(installationId);
    if (!game) return;
    game.stopping = true;
    this.logger.info("launch", `Stopping game ${installationId} by user request.`);
    game.child.kill();
    await new Promise((resolve) => setTimeout(resolve, 1500));
    if (!game.child.killed) game.child.kill("SIGKILL");
  }
  async requireInstallation(id) {
    const installation = await this.options.getInstallation(id);
    if (!installation) throw new AppError("installation-missing", "That installation no longer exists.");
    return installation;
  }
  placeholderAuth() {
    return { accessToken: "offline", uuid: "00000000000000000000000000000000", name: "Player", xuid: null, clientId: null, userType: "legacy" };
  }
  async buildPlan(installation, resolved, javaPath, auth, reveal, server) {
    const settings = this.options.getSettings();
    const profileId = installation.loader.profileId || installation.gameVersion;
    const versionDir = this.paths.versionDir(profileId);
    const nativesDir = path.join(versionDir, "natives");
    const clientJar = path.join(this.paths.versionDir(resolved.baseId), `${resolved.baseId}.jar`);
    const libraries = this.meta.classpathLibraries(resolved);
    const classpath = [...libraries.map((library) => library.path), clientJar].join(path.delimiter);
    const warnings = [];
    const missing = [];
    if (!await this.installer.isInstalled(profileId)) {
      missing.push(`Minecraft ${installation.gameVersion} files are not installed yet`);
    }
    if (!await pathExists(clientJar)) missing.push("Client jar is missing");
    if (libraries.length === 0) missing.push("No libraries were resolved for this platform");
    for (const library of libraries.slice(0, 400)) {
      if (!await pathExists(library.path)) {
        missing.push(`Missing library ${path.basename(library.path)}`);
        break;
      }
    }
    if (!javaPath) {
      const status = await this.java.status(resolved.javaMajor, installation.javaPath || settings.javaPath);
      if (status.compatible) {
        warnings.push(`Java ${status.compatible.major} at ${status.compatible.path} will be used.`);
      } else {
        warnings.push(`Java ${resolved.javaMajor} is required and will be installed automatically when you press Play.`);
      }
    }
    const indexId = resolved.assets;
    if (resolved.assetIndex) {
      const indexPath = path.join(this.paths.assetsDir(), "indexes", `${indexId}.json`);
      if (!await pathExists(indexPath)) missing.push("Asset index is missing");
    }
    let loggingArg = null;
    const logConfig = resolved.logging?.client;
    if (logConfig) {
      const logPath = path.join(this.paths.assetsDir(), "log_configs", logConfig.file.id);
      if (await pathExists(logPath)) {
        loggingArg = logConfig.argument.replace("${path}", logPath);
      }
    }
    ({
      has_custom_resolution: Boolean(installation.resolution)
    });
    const memory = Math.max(512, Math.min(installation.memoryMb || settings.defaultMemoryMb, 65536));
    const jvmArgs = [];
    jvmArgs.push(`-Xmx${memory}M`, `-Xms${Math.min(1024, Math.floor(memory / 2))}M`);
    if (resolved.arguments.jvm.length === 0) {
      jvmArgs.push(`-Djava.library.path=${nativesDir}`, "-Dminecraft.launcher.brand=MistLauncher");
      jvmArgs.push(`-Dminecraft.launcher.version=${APP_VERSION}`, "-cp", classpath);
    } else {
      const baseArgs = this.meta.jvmArguments(resolved);
      jvmArgs.push(...baseArgs);
    }
    jvmArgs.push(...splitArgs(installation.jvmArgs || ""));
    jvmArgs.push(...splitArgs(settings.jvmArgs || ""));
    if (loggingArg) jvmArgs.push(loggingArg);
    const gameArgs = [];
    if (resolved.arguments.game.length > 0) {
      gameArgs.push(...this.meta.gameArguments(resolved));
    } else if (resolved.minecraftArguments) {
      gameArgs.push(...splitArgs(resolved.minecraftArguments));
    }
    if (gameArgs.length === 0) {
      gameArgs.push("--username", "${auth_player_name}", "--version", "${version_name}", "--gameDir", "${game_directory}");
      gameArgs.push("--assetsDir", "${assets_root}", "--assetIndex", "${assets_index_name}", "--uuid", "${auth_uuid}");
      gameArgs.push("--accessToken", "${auth_access_token}", "--userType", "${user_type}", "--versionType", "${version_type}");
    }
    gameArgs.push(...splitArgs(installation.gameArgs || ""));
    if (server) {
      const address = server.port === 25565 ? server.address : `${server.address}:${server.port}`;
      if (this.supportsQuickPlay(installation.gameVersion) && !gameArgs.includes("--quickPlayMultiplayer")) {
        gameArgs.push("--quickPlayMultiplayer", address);
      } else if (!this.supportsQuickPlay(installation.gameVersion)) {
        if (!gameArgs.includes("--server")) gameArgs.push("--server", server.address);
        if (!gameArgs.includes("--port")) gameArgs.push("--port", String(server.port));
      }
    }
    const substitutions = {
      "${auth_player_name}": auth.name,
      "${version_name}": profileId,
      "${game_directory}": installation.gameDir,
      "${assets_root}": this.paths.assetsDir(),
      "${assets_index_name}": indexId,
      "${auth_uuid}": auth.uuid.replace(/-/g, ""),
      "${auth_access_token}": reveal ? auth.accessToken : "<redacted>",
      "${clientid}": auth.clientId ?? "",
      "${auth_xuid}": auth.xuid ?? "",
      "${user_type}": auth.userType,
      "${version_type}": resolved.type,
      "${natives_directory}": nativesDir,
      "${launcher_name}": "MistLauncher",
      "${launcher_version}": APP_VERSION,
      "${classpath}": reveal ? classpath : "<classpath>",
      "${classpath_separator}": path.delimiter,
      "${library_directory}": this.paths.libraryDir(),
      "${resolution_width}": String(installation.resolution?.width ?? 854),
      "${resolution_height}": String(installation.resolution?.height ?? 480),
      "${user_properties}": "{}",
      "${quickPlayPath}": ""
    };
    const substitute = (value) => {
      let result = value;
      for (const [token, replacement] of Object.entries(substitutions)) {
        result = result.split(token).join(replacement);
      }
      return result;
    };
    const resolvedJvm = jvmArgs.map(substitute);
    const resolvedGame = gameArgs.map(substitute);
    if (installation.fullscreen) resolvedGame.push("--fullscreen");
    const allArgs = [...resolvedJvm, resolved.mainClass, ...resolvedGame];
    const displayArgs = allArgs.map((arg) => arg === auth.accessToken && auth.accessToken.length > 8 ? "<redacted>" : arg);
    const command = `${quoteIfNeeded(javaPath || "java")} ${displayArgs.map((arg) => arg.startsWith("-Djava.library.path") || arg.includes(" ") ? quoteIfNeeded(arg) : arg).join(" ")}`;
    if (installation.loader.type === "optifine") {
      warnings.push("OptiFine is installed as a mod in this profile. OptiFine compatibility depends on the exact Minecraft and loader versions.");
    }
    return {
      installationId: installation.id,
      versionId: profileId,
      gameVersion: installation.gameVersion,
      javaPath: javaPath || "java",
      javaMajor: resolved.javaMajor,
      command,
      args: allArgs,
      cwd: installation.gameDir,
      classpathCount: libraries.length + 1,
      mainClass: resolved.mainClass,
      warnings,
      missing
    };
  }
  supportsQuickPlay(version) {
    const match = /^1\.(\d+)(?:\.(\d+))?/.exec(version);
    if (match) return Number(match[1]) >= 20;
    const modern = /^26\./.test(version);
    return modern;
  }
  async spawnGame(installation, plan) {
    await ensureDir(installation.gameDir);
    for (const folder of ["mods", "resourcepacks", "shaderpacks", "saves", "config"]) {
      await ensureDir(path.join(installation.gameDir, folder));
    }
    await ensureDir(this.paths.logsDir);
    const logPath = path.join(this.paths.logsDir, `game-${installation.id}.log`);
    const stream = node_fs.createWriteStream(logPath, { flags: "w" });
    const javaPath = plan.javaPath === "java" ? "java" : plan.javaPath;
    if (!await pathExists(javaPath) && plan.javaPath !== "java") {
      throw new AppError("java-missing", `Java was not found at ${javaPath}.`, { hint: "Select a Java runtime in the installation settings." });
    }
    this.logger.info("launch", `Starting ${installation.name} (${plan.versionId}) with ${javaPath}; classpath ${plan.classpathCount} entries.`);
    const child = node_child_process.spawn(javaPath, plan.args, {
      cwd: installation.gameDir,
      env: { ...process.env },
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true
    });
    const state = {
      installationId: installation.id,
      running: true,
      pid: child.pid ?? null,
      startedAt: (/* @__PURE__ */ new Date()).toISOString(),
      exitCode: null
    };
    const game = { child, installationId: installation.id, startedAt: /* @__PURE__ */ new Date(), state, log: stream, logPath, stopping: false };
    this.running.set(installation.id, game);
    this.options.onState({ ...state });
    this.options.onVisibility(installation.id, installation.visibility);
    const forward = (chunk) => {
      const text2 = chunk.toString("utf8");
      stream.write(text2);
      for (const line of text2.split(/\r?\n/)) {
        if (line.trim()) this.options.onLine(installation.id, line);
      }
    };
    child.stdout.on("data", forward);
    child.stderr.on("data", forward);
    child.on("error", (error) => {
      this.logger.error("launch", `Game process error: ${errorMessage(error)}`);
      stream.write(`
[Mist Launcher] Process error: ${error.message}
`);
    });
    child.on("exit", (code, signal) => {
      const seconds = Math.round((Date.now() - game.startedAt.getTime()) / 1e3);
      this.running.delete(installation.id);
      stream.end();
      const finalState = { ...state, running: false, exitCode: code, startedAt: state.startedAt };
      this.logger.info("launch", `Game ${installation.name} exited (code ${code ?? signal ?? "unknown"}) after ${seconds}s.`);
      if (!game.stopping && code !== 0) {
        this.logger.warn("launch", "Game exited with a non-zero code; check the crash reports screen for details.");
      }
      this.options.onState(finalState);
      void this.options.onExit(installation.id, seconds, code).catch(() => void 0);
    });
    return child.pid ?? 0;
  }
}
function splitArgs(input) {
  const args = [];
  let current = "";
  let quote = null;
  let hasToken = false;
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (quote) {
      if (char === quote) quote = null;
      else if (char === "\\" && i + 1 < input.length && (input[i + 1] === quote || input[i + 1] === "\\")) {
        current += input[++i];
        hasToken = true;
      } else {
        current += char;
        hasToken = true;
      }
    } else if (char === '"' || char === "'") {
      quote = char;
      hasToken = true;
    } else if (/\s/.test(char)) {
      if (hasToken) {
        args.push(current);
        current = "";
        hasToken = false;
      }
    } else {
      current += char;
      hasToken = true;
    }
  }
  if (hasToken) args.push(current);
  return args;
}
function quoteIfNeeded(value) {
  return /\s/.test(value) ? `"${value}"` : value;
}
const LOADERS = ["vanilla", "fabric", "quilt", "forge", "neoforge", "optifine"];
const VERSION_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._+\-]{0,63}$/;
class InstallationStore {
  constructor(paths, logger) {
    this.paths = paths;
    this.logger = logger;
  }
  paths;
  logger;
  installations = [];
  async load() {
    const file = await readJson(this.paths.installationsFile, { version: 1, installations: [] });
    const list = Array.isArray(file.installations) ? file.installations : [];
    this.installations = list.filter((installation) => installation && typeof installation.id === "string").map((installation) => this.normalize(installation));
  }
  list() {
    return this.installations.map((installation) => ({ ...installation }));
  }
  get(id) {
    const found = this.installations.find((installation) => installation.id === id);
    return found ? { ...found } : null;
  }
  async create(input, defaults) {
    const name = validateName(input.name);
    if (!VERSION_PATTERN.test(input.gameVersion)) {
      throw new AppError("install-invalid", "Choose a valid Minecraft version.");
    }
    const loader = validateLoader(input.loader, input.gameVersion);
    const id = this.uniqueId(name);
    const gameDir = input.gameDir ? path.resolve(input.gameDir) : this.paths.instanceDir(id);
    await ensureDir(gameDir);
    const installation = {
      id,
      name,
      icon: input.icon || "grass",
      gameVersion: input.gameVersion,
      loader,
      gameDir,
      isolated: true,
      created: (/* @__PURE__ */ new Date()).toISOString(),
      lastPlayed: null,
      playtimeSeconds: 0,
      playtimeByDay: {},
      javaPath: null,
      memoryMb: clampMemory(input.memoryMb ?? defaults.memoryMb),
      jvmArgs: "",
      gameArgs: "",
      resolution: null,
      fullscreen: false,
      visibility: "keep",
      notes: "",
      modpack: input.modpack ?? null,
      updateAvailable: null,
      missingFiles: []
    };
    await ensureDir(path.join(gameDir, "mods"));
    await ensureDir(path.join(gameDir, "saves"));
    this.installations.push(installation);
    await this.persist();
    this.logger.info("installations", `Created installation ${installation.name} (${installation.id}).`);
    return { ...installation };
  }
  async update(id, patch) {
    const installation = this.installations.find((item) => item.id === id);
    if (!installation) throw new AppError("installation-missing", "That installation no longer exists.");
    if (patch.name !== void 0) installation.name = validateName(patch.name);
    if (patch.icon !== void 0) installation.icon = String(patch.icon).slice(0, 200);
    if (patch.gameDir !== void 0) {
      if (!path.isAbsolute(patch.gameDir)) throw new AppError("install-invalid", "The game directory must be an absolute path.");
      installation.gameDir = path.resolve(patch.gameDir);
      await ensureDir(installation.gameDir);
    }
    if (patch.javaPath !== void 0) {
      installation.javaPath = patch.javaPath && patch.javaPath.trim() ? path.resolve(patch.javaPath) : null;
    }
    if (patch.memoryMb !== void 0) installation.memoryMb = clampMemory(patch.memoryMb);
    if (patch.jvmArgs !== void 0) installation.jvmArgs = String(patch.jvmArgs).slice(0, 4e3);
    if (patch.gameArgs !== void 0) installation.gameArgs = String(patch.gameArgs).slice(0, 4e3);
    if (patch.fullscreen !== void 0) installation.fullscreen = Boolean(patch.fullscreen);
    if (patch.visibility !== void 0) {
      if (!["hide", "keep", "close"].includes(patch.visibility)) throw new AppError("install-invalid", "Unknown launcher visibility option.");
      installation.visibility = patch.visibility;
    }
    if (patch.notes !== void 0) installation.notes = String(patch.notes).slice(0, 2e3);
    if (patch.resolution !== void 0) {
      if (patch.resolution === null) installation.resolution = null;
      else {
        const width = Math.round(Number(patch.resolution.width));
        const height = Math.round(Number(patch.resolution.height));
        if (!Number.isFinite(width) || !Number.isFinite(height) || width < 320 || height < 240 || width > 7680 || height > 4320) {
          throw new AppError("settings-invalid", "Resolution must be between 320×240 and 7680×4320.");
        }
        installation.resolution = { width, height };
      }
    }
    await this.persist();
    return { ...installation };
  }
  /** Replace loader metadata after an installer finishes. */
  async setLoader(id, loader) {
    const installation = this.installations.find((item) => item.id === id);
    if (!installation) throw new AppError("installation-missing", "That installation no longer exists.");
    installation.loader = validateLoader(loader, installation.gameVersion);
    await this.persist();
    return { ...installation };
  }
  async setModpack(id, modpack) {
    const installation = this.installations.find((item) => item.id === id);
    if (!installation) throw new AppError("installation-missing", "That installation no longer exists.");
    installation.modpack = modpack;
    await this.persist();
    return { ...installation };
  }
  async setIcon(id, icon) {
    const installation = this.installations.find((item) => item.id === id);
    if (!installation) throw new AppError("installation-missing", "That installation no longer exists.");
    installation.icon = String(icon).slice(0, 200);
    await this.persist();
    return { ...installation };
  }
  async touch(id, seconds) {
    const installation = this.installations.find((item) => item.id === id);
    if (!installation) return null;
    const now = /* @__PURE__ */ new Date();
    const day = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const elapsed = Math.max(0, Math.floor(seconds));
    installation.lastPlayed = now.toISOString();
    installation.playtimeSeconds += elapsed;
    installation.playtimeByDay ??= {};
    installation.playtimeByDay[day] = (installation.playtimeByDay[day] ?? 0) + elapsed;
    for (const savedDay of Object.keys(installation.playtimeByDay)) {
      const age = now.getTime() - (/* @__PURE__ */ new Date(`${savedDay}T00:00:00`)).getTime();
      if (!/^\d{4}-\d{2}-\d{2}$/.test(savedDay) || age > 370 * 864e5) delete installation.playtimeByDay[savedDay];
    }
    await this.persist();
    return { ...installation };
  }
  async setUpdateAvailable(id, version) {
    const installation = this.installations.find((item) => item.id === id);
    if (!installation) return;
    installation.updateAvailable = version;
    await this.persist();
  }
  async setMissingFiles(id, missing) {
    const installation = this.installations.find((item) => item.id === id);
    if (!installation) return;
    installation.missingFiles = missing;
  }
  async remove(id) {
    const installation = this.installations.find((item) => item.id === id);
    if (!installation) throw new AppError("installation-missing", "That installation no longer exists.");
    this.installations = this.installations.filter((item) => item.id !== id);
    await this.persist();
    this.logger.info("installations", `Removed installation ${installation.name}.`);
    return { ...installation };
  }
  async duplicate(source, options) {
    const name = validateName(options.name);
    const id = this.uniqueId(name);
    const gameDir = this.paths.instanceDir(id);
    await ensureDir(gameDir);
    const copy = {
      ...source,
      id,
      name,
      gameDir,
      created: (/* @__PURE__ */ new Date()).toISOString(),
      lastPlayed: null,
      playtimeSeconds: 0,
      playtimeByDay: {},
      modpack: source.modpack ? { ...source.modpack } : null,
      updateAvailable: null,
      missingFiles: []
    };
    await copyDirectory(source.gameDir, gameDir, (relative) => {
      const top = relative.split("/")[0];
      if (top === "saves" && !options.copyWorlds) return false;
      if (top === "mods" && !options.copyMods) return false;
      if (top === "logs" || top === "crash-reports") return false;
      return true;
    });
    for (const folder of ["mods", "saves", "resourcepacks", "shaderpacks"]) {
      await ensureDir(path.join(gameDir, folder));
    }
    this.installations.push(copy);
    await this.persist();
    this.logger.info("installations", `Duplicated ${source.name} as ${name}.`);
    return { ...copy };
  }
  async importProfile(data) {
    if (!["mist-installation", "sacrify-installation"].includes(data.format) || data.version !== 1) {
      throw new AppError("import-invalid", "That file is not a Mist Launcher installation profile.");
    }
    if (!VERSION_PATTERN.test(data.gameVersion)) {
      throw new AppError("import-invalid", "The profile contains an invalid Minecraft version.");
    }
    return this.create(
      {
        name: data.name,
        gameVersion: data.gameVersion,
        loader: data.loader,
        icon: data.icon || "grass",
        modpack: data.modpack ?? null
      },
      { memoryMb: 4096 }
    );
  }
  exportProfile(id) {
    const installation = this.get(id);
    if (!installation) throw new AppError("installation-missing", "That installation no longer exists.");
    return {
      format: "mist-installation",
      version: 1,
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      name: installation.name,
      icon: installation.icon,
      gameVersion: installation.gameVersion,
      loader: installation.loader,
      memoryMb: installation.memoryMb,
      jvmArgs: installation.jvmArgs,
      gameArgs: installation.gameArgs,
      resolution: installation.resolution,
      fullscreen: installation.fullscreen,
      visibility: installation.visibility,
      notes: installation.notes,
      modpack: installation.modpack
    };
  }
  async updateMemoryDefaults() {
    await this.persist();
  }
  uniqueId(name) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 32) || "installation";
    let id = `${slug}-${node_crypto.randomBytes(3).toString("hex")}`;
    while (this.installations.some((installation) => installation.id === id)) {
      id = `${slug}-${node_crypto.randomBytes(3).toString("hex")}`;
    }
    return id;
  }
  normalize(installation) {
    const loader = LOADERS.includes(installation.loader?.type) ? installation.loader : { type: "vanilla", profileId: installation.gameVersion };
    return {
      ...installation,
      icon: installation.icon || "grass",
      loader: { ...loader, profileId: loader.profileId || installation.gameVersion },
      gameDir: installation.gameDir || this.paths.instanceDir(installation.id),
      isolated: installation.isolated !== false,
      memoryMb: clampMemory(installation.memoryMb ?? 4096),
      jvmArgs: installation.jvmArgs ?? "",
      gameArgs: installation.gameArgs ?? "",
      notes: installation.notes ?? "",
      playtimeSeconds: installation.playtimeSeconds ?? 0,
      playtimeByDay: Object.fromEntries(Object.entries(installation.playtimeByDay ?? {}).filter(([day, value]) => /^\d{4}-\d{2}-\d{2}$/.test(day) && Number.isFinite(value) && value >= 0)),
      missingFiles: [],
      resolution: installation.resolution ?? null,
      fullscreen: Boolean(installation.fullscreen),
      visibility: installation.visibility ?? "keep",
      modpack: installation.modpack ?? null,
      updateAvailable: installation.updateAvailable ?? null
    };
  }
  async persist() {
    await writeJsonAtomic(this.paths.installationsFile, { version: 1, installations: this.installations });
  }
}
function validateName(name) {
  const trimmed = String(name ?? "").trim();
  if (trimmed.length < 1 || trimmed.length > 64) {
    throw new AppError("install-invalid", "Installation names must be between 1 and 64 characters.");
  }
  return trimmed;
}
function validateLoader(loader, gameVersion) {
  if (!loader || !LOADERS.includes(loader.type)) {
    throw new AppError("install-invalid", "Choose a supported mod loader.");
  }
  if (loader.type === "vanilla") return { type: "vanilla", profileId: gameVersion };
  return {
    type: loader.type,
    version: loader.version,
    profileId: loader.profileId,
    managed: loader.managed ?? false
  };
}
function clampMemory(value) {
  const memory = Math.round(Number(value) || 4096);
  return Math.min(65536, Math.max(512, memory));
}
function runProcess(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = node_child_process.spawn(command, args, {
      cwd: options.cwd,
      env: { ...process.env, ...options.env },
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true
    });
    const lines = [];
    const maxLines = options.maxOutputLines ?? 400;
    let output = "";
    let settled = false;
    const push = (chunk) => {
      const text2 = chunk.toString("utf8");
      output += text2;
      if (output.length > 2e5) output = output.slice(-12e4);
      for (const line of text2.split(/\r?\n/)) {
        if (!line.trim()) continue;
        lines.push(line);
        if (lines.length > maxLines) lines.shift();
        options.onLine?.(line);
      }
    };
    child.stdout?.on("data", push);
    child.stderr?.on("data", push);
    child.on("error", (error) => {
      if (settled) return;
      settled = true;
      reject(new AppError("process-failed", `Could not start ${command}: ${error.message}`, { cause: error }));
    });
    child.on("exit", (code) => {
      if (settled) return;
      settled = true;
      resolve({ code, output: lines.length ? lines.join("\n") : output });
    });
    const abort = () => {
      if (settled) return;
      child.kill();
      setTimeout(() => {
        if (!child.killed) child.kill("SIGKILL");
      }, 1500).unref();
    };
    options.signal?.addEventListener("abort", abort, { once: true });
    if (options.timeoutMs) {
      const timer = setTimeout(abort, options.timeoutMs);
      timer.unref();
      child.on("exit", () => clearTimeout(timer));
    }
  });
}
const PRE_RELEASE = /^(alpha|beta|pre|prerelease|rc|snapshot|dev|test)/i;
function cmpVersion(a, b) {
  const tokenize = (value) => value.split(/[.\-+_]/).filter((part) => part.length > 0).map((part) => /^\d+$/.test(part) ? Number(part) : part.toLowerCase());
  const left = tokenize(a);
  const right = tokenize(b);
  const length = Math.max(left.length, right.length);
  for (let i = 0; i < length; i++) {
    const l = left[i];
    const r = right[i];
    if (l === void 0) {
      if (typeof r === "string" && PRE_RELEASE.test(r)) return 1;
      return -1;
    }
    if (r === void 0) {
      if (typeof l === "string" && PRE_RELEASE.test(l)) return -1;
      return 1;
    }
    if (typeof l === "number" && typeof r === "number") {
      if (l !== r) return l - r;
    } else if (typeof l === "number") {
      return 1;
    } else if (typeof r === "number") {
      return -1;
    } else if (l !== r) {
      return l < r ? -1 : 1;
    }
  }
  return 0;
}
const FABRIC_META = "https://meta.fabricmc.net/v2";
const QUILT_META = "https://meta.quiltmc.org/v3";
const FORGE_MAVEN = "https://maven.minecraftforge.net/net/minecraftforge/forge";
const FORGE_METADATA = "https://files.minecraftforge.net/net/minecraftforge/forge/maven-metadata.json";
const NEOFORGE_MAVEN = "https://maven.neoforged.net/releases/net/neoforged/neoforge";
const NEOFORGE_METADATA = `${NEOFORGE_MAVEN}/maven-metadata.xml`;
const OPTIFINE_PAGE = "https://optifine.net/downloads";
class LoaderService {
  constructor(paths, http, meta, installer, downloads, java, installations, logger) {
    this.paths = paths;
    this.http = http;
    this.meta = meta;
    this.installer = installer;
    this.downloads = downloads;
    this.java = java;
    this.installations = installations;
    this.logger = logger;
  }
  paths;
  http;
  meta;
  installer;
  downloads;
  java;
  installations;
  logger;
  forgeMeta = null;
  neoMeta = null;
  async available(gameVersion) {
    const results = await Promise.all([
      this.fabricVersions(gameVersion),
      this.quiltVersions(gameVersion),
      this.forgeVersions(gameVersion),
      this.neoforgeVersions(gameVersion),
      this.optifineVersions(gameVersion)
    ]);
    return [
      results[0],
      results[1],
      results[2],
      results[3],
      results[4]
    ];
  }
  async optifineVersions(gameVersion) {
    try {
      const html = await this.http.text(OPTIFINE_PAGE, { timeoutMs: 3e4 });
      const filenames = /* @__PURE__ */ new Set();
      for (const match of html.matchAll(/href=["'](?:https?:\/\/optifine\.net\/)?adloadx\?f=([^&"'#]+)[^"']*["']/gi)) {
        const filename = decodeURIComponent(match[1].replace(/&amp;/g, "&"));
        const base = filename.replace(/^preview_/, "");
        if (base.startsWith(`OptiFine_${gameVersion}_`) && base.endsWith(".jar")) filenames.add(filename);
      }
      const files = [...filenames];
      const versions = files.map((filename, index) => {
        const preview = filename.startsWith("preview_");
        const base = filename.replace(/^preview_/, "").replace(/\.jar$/i, "");
        const edition = base.slice(`OptiFine_${gameVersion}_`.length).replace(/_/g, " ");
        return {
          type: "optifine",
          version: edition,
          gameVersion,
          stable: !preview && !/_pre\d+/i.test(filename),
          recommended: index === files.findIndex((candidate) => !candidate.startsWith("preview_")) || index === 0 && files.every((candidate) => candidate.startsWith("preview_")),
          downloadUrl: `https://optifine.net/adloadx?f=${encodeURIComponent(filename)}`,
          note: preview ? "Preview build · official mirror" : "Official build"
        };
      });
      return {
        type: "optifine",
        available: versions.length > 0,
        versions,
        reason: versions.length ? null : `OptiFine has no published build for Minecraft ${gameVersion}.`,
        requiresManualStep: false,
        docsUrl: OPTIFINE_PAGE
      };
    } catch (error) {
      return {
        type: "optifine",
        available: false,
        versions: [],
        reason: `OptiFine's official version page could not be reached: ${error instanceof Error ? error.message : String(error)}`,
        requiresManualStep: false,
        docsUrl: OPTIFINE_PAGE
      };
    }
  }
  async fabricVersions(gameVersion) {
    try {
      const data = await this.http.json(`${FABRIC_META}/versions/loader/${encodeURIComponent(gameVersion)}`, {
        timeoutMs: 3e4
      });
      const versions = data.filter((entry) => entry.loader?.version).map((entry, index) => ({
        type: "fabric",
        version: entry.loader.version,
        gameVersion,
        stable: entry.loader.stable !== false,
        recommended: index === 0,
        downloadUrl: `${FABRIC_META}/versions/loader/${encodeURIComponent(gameVersion)}/${encodeURIComponent(entry.loader.version)}/profile/json`,
        note: entry.loader.stable === false ? "Beta loader build" : null
      }));
      return {
        type: "fabric",
        available: versions.length > 0,
        versions: versions.slice(0, 80),
        reason: versions.length ? null : `Fabric has not published a loader for Minecraft ${gameVersion} yet.`,
        requiresManualStep: false,
        docsUrl: "https://fabricmc.net/use/installer/"
      };
    } catch (error) {
      return {
        type: "fabric",
        available: false,
        versions: [],
        reason: `Fabric metadata could not be reached: ${error instanceof Error ? error.message : String(error)}`,
        requiresManualStep: false,
        docsUrl: "https://fabricmc.net/use/installer/"
      };
    }
  }
  async quiltVersions(gameVersion) {
    try {
      const data = await this.http.json(`${QUILT_META}/versions/loader/${encodeURIComponent(gameVersion)}`, {
        timeoutMs: 3e4
      });
      const versions = data.filter((entry) => entry.loader?.version).map((entry, index) => ({
        type: "quilt",
        version: entry.loader.version,
        gameVersion,
        stable: !entry.loader.version.includes("beta") && !entry.loader.version.includes("alpha"),
        recommended: index === 0,
        downloadUrl: `${QUILT_META}/versions/loader/${encodeURIComponent(gameVersion)}/${encodeURIComponent(entry.loader.version)}/profile/json`,
        note: entry.loader.version.includes("beta") ? "Beta loader build" : null
      }));
      return {
        type: "quilt",
        available: versions.length > 0,
        versions: versions.slice(0, 80),
        reason: versions.length ? null : `Quilt has not published a loader for Minecraft ${gameVersion} yet.`,
        requiresManualStep: false,
        docsUrl: "https://quiltmc.org/en/install/"
      };
    } catch (error) {
      return {
        type: "quilt",
        available: false,
        versions: [],
        reason: `Quilt metadata could not be reached: ${error instanceof Error ? error.message : String(error)}`,
        requiresManualStep: false,
        docsUrl: "https://quiltmc.org/en/install/"
      };
    }
  }
  async loadForgeMeta() {
    if (this.forgeMeta && Date.now() - this.forgeMeta.at < 10 * 6e4) return this.forgeMeta.value;
    const data = await this.http.json(FORGE_METADATA, { timeoutMs: 6e4 });
    this.forgeMeta = { at: Date.now(), value: data };
    return data;
  }
  async forgeVersions(gameVersion) {
    try {
      const data = await this.loadForgeMeta();
      const builds = [...data[gameVersion] ?? []].sort((a, b) => cmpVersion(b, a));
      const versions = builds.slice(0, 120).map((full, index) => ({
        type: "forge",
        version: full,
        gameVersion,
        stable: true,
        recommended: index === 0,
        downloadUrl: `${FORGE_MAVEN}/${encodeURIComponent(full)}/forge-${encodeURIComponent(full)}-installer.jar`,
        note: null
      }));
      return {
        type: "forge",
        available: versions.length > 0,
        versions,
        reason: versions.length ? null : `Forge has no official builds for Minecraft ${gameVersion}. New snapshots usually lag behind releases.`,
        requiresManualStep: false,
        docsUrl: "https://files.minecraftforge.net/"
      };
    } catch (error) {
      return {
        type: "forge",
        available: false,
        versions: [],
        reason: `Forge metadata could not be reached: ${error instanceof Error ? error.message : String(error)}`,
        requiresManualStep: false,
        docsUrl: "https://files.minecraftforge.net/"
      };
    }
  }
  async loadNeoMeta() {
    if (this.neoMeta && Date.now() - this.neoMeta.at < 10 * 6e4) return this.neoMeta.value;
    const xml = await this.http.text(NEOFORGE_METADATA, { timeoutMs: 6e4 });
    const versions = [...xml.matchAll(/<version>([^<]+)<\/version>/g)].map((match) => match[1]).filter(Boolean);
    this.neoMeta = { at: Date.now(), value: versions };
    return versions;
  }
  neoPrefix(gameVersion) {
    return `${gameVersion.startsWith("1.") ? gameVersion.slice(2) : gameVersion}.`;
  }
  async neoforgeVersions(gameVersion) {
    try {
      const all = await this.loadNeoMeta();
      const prefix = this.neoPrefix(gameVersion);
      const builds = all.filter((version) => version.startsWith(prefix)).filter((version) => !version.includes("alpha")).sort((a, b) => cmpVersion(b, a));
      const versions = builds.slice(0, 120).map((version, index) => ({
        type: "neoforge",
        version,
        gameVersion,
        stable: !version.includes("beta"),
        recommended: index === 0,
        downloadUrl: `${NEOFORGE_MAVEN}/${encodeURIComponent(version)}/neoforge-${encodeURIComponent(version)}-installer.jar`,
        note: version.includes("beta") ? "Beta build" : null
      }));
      return {
        type: "neoforge",
        available: versions.length > 0,
        versions,
        reason: versions.length ? null : `NeoForge has no builds matching Minecraft ${gameVersion} (expected versions starting with ${prefix}).`,
        requiresManualStep: false,
        docsUrl: "https://neoforged.net/"
      };
    } catch (error) {
      return {
        type: "neoforge",
        available: false,
        versions: [],
        reason: `NeoForge metadata could not be reached: ${error instanceof Error ? error.message : String(error)}`,
        requiresManualStep: false,
        docsUrl: "https://neoforged.net/"
      };
    }
  }
  async install(installationId, requested) {
    const installation = this.installations.get(installationId);
    if (!installation) throw new AppError("installation-missing", "That installation no longer exists.");
    if (requested.type === "vanilla") throw new AppError("loader-invalid", "Vanilla does not require a loader.");
    if (requested.type === "optifine") return this.installOptifine(installation, requested);
    if (requested.type === "fabric" || requested.type === "quilt") {
      return this.installMetaLoader(installation, requested);
    }
    return this.installForgeLike(installation, requested);
  }
  async installOptifine(installation, requested) {
    const available = await this.optifineVersions(installation.gameVersion);
    const version = available.versions.find((entry) => entry.version === requested.version) ?? available.versions.find((entry) => entry.recommended) ?? available.versions[0];
    if (!version?.downloadUrl) {
      throw new AppError("loader-unavailable", `OptiFine has no published build for Minecraft ${installation.gameVersion}.`, {
        hint: "Choose a Minecraft version listed on OptiFine’s official downloads page."
      });
    }
    const installerPath = path.join(this.paths.cacheDir, "installers", "optifine", `${safeSegment(installation.gameVersion)}-${safeSegment(version.version)}.jar`);
    const validInstaller = async () => {
      const manifest = await readZipEntry(installerPath, "META-INF/MANIFEST.MF");
      return Boolean(manifest?.toString("utf8").includes("Main-Class: optifine.InstallerFrame"));
    };
    if (await pathExists(installerPath) && !await validInstaller()) {
      await node_fs.promises.rm(installerPath, { force: true });
    }
    if (!await pathExists(installerPath)) {
      const downloadJob = this.downloads.create({
        kind: "loader",
        title: `Downloading OptiFine ${version.version}`,
        subtitle: `Minecraft ${installation.gameVersion} · ${installation.name}`,
        source: "OptiFine official mirror · optifine.net",
        installationId: installation.id
      });
      downloadJob.setRetry(() => {
        void this.installOptifine(installation, requested).catch(() => void 0);
      });
      try {
        downloadJob.start();
        downloadJob.setPhase("Resolving the official OptiFine mirror");
        const mirrorHtml = await this.http.text(version.downloadUrl, { timeoutMs: 45e3 });
        const direct = mirrorHtml.match(/href=['"]([^'"]*downloadx\?f=[^'"]+)['"]/i)?.[1];
        if (!direct) throw new AppError("optifine-link", "OptiFine’s official mirror did not provide its download link. Open the official page and retry.");
        const directUrl = new URL(direct.replace(/&amp;/g, "&"), version.downloadUrl);
        if (directUrl.protocol !== "https:" || directUrl.hostname !== "optifine.net" || !directUrl.pathname.endsWith("downloadx")) {
          throw new AppError("optifine-link", "The OptiFine mirror returned an unexpected download address.");
        }
        downloadJob.setPhase("Downloading OptiFine from its official mirror");
        downloadJob.add({ url: directUrl.toString(), dest: installerPath, label: `OptiFine ${version.version}` });
        await downloadJob.run();
        if (!await validInstaller()) {
          await node_fs.promises.rm(installerPath, { force: true });
          throw new AppError("optifine-invalid", "The downloaded file is not a valid OptiFine installer. Retry from the official mirror.");
        }
        downloadJob.complete(`OptiFine ${version.version} downloaded`);
      } catch (error) {
        downloadJob.fail(error);
        throw error;
      }
    }
    const job = this.downloads.create({
      kind: "loader",
      title: `Installing OptiFine ${version.version}`,
      subtitle: `Minecraft ${installation.gameVersion} · ${installation.name}`,
      source: "OptiFine official mirror · optifine.net",
      installationId: installation.id
    });
    job.setRetry(() => {
      void this.installOptifine(installation, requested).catch(() => void 0);
    });
    let stagingHome = null;
    try {
      job.start();
      job.setPhase(`Preparing Minecraft ${installation.gameVersion}`);
      await this.installer.ensure(installation.gameVersion);
      const resolved = await this.meta.resolve(installation.gameVersion);
      const javaInfo = await this.java.ensureExact(
        resolved.javaVersion?.component ?? null,
        resolved.javaMajor,
        `Installing Java ${resolved.javaMajor} for OptiFine`,
        installation.id
      );
      const root = this.paths.gameRoot();
      const versionRoot = path.join(root, "versions");
      const libraryRoot = path.join(root, "libraries");
      const assetRoot = this.paths.assetsDir();
      await ensureDir(versionRoot);
      await ensureDir(libraryRoot);
      await ensureDir(assetRoot);
      stagingHome = path.join(this.paths.cacheDir, "optifine-staging", node_crypto.randomUUID());
      const stagedGameRoot = process.platform === "win32" ? path.join(stagingHome, ".minecraft") : process.platform === "darwin" ? path.join(stagingHome, "Library", "Application Support", "minecraft") : path.join(stagingHome, ".minecraft");
      await ensureDir(stagedGameRoot);
      await node_fs.promises.symlink(versionRoot, path.join(stagedGameRoot, "versions"), process.platform === "win32" ? "junction" : "dir");
      await node_fs.promises.symlink(libraryRoot, path.join(stagedGameRoot, "libraries"), process.platform === "win32" ? "junction" : "dir");
      await node_fs.promises.symlink(assetRoot, path.join(stagedGameRoot, "assets"), process.platform === "win32" ? "junction" : "dir");
      job.setPhase("Running the official OptiFine installer");
      const result = await runProcess(javaInfo.path, ["-Djava.awt.headless=true", `-Duser.home=${stagingHome}`, "-cp", installerPath, "optifine.Installer"], {
        cwd: stagedGameRoot,
        env: { APPDATA: stagingHome, HOME: stagingHome },
        signal: job.signal,
        timeoutMs: 5 * 6e4,
        maxOutputLines: 300,
        onLine: (line) => job.setPhase(`Installing OptiFine: ${line.slice(0, 90)}`)
      });
      if (result.code !== 0) {
        throw new AppError("optifine-install-failed", `OptiFine’s installer exited with code ${result.code ?? "unknown"}.`, {
          detail: result.output.slice(-1600),
          hint: "Check that the matching vanilla Minecraft version is installed, then retry from this installation."
        });
      }
      if (job.signal.aborted) throw new AppError("cancelled", "The OptiFine installation was cancelled.");
      const after = await this.meta.installedIds();
      const preferredToken = version.version.replace(/[^A-Za-z0-9]+/g, "_").toLowerCase();
      const profileId = after.filter((id) => id.toLowerCase().includes("optifine") && id.startsWith(installation.gameVersion)).sort((a, b) => Number(b.toLowerCase().includes(preferredToken)) - Number(a.toLowerCase().includes(preferredToken)))[0];
      if (!profileId) {
        throw new AppError("optifine-profile-missing", "The OptiFine installer finished but did not create a Mist Launcher version profile.", {
          detail: result.output.slice(-1600),
          hint: "This OptiFine build may not support automated installation. Choose a stable build or another Minecraft version."
        });
      }
      job.setPhase("Verifying OptiFine libraries");
      await this.installer.ensure(profileId);
      await this.installations.setLoader(installation.id, {
        type: "optifine",
        version: version.version,
        profileId,
        managed: true
      });
      this.logger.info("loaders", `Installed OptiFine ${version.version} as ${profileId} from the official mirror.`);
      job.complete(`OptiFine ${version.version} ready`);
      return { profileId, jobId: job.id };
    } catch (error) {
      job.fail(error);
      throw error;
    } finally {
      if (stagingHome) await node_fs.promises.rm(stagingHome, { recursive: true, force: true }).catch(() => void 0);
    }
  }
  async installMetaLoader(installation, requested) {
    const isFabric = requested.type === "fabric";
    const base = isFabric ? FABRIC_META : QUILT_META;
    const label = isFabric ? "Fabric" : "Quilt";
    let version = requested.version;
    if (!version) {
      const list = await this.http.json(
        `${base}/versions/loader/${encodeURIComponent(installation.gameVersion)}`,
        { timeoutMs: 3e4 }
      );
      version = list[0]?.loader?.version;
    }
    if (!version) {
      throw new AppError("loader-unavailable", `${label} has no loader build for Minecraft ${installation.gameVersion}.`);
    }
    const job = this.downloads.create({
      kind: "loader",
      title: `Installing ${label} ${version}`,
      subtitle: `Minecraft ${installation.gameVersion} · ${installation.name}`,
      source: `${label} · ${isFabric ? "meta.fabricmc.net" : "meta.quiltmc.org"}`,
      installationId: installation.id
    });
    job.setRetry(() => {
      void this.installMetaLoader(installation, requested).catch(() => void 0);
    });
    try {
      job.start();
      job.setPhase("Fetching loader profile");
      const profile = await this.http.json(
        `${base}/versions/loader/${encodeURIComponent(installation.gameVersion)}/${encodeURIComponent(version)}/profile/json`,
        { timeoutMs: 3e4 }
      );
      if (!profile.id) throw new AppError("loader-invalid", `${label} returned an invalid profile.`);
      const dir = this.paths.versionDir(profile.id);
      await ensureDir(dir);
      await writeJsonAtomic(path.join(dir, `${safeSegment(profile.id)}.json`), profile);
      this.logger.info("loaders", `Wrote ${label} profile ${profile.id}.`);
      job.setPhase("Downloading Minecraft and loader libraries");
      await this.installer.ensure(profile.id, { job });
      await this.installations.setLoader(installation.id, {
        type: requested.type,
        version,
        profileId: profile.id,
        managed: true
      });
      job.complete(`${label} ready`);
      return { profileId: profile.id, jobId: job.id };
    } catch (error) {
      job.fail(error);
      throw error;
    }
  }
  async installForgeLike(installation, requested) {
    const isNeo = requested.type === "neoforge";
    const label = isNeo ? "NeoForge" : "Forge";
    let version = requested.version;
    if (!version) {
      const availability = isNeo ? await this.neoforgeVersions(installation.gameVersion) : await this.forgeVersions(installation.gameVersion);
      version = availability.versions.find((entry) => entry.stable)?.version;
    }
    if (!version) {
      throw new AppError("loader-unavailable", `${label} has no official build for Minecraft ${installation.gameVersion}.`, {
        hint: "Choose a different Minecraft version or loader. New snapshots are usually not supported immediately."
      });
    }
    const installerUrl = isNeo ? `${NEOFORGE_MAVEN}/${encodeURIComponent(version)}/neoforge-${encodeURIComponent(version)}-installer.jar` : `${FORGE_MAVEN}/${encodeURIComponent(version)}/forge-${encodeURIComponent(version)}-installer.jar`;
    const fileName = `${isNeo ? "neoforge" : "forge"}-${version.replace(/[^A-Za-z0-9._-]/g, "_")}-installer.jar`;
    const installerPath = path.join(this.paths.cacheDir, "installers", fileName);
    const job = this.downloads.create({
      kind: "loader",
      title: `Installing ${label} ${version}`,
      subtitle: `Minecraft ${installation.gameVersion} · ${installation.name}`,
      source: `${label} · ${isNeo ? "maven.neoforged.net" : "maven.minecraftforge.net"}`,
      installationId: installation.id
    });
    job.setRetry(() => {
      void this.installForgeLike(installation, requested).catch(() => void 0);
    });
    try {
      job.start();
      job.setPhase("Downloading official installer");
      if (!await pathExists(installerPath)) {
        let sha1 = null;
        try {
          sha1 = (await this.http.text(`${installerUrl}.sha1`, { timeoutMs: 2e4 })).trim().split(/\s+/)[0];
        } catch {
          this.logger.warn("loaders", `No SHA-1 published for ${fileName}; the installer will not be hash-verified.`);
        }
        job.add({ url: installerUrl, dest: installerPath, sha1, label: `${label} installer` });
        await job.run();
      }
      job.setPhase("Preparing shared game root");
      await ensureDir(this.paths.gameRoot());
      const launcherProfiles = path.join(this.paths.gameRoot(), "launcher_profiles.json");
      if (!await pathExists(launcherProfiles)) {
        await writeJsonAtomic(launcherProfiles, { profiles: {}, settings: { enableSnapshots: false }, version: 3 });
      }
      await this.installer.ensure(installation.gameVersion, { job });
      const resolved = await this.meta.resolve(installation.gameVersion);
      job.setPhase(`Preparing Java ${resolved.javaMajor}`);
      const javaInfo = await this.java.ensure(
        resolved.javaVersion?.component ?? null,
        resolved.javaMajor,
        `Installing Java ${resolved.javaMajor}`,
        installation.id
      );
      const before = new Set((await this.meta.installedIds()).map((id) => id));
      job.setPhase(`Running ${label} installer`);
      let lastUpdate = 0;
      const result = await runProcess(javaInfo.path, ["-jar", installerPath, "--installClient", this.paths.gameRoot()], {
        cwd: this.paths.gameRoot(),
        signal: job.signal,
        timeoutMs: 15 * 6e4,
        maxOutputLines: 300,
        onLine: (line) => {
          if (Date.now() - lastUpdate > 1500) {
            lastUpdate = Date.now();
            job.setPhase(`Running ${label} installer: ${line.slice(0, 90)}`);
          }
        }
      });
      if (result.code !== 0) {
        throw new AppError("loader-install-failed", `${label} installer exited with code ${result.code}.`, {
          detail: result.output.slice(-1500),
          hint: "Check Help & Logs for the installer output. Some versions require a different Java major version or a clean shared game root."
        });
      }
      if (job.signal.aborted) throw new AppError("cancelled", "The installation was cancelled.");
      const after = await this.meta.installedIds();
      const created = after.filter((id) => !before.has(id));
      let profileId = created.find((id) => /forge/i.test(id)) ?? created[0];
      if (!profileId) {
        const candidates = after.filter((id) => /forge/i.test(id));
        profileId = candidates[candidates.length - 1];
      }
      if (!profileId) {
        const guess = await this.readInstallerProfileId(installerPath);
        if (guess && await pathExists(path.join(this.paths.versionDir(guess), `${safeSegment(guess)}.json`))) {
          profileId = guess;
        }
      }
      if (!profileId) {
        throw new AppError("loader-profile-missing", `${label} reported success but no profile appeared in the versions folder.`, {
          hint: "Open the shared game root and check for a new versions/<id> folder. Help & Logs contains the installer output."
        });
      }
      job.setPhase("Verifying loader libraries");
      await this.installer.ensure(profileId, { job });
      await this.installations.setLoader(installation.id, {
        type: requested.type,
        version,
        profileId,
        managed: true
      });
      this.logger.info("loaders", `Installed ${label} ${version} as ${profileId}.`);
      job.complete(`${label} ready`);
      return { profileId, jobId: job.id };
    } catch (error) {
      job.fail(error);
      throw error;
    }
  }
  async readInstallerProfileId(installerPath) {
    try {
      const raw = await readZipEntry(installerPath, "install_profile.json");
      if (!raw) return null;
      const data = JSON.parse(raw.toString("utf8"));
      const versionInfoId = data.versionInfo?.id;
      if (typeof versionInfoId === "string") return versionInfoId;
      if (typeof data.version === "string") return data.version;
      return null;
    } catch {
      return null;
    }
  }
  async remove(installationId) {
    const installation = this.installations.get(installationId);
    if (!installation) throw new AppError("installation-missing", "That installation no longer exists.");
    await this.installations.setLoader(installationId, { type: "vanilla", profileId: installation.gameVersion });
    this.logger.info("loaders", `Reset ${installation.name} to vanilla. Version files were kept.`);
  }
  /** Expose loader list for the create wizard. */
  async versionChoices(gameVersion, type) {
    const availability = await this.available(gameVersion);
    return availability.find((entry) => entry.type === type)?.versions ?? [];
  }
  async ensureGameDirectories(installation) {
    for (const folder of ["mods", "saves", "resourcepacks", "shaderpacks", "config"]) {
      await ensureDir(path.join(installation.gameDir, folder));
    }
    await node_fs.promises.mkdir(installation.gameDir, { recursive: true }).catch(() => void 0);
  }
}
function stripMarkdown(input, max = 600) {
  return input.replace(/!\[[^\]]*\]\([^)]*\)/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/[#*_>`]/g, "").replace(/\r/g, "").replace(/\n{3,}/g, "\n\n").trim().slice(0, max);
}
function loaderToModrinth(loader) {
  if (!loader) return null;
  switch (loader) {
    case "fabric":
    case "quilt":
    case "forge":
    case "neoforge":
      return loader;
    case "vanilla":
      return null;
    default:
      return loader;
  }
}
function loaderToCurseForge(loader) {
  switch (loader) {
    case "forge":
      return 1;
    case "fabric":
      return 4;
    case "quilt":
      return 5;
    case "neoforge":
      return 6;
    default:
      return null;
  }
}
function projectTypeToCurseClass(type) {
  switch (type) {
    case "mod":
      return 6;
    case "modpack":
      return 4471;
    case "resourcepack":
      return 12;
    case "shader":
      return 6552;
    case "datapack":
      return 6945;
    default:
      return 6;
  }
}
const BASE$1 = "https://api.modrinth.com/v2";
class ModrinthProvider {
  constructor(http, logger) {
    this.http = http;
    this.logger = logger;
  }
  http;
  logger;
  id = "modrinth";
  authors = /* @__PURE__ */ new Map();
  isConfigured() {
    return true;
  }
  configurationHint() {
    return null;
  }
  versionPath(type) {
    return type === "mod" ? "mod" : type === "modpack" ? "modpack" : type === "resourcepack" ? "resourcepack" : type === "shader" ? "shader" : "datapack";
  }
  async search(params) {
    const facets = [[`project_type:${params.projectType}`]];
    if (params.gameVersion) facets.push([`versions:${params.gameVersion}`]);
    const loader = loaderToModrinth(params.loader);
    if (loader && (params.projectType === "mod" || params.projectType === "modpack")) {
      facets.push([`categories:${loader}`]);
    }
    if (params.category) facets.push([`categories:${params.category}`]);
    const index = params.sort === "updated" ? "updated" : params.sort === "newest" ? "newest" : params.sort ?? "relevance";
    const url = new URL(`${BASE$1}/search`);
    url.searchParams.set("query", params.query);
    url.searchParams.set("facets", JSON.stringify(facets));
    url.searchParams.set("index", index);
    url.searchParams.set("offset", String(params.offset));
    url.searchParams.set("limit", String(Math.min(50, params.limit)));
    try {
      const data = await this.http.json(url.toString(), { timeoutMs: 3e4 });
      return {
        hits: data.hits.map((hit) => this.mapHit(hit)),
        total: data.total_hits,
        offset: data.offset,
        limit: data.limit,
        source: "modrinth",
        notice: "Results from Modrinth. Modrinth is an independent community platform."
      };
    } catch (error) {
      this.logger.warn("modrinth", "Search failed.", { reason: error instanceof Error ? error.message : String(error) });
      throw error;
    }
  }
  mapHit(hit) {
    return {
      id: hit.project_id,
      slug: hit.slug,
      source: "modrinth",
      projectType: hit.project_type,
      title: hit.title,
      description: stripMarkdown(hit.description || "", 240),
      author: hit.author ?? "",
      iconUrl: hit.icon_url,
      downloads: hit.downloads,
      follows: hit.follows,
      categories: hit.categories ?? [],
      gameVersions: hit.versions ?? [],
      loaders: (hit.categories ?? []).filter((category) => ["fabric", "forge", "neoforge", "quilt", "iris", "optifine"].includes(category)),
      updatedAt: hit.date_modified,
      externalUrl: `https://modrinth.com/${this.versionPath(hit.project_type)}/${hit.slug}`,
      license: hit.license ?? null,
      restricted: false,
      restrictionNote: null
    };
  }
  async projectAuthor(teamId) {
    const cached = this.authors.get(teamId);
    if (cached) return cached;
    try {
      const members = await this.http.json(`${BASE$1}/team/${teamId}/members`, {
        timeoutMs: 2e4
      });
      const name = members[0]?.user?.username ?? "";
      this.authors.set(teamId, name);
      return name;
    } catch {
      return "";
    }
  }
  async project(projectId) {
    const project = await this.http.json(`${BASE$1}/project/${encodeURIComponent(projectId)}`, { timeoutMs: 3e4 });
    const [author, versions] = await Promise.all([this.projectAuthor(project.team), this.fetchVersions(project.id)]);
    return {
      id: project.id,
      slug: project.slug,
      source: "modrinth",
      projectType: project.project_type,
      title: project.title,
      description: stripMarkdown(project.description, 240),
      author,
      iconUrl: project.icon_url,
      downloads: project.downloads,
      follows: project.followers,
      categories: [...project.categories ?? [], ...project.additional_categories ?? []],
      gameVersions: project.game_versions ?? [],
      loaders: project.loaders ?? [],
      updatedAt: project.updated,
      externalUrl: `https://modrinth.com/${this.versionPath(project.project_type)}/${project.slug}`,
      license: project.license?.name ?? project.license?.id ?? null,
      restricted: false,
      restrictionNote: null,
      body: typeof project.body === "string" ? project.body.slice(0, 200000) : "",
      versions,
      gallery: (project.gallery ?? []).map((item) => ({ url: item.url, title: item.title ?? null })),
      sourceUrl: project.source_url ?? null,
      issuesUrl: project.issues_url ?? null,
      donationUrl: project.donation_urls?.[0]?.url ?? null,
      installNotice: "Files are downloaded from cdn.modrinth.com and verified with SHA-1/SHA-512 hashes."
    };
  }
  async fetchVersions(projectId) {
    const data = await this.http.json(`${BASE$1}/project/${encodeURIComponent(projectId)}/version`, {
      timeoutMs: 3e4
    });
    return data.map((version) => this.mapVersion(version, projectId));
  }
  async versions(query) {
    const params = new URLSearchParams();
    if (query.gameVersion) params.set("game_versions", JSON.stringify([query.gameVersion]));
    const loader = loaderToModrinth(query.loader);
    if (loader && (query.projectType === "mod" || query.projectType === "modpack")) {
      params.set("loaders", JSON.stringify([loader]));
    }
    const suffix = params.toString() ? `?${params.toString()}` : "";
    const data = await this.http.json(
      `${BASE$1}/project/${encodeURIComponent(query.projectId)}/version${suffix}`,
      { timeoutMs: 3e4 }
    );
    return data.map((version) => this.mapVersion(version, query.projectId));
  }
  async version(projectId, versionId) {
    try {
      const data = await this.http.json(`${BASE$1}/version/${encodeURIComponent(versionId)}`, { timeoutMs: 3e4 });
      if (data.project_id !== projectId) return null;
      return this.mapVersion(data, projectId);
    } catch {
      return null;
    }
  }
  mapVersion(version, projectId) {
    const file = version.files.find((candidate) => candidate.primary) ?? version.files[0];
    return {
      id: version.id,
      projectId,
      name: version.name,
      versionNumber: version.version_number,
      gameVersions: version.game_versions ?? [],
      loaders: version.loaders ?? [],
      releaseType: version.version_type,
      publishedAt: version.date_published,
      downloads: version.downloads,
      file: {
        url: file?.url ?? null,
        filename: file?.filename ?? `${projectId}.jar`,
        size: file?.size ?? 0,
        sha1: file?.hashes?.sha1 ?? null,
        sha512: file?.hashes?.sha512 ?? null
      },
      dependencies: (version.dependencies ?? []).map((dependency) => ({
        projectId: dependency.project_id,
        versionId: dependency.version_id,
        type: normalizeDependencyType(dependency.dependency_type)
      })),
      changelog: version.changelog ? stripMarkdown(version.changelog, 1500) : null
    };
  }
  async categories(projectType) {
    try {
      const data = await this.http.json(`${BASE$1}/tag/category`, {
        timeoutMs: 2e4
      });
      const filtered = data.filter((category) => !category.project_type || category.project_type === projectType);
      return filtered.filter((category) => category.header === "categories" || !category.header).map((category) => ({ name: category.name, display: titleCase(category.name.replace(/-/g, " ")) })).slice(0, 60);
    } catch {
      return [];
    }
  }
}
function normalizeDependencyType(type) {
  if (type === "required" || type === "optional" || type === "incompatible" || type === "embedded") return type;
  return "optional";
}
function titleCase(value) {
  return value.replace(/\b\w/g, (character) => character.toUpperCase());
}
const BASE = "https://api.curseforge.com/v1";
const GAME_ID = 432;
class CurseForgeProvider {
  constructor(http, getKey, logger) {
    this.http = http;
    this.getKey = getKey;
    this.logger = logger;
  }
  http;
  getKey;
  logger;
  id = "curseforge";
  detailCache = /* @__PURE__ */ new Map();
  isConfigured() {
    return Boolean(this.getKey());
  }
  configurationHint() {
    return "CurseForge requires a free API key from console.curseforge.com. Add it in Settings → Integrations.";
  }
  headers() {
    const key = this.getKey();
    if (!key) {
      throw new AppError("curseforge-key", "CurseForge is not configured.", {
        hint: this.configurationHint() ?? void 0
      });
    }
    return { "x-api-key": key, Accept: "application/json" };
  }
  async get(path2, params = {}) {
    const url = new URL(`${BASE}${path2}`);
    for (const [key, value] of Object.entries(params)) {
      if (value !== void 0 && value !== "") url.searchParams.set(key, String(value));
    }
    try {
      return await this.http.json(url.toString(), { headers: this.headers(), timeoutMs: 3e4 });
    } catch (error) {
      if (error instanceof AppError && error.code === "auth-403") {
        throw new AppError("curseforge-key-invalid", "CurseForge rejected the API key.", {
          hint: "Check the key at console.curseforge.com and paste it again in Settings → Integrations."
        });
      }
      throw error;
    }
  }
  async search(params) {
    const sortField = params.sort === "downloads" ? 6 : params.sort === "updated" ? 3 : 2;
    const response = await this.get("/mods/search", {
      gameId: GAME_ID,
      classId: projectTypeToCurseClass(params.projectType),
      searchFilter: params.query || void 0,
      sortField,
      sortOrder: "desc",
      gameVersion: params.gameVersion ?? void 0,
      modLoaderType: loaderToCurseForge(params.loader) ?? void 0,
      categoryId: params.category ?? void 0,
      index: params.offset,
      pageSize: Math.min(50, params.limit)
    });
    return {
      hits: response.data.map((mod) => this.mapSummary(mod, params.projectType)),
      total: response.pagination?.totalCount ?? response.data.length,
      offset: params.offset,
      limit: params.limit,
      source: "curseforge",
      notice: "Results from CurseForge. Download availability follows each author’s distribution settings."
    };
  }
  mapSummary(mod, type) {
    const restricted = mod.allowModDistribution === false;
    return {
      id: String(mod.id),
      slug: mod.slug,
      source: "curseforge",
      projectType: type,
      title: mod.name,
      description: mod.summary ?? "",
      author: mod.authors?.[0]?.name ?? "",
      iconUrl: mod.logo?.thumbnailUrl ?? mod.logo?.url ?? null,
      downloads: mod.downloadCount ?? 0,
      follows: 0,
      categories: (mod.categories ?? []).map((category) => category.slug || category.name),
      gameVersions: unique((mod.latestFilesIndexes ?? []).map((index) => index.gameVersion)),
      loaders: [],
      updatedAt: mod.dateModified ?? null,
      externalUrl: mod.links?.websiteUrl ?? `https://www.curseforge.com/minecraft/${this.cursePath(type)}/${mod.slug}`,
      license: null,
      restricted,
      restrictionNote: restricted ? "The author has disabled third-party downloads for this project." : null
    };
  }
  async mod(id) {
    const numeric = Number(id);
    if (!Number.isFinite(numeric)) throw new AppError("curseforge-invalid", "Invalid CurseForge project id.");
    const cached = this.detailCache.get(numeric);
    if (cached && Date.now() - cached.at < 5 * 6e4) return cached.mod;
    const response = await this.get(`/mods/${numeric}`);
    this.detailCache.set(numeric, { at: Date.now(), mod: response.data });
    return response.data;
  }
  async project(projectId) {
    const mod = await this.mod(projectId);
    const type = inferType(mod);
    const files = await this.files(mod);
    const versions = files.map((file) => this.mapVersion(mod, file));
    return {
      ...this.mapSummary(mod, type),
      body: stripHtml(mod.description ?? mod.summary ?? ""),
      versions,
      gallery: (mod.screenshots ?? []).map((shot) => ({ url: shot.url, title: shot.title ?? null })),
      sourceUrl: mod.links?.sourceUrl ?? null,
      issuesUrl: mod.links?.issuesUrl ?? null,
      donationUrl: null,
      license: null,
      installNotice: "The author of this project controls third-party distribution.",
      restrictionNote: mod.allowModDistribution === false ? "The author has disabled third-party downloads for this project." : null,
      restricted: mod.allowModDistribution === false
    };
  }
  cursePath(type) {
    switch (type) {
      case "modpack":
        return "modpacks";
      case "resourcepack":
        return "texture-packs";
      case "shader":
        return "shaders";
      case "datapack":
        return "data-packs";
      default:
        return "mc-mods";
    }
  }
  async files(mod, gameVersion, loader) {
    const response = await this.get(`/mods/${mod.id}/files`, {
      gameVersion: gameVersion ?? void 0,
      modLoaderType: loaderToCurseForge(loader) ?? void 0,
      pageSize: 50
    });
    return response.data.filter((file) => file.isAvailable !== false).filter((file) => !gameVersion || file.gameVersions.includes(gameVersion)).sort((a, b) => new Date(b.fileDate).getTime() - new Date(a.fileDate).getTime());
  }
  async versions(query) {
    const mod = await this.mod(query.projectId);
    const files = await this.files(mod, query.gameVersion, query.loader);
    return files.map((file) => this.mapVersion(mod, file));
  }
  async version(projectId, versionId) {
    const mod = await this.mod(projectId);
    const files = await this.files(mod);
    const file = files.find((candidate) => String(candidate.id) === versionId);
    return file ? this.mapVersion(mod, file) : null;
  }
  /** Resolve a specific file (used by CurseForge modpack manifests). */
  async file(projectId, fileId) {
    try {
      const mod = await this.mod(projectId);
      const response = await this.get(`/mods/${Number(projectId)}/files/${Number(fileId)}`);
      return this.mapVersion(mod, response.data);
    } catch {
      return null;
    }
  }
  mapVersion(mod, file) {
    const allow = mod.allowModDistribution !== false;
    const hashes = normalizeHashes(file.hashes);
    const url = file.downloadUrl ?? (allow ? cdnUrl(file) : null);
    return {
      id: String(file.id),
      projectId: String(mod.id),
      name: file.displayName,
      versionNumber: file.displayName,
      gameVersions: file.gameVersions.filter((version) => /^\d/.test(version)),
      loaders: file.gameVersions.filter((version) => /forge|fabric|quilt|neoforge/i.test(version)).map((value) => value.toLowerCase()),
      releaseType: file.releaseType === 1 ? "release" : file.releaseType === 2 ? "beta" : "alpha",
      publishedAt: file.fileDate,
      downloads: file.downloadCount,
      file: {
        url,
        filename: file.fileName,
        size: file.fileLength,
        sha1: hashes.sha1,
        sha512: hashes.sha512
      },
      dependencies: (file.dependencies ?? []).filter((dependency) => dependency.relationType === 3).map((dependency) => ({
        projectId: String(dependency.modId),
        versionId: null,
        type: "required"
      })),
      changelog: null
    };
  }
  async categories(projectType) {
    try {
      const response = await this.get("/categories", {
        gameId: GAME_ID,
        classId: projectTypeToCurseClass(projectType)
      });
      return response.data.map((category) => ({ name: String(category.id), display: category.name })).slice(0, 60);
    } catch {
      return [];
    }
  }
}
function normalizeHashes(hashes) {
  if (!hashes) return { sha1: null, sha512: null };
  if (Array.isArray(hashes)) {
    const sha1 = hashes.find((hash) => hash.algo === 1 || hash.value?.length === 40)?.value ?? null;
    const sha512 = hashes.find((hash) => hash.algo === 2 || hash.value?.length === 128)?.value ?? null;
    return { sha1, sha512 };
  }
  return { sha1: hashes.sha1 ?? null, sha512: hashes.sha512 ?? null };
}
function cdnUrl(file) {
  if (!file.id || !file.fileName) return null;
  const first = Math.floor(file.id / 1e3);
  const second = file.id % 1e3;
  return `https://edge.forgecdn.net/files/${first}/${second}/${encodeURIComponent(file.fileName)}`;
}
function inferType(mod) {
  if (mod.classId === 4471) return "modpack";
  if (mod.classId === 12) return "resourcepack";
  if (mod.classId === 6552) return "shader";
  if (mod.classId === 6945) return "datapack";
  return "mod";
}
function stripHtml(input) {
  return input.replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>/gi, "\n\n").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/\n{3,}/g, "\n\n").trim().slice(0, 4e3);
}
function unique(values) {
  return [...new Set(values.filter(Boolean))];
}
function mistMetadataDir(gameDir) {
  const current = path.join(gameDir, ".mist");
  const legacy = path.join(gameDir, ".sacrify");
  if (!node_fs.existsSync(current) && node_fs.existsSync(legacy)) {
    try { node_fs.renameSync(legacy, current); } catch { return legacy; }
  }
  return current;
}
const EMPTY = { version: 1, mods: {}, resourcepacks: {}, shaders: {}, datapacks: {} };
function contentTypeKey(kind) {
  if (kind === "mod") return "mods";
  if (kind === "resourcepack") return "resourcepacks";
  if (kind === "shader") return "shaders";
  return "datapacks";
}
class ContentMetaStore {
  cache = /* @__PURE__ */ new Map();
  file(gameDir) {
    return path.join(mistMetadataDir(gameDir), "content.json");
  }
  async read(gameDir) {
    const cached = this.cache.get(gameDir);
    if (cached) return cached;
    const data = await readJson(this.file(gameDir), EMPTY);
    const normalized = {
      version: 1,
      mods: data.mods ?? {},
      resourcepacks: data.resourcepacks ?? {},
      shaders: data.shaders ?? {},
      datapacks: data.datapacks ?? {}
    };
    this.cache.set(gameDir, normalized);
    return normalized;
  }
  async mutate(gameDir, fn) {
    const data = await this.read(gameDir);
    fn(data);
    await writeJsonAtomic(this.file(gameDir), data);
    this.cache.set(gameDir, data);
    return data;
  }
  invalidate(gameDir) {
    this.cache.delete(gameDir);
  }
}
async function readOptions(gameDir) {
  const map = /* @__PURE__ */ new Map();
  try {
    const raw = await node_fs.promises.readFile(path.join(gameDir, "options.txt"), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const index = line.indexOf(":");
      if (index <= 0) continue;
      map.set(line.slice(0, index), line.slice(index + 1));
    }
  } catch {
  }
  return map;
}
async function writeOptions(gameDir, options) {
  await ensureDir(gameDir);
  const lines = [...options.entries()].map(([key, value]) => `${key}:${value}`);
  await node_fs.promises.writeFile(path.join(gameDir, "options.txt"), `${lines.join("\n")}
`, "utf8");
}
function parseResourcePackList(raw) {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.filter((entry) => typeof entry === "string");
  } catch {
  }
  return [];
}
function resourcePackEntry(filename) {
  return `file/${filename}`;
}
async function readResourcePackSelection(gameDir) {
  const options = await readOptions(gameDir);
  return parseResourcePackList(options.get("resourcePacks"));
}
async function writeResourcePackSelection(gameDir, filenames) {
  const options = await readOptions(gameDir);
  const current = parseResourcePackList(options.get("resourcePacks"));
  const keep = current.filter((entry) => entry === "vanilla" || !entry.startsWith("file/"));
  const desired = filenames.map(resourcePackEntry);
  const merged = [...keep.filter((entry) => entry !== "vanilla"), ...desired];
  merged.unshift("vanilla");
  options.set("resourcePacks", JSON.stringify(merged));
  options.set("incompatibleResourcePacks", options.get("incompatibleResourcePacks") ?? "[]");
  await writeOptions(gameDir, options);
}
const LOADERS_FOR = {
  fabric: ["fabric"],
  quilt: ["quilt", "fabric"],
  forge: ["forge"],
  neoforge: ["neoforge"],
  vanilla: [],
  optifine: ["forge", "fabric", "quilt", "neoforge", "optifine"]
};
const EXTENSIONS = {
  mod: [".jar", ".zip"],
  resourcepack: [".zip"],
  shader: [".zip"],
  datapack: [".zip"]
};
class ContentManager {
  constructor(installations, downloads, modrinth, curseforge, meta, logger) {
    this.installations = installations;
    this.downloads = downloads;
    this.modrinth = modrinth;
    this.curseforge = curseforge;
    this.meta = meta;
    this.logger = logger;
  }
  installations;
  downloads;
  modrinth;
  curseforge;
  meta;
  logger;
  packCache = /* @__PURE__ */ new Map();
  provider(source) {
    return source === "modrinth" ? this.modrinth : this.curseforge;
  }
  async search(params) {
    const provider = this.provider(params.source);
    if (!provider.isConfigured()) {
      return {
        hits: [],
        total: 0,
        offset: params.offset,
        limit: params.limit,
        source: params.source,
        notice: provider.configurationHint()
      };
    }
    return provider.search({
      projectType: params.projectType,
      query: params.query,
      gameVersion: params.gameVersion,
      loader: params.loader,
      category: params.category,
      sort: params.sort,
      offset: params.offset,
      limit: params.limit
    });
  }
  async project(source, projectId) {
    const provider = this.provider(source);
    return provider.project(projectId);
  }
  async versions(args) {
    return this.provider(args.source).versions(args);
  }
  async categories(source, projectType) {
    const provider = this.provider(source);
    if (!provider.isConfigured()) return [];
    return provider.categories(projectType);
  }
  async requireInstallation(id) {
    const installation = this.installations.get(id);
    if (!installation) throw new AppError("installation-missing", "That installation no longer exists.");
    return installation;
  }
  async install(request) {
    const installation = await this.requireInstallation(request.installationId);
    const provider = this.provider(request.source);
    if (!provider.isConfigured()) {
      throw new AppError("provider-unconfigured", `${request.source === "curseforge" ? "CurseForge" : "Modrinth"} is not configured.`, {
        hint: provider.configurationHint() ?? void 0
      });
    }
    const kind = request.projectType;
    const version = await provider.version(request.projectId, request.versionId);
    if (!version) {
      throw new AppError("project-version-missing", "That file version is no longer available from the provider.");
    }
    const compatibility = this.checkCompatibility(installation, version, kind);
    if (compatibility.errors.length) {
      throw new AppError("incompatible", compatibility.errors[0], { hint: compatibility.warnings[0] });
    }
    const targetDir = await this.targetDirectory(installation, kind, request.worldFolder);
    const job = this.downloads.create({
      kind: "content",
      title: `Installing ${kind === "mod" ? "mod" : kind === "resourcepack" ? "resource pack" : kind === "shader" ? "shader pack" : "data pack"}`,
      subtitle: installation.name,
      source: `${request.source === "modrinth" ? "Modrinth" : "CurseForge"} · ${hostOf(version.file.url)}`,
      installationId: installation.id
    });
    job.setRetry(() => {
      void this.install(request).catch(() => void 0);
    });
    try {
      job.start();
      job.setPhase("Resolving dependencies");
      const seenProjects = /* @__PURE__ */ new Set([request.projectId]);
      const store = await this.meta.read(installation.gameDir);
      const recordKey = (filename) => kind === "datapack" ? `${request.worldFolder ?? ""}/${filename}` : filename;
      for (const [key, record] of Object.entries(store[contentTypeKey(kind)])) {
        if (record.projectId) seenProjects.add(record.projectId);
      }
      const warnings = [...compatibility.warnings];
      const skipped = [];
      const pending = [];
      const primaryName = safeFilename(version.file.filename);
      pending.push({
        version,
        projectTitle: version.name,
        filename: primaryName,
        dest: resolveInside(targetDir, primaryName),
        kind
      });
      if (request.withDependencies && kind === "mod") {
        await this.collectDependencies(provider, version, installation, kind, pending, skipped, seenProjects, 1, request.source);
      }
      const queued = [];
      for (const entry of pending) {
        if (entry.version.file.url == null) {
          skipped.push({ name: entry.filename, reason: "The author disabled third-party downloads for this file." });
          continue;
        }
        const record = inStore(store, kind, entry.filename, request.worldFolder);
        if (record && record.projectId && record.projectId !== entry.version.projectId) {
          skipped.push({
            name: entry.filename,
            reason: `A different project already owns this filename (${record.name}). Remove it first.`
          });
          continue;
        }
        if (!record && await pathExists(entry.dest)) {
          skipped.push({ name: entry.filename, reason: "A file with this name already exists and was not installed by Mist Launcher." });
          continue;
        }
        if (!EXTENSIONS[kind].some((extension) => entry.filename.toLowerCase().endsWith(extension))) {
          skipped.push({ name: entry.filename, reason: `Expected a ${EXTENSIONS[kind].join(" or ")} file.` });
          continue;
        }
        queued.push(entry);
      }
      if (queued.length === 0) {
        job.complete("Nothing to install");
        return { installed: [], skipped, warnings };
      }
      job.setPhase(`Downloading ${queued.length} file${queued.length === 1 ? "" : "s"}`);
      job.addMany(
        queued.map((entry) => ({
          url: entry.version.file.url,
          dest: entry.dest,
          sha1: entry.version.file.sha1,
          sha512: entry.version.file.sha512,
          size: entry.version.file.size || null,
          label: entry.filename
        }))
      );
      await job.run();
      const installed = [];
      await this.meta.mutate(installation.gameDir, (data) => {
        const bucket = data[contentTypeKey(kind)];
        for (const entry of queued) {
          const key = recordKey(entry.filename);
          const existing = bucket[key];
          bucket[key] = {
            filename: entry.filename,
            projectId: entry.version.projectId,
            versionId: entry.version.id,
            source: request.source,
            name: entry.version.name,
            versionNumber: entry.version.versionNumber,
            iconUrl: null,
            installedAt: (/* @__PURE__ */ new Date()).toISOString(),
            sha1: entry.version.file.sha1,
            gameVersions: entry.version.gameVersions,
            loaders: entry.version.loaders,
            latestVersionId: entry.version.id,
            latestVersionNumber: entry.version.versionNumber
          };
          installed.push({ name: entry.projectTitle, filename: entry.filename, versionId: entry.version.id });
          if (existing && existing.projectId !== entry.version.projectId) {
            this.logger.info("content", `Replaced ${key} in ${installation.name}.`);
          }
        }
      });
      job.complete("Installed");
      this.logger.info("content", `Installed ${installed.length} file(s) into ${installation.name}.`);
      return { installed, skipped, warnings };
    } catch (error) {
      job.fail(error);
      throw error;
    }
  }
  async collectDependencies(provider, version, installation, kind, pending, skipped, seenProjects, depth, source) {
    if (depth > 6) return;
    for (const dependency of version.dependencies) {
      if (dependency.type !== "required" || !dependency.projectId || seenProjects.has(dependency.projectId)) continue;
      try {
        let dependencyVersion = null;
        if (dependency.versionId) {
          dependencyVersion = await provider.version(dependency.projectId, dependency.versionId);
        }
        if (!dependencyVersion) {
          const candidates = await provider.versions({
            source,
            projectId: dependency.projectId,
            gameVersion: installation.gameVersion,
            loader: installation.loader.type,
            projectType: "mod"
          });
          dependencyVersion = candidates.find((candidate) => candidate.releaseType === "release") ?? candidates[0] ?? null;
        }
        if (!dependencyVersion) {
          skipped.push({ name: `dependency ${dependency.projectId}`, reason: "No compatible version was found for this installation." });
          continue;
        }
        const compatibility = this.checkCompatibility(installation, dependencyVersion, kind);
        if (compatibility.errors.length) {
          skipped.push({ name: dependencyVersion.name, reason: compatibility.errors[0] });
          continue;
        }
        if (dependencyVersion.file.url == null) {
          skipped.push({ name: dependencyVersion.name, reason: "The dependency cannot be downloaded automatically." });
          continue;
        }
        seenProjects.add(dependency.projectId);
        pending.push({
          version: dependencyVersion,
          projectTitle: dependencyVersion.name,
          filename: safeFilename(dependencyVersion.file.filename),
          dest: "",
          kind
        });
        await this.collectDependencies(
          provider,
          dependencyVersion,
          installation,
          kind,
          pending,
          skipped,
          seenProjects,
          depth + 1,
          source
        );
      } catch (error) {
        skipped.push({
          name: `dependency ${dependency.projectId}`,
          reason: error instanceof Error ? error.message : "Dependency lookup failed."
        });
      }
    }
    if (depth === 1) {
      const base = await this.targetDirectory(installation, kind, null);
      for (const entry of pending) {
        if (!entry.dest) entry.dest = resolveInside(base, entry.filename);
      }
    }
  }
  async targetDirectory(installation, kind, worldFolder) {
    let dir;
    if (kind === "mod") dir = path.join(installation.gameDir, "mods");
    else if (kind === "resourcepack") dir = path.join(installation.gameDir, "resourcepacks");
    else if (kind === "shader") dir = path.join(installation.gameDir, "shaderpacks");
    else {
      if (!worldFolder) throw new AppError("world-required", "Choose a world before installing a data pack.");
      const saves = path.join(installation.gameDir, "saves");
      const worldPath = resolveInside(saves, worldFolder);
      if (!await pathExists(worldPath)) throw new AppError("world-missing", "That world no longer exists.");
      dir = path.join(worldPath, "datapacks");
    }
    await ensureDir(dir);
    return dir;
  }
  checkCompatibility(installation, version, kind) {
    const errors = [];
    const warnings = [];
    if (kind === "mod") {
      if (installation.loader.type === "vanilla") {
        errors.push("This is a vanilla installation. Add Fabric, Quilt, Forge or NeoForge before installing mods.");
      } else {
        const allowed = LOADERS_FOR[installation.loader.type] ?? [];
        if (version.loaders.length > 0 && !version.loaders.some((loader) => allowed.includes(loader))) {
          errors.push(`This file supports ${version.loaders.join(", ")}, but the installation uses ${installation.loader.type}.`);
        }
      }
      if (version.gameVersions.length > 0 && !version.gameVersions.includes(installation.gameVersion)) {
        errors.push(`This file targets Minecraft ${version.gameVersions.slice(0, 4).join(", ")}, not ${installation.gameVersion}.`);
      }
      if (installation.loader.type === "neoforge" && version.loaders.includes("forge") && !version.loaders.includes("neoforge")) {
        errors.push("NeoForge cannot load Forge mods. Choose a NeoForge build of this mod.");
      }
    }
    if (kind === "datapack") {
      if (version.gameVersions.length > 0 && !version.gameVersions.includes(installation.gameVersion)) {
        errors.push(`This data pack targets Minecraft ${version.gameVersions.slice(0, 4).join(", ")}, not ${installation.gameVersion}.`);
      }
    }
    if (kind === "shader") {
      if (installation.loader.type !== "fabric" && installation.loader.type !== "quilt" && installation.loader.type !== "forge") {
        warnings.push("Shader packs need Iris (Fabric/Quilt/NeoForge) or OptiFine to render. The files will be installed but not activated.");
      }
    }
    if (kind === "resourcepack" && version.gameVersions.length > 0 && !version.gameVersions.includes(installation.gameVersion)) {
      warnings.push(`This resource pack lists Minecraft ${version.gameVersions.slice(0, 4).join(", ")}. It may still work if its pack format matches.`);
    }
    return { errors, warnings };
  }
  /* -------------------------------------------------------------------- mods */
  async listMods(installationId) {
    const installation = await this.requireInstallation(installationId);
    const modsDir = path.join(installation.gameDir, "mods");
    await ensureDir(modsDir);
    const entries = await node_fs.promises.readdir(modsDir, { withFileTypes: true }).catch(() => []);
    const store = await this.meta.read(installation.gameDir);
    const out = [];
    let dirty = false;
    for (const entry of entries) {
      if (!entry.isFile()) continue;
      const disabled = entry.name.endsWith(".disabled");
      const canonical = disabled ? entry.name.slice(0, -".disabled".length) : entry.name;
      if (!/\.(jar|zip)$/i.test(canonical)) continue;
      const full = path.join(modsDir, entry.name);
      const stat = await node_fs.promises.stat(full).catch(() => null);
      if (!stat) continue;
      let record = store.mods[canonical];
      if (!record) {
        const parsed = await parseModJar(path.join(modsDir, canonical));
        record = {
          filename: canonical,
          projectId: "",
          versionId: "",
          source: "local",
          name: parsed.name,
          versionNumber: parsed.version,
          iconUrl: null,
          installedAt: stat.birthtime.toISOString(),
          sha1: null,
          gameVersions: [],
          loaders: [],
          latestVersionId: null,
          latestVersionNumber: null
        };
        store.mods[canonical] = record;
        dirty = true;
      }
      const incompatible = this.modIncompatibility(installation, record);
      out.push({
        filename: canonical,
        path: full,
        enabled: !disabled,
        size: stat.size,
        projectId: record.projectId || null,
        versionId: record.versionId || null,
        name: record.name || canonical,
        versionNumber: record.versionNumber,
        source: record.source,
        iconUrl: record.iconUrl,
        installedAt: record.installedAt,
        update: record.latestVersionId && record.latestVersionId !== record.versionId ? { versionId: record.latestVersionId, versionNumber: record.latestVersionNumber ?? "" } : null,
        incompatible
      });
    }
    if (dirty) await this.meta.mutate(installation.gameDir, (data) => Object.assign(data.mods, store.mods));
    return out.sort((a, b) => a.name.localeCompare(b.name));
  }
  modIncompatibility(installation, record) {
    if (record.gameVersions.length > 0 && !record.gameVersions.includes(installation.gameVersion)) {
      return `Built for Minecraft ${record.gameVersions.slice(0, 3).join(", ")}`;
    }
    if (record.loaders.length > 0) {
      const allowed = LOADERS_FOR[installation.loader.type] ?? [];
      if (!record.loaders.some((loader) => allowed.includes(loader))) {
        return `Built for ${record.loaders.join(", ")}`;
      }
    }
    return null;
  }
  async setModEnabled(installationId, filename, enabled) {
    const installation = await this.requireInstallation(installationId);
    const modsDir = path.join(installation.gameDir, "mods");
    const canonical = safeFilename(filename);
    const active = path.join(modsDir, canonical);
    const disabled = `${active}.disabled`;
    if (enabled) {
      if (!await pathExists(disabled)) {
        if (await pathExists(active)) return;
        throw new AppError("mod-missing", "That mod file no longer exists.");
      }
      if (await pathExists(active)) throw new AppError("mod-conflict", "Both enabled and disabled copies exist. Remove one manually.");
      await node_fs.promises.rename(disabled, active);
    } else {
      if (!await pathExists(active)) return;
      if (await pathExists(disabled)) throw new AppError("mod-conflict", "A disabled copy already exists.");
      await node_fs.promises.rename(active, disabled);
    }
  }
  async removeMod(installationId, filename) {
    const installation = await this.requireInstallation(installationId);
    const modsDir = path.join(installation.gameDir, "mods");
    const canonical = safeFilename(filename);
    await trashPath(path.join(modsDir, canonical));
    await trashPath(path.join(modsDir, `${canonical}.disabled`));
    await this.meta.mutate(installation.gameDir, (data) => {
      delete data.mods[canonical];
    });
  }
  async checkModUpdates(installationId) {
    const installation = await this.requireInstallation(installationId);
    const store = await this.meta.read(installation.gameDir);
    let checked = 0;
    for (const record of Object.values(store.mods)) {
      if (!record.projectId || record.source === "local") continue;
      if (checked >= 80) break;
      checked += 1;
      try {
        const provider = this.provider(record.source);
        if (!provider.isConfigured()) continue;
        const versions = await provider.versions({
          source: record.source,
          projectId: record.projectId,
          gameVersion: installation.gameVersion,
          loader: installation.loader.type,
          projectType: "mod"
        });
        const latest = versions.find((version) => version.releaseType === "release") ?? versions[0];
        if (!latest) continue;
        record.latestVersionId = latest.id;
        record.latestVersionNumber = latest.versionNumber;
      } catch (error) {
        this.logger.warn("content", `Update check failed for ${record.name}.`, {
          reason: error instanceof Error ? error.message : String(error)
        });
      }
    }
    await this.meta.mutate(installation.gameDir, (data) => Object.assign(data.mods, store.mods));
    return this.listMods(installationId);
  }
  async updateMod(installationId, filename) {
    const installation = await this.requireInstallation(installationId);
    const store = await this.meta.read(installation.gameDir);
    const canonical = safeFilename(filename);
    const record = store.mods[canonical];
    if (!record?.projectId || record.source === "local") {
      throw new AppError("mod-unmanaged", "This mod was added manually, so Mist Launcher cannot update it automatically.", {
        hint: "Download the new file from the project page and add it again."
      });
    }
    const enabled = !await pathExists(path.join(installation.gameDir, "mods", `${canonical}.disabled`));
    if (!record.latestVersionId) await this.checkModUpdates(installationId);
    const latest = store.mods[canonical]?.latestVersionId;
    if (!latest) throw new AppError("mod-update-missing", "No update is available for this mod.");
    await this.install({
      installationId,
      projectType: "mod",
      source: record.source,
      projectId: record.projectId,
      versionId: latest,
      withDependencies: true
    });
    if (!enabled) await this.setModEnabled(installationId, canonical, false).catch(() => void 0);
  }
  async installLocalMod(installationId, filePath) {
    const installation = await this.requireInstallation(installationId);
    const filename = safeFilename(filePath);
    if (!/\.(jar|zip)$/i.test(filename)) throw new AppError("content-invalid", "Choose a .jar or .zip mod file.");
    const dest = path.join(installation.gameDir, "mods", filename);
    await ensureDir(path.dirname(dest));
    await node_fs.promises.copyFile(filePath, dest);
    const parsed = await parseModJar(dest);
    await this.meta.mutate(installation.gameDir, (data) => {
      data.mods[filename] = {
        filename,
        projectId: "",
        versionId: "",
        source: "local",
        name: parsed.name,
        versionNumber: parsed.version,
        iconUrl: null,
        installedAt: (/* @__PURE__ */ new Date()).toISOString(),
        sha1: null,
        gameVersions: [],
        loaders: [],
        latestVersionId: null,
        latestVersionNumber: null
      };
    });
    return { installed: [{ name: parsed.name, filename, versionId: "" }], skipped: [], warnings: ["Added from a local file. Mist Launcher cannot verify its source or update it automatically."] };
  }
  /* ---------------------------------------------------------- resource packs */
  async listResourcePacks(installationId) {
    const installation = await this.requireInstallation(installationId);
    const dir = path.join(installation.gameDir, "resourcepacks");
    await ensureDir(dir);
    const entries = await node_fs.promises.readdir(dir, { withFileTypes: true }).catch(() => []);
    const selectionList = (await readResourcePackSelection(installation.gameDir)).filter((entry) => entry.startsWith("file/")).map((entry) => entry.slice(5));
    const selection = new Set(selectionList);
    const store = await this.meta.read(installation.gameDir);
    const out = [];
    for (const entry of entries) {
      const disabled = entry.name.toLowerCase().endsWith(".zip.disabled");
      if (!entry.isFile() || (!disabled && !entry.name.toLowerCase().endsWith(".zip"))) continue;
      const filename = disabled ? entry.name.slice(0, -9) : entry.name;
      const full = path.join(dir, entry.name);
      const stat = await node_fs.promises.stat(full).catch(() => null);
      if (!stat) continue;
      const info = await this.packInfo(full, stat.mtimeMs, stat.size);
      const record = store.resourcepacks[entry.name];
      const enabled = selection.has(entry.name);
      out.push({
        filename: entry.name,
        path: full,
        enabled,
        size: stat.size,
        name: info.name,
        description: info.description,
        iconDataUrl: info.iconDataUrl,
        packFormat: info.packFormat,
        source: record?.source ?? null,
        projectId: record?.projectId || null,
        versionId: record?.versionId || null,
        update: record?.latestVersionId && record.latestVersionId !== record.versionId ? { versionId: record.latestVersionId, versionNumber: record.latestVersionNumber ?? "" } : null,
        order: enabled ? selectionList.indexOf(entry.name) : 999
      });
    }
    return out.sort((a, b) => {
      if (a.enabled !== b.enabled) return a.enabled ? -1 : 1;
      return a.enabled ? b.order - a.order : a.name.localeCompare(b.name);
    });
  }
  async packInfo(file, mtime, size) {
    const key = `${mtime}:${size}`;
    const cached = this.packCache.get(file);
    if (cached && cached.key === key) return cached.info;
    const entries = await readZipEntries(file, ["pack.mcmeta", "pack.png"]);
    let name = path.basename(file).replace(/\.zip$/i, "");
    let description = "";
    let packFormat = null;
    const mcmeta = entries.get("pack.mcmeta");
    if (mcmeta) {
      try {
        const parsed = JSON.parse(mcmeta.toString("utf8"));
        packFormat = typeof parsed.pack?.pack_format === "number" ? parsed.pack.pack_format : null;
        description = flattenText(parsed.pack?.description);
        if (description) name = name || description;
      } catch {
      }
    }
    let iconDataUrl = null;
    const icon = entries.get("pack.png");
    if (icon && icon.length < 2e5) iconDataUrl = `data:image/png;base64,${icon.toString("base64")}`;
    const info = { name: titleFromFilename(name), description, packFormat, iconDataUrl, formatOk: true };
    this.packCache.set(file, { key, info });
    return info;
  }
  async setResourcePackEnabled(installationId, filename, enabled) {
    const installation = await this.requireInstallation(installationId);
    const current = (await readResourcePackSelection(installation.gameDir)).filter((entry) => entry.startsWith("file/")).map((entry) => entry.slice(5));
    const set = new Set(current);
    if (enabled) set.add(filename);
    else set.delete(filename);
    const ordered = [...set];
    await writeResourcePackSelection(installation.gameDir, ordered);
  }
  async reorderResourcePacks(installationId, orderedFilenames) {
    const installation = await this.requireInstallation(installationId);
    const dir = path.join(installation.gameDir, "resourcepacks");
    const available = new Set((await node_fs.promises.readdir(dir).catch(() => [])).filter((name) => name.toLowerCase().endsWith(".zip")));
    const ordered = orderedFilenames.filter((name) => available.has(name)).map((name) => safeFilename(name));
    await writeResourcePackSelection(installation.gameDir, ordered);
  }
  async removeResourcePack(installationId, filename) {
    const installation = await this.requireInstallation(installationId);
    const safe = safeFilename(filename);
    await trashPath(path.join(installation.gameDir, "resourcepacks", safe));
    await this.setResourcePackEnabled(installationId, safe, false);
    await this.meta.mutate(installation.gameDir, (data) => {
      delete data.resourcepacks[safe];
    });
  }
  async installLocalResourcePack(installationId, filePath) {
    const installation = await this.requireInstallation(installationId);
    const filename = safeFilename(filePath);
    if (!filename.toLowerCase().endsWith(".zip")) throw new AppError("content-invalid", "Resource packs must be .zip files.");
    const dest = path.join(installation.gameDir, "resourcepacks", filename);
    await ensureDir(path.dirname(dest));
    await node_fs.promises.copyFile(filePath, dest);
    await this.meta.mutate(installation.gameDir, (data) => {
      data.resourcepacks[filename] = {
        filename,
        projectId: "",
        versionId: "",
        source: "local",
        name: titleFromFilename(filename.replace(/\.zip$/i, "")),
        versionNumber: null,
        iconUrl: null,
        installedAt: (/* @__PURE__ */ new Date()).toISOString(),
        sha1: null,
        gameVersions: [],
        loaders: [],
        latestVersionId: null,
        latestVersionNumber: null
      };
    });
    return { installed: [{ name: filename, filename, versionId: "" }], skipped: [], warnings: [] };
  }
  /* ---------------------------------------------------------------- shaders */
  async listShaders(installationId) {
    const installation = await this.requireInstallation(installationId);
    const dir = path.join(installation.gameDir, "shaderpacks");
    await ensureDir(dir);
    const entries = await node_fs.promises.readdir(dir, { withFileTypes: true }).catch(() => []);
    const store = await this.meta.read(installation.gameDir);
    const out = [];
    for (const entry of entries) {
      if (!entry.isFile() || !entry.name.toLowerCase().endsWith(".zip")) continue;
      const full = path.join(dir, entry.name);
      const stat = await node_fs.promises.stat(full).catch(() => null);
      if (!stat) continue;
      const record = store.shaders[filename];
      out.push({
        filename,
        path: full,
        size: stat.size,
        enabled: !disabled,
        name: titleFromFilename(filename.replace(/\.zip$/i, "")),
        source: record?.source ?? null,
        projectId: record?.projectId || null,
        versionId: record?.versionId || null,
        update: record?.latestVersionId && record.latestVersionId !== record.versionId ? { versionId: record.latestVersionId, versionNumber: record.latestVersionNumber ?? "" } : null,
        requiresIris: true
      });
    }
    return out.sort((a, b) => a.name.localeCompare(b.name));
  }
  async setShaderEnabled(installationId, filename, enabled) {
    const installation = await this.requireInstallation(installationId);
    const safe = safeFilename(filename);
    if (!safe.toLowerCase().endsWith(".zip")) throw new AppError("shader-invalid", "Shader packs must be .zip files.");
    const dir = path.join(installation.gameDir, "shaderpacks");
    const active = path.join(dir, safe), disabled = `${active}.disabled`;
    if (enabled) {
      if (await pathExists(active)) return;
      if (!await pathExists(disabled)) throw new AppError("shader-missing", "That shader pack no longer exists.");
      await node_fs.promises.rename(disabled, active);
    } else {
      if (!await pathExists(active)) return;
      if (await pathExists(disabled)) throw new AppError("shader-conflict", "A disabled copy already exists.");
      await node_fs.promises.rename(active, disabled);
    }
  }
  async removeShader(installationId, filename) {
    const installation = await this.requireInstallation(installationId);
    const safe = safeFilename(filename);
    await trashPath(path.join(installation.gameDir, "shaderpacks", safe));
    await trashPath(path.join(installation.gameDir, "shaderpacks", `${safe}.disabled`)).catch(() => void 0);
    await this.meta.mutate(installation.gameDir, (data) => {
      delete data.shaders[safe];
    });
  }
  async installLocalShader(installationId, filePath) {
    const installation = await this.requireInstallation(installationId);
    const filename = safeFilename(filePath);
    if (!filename.toLowerCase().endsWith(".zip")) throw new AppError("content-invalid", "Shader packs must be .zip files.");
    const dest = path.join(installation.gameDir, "shaderpacks", filename);
    await ensureDir(path.dirname(dest));
    await node_fs.promises.copyFile(filePath, dest);
    return {
      installed: [{ name: filename, filename, versionId: "" }],
      skipped: [],
      warnings: ["Select the shader pack inside the game through Iris or OptiFine. Mist Launcher manages the files but cannot switch the active shader for you."]
    };
  }
  /* -------------------------------------------------------------- datapacks */
  async listDatapacks(installationId, worldFolder) {
    const installation = await this.requireInstallation(installationId);
    const worldPath = resolveInside(path.join(installation.gameDir, "saves"), worldFolder);
    const dir = path.join(worldPath, "datapacks");
    await ensureDir(dir);
    const entries = await node_fs.promises.readdir(dir, { withFileTypes: true }).catch(() => []);
    const out = [];
    for (const entry of entries) {
      if (!entry.isFile()) continue;
      const disabled = entry.name.endsWith(".disabled");
      const canonical = disabled ? entry.name.slice(0, -".disabled".length) : entry.name;
      if (!canonical.toLowerCase().endsWith(".zip")) continue;
      const full = path.join(dir, entry.name);
      const stat = await node_fs.promises.stat(full).catch(() => null);
      if (!stat) continue;
      const info = await this.packInfo(full, stat.mtimeMs, stat.size);
      out.push({
        filename: canonical,
        path: full,
        enabled: !disabled,
        size: stat.size,
        name: info.name,
        description: info.description,
        packFormat: info.packFormat
      });
    }
    return out.sort((a, b) => a.name.localeCompare(b.name));
  }
  async setDatapackEnabled(installationId, worldFolder, filename, enabled) {
    const installation = await this.requireInstallation(installationId);
    const worldPath = resolveInside(path.join(installation.gameDir, "saves"), worldFolder);
    const dir = path.join(worldPath, "datapacks");
    const safe = safeFilename(filename);
    const active = path.join(dir, safe);
    const disabled = `${active}.disabled`;
    if (enabled) {
      if (!await pathExists(disabled)) return;
      await node_fs.promises.rename(disabled, active);
    } else {
      if (!await pathExists(active)) return;
      await node_fs.promises.rename(active, disabled);
    }
  }
  async removeDatapack(installationId, worldFolder, filename) {
    const installation = await this.requireInstallation(installationId);
    const worldPath = resolveInside(path.join(installation.gameDir, "saves"), worldFolder);
    const dir = path.join(worldPath, "datapacks");
    const safe = safeFilename(filename);
    await trashPath(path.join(dir, safe));
    await trashPath(path.join(dir, `${safe}.disabled`));
    await this.meta.mutate(installation.gameDir, (data) => {
      delete data.datapacks[`${worldFolder}/${safe}`];
    });
  }
  async openFolder(target) {
    const error = await electron.shell.openPath(target);
    if (error) throw new AppError("open-folder", `Could not open ${target}.`, { detail: error });
  }
}
function inStore(store, kind, filename, worldFolder) {
  const bucket = store[contentTypeKey(kind)];
  const key = kind === "datapack" ? `${worldFolder ?? ""}/${filename}` : filename;
  return bucket[key] ?? null;
}
function safeFilename(input) {
  const base = path.basename(String(input).replace(/\\/g, "/"));
  const clean = base.replace(/[<>:"/\\|?*\u0000-\u001f]/g, "_").replace(/^\.+/, "").trim().slice(0, 160);
  if (!clean || clean === "." || clean === "..") throw new AppError("invalid-filename", "The provider returned an unsafe file name.");
  return clean;
}
function hostOf(url) {
  if (!url) return "unknown source";
  try {
    return new URL(url).host;
  } catch {
    return "unknown source";
  }
}
function titleFromFilename(name) {
  return name.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim() || name;
}
function flattenText(value) {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(flattenText).join("");
  if (value && typeof value === "object") {
    const record = value;
    if (typeof record.text === "string") return record.text;
    if (Array.isArray(record.extra)) return flattenText(record.extra);
  }
  return "";
}
async function parseModJar(file) {
  const fallback = path.basename(file).replace(/\.(jar|zip)(\.disabled)?$/i, "");
  try {
    const entries = await readZipEntries(file, [
      "fabric.mod.json",
      "quilt.mod.json",
      "META-INF/mods.toml",
      "META-INF/neoforge.mods.toml"
    ]);
    const fabric = entries.get("fabric.mod.json") ?? entries.get("quilt.mod.json");
    if (fabric) {
      const data = JSON.parse(fabric.toString("utf8"));
      return {
        name: data.name ?? data.quilt_loader?.metadata?.name ?? data.id ?? fallback,
        version: data.version ?? data.quilt_loader?.version ?? null,
        modId: data.id ?? data.quilt_loader?.id ?? null
      };
    }
    const toml = entries.get("META-INF/neoforge.mods.toml") ?? entries.get("META-INF/mods.toml");
    if (toml) {
      const text2 = toml.toString("utf8");
      const name = /displayName\s*=\s*"([^"]+)"/.exec(text2)?.[1] ?? /modId\s*=\s*"([^"]+)"/.exec(text2)?.[1];
      const version = /version\s*=\s*"([^"${}]+)"/.exec(text2)?.[1] ?? null;
      const modId = /modId\s*=\s*"([^"]+)"/.exec(text2)?.[1] ?? null;
      return { name: name ?? fallback, version, modId };
    }
  } catch {
  }
  return { name: fallback, version: null, modId: null };
}
const PRESERVED = [
  "saves",
  "screenshots",
  "options.txt",
  "optionsof.txt",
  "servers.dat",
  "resourcepacks",
  "shaderpacks",
  "logs",
  "crash-reports",
  "backups",
  ".mist",
  ".sacrify"
];
class ModpackManager {
  constructor(paths, installations, loaders, downloads, modrinth, curseforge, logger) {
    this.paths = paths;
    this.installations = installations;
    this.loaders = loaders;
    this.downloads = downloads;
    this.modrinth = modrinth;
    this.curseforge = curseforge;
    this.logger = logger;
  }
  paths;
  installations;
  loaders;
  downloads;
  modrinth;
  curseforge;
  logger;
  async preparePack(input, job) {
    if (input.source === "local") {
      if (!input.filePath) throw new AppError("modpack-invalid", "No modpack file was selected.");
      return this.planFromArchive(input.filePath, input.name || path.basename(input.filePath), job);
    }
    const provider = input.source === "modrinth" ? this.modrinth : this.curseforge;
    if (!provider.isConfigured()) {
      throw new AppError("provider-unconfigured", `${input.source === "curseforge" ? "CurseForge" : "Modrinth"} is not configured.`, {
        hint: provider.configurationHint() ?? void 0
      });
    }
    job.setPhase("Fetching modpack version");
    const version = await provider.version(input.projectId, input.versionId);
    if (!version) throw new AppError("modpack-missing", "That modpack version is no longer available from the provider.");
    if (!version.file.url) {
      throw new AppError("modpack-restricted", "The author has disabled third-party downloads for this modpack.", {
        hint: "Open the project page and download it manually, then use Modpacks → Import file."
      });
    }
    const archive = path.join(this.paths.cacheDir, "modpacks", `${input.projectId}-${input.versionId}.zip`);
    await ensureDir(path.dirname(archive));
    if (!await pathExists(archive)) {
      job.setPhase("Downloading modpack");
      job.add({
        url: version.file.url,
        dest: archive,
        sha1: version.file.sha1,
        sha512: version.file.sha512,
        size: version.file.size || null,
        label: version.file.filename
      });
      await job.run();
    }
    const plan = await this.planFromArchive(archive, input.name, job);
    plan.ref = {
      source: input.source,
      projectId: input.projectId,
      versionId: input.versionId,
      name: plan.name,
      versionNumber: plan.versionNumber,
      iconUrl: input.icon.startsWith("url:") ? input.icon.slice(4) : void 0
    };
    plan.source = input.source;
    return plan;
  }
  async planFromArchive(archive, fallbackName, job) {
    job.setPhase("Reading modpack manifest");
    const extractDir = path.join(this.paths.cacheDir, "modpacks", `extract-${node_crypto.randomUUID().slice(0, 8)}`);
    await removePath(extractDir);
    await ensureDir(extractDir);
    try {
      await extractZip(archive, extractDir);
    } catch (error) {
      throw new AppError("modpack-invalid", "The modpack archive could not be extracted.", {
        detail: error instanceof Error ? error.message : String(error)
      });
    }
    const indexPath = path.join(extractDir, "modrinth.index.json");
    if (await pathExists(indexPath)) {
      return this.planFromModrinthIndex(indexPath, extractDir, fallbackName);
    }
    const manifestPath = path.join(extractDir, "manifest.json");
    if (await pathExists(manifestPath)) {
      return this.planFromCurseManifest(manifestPath, extractDir, fallbackName);
    }
    await removePath(extractDir);
    throw new AppError("modpack-invalid", "This archive is not a Modrinth (.mrpack) or CurseForge modpack.", {
      hint: "Mist Launcher supports Modrinth .mrpack files and CurseForge modpack zips with a manifest.json."
    });
  }
  async planFromModrinthIndex(indexPath, extractDir, fallbackName) {
    const index = JSON.parse(await node_fs.promises.readFile(indexPath, "utf8"));
    if (index.game !== "minecraft") throw new AppError("modpack-invalid", "Only Minecraft modpacks are supported.");
    const gameVersion = index.dependencies?.minecraft;
    if (!gameVersion) throw new AppError("modpack-invalid", "The modpack does not declare a Minecraft version.");
    const loader = loaderFromDependencies(index.dependencies ?? {}, gameVersion);
    const skipped = [];
    const files = [];
    for (const file of index.files ?? []) {
      if (file.env?.client === "unsupported") {
        skipped.push({ name: path.basename(file.path), reason: "Not needed on the client." });
        continue;
      }
      const url = file.downloads?.[0] ?? null;
      if (!url) {
        skipped.push({ name: path.basename(file.path), reason: "The pack lists no download URL for this file." });
        continue;
      }
      files.push({
        path: file.path,
        url,
        sha1: file.hashes?.sha1 ?? null,
        sha512: file.hashes?.sha512 ?? null,
        size: file.fileSize ?? 0,
        required: true
      });
    }
    const overrideDirs = [
      path.join(extractDir, "overrides"),
      path.join(extractDir, "client-overrides")
    ].filter(Boolean);
    return {
      name: index.name || fallbackName,
      versionId: index.versionId ?? "",
      versionNumber: index.versionId ?? "",
      summary: index.summary ?? "",
      gameVersion,
      loader,
      files,
      overrideDirs,
      workDir: extractDir,
      skipped,
      warnings: [],
      ref: { source: "local", projectId: "", name: index.name || fallbackName, versionNumber: index.versionId ?? "" },
      source: "local"
    };
  }
  async planFromCurseManifest(manifestPath, extractDir, fallbackName) {
    if (!this.curseforge.isConfigured()) {
      await removePath(extractDir);
      throw new AppError("curseforge-key", "CurseForge modpacks need a CurseForge API key.", {
        hint: "Add a free API key from console.curseforge.com in Settings → Integrations, then retry."
      });
    }
    const manifest = JSON.parse(await node_fs.promises.readFile(manifestPath, "utf8"));
    const gameVersion = manifest.minecraft?.version;
    if (!gameVersion) throw new AppError("modpack-invalid", "The CurseForge manifest has no Minecraft version.");
    const loaderId = manifest.minecraft?.modLoaders?.find((loader2) => loader2.primary)?.id ?? manifest.minecraft?.modLoaders?.[0]?.id;
    let loader = { type: "vanilla", profileId: gameVersion };
    if (loaderId) {
      if (loaderId.startsWith("forge-")) {
        const build = loaderId.slice("forge-".length);
        loader = { type: "forge", version: `${gameVersion}-${build}` };
      } else if (loaderId.startsWith("neoforge-")) {
        loader = { type: "neoforge", version: loaderId.slice("neoforge-".length) };
      } else if (loaderId.startsWith("fabric-")) {
        loader = { type: "fabric", version: loaderId.slice("fabric-".length) };
      } else if (loaderId.startsWith("quilt-")) {
        loader = { type: "quilt", version: loaderId.slice("quilt-".length) };
      }
    }
    const skipped = [];
    const files = [];
    for (const entry of manifest.files ?? []) {
      if (entry.required === false) continue;
      const version = await this.curseforge.file(String(entry.projectID), String(entry.fileID));
      if (!version || !version.file.url) {
        skipped.push({
          name: `${entry.projectID}/${entry.fileID}`,
          reason: "The author disabled third-party downloads or the file was removed."
        });
        continue;
      }
      files.push({
        path: path.posix.join("mods", version.file.filename),
        url: version.file.url,
        sha1: version.file.sha1,
        sha512: version.file.sha512,
        size: version.file.size,
        required: true
      });
    }
    const overridesName = manifest.overrides ?? "overrides";
    return {
      name: manifest.name || fallbackName,
      versionId: manifest.version ?? "",
      versionNumber: manifest.version ?? "",
      summary: "",
      gameVersion,
      loader,
      files,
      overrideDirs: [path.join(extractDir, overridesName)],
      workDir: extractDir,
      skipped,
      warnings: [],
      ref: { source: "local", projectId: "", name: manifest.name || fallbackName, versionNumber: manifest.version ?? "" },
      source: "local"
    };
  }
  async install(input) {
    const job = this.downloads.create({
      kind: "modpack",
      title: input.name ? `Installing ${input.name}` : "Installing modpack",
      subtitle: null,
      source: input.source === "modrinth" ? "Modrinth · cdn.modrinth.com" : input.source === "curseforge" ? "CurseForge · edge.forgecdn.net" : "Local file"
    });
    job.start();
    job.setRetry(() => {
      void this.install(input).catch(() => void 0);
    });
    try {
      const plan = await this.preparePack(input, job);
      job.setSubtitle(`${plan.gameVersion} · ${plan.loader.type}${plan.loader.version ? ` ${plan.loader.version}` : ""}`);
      const icon = input.icon?.startsWith("url:") || input.icon?.startsWith("preset:") ? input.icon : "preset:modpack";
      let installation;
      if (input.installationId) {
        installation = this.installations.get(str(input.installationId, "installationId"));
        if (!installation) throw new AppError("installation-missing", "The selected installation no longer exists.");
        if (installation.gameVersion !== plan.gameVersion || installation.loader.type !== plan.loader.type) {
          throw new AppError("modpack-target-incompatible", `This pack requires Minecraft ${plan.gameVersion} with ${plan.loader.type}; ${installation.name} uses Minecraft ${installation.gameVersion} with ${installation.loader.type}. Choose a matching installation or create a new one.`);
        }
        if (installation.loader.version && plan.loader.version && installation.loader.version !== plan.loader.version) {
          throw new AppError("modpack-loader-incompatible", `This pack requires ${plan.loader.type} ${plan.loader.version}; ${installation.name} uses ${installation.loader.version}. Choose a matching installation or create a new one.`);
        }
      } else {
        installation = await this.installations.create(
          {
            name: input.name || plan.name,
            gameVersion: plan.gameVersion,
            loader: plan.loader,
            icon: icon.startsWith("preset:") ? icon.slice(7) : icon,
            memoryMb: input.memoryMb,
            modpack: { ...plan.ref, versionId: input.versionId || plan.versionId }
          },
          { memoryMb: input.memoryMb ?? 4096 }
        );
      }
      if (plan.loader.type !== "vanilla") {
        job.setPhase(`Installing ${plan.loader.type}`);
        await this.loaders.install(installation.id, plan.loader);
      }
      job.setPhase("Downloading modpack files");
      const skipped = [...plan.skipped];
      const queued = [];
      for (const file of plan.files) {
        try {
          const dest = resolveInside(installation.gameDir, ...file.path.split("/"));
          queued.push({ file, dest });
        } catch {
          skipped.push({ name: file.path, reason: "Unsafe path in pack manifest." });
        }
      }
      if (queued.length) {
        job.addMany(
          queued.map((entry) => ({
            url: entry.file.url,
            dest: entry.dest,
            sha1: entry.file.sha1,
            sha512: entry.file.sha512,
            size: entry.file.size || null,
            label: path.basename(entry.file.path)
          }))
        );
        await job.run();
      }
      job.setPhase("Applying modpack overrides");
      for (const dir of plan.overrideDirs) {
        if (await pathExists(dir)) await copyDirectory(dir, installation.gameDir, (relative) => !PRESERVED.includes(relative.split("/")[0]));
      }
      const installed = {
        format: "mist-modpack-install",
        version: 1,
        ref: { ...plan.ref, versionId: input.versionId || plan.versionId },
        manifest: {
          name: plan.name,
          versionId: plan.versionId,
          summary: plan.summary,
          gameVersion: plan.gameVersion,
          loader: plan.loader.type,
          loaderVersion: plan.loader.version ?? null,
          fileCount: queued.length
        },
        managedPaths: queued.map((entry) => entry.file.path),
        installedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      await writeJsonAtomic(path.join(mistMetadataDir(installation.gameDir), "modpack.json"), installed);
      await this.installations.setModpack(installation.id, {
        ...plan.ref,
        versionId: input.versionId || plan.versionId,
        name: plan.name
      });
      await removePath(plan.workDir);
      job.complete("Modpack installed");
      this.logger.info("modpacks", `Installed ${plan.name} into ${installation.name}.`);
      return {
        installationId: installation.id,
        name: installation.name,
        fileCount: queued.length,
        skipped,
        warnings: [...plan.warnings, ...plan.loader.type === "forge" ? ["Forge and NeoForge packs may need Java 17 or 21; Mist Launcher installs the runtime Minecraft requires."] : []]
      };
    } catch (error) {
      job.fail(error);
      throw error;
    }
  }
  async update(installationId) {
    const installation = this.installations.get(installationId);
    if (!installation) throw new AppError("installation-missing", "That installation no longer exists.");
    const ref = installation.modpack;
    if (!ref || !ref.projectId) {
      throw new AppError("not-a-modpack", "This installation is not managed by a modpack.");
    }
    const job = this.downloads.create({
      kind: "modpack",
      title: `Updating ${ref.name}`,
      subtitle: installation.name,
      source: ref.source === "modrinth" ? "Modrinth · cdn.modrinth.com" : "CurseForge · edge.forgecdn.net",
      installationId
    });
    job.start();
    try {
      const provider = ref.source === "modrinth" ? this.modrinth : this.curseforge;
      if (!provider.isConfigured()) throw new AppError("provider-unconfigured", "The modpack provider is not configured.");
      job.setPhase("Checking for a newer pack version");
      const versions = await provider.versions({
        source: ref.source,
        projectId: ref.projectId,
        projectType: "modpack"
      });
      const latest = versions.find((version) => version.releaseType === "release") ?? versions[0];
      if (!latest) throw new AppError("modpack-missing", "No versions are available for this modpack.");
      if (latest.id === ref.versionId) throw new AppError("no-update", "This modpack is already up to date.");
      const plan = await this.preparePack(
        {
          source: ref.source,
          projectId: ref.projectId,
          versionId: latest.id,
          name: ref.name,
          icon: "preset:modpack"
        },
        job
      );
      const previous = await this.readInstalledPack(installation.gameDir);
      const previousPaths = new Set(previous?.managedPaths ?? []);
      if (plan.loader.type !== installation.loader.type || plan.loader.version !== installation.loader.version) {
        job.setPhase("Updating mod loader");
        await this.loaders.install(installation.id, plan.loader);
      }
      job.setPhase("Downloading updated files");
      const queued = [];
      for (const file of plan.files) {
        try {
          queued.push({ file, dest: resolveInside(installation.gameDir, ...file.path.split("/")) });
        } catch {
          this.logger.warn("modpacks", `Skipping unsafe pack path ${file.path}.`);
        }
      }
      if (queued.length) {
        job.addMany(
          queued.map((entry) => ({
            url: entry.file.url,
            dest: entry.dest,
            sha1: entry.file.sha1,
            sha512: entry.file.sha512,
            size: entry.file.size || null,
            label: path.basename(entry.file.path)
          }))
        );
        await job.run();
      }
      const nextPaths = new Set(queued.map((entry) => entry.file.path));
      const obsolete = [...previousPaths].filter((relative) => !nextPaths.has(relative));
      if (obsolete.length) {
        job.setPhase("Preserving removed pack files");
        const stash = path.join(mistMetadataDir(installation.gameDir), `removed-${(/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-")}`);
        for (const relative of obsolete) {
          try {
            const source = resolveInside(installation.gameDir, ...relative.split("/"));
            if (!await pathExists(source)) continue;
            const dest = resolveInside(stash, ...relative.split("/"));
            await ensureDir(path.dirname(dest));
            await node_fs.promises.rename(source, dest);
          } catch {
            this.logger.warn("modpacks", `Could not preserve ${relative}.`);
          }
        }
      }
      job.setPhase("Applying overrides");
      for (const dir of plan.overrideDirs) {
        if (await pathExists(dir)) await copyDirectory(dir, installation.gameDir, (relative) => !PRESERVED.includes(relative.split("/")[0]));
      }
      const installed = {
        format: "mist-modpack-install",
        version: 1,
        ref: { ...plan.ref, projectId: ref.projectId, source: ref.source, versionId: latest.id },
        manifest: {
          name: plan.name,
          versionId: plan.versionId,
          summary: plan.summary,
          gameVersion: plan.gameVersion,
          loader: plan.loader.type,
          loaderVersion: plan.loader.version ?? null,
          fileCount: queued.length
        },
        managedPaths: queued.map((entry) => entry.file.path),
        installedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      await writeJsonAtomic(path.join(mistMetadataDir(installation.gameDir), "modpack.json"), installed);
      await this.installations.setModpack(installation.id, {
        ...ref,
        versionId: latest.id,
        versionNumber: latest.versionNumber,
        name: plan.name
      });
      await removePath(plan.workDir);
      await node_fs.promises.rm(path.join(this.paths.cacheDir, "modpacks", `${ref.projectId}-${latest.id}.zip`), { force: true }).catch(() => void 0);
      job.complete("Modpack updated");
      return { jobId: job.id };
    } catch (error) {
      job.fail(error);
      throw error;
    }
  }
  async readInstalledPack(gameDir) {
    try {
      const raw = await node_fs.promises.readFile(path.join(mistMetadataDir(gameDir), "modpack.json"), "utf8");
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  async exportToFile(installationId) {
    const installation = this.installations.get(installationId);
    if (!installation) throw new AppError("installation-missing", "That installation no longer exists.");
    if (!installation.modpack) throw new AppError("not-a-modpack", "Only modpack-managed installations can be exported as a pack profile.");
    const result = await electron.dialog.showSaveDialog({
      title: "Export modpack profile",
      defaultPath: `${safeName(installation.modpack.name)}.mist-pack.json`,
      filters: [{ name: "Mist Launcher modpack profile", extensions: ["json"] }]
    });
    if (result.canceled || !result.filePath) return null;
    const profile = {
      format: "mist-modpack",
      version: 1,
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      ref: installation.modpack,
      installationName: installation.name,
      memoryMb: installation.memoryMb
    };
    await writeJsonAtomic(result.filePath, profile);
    return { path: result.filePath };
  }
  async importFromFile() {
    const result = await electron.dialog.showOpenDialog({
      title: "Import modpack profile or pack file",
      properties: ["openFile"],
      filters: [
        { name: "Modpack or Mist Launcher profile", extensions: ["json", "mrpack", "zip"] },
        { name: "All files", extensions: ["*"] }
      ]
    });
    const file = result.filePaths[0];
    if (!file) return null;
    if (file.toLowerCase().endsWith(".json")) {
      let profile;
      try {
        profile = JSON.parse(await node_fs.promises.readFile(file, "utf8"));
      } catch {
        throw new AppError("import-invalid", "That JSON file could not be read.");
      }
      if (!["mist-modpack", "sacrify-modpack"].includes(profile.format) || !profile.ref?.projectId) {
        throw new AppError("import-invalid", "That file is not a Mist Launcher modpack profile.");
      }
      return this.install({
        source: profile.ref.source,
        projectId: profile.ref.projectId,
        versionId: profile.ref.versionId ?? "",
        name: profile.ref.name,
        icon: "preset:modpack"
      });
    }
    return this.install({
      source: "local",
      projectId: "local",
      versionId: "",
      name: "",
      icon: "preset:modpack",
      filePath: file
    });
  }
}
function loaderFromDependencies(dependencies, gameVersion) {
  if (dependencies["fabric-loader"]) return { type: "fabric", version: dependencies["fabric-loader"] };
  if (dependencies["quilt-loader"]) return { type: "quilt", version: dependencies["quilt-loader"] };
  if (dependencies.forge) {
    const build = dependencies.forge;
    return { type: "forge", version: build.startsWith(gameVersion) ? build : `${gameVersion}-${build}` };
  }
  if (dependencies.neoforge) return { type: "neoforge", version: dependencies.neoforge };
  return { type: "vanilla", profileId: gameVersion };
}
function safeName(value) {
  return value.replace(/[<>:"/\\|?*\u0000-\u001f]/g, "_").slice(0, 80) || "modpack";
}
class Reader {
  constructor(buffer) {
    this.buffer = buffer;
  }
  buffer;
  offset = 0;
  need(bytes) {
    if (this.offset + bytes > this.buffer.length) throw new Error("Unexpected end of NBT data");
  }
  u8() {
    this.need(1);
    return this.buffer.readUInt8(this.offset++);
  }
  i8() {
    this.need(1);
    return this.buffer.readInt8(this.offset++);
  }
  i16() {
    this.need(2);
    const value = this.buffer.readInt16BE(this.offset);
    this.offset += 2;
    return value;
  }
  u16() {
    this.need(2);
    const value = this.buffer.readUInt16BE(this.offset);
    this.offset += 2;
    return value;
  }
  i32() {
    this.need(4);
    const value = this.buffer.readInt32BE(this.offset);
    this.offset += 4;
    return value;
  }
  i64() {
    this.need(8);
    const value = Number(this.buffer.readBigInt64BE(this.offset));
    this.offset += 8;
    return value;
  }
  f32() {
    this.need(4);
    const value = this.buffer.readFloatBE(this.offset);
    this.offset += 4;
    return value;
  }
  f64() {
    this.need(8);
    const value = this.buffer.readDoubleBE(this.offset);
    this.offset += 8;
    return value;
  }
  string() {
    const length = this.u16();
    this.need(length);
    const value = this.buffer.toString("utf8", this.offset, this.offset + length);
    this.offset += length;
    return value;
  }
  tag(type) {
    switch (type) {
      case 1:
        return this.i8();
      case 2:
        return this.i16();
      case 3:
        return this.i32();
      case 4:
        return this.i64();
      case 5:
        return this.f32();
      case 6:
        return this.f64();
      case 7: {
        const length = this.i32();
        this.need(length);
        const value = Array.from(this.buffer.subarray(this.offset, this.offset + length)).map((byte) => byte > 127 ? byte - 256 : byte);
        this.offset += length;
        return value;
      }
      case 8:
        return this.string();
      case 9: {
        const elementType = this.u8();
        const length = this.i32();
        const list = [];
        for (let i = 0; i < length; i++) list.push(this.tag(elementType));
        return list;
      }
      case 10:
        return this.compound();
      case 11: {
        const length = this.i32();
        const list = [];
        for (let i = 0; i < length; i++) list.push(this.i32());
        return list;
      }
      case 12: {
        const length = this.i32();
        const list = [];
        for (let i = 0; i < length; i++) list.push(this.i64());
        return list;
      }
      default:
        throw new Error(`Unsupported NBT tag type ${type}`);
    }
  }
  compound() {
    const out = {};
    while (true) {
      const type = this.u8();
      if (type === 0) return out;
      const name = this.string();
      out[name] = this.tag(type);
    }
  }
}
function parseNbt(input) {
  const buffer = input[0] === 31 && input[1] === 139 ? node_zlib.gunzipSync(input) : input;
  const reader = new Reader(buffer);
  const type = reader.u8();
  if (type !== 10) throw new Error("level.dat root is not a compound tag");
  reader.string();
  return reader.compound();
}
function readString(value) {
  return typeof value === "string" ? value : null;
}
function readNumber(value) {
  return typeof value === "number" ? value : null;
}
function readBoolean(value) {
  return typeof value === "boolean" ? value : value === 1;
}
function readObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : null;
}
const GAME_MODES = ["Survival", "Creative", "Adventure", "Spectator"];
class WorldsService {
  constructor(paths, installations, downloads, logger) {
    this.paths = paths;
    this.installations = installations;
    this.downloads = downloads;
    this.logger = logger;
  }
  paths;
  installations;
  downloads;
  logger;
  index = { version: 1, backups: [] };
  async init() {
    this.index = await readJson(this.paths.backupIndexFile, { version: 1, backups: [] });
    if (!Array.isArray(this.index.backups)) this.index.backups = [];
  }
  async installation(id) {
    const installation = this.installations.get(id);
    if (!installation) throw new AppError("installation-missing", "That installation no longer exists.");
    return { gameDir: installation.gameDir, name: installation.name };
  }
  async worldPath(gameDir, folder) {
    const safe = path.basename(folder);
    if (safe !== folder || !folder || folder === "." || folder === "..") {
      throw new AppError("world-invalid", "Invalid world folder.");
    }
    const full = resolveInside(path.join(gameDir, "saves"), folder);
    if (!await pathExists(full)) throw new AppError("world-missing", "That world folder no longer exists.");
    return full;
  }
  async list(installationId) {
    const { gameDir } = await this.installation(installationId);
    const saves = path.join(gameDir, "saves");
    await ensureDir(saves);
    const entries = await node_fs.promises.readdir(saves, { withFileTypes: true }).catch(() => []);
    const worlds = [];
    for (const entry of entries) {
      if (!entry.isDirectory() || entry.name.startsWith(".")) continue;
      const folder = path.join(saves, entry.name);
      const info = await this.readWorld(folder, installationId);
      worlds.push(info);
    }
    return worlds.sort((a, b) => new Date(b.lastPlayed ?? 0).getTime() - new Date(a.lastPlayed ?? 0).getTime());
  }
  async readWorld(folder, installationId) {
    const folderName = path.basename(folder);
    let name = folderName;
    let versionName = null;
    let versionId = null;
    let lastPlayed = null;
    let gameMode = null;
    let hardcore = false;
    try {
      const raw = await node_fs.promises.readFile(path.join(folder, "level.dat"));
      const root = parseNbt(raw);
      const data = readObject(root.Data);
      if (data) {
        name = readString(data.LevelName) ?? folderName;
        const version = readObject(data.Version);
        versionName = version ? readString(version.Name) : null;
        versionId = version ? readNumber(version.Id) : null;
        const played = readNumber(data.LastPlayed);
        if (played) lastPlayed = new Date(played).toISOString();
        const mode = readNumber(data.GameType);
        if (mode != null) gameMode = GAME_MODES[mode] ?? null;
        hardcore = readBoolean(data.Hardcore);
      }
    } catch {
    }
    let iconDataUrl = null;
    try {
      const icon = await node_fs.promises.readFile(path.join(folder, "icon.png"));
      if (icon.length < 25e4) iconDataUrl = `data:image/png;base64,${icon.toString("base64")}`;
    } catch {
    }
    const datapacksDir = path.join(folder, "datapacks");
    const datapacks = await node_fs.promises.readdir(datapacksDir).catch(() => []);
    const backups = this.index.backups.filter((backup) => backup.installationId === installationId && backup.worldFolder === folderName).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return {
      folder: folderName,
      name,
      versionName,
      versionId,
      lastPlayed,
      sizeBytes: await directorySize(folder),
      gameMode,
      hardcore,
      hasDatapacks: datapacks.some((file) => file.endsWith(".zip")),
      iconDataUrl,
      backups
    };
  }
  async openFolder(installationId, worldFolder) {
    const { gameDir } = await this.installation(installationId);
    const target = worldFolder ? await this.worldPath(gameDir, worldFolder) : path.join(gameDir, "saves");
    await ensureDir(target);
    const error = await electron.shell.openPath(target);
    if (error) throw new AppError("open-folder", "Could not open the worlds folder.", { detail: error });
  }
  async delete(installationId, worldFolder) {
    const { gameDir } = await this.installation(installationId);
    const target = await this.worldPath(gameDir, worldFolder);
    await trashPath(target);
    this.logger.info("worlds", `Moved world ${worldFolder} to the operating system trash.`);
  }
  async importFolder(installationId) {
    const { gameDir } = await this.installation(installationId);
    const result = await electron.dialog.showOpenDialog({
      title: "Choose a world folder (it must contain level.dat)",
      properties: ["openDirectory"]
    });
    const source = result.filePaths[0];
    if (!source) return null;
    if (!await pathExists(path.join(source, "level.dat"))) {
      throw new AppError("world-invalid", "That folder does not contain a level.dat file, so it is not a Minecraft world.");
    }
    const saves = path.join(gameDir, "saves");
    await ensureDir(saves);
    let name = path.basename(source);
    let candidate = path.join(saves, name);
    let counter = 1;
    while (await pathExists(candidate)) {
      candidate = path.join(saves, `${name}-imported-${counter++}`);
    }
    await copyDirectory(source, candidate);
    this.logger.info("worlds", `Imported world into ${candidate}.`);
    return this.readWorld(candidate, installationId);
  }
  async backup(installationId, worldFolder, label) {
    const { gameDir, name: installationName } = await this.installation(installationId);
    const source = await this.worldPath(gameDir, worldFolder);
    const info = await this.readWorld(source, installationId);
    const id = node_crypto.randomUUID();
    const dir = this.paths.installationBackups(installationId);
    await ensureDir(dir);
    const stamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    const file = path.join(dir, `${path.basename(worldFolder)}-${stamp}.zip`);
    const job = this.downloads.create({
      kind: "backup",
      title: `Backing up ${info.name}`,
      subtitle: installationName,
      source: "Local disk",
      installationId
    });
    job.start();
    try {
      job.setPhase("Compressing world");
      let last = 0;
      await zipDirectory(source, file, (done, total) => {
        if (Date.now() - last > 500) {
          last = Date.now();
          job.setPhase(`Compressing world (${done}/${total} files)`);
        }
      });
      const backup = {
        id,
        installationId,
        worldFolder: path.basename(worldFolder),
        worldName: info.name,
        label: label?.trim() || `${info.name} — ${(/* @__PURE__ */ new Date()).toLocaleString()}`,
        file,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        sizeBytes: (await node_fs.promises.stat(file)).size
      };
      this.index.backups.push(backup);
      await this.persist();
      job.complete("Backup created");
      this.logger.info("worlds", `Backed up ${info.name} to ${file}.`);
      return backup;
    } catch (error) {
      job.fail(error);
      throw error;
    }
  }
  async listBackups(installationId) {
    const list = installationId ? this.index.backups.filter((backup) => backup.installationId === installationId) : [...this.index.backups];
    return list.filter((backup) => backup.file).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  async restore(backupId) {
    const backup = this.index.backups.find((entry) => entry.id === backupId);
    if (!backup) throw new AppError("backup-missing", "That backup is no longer in the index.");
    if (!await pathExists(backup.file)) throw new AppError("backup-missing", "The backup zip file is missing from disk.");
    const { gameDir } = await this.installation(backup.installationId);
    const saves = path.join(gameDir, "saves");
    await ensureDir(saves);
    const staging = path.join(saves, `.mist-restore-${backup.id.slice(0, 8)}`);
    await removePath(staging);
    await ensureDir(staging);
    await extractZipStreaming(backup.file, staging);
    if (!await pathExists(path.join(staging, "level.dat"))) {
      await removePath(staging);
      throw new AppError("backup-invalid", "The backup does not contain a level.dat and cannot be restored.");
    }
    const target = resolveInside(saves, backup.worldFolder);
    if (await pathExists(target)) {
      const preserveRoot = path.join(mistMetadataDir(gameDir), "preserved-worlds");
      await ensureDir(preserveRoot);
      const preserved = path.join(preserveRoot, `${backup.worldFolder}-${Date.now()}`);
      await node_fs.promises.rename(target, preserved);
      this.logger.info("worlds", `Preserved the previous world at ${preserved}.`);
    }
    await node_fs.promises.rename(staging, target);
    this.logger.info("worlds", `Restored ${backup.worldName} from ${backup.file}.`);
  }
  async removeBackup(backupId) {
    const backup = this.index.backups.find((entry) => entry.id === backupId);
    if (!backup) return;
    await trashPath(backup.file);
    this.index.backups = this.index.backups.filter((entry) => entry.id !== backupId);
    await this.persist();
  }
  async openBackupsFolder(backupId) {
    let target = this.paths.backupsDir;
    if (backupId) {
      const backup = this.index.backups.find((entry) => entry.id === backupId);
      if (backup) target = path.dirname(backup.file);
    }
    await ensureDir(target);
    const error = await electron.shell.openPath(target);
    if (error) throw new AppError("open-folder", "Could not open the backups folder.", { detail: error });
  }
  async persist() {
    await writeJsonAtomic(this.paths.backupIndexFile, this.index);
  }
}
class DiagnosticsService {
  constructor(paths, installations, downloads, logger) {
    this.paths = paths;
    this.installations = installations;
    this.downloads = downloads;
    this.logger = logger;
  }
  paths;
  installations;
  downloads;
  logger;
  launcher(limit = 500) {
    return this.logger.tail(limit);
  }
  async readTail(file, maxLines) {
    try {
      const raw = await node_fs.promises.readFile(file, "utf8");
      const lines = raw.split(/\r?\n/);
      return lines.slice(Math.max(0, lines.length - maxLines)).join("\n");
    } catch {
      return "";
    }
  }
  async files() {
    const installations = this.installations.list();
    const gameLogs = [];
    const crashes = [];
    for (const installation of installations) {
      const captured = path.join(this.paths.logsDir, `game-${installation.id}.log`);
      if (await pathExists(captured)) {
        gameLogs.push({
          installationId: installation.id,
          name: `${installation.name} (launcher capture)`,
          path: captured,
          modified: (await node_fs.promises.stat(captured)).mtime.toISOString()
        });
      }
      const latest = path.join(installation.gameDir, "logs", "latest.log");
      if (await pathExists(latest)) {
        gameLogs.push({
          installationId: installation.id,
          name: `${installation.name} (game latest.log)`,
          path: latest,
          modified: (await node_fs.promises.stat(latest)).mtime.toISOString()
        });
      }
      for (const directory of [path.join(installation.gameDir, "crash-reports"), this.paths.rootCrashDir()]) {
        const entries = await node_fs.promises.readdir(directory).catch(() => []);
        for (const entry of entries) {
          if (!/^crash-.*\.txt$/i.test(entry)) continue;
          const full = path.join(directory, entry);
          const stat = await node_fs.promises.stat(full).catch(() => null);
          if (!stat) continue;
          const info = await this.readCrashInfo(full, installation.id);
          crashes.push({ ...info, modified: stat.mtime.toISOString() });
        }
      }
    }
    const unique2 = /* @__PURE__ */ new Map();
    for (const crash of crashes) unique2.set(crash.path, crash);
    return {
      launcherLog: this.paths.launcherLogFile,
      gameLogs: gameLogs.sort((a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime()),
      crashReports: [...unique2.values()].sort((a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime())
    };
  }
  async readCrashInfo(file, installationId) {
    let description = "Crash report";
    let version = null;
    try {
      const head = (await this.readTail(file, 120)).split(/\r?\n/);
      for (const line of head) {
        const desc = /^Description:\s*(.+)$/.exec(line);
        if (desc) description = desc[1].trim();
        const ver = /^Minecraft Version:\s*(.+)$/.exec(line);
        if (ver) version = ver[1].trim();
      }
    } catch {
    }
    return {
      filename: path.basename(file),
      path: file,
      modified: (/* @__PURE__ */ new Date()).toISOString(),
      installationId,
      version,
      description
    };
  }
  async game(installationId, limit = 400) {
    const installation = this.installations.get(installationId);
    if (!installation) throw new AppError("installation-missing", "That installation no longer exists.");
    const latest = path.join(installation.gameDir, "logs", "latest.log");
    if (await pathExists(latest)) return this.readTail(latest, limit);
    const captured = path.join(this.paths.logsDir, `game-${installationId}.log`);
    if (await pathExists(captured)) return this.readTail(captured, limit);
    return "";
  }
  async crashCandidates() {
    const candidates = [];
    for (const installation of this.installations.list()) {
      candidates.push({ path: path.join(installation.gameDir, "crash-reports"), installationId: installation.id, gameDir: installation.gameDir });
    }
    return candidates;
  }
  async crash(file) {
    const resolved = path.resolve(file);
    const allowed = await this.crashCandidates();
    const sharedRoot = path.resolve(this.paths.rootCrashDir());
    const permitted = allowed.some((candidate) => resolved.startsWith(path.resolve(candidate.path) + path.sep)) || resolved.startsWith(sharedRoot + path.sep);
    if (!permitted || !/\.txt$/i.test(resolved)) {
      throw new AppError("path-denied", "That crash report is outside the launcher’s known crash-report folders.");
    }
    return this.readTail(resolved, 1200);
  }
  async diagnostics(installationId) {
    const settings = this.installations.list();
    const jobs = this.downloads.list().slice(0, 12);
    const selected = installationId ? this.installations.get(installationId) : null;
    const lines = [];
    lines.push("Mist Launcher diagnostics");
    lines.push(`Generated: ${(/* @__PURE__ */ new Date()).toISOString()}`);
    lines.push(`Launcher: ${electron.app.getVersion()} (Electron ${process.versions.electron}, Node ${process.versions.node})`);
    lines.push(`OS: ${process.platform} ${process.arch} ${os.release()} (${os.version()})`);
    lines.push(`Memory: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(1)} GB total, ${(os.freemem() / 1024 / 1024 / 1024).toFixed(1)} GB free`);
    lines.push(`Data dir: ${this.paths.dataDir}`);
    lines.push(`Shared game root: ${this.paths.gameRoot()}`);
    lines.push(`Installations: ${settings.length}`);
    for (const installation of settings) {
      lines.push(
        `  - ${installation.name} | MC ${installation.gameVersion} | ${installation.loader.type} ${installation.loader.version ?? ""} | profile ${installation.loader.profileId ?? "n/a"} | ${installation.memoryMb} MB | ${installation.gameDir}`
      );
    }
    if (selected) {
      lines.push(`Selected installation: ${selected.name} (${selected.id})`);
      lines.push(`  gameDir: ${selected.gameDir}`);
      lines.push(`  last played: ${selected.lastPlayed ?? "never"}, playtime ${selected.playtimeSeconds}s`);
    }
    lines.push("");
    lines.push("Recent background jobs:");
    for (const job of jobs) {
      lines.push(`  - [${job.status}] ${job.title} ${job.error ? `— ${job.error}` : ""}`);
    }
    lines.push("");
    lines.push("Recent launcher log (secrets redacted):");
    for (const entry of this.logger.tail(300)) {
      lines.push(`[${entry.ts}] ${entry.level.toUpperCase()} ${entry.scope}: ${entry.message}`);
    }
    const raw = lines.join("\n");
    const redacted = this.logger.redact(raw);
    return {
      generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      text: `${redacted}

Review this text for private paths or usernames before sharing it.`,
      redactions: (redacted.match(/\[redacted/g) ?? []).length
    };
  }
}
const NEWS_URL = "https://launchercontent.mojang.com/v2/news.json";
const ASSET_BASE = "https://launchercontent.mojang.com";
class NewsService {
  constructor(http, logger) {
    this.http = http;
    this.logger = logger;
  }
  http;
  logger;
  cache = null;
  async list() {
    if (this.cache && Date.now() - this.cache.at < 15 * 6e4) {
      return { notices: this.cache.notices, source: "minecraft.net (Mojang launcher content)", error: null };
    }
    try {
      const data = await this.http.json(NEWS_URL, { timeoutMs: 25e3 });
      const entries = (data.entries ?? []).filter((entry) => entry.title && entry.date).sort((a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()).slice(0, 9);
      const notices = entries.map((entry) => {
        const image = entry.newsPageImage?.url ?? entry.playPageImage?.url ?? null;
        return {
          title: entry.title ?? "Minecraft news",
          tag: entry.tag ?? "News",
          category: entry.category ?? "Minecraft: Java Edition",
          date: entry.date ?? "",
          text: entry.text ?? "",
          imageUrl: image ? new URL(image, ASSET_BASE).toString() : null,
          url: entry.readMoreLink ?? null
        };
      });
      this.cache = { at: Date.now(), notices };
      return { notices, source: "minecraft.net (Mojang launcher content)", error: null };
    } catch (error) {
      this.logger.warn("news", "Could not load Minecraft news.", {
        reason: error instanceof Error ? error.message : String(error)
      });
      return {
        notices: [],
        source: "minecraft.net (Mojang launcher content)",
        error: "News could not be loaded. This is usually a temporary network problem; the rest of the launcher is unaffected."
      };
    }
  }
}
const API = "https://api.minecraftserver.id/api/v1/public";
function text(value, max = 500) {
  return typeof value === "string" ? value.replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max) : "";
}
function number(value, fallback = 0) {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}
function serverFrom(value) {
  if (!value || typeof value !== "object") return null;
  const row = value;
  const slug = text(row.slug, 100);
  const address = text(row.address, 253);
  if (!/^[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/i.test(address) || !slug) return null;
  const rawPort = number(row.port, 25565);
  const tags = Array.isArray(row.tags) ? row.tags.map((tag) => text(tag, 40)).filter(Boolean).slice(0, 30) : [];
  const image = text(row.iconUrl, 500);
  return {
    slug,
    name: text(row.name, 100) || address,
    description: text(row.description, 500),
    address,
    port: rawPort >= 1 && rawPort <= 65535 ? rawPort : 25565,
    edition: text(row.edition, 20),
    status: text(row.status, 20),
    currentPlayers: Math.max(0, number(row.currentPlayers)),
    maxPlayers: Math.max(0, number(row.maxPlayers)),
    version: text(row.version, 60),
    iconUrl: image.startsWith("https://") ? image : null,
    score: Math.max(0, number(row.score)),
    monthlyVotes: Math.max(0, number(row.monthlyVotes)),
    isVerified: row.isVerified === true,
    tags,
    pageUrl: `https://minecraftserver.id/server/${encodeURIComponent(slug)}`
  };
}
class ServerDirectoryService {
  constructor(http) {
    this.http = http;
  }
  http;
  async list(options) {
    const params = new URLSearchParams({ edition: "JAVA", limit: "30", page: String(Math.max(1, Math.floor(options.page ?? 1))) });
    const query = options.search?.trim().slice(0, 100);
    if (query && query.length >= 2) params.set("q", query);
    params.set("sort", options.sort === "popular" ? "votes" : "score");
    if (options.filter === "cracked") params.set("tag", "Cracked");
    if (options.filter === "premium") params.set("tag", "Premium");
    const response = await this.http.json(`${API}/servers?${params.toString()}`, { timeoutMs: 15e3 });
    if (!response || typeof response !== "object") throw new Error("The server directory returned an invalid response.");
    const root = response;
    if (root.success === false) throw new Error("The public server directory could not load results.");
    const data = root.data && typeof root.data === "object" ? root.data : null;
    const rows = Array.isArray(data?.servers) ? data.servers : [];
    return {
      servers: rows.map(serverFrom).filter((server) => server !== null),
      total: Math.max(0, number(data?.total)),
      page: Math.max(1, number(data?.page, 1)),
      totalPages: Math.max(1, number(data?.totalPages, 1)),
      source: "minecraftserver.id"
    };
  }
}
const CHAT_API = MIST_WORLD_CHAT_URL?.trim() || "https://dev-sacrify-launcher.pantheonsite.io/wp-json/sacrify/v1/chat";
const CHANNELS = ["general", "mods", "packs"];
const REACTIONS = ["👍", "❤️", "😂", "🔥", "👀"];
class WorldChatService {
  constructor(http) {
    this.http = http;
  }
  http;
  clientId = node_crypto.randomUUID();
  session = null;
  async latest() {
    const data = await this.http.json(`${CHAT_API}/latest`, { timeoutMs: 12e3, retries: 0 });
    return data.message;
  }
  async feed(channel, afterId = 0, beforeId = 0) {
    this.assertChannel(channel);
    const url = new URL(`${CHAT_API}/messages`);
    url.searchParams.set("channel", channel);
    url.searchParams.set("after", String(Math.max(0, Math.floor(afterId))));
    if (beforeId > 0) url.searchParams.set("before", String(Math.max(0, Math.floor(beforeId))));
    return this.http.json(url.toString(), { timeoutMs: 15e3, retries: 0 });
  }
  async send(account, channel, text2, replyTo) {
    this.assertChannel(channel);
    const body = text2.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
    if (!body || body.length > 500) throw new AppError("chat-message-invalid", "Messages must be 1–500 characters long.");
    const token = await this.token(account);
    return this.http.postJson(`${CHAT_API}/messages`, { channel, text: body, replyTo }, {
      timeoutMs: 15e3,
      headers: { Authorization: `Bearer ${token}` }
    });
  }
  async react(account, channel, messageId, emoji) {
    if (!Number.isSafeInteger(messageId) || messageId < 1) throw new AppError("chat-message-invalid", "That chat message is invalid.");
    if (!REACTIONS.includes(emoji)) throw new AppError("chat-reaction-invalid", "Choose one of the available reactions.");
    const token = await this.token(account);
    const response = await this.http.postJson(`${CHAT_API}/react`, { messageId, emoji }, { timeoutMs: 15e3, headers: { Authorization: `Bearer ${token}` } });
    if (response.reactions && typeof response.reactions === "object") return response.reactions;
    const legacyFeed = await this.feed(channel, 0, messageId + 1);
    return legacyFeed.messages.find((message) => message.id === messageId)?.reactions ?? {};
  }
  async report(account, messageId, reason) {
    if (!Number.isSafeInteger(messageId) || messageId < 1) throw new AppError("chat-message-invalid", "That chat message is invalid.");
    const safeReason = reason.trim().slice(0, 80);
    if (!safeReason) throw new AppError("chat-report-invalid", "Choose a reason for reporting this message.");
    const token = await this.token(account);
    await this.http.postJson(`${CHAT_API}/report`, { messageId, reason: safeReason }, { timeoutMs: 15e3, headers: { Authorization: `Bearer ${token}` } });
  }
  async uploads(channel) {
    const url = new URL(`${CHAT_API}/uploads`);
    url.searchParams.set("channel", channel);
    const response = await this.http.json(url.toString(), { timeoutMs: 15e3, retries: 0 });
    return response.uploads;
  }
  async upload(account, channel, filePath) {
    const token = await this.token(account);
    const details = await promises$1.stat(filePath).catch(() => null);
    if (!details?.isFile()) throw new AppError("chat-upload-file-invalid", "Choose a local mod or pack file.");
    if (details.size < 1 || details.size > 25 * 1024 * 1024) throw new AppError("chat-upload-size-invalid", "Uploads must be between 1 byte and 25 MB.");
    const extension = path.basename(filePath).toLowerCase().split(".").pop();
    if (!(extension === "zip" || channel === "mods" && extension === "jar")) throw new AppError("chat-upload-type-invalid", channel === "mods" ? "Mods accepts .jar or .zip files only." : "Packs accepts .zip files only.");
    const bytes = await promises$1.readFile(filePath);
    const form = new FormData();
    form.set("channel", channel);
    form.set("file", new Blob([bytes]), path.basename(filePath));
    const response = await this.http.request(`${CHAT_API}/uploads`, {
      method: "POST",
      body: form
    }, { timeoutMs: 6e4, retries: 0, headers: { Authorization: `Bearer ${token}` } });
    const text2 = await response.text();
    if (!response.ok) {
      let message = `Upload failed with HTTP ${response.status}.`;
      try {
        message = JSON.parse(text2).message || message;
      } catch {
      }
      throw new AppError(`chat-upload-${response.status}`, message, { detail: text2.slice(0, 400) });
    }
    return JSON.parse(text2);
  }
  async token(account) {
    if (!account) throw new AppError("chat-account-required", "Add or select an offline test profile or Microsoft account before posting.");
    if (this.session && this.session.accountId === account.id && this.session.expiresAt > Date.now() + 6e4) return this.session.token;
    const response = await this.http.postJson(`${CHAT_API}/session`, {
      displayName: account.name,
      accountKind: account.kind,
      clientId: this.clientId
    }, { timeoutMs: 15e3 });
    if (!response.token || !Number.isFinite(response.expiresAt)) throw new AppError("chat-session-invalid", "Mist Launcher World Chat returned an invalid session.");
    this.session = { accountId: account.id, token: response.token, expiresAt: response.expiresAt };
    return response.token;
  }
  assertChannel(channel) {
    if (!CHANNELS.includes(channel)) throw new AppError("chat-channel-invalid", "That World Chat channel is unavailable.");
  }
}
function offlineSkinPackMeta(version) {
  const modernFormats = {
    "1.21.9": [69, 0],
    "1.21.10": [69, 0],
    "1.21.11": [75, 0],
    "26.1": [84, 0],
    "26.2": [88, 0],
    "26.3": [97, 1]
  };
  const format = modernFormats[version];
  if (format) {
    return { min_format: format, max_format: format, description: "Mist Launcher local offline skin" };
  }
  const [major = "1", minor = "0", patch = "0"] = version.split(".");
  const a = Number(major);
  const b = Number(minor);
  const c = Number(patch);
  let packFormat = 1;
  if (a > 1 || a === 1 && b >= 21) packFormat = b === 21 && c >= 6 ? 64 : b === 21 && c >= 5 ? 55 : b === 21 && c >= 4 ? 46 : b === 21 && c >= 2 ? 42 : 34;
  else if (b === 20) packFormat = c >= 5 ? 32 : c >= 3 ? 22 : c === 2 ? 18 : 15;
  else if (b === 19) packFormat = c >= 4 ? 13 : c === 3 ? 12 : 9;
  else if (b >= 17) packFormat = b >= 18 ? 8 : 7;
  else if (b >= 15) packFormat = 5;
  else if (b >= 13) packFormat = 4;
  else if (b >= 11) packFormat = 3;
  else if (b >= 9) packFormat = 2;
  return { pack_format: packFormat, description: "Mist Launcher local offline skin" };
}
class Services {
  paths;
  logger;
  secure;
  settings;
  accounts;
  auth;
  http;
  downloads;
  meta;
  java;
  installer;
  launcher;
  installations;
  loaders;
  modrinth;
  curseforge;
  content;
  modpacks;
  worlds;
  diagnostics;
  news;
  servers;
  worldChat;
  visibilityHandler = null;
  constructor() {
    this.paths = new Paths();
    this.logger = new AppLogger(this.paths.launcherLogFile);
    this.logger.setChangeListener(() => this.emit("logsChanged"));
    this.secure = new SecureStore(this.paths.secretsFile, this.logger);
    this.settings = new SettingsStore(this.paths, this.logger);
    this.accounts = new AccountStore(this.paths, this.secure, this.logger);
    this.http = new HttpClient(this.logger);
    this.downloads = new DownloadManager(this.logger, (jobs) => this.emit("jobs", jobs), 6);
    this.meta = new MinecraftMeta(this.paths, this.http, this.logger);
    this.java = new JavaManager(this.paths, this.http, this.downloads, this.logger);
    this.installations = new InstallationStore(this.paths, this.logger);
    this.installer = new VersionInstaller(this.paths, this.meta, this.downloads, this.logger);
    this.modrinth = new ModrinthProvider(this.http, this.logger);
    this.curseforge = new CurseForgeProvider(
      this.http,
      () => MIST_CURSEFORGE_API_KEY?.trim() || this.secure.get("curseforge.apiKey"),
      this.logger
    );
    this.auth = new AuthService({
      http: this.http,
      secure: this.secure,
      accounts: this.accounts,
      logger: this.logger,
      getSettings: () => this.settings.get(),
      onAccountChanged: (account) => this.emit("account", account)
    });
    this.launcher = new GameLauncher(this.paths, this.meta, this.java, this.installer, this.logger, {
      getSettings: () => this.settings.get(),
      getInstallation: async (id) => this.installations.get(id),
      onExit: async (id, seconds, code) => {
        await this.installations.touch(id, seconds);
        this.emit("dataChanged");
        if (code !== 0 && code !== null) {
          this.toast("warning", "Minecraft closed unexpectedly", "Crash details remain on this device.");
        }
      },
      onState: (state) => this.emit("gameState", state),
      onLine: (installationId, line) => this.emit("gameLog", { installationId, line }),
      onVisibility: (installationId, behavior) => this.visibilityHandler?.(installationId, this.settings.get().keepLauncherOpen ? behavior : "hide")
    });
    this.loaders = new LoaderService(
      this.paths,
      this.http,
      this.meta,
      this.installer,
      this.downloads,
      this.java,
      this.installations,
      this.logger
    );
    const contentMeta = new ContentMetaStore();
    this.content = new ContentManager(
      this.installations,
      this.downloads,
      this.modrinth,
      this.curseforge,
      contentMeta,
      this.logger
    );
    this.modpacks = new ModpackManager(
      this.paths,
      this.installations,
      this.loaders,
      this.downloads,
      this.modrinth,
      this.curseforge,
      this.logger
    );
    this.worlds = new WorldsService(this.paths, this.installations, this.downloads, this.logger);
    this.diagnostics = new DiagnosticsService(this.paths, this.installations, this.downloads, this.logger);
    this.news = new NewsService(this.http, this.logger);
    this.servers = new ServerDirectoryService(this.http);
    this.worldChat = new WorldChatService(this.http);
  }
  async init() {
    await this.secure.init();
    if (MIST_CURSEFORGE_API_KEY) this.logger.addSecret(MIST_CURSEFORGE_API_KEY);
    this.logger.addSecret(this.secure.get("curseforge.apiKey"));
    const settings = await this.settings.load();
    this.paths.setGameRoot(settings.gameRoot);
    this.downloads.setConcurrency(settings.downloadConcurrency);
    await this.accounts.load();
    await this.installations.load();
    await this.worlds.init();
    this.logger.info("launcher", `${APP_NAME} ${APP_VERSION} starting on ${process.platform} ${process.arch}.`);
    this.logger.info("launcher", `Data directory: ${this.paths.dataDir}`);
    this.logger.info("launcher", `Shared game root: ${this.paths.gameRoot()}`);
    if (!this.secure.isAvailable()) {
      this.logger.warn("launcher", "OS credential encryption is unavailable; accounts will not persist after this session.");
    }
  }
  setVisibilityHandler(handler) {
    this.visibilityHandler = handler;
  }
  emit(type, payload) {
    for (const window of electron.BrowserWindow.getAllWindows()) {
      if (!window.isDestroyed()) window.webContents.send(EVENTS_CHANNEL, { type, payload });
    }
  }
  toast(kind, title, message) {
    this.emit("toast", { kind, title, message });
  }
  async browseSkins(query = {}) {
    const page = Math.min(1e4, Math.max(1, Math.floor(query.page ?? 1)));
    const params = new URLSearchParams({ size: "64", per: "48", page: String(page) });
    const search = query.query?.trim().slice(0, 80);
    if (search) params.set("q", search);
    if (query.category) params.set("category", query.category);
    if (query.arms) params.set("arms", query.arms);
    params.set("sort", query.sort ?? "popular");
    const result = await this.http.json(`https://mosaicary.com/api/skins?${params.toString()}`, { timeoutMs: 2e4, retries: 1 });
    const skins = (result.skins ?? []).flatMap((skin) => {
      if (!skin.id || !/^[A-Za-z0-9]{12}$/.test(skin.id) || !skin.name) return [];
      return [{
        id: skin.id,
        name: skin.name.slice(0, 120),
        arms: skin.arms === "slim" ? "slim" : "classic",
        previewUrl: `https://mosaicary.com/api/skins/${skin.id}/render.png`,
        pageUrl: `https://mosaicary.com/models/${skin.id}`,
        authorName: skin.author?.name?.slice(0, 100) ?? null,
        authorUrl: skin.author?.url?.startsWith("https://") ? skin.author.url : null,
        publisherName: skin.publisher?.name?.slice(0, 100) ?? null,
        license: skin.license?.slice(0, 40) ?? null,
        tags: (skin.tags ?? []).filter((tag) => typeof tag === "string").slice(0, 8),
        downloads: Number.isFinite(skin.downloads) ? Math.max(0, skin.downloads ?? 0) : 0,
        likes: Number.isFinite(skin.likes) ? Math.max(0, skin.likes ?? 0) : 0
      }];
    });
    return {
      skins,
      page: Number.isFinite(result.page) ? result.page : page,
      pages: Number.isFinite(result.pages) ? result.pages : 1,
      total: Number.isFinite(result.total) ? result.total : skins.length
    };
  }
  async skinTexture(skinId) {
    if (!/^[A-Za-z0-9]{12}$/.test(skinId)) throw new AppError("skin-name-invalid", "The selected catalog skin is invalid.");
    const bytes = await this.downloadSkinBytes(skinId);
    return `data:image/png;base64,${bytes.toString("base64")}`;
  }
  async getAppliedOfflineSkin(installationId, targetUsername) {
    if (!/^[A-Za-z0-9_]{3,16}$/.test(targetUsername)) return null;
    const installation = this.installations.get(installationId);
    if (!installation) return null;
    const manifestPath = path.join(installation.gameDir, "mist-offline-skin.json");
    try {
      const manifest = JSON.parse(await node_fs.promises.readFile(manifestPath, "utf8"));
      if (manifest.username?.toLowerCase() === targetUsername.toLowerCase()) {
        return {
          skinId: typeof manifest.skinId === "string" && /^[A-Za-z0-9]{12}$/.test(manifest.skinId) ? manifest.skinId : null,
          name: typeof manifest.name === "string" ? manifest.name.slice(0, 120) : "Local skin",
          username: targetUsername,
          appliedAt: typeof manifest.appliedAt === "string" ? manifest.appliedAt : null
        };
      }
    } catch {
    }
    const filename = `${targetUsername}.png`;
    const candidates = [
      path.join(installation.gameDir, "CustomSkinLoader", "LocalSkin", "skins", filename),
      path.join(installation.gameDir, "config", "offlineskins", filename),
      path.join(installation.gameDir, "cachedImages", "skins", filename),
      path.join(installation.gameDir, "resourcepacks", `MistOfflineSkin-${targetUsername}.zip`),
      path.join(installation.gameDir, "resourcepacks", `SacrifyOfflineSkin-${targetUsername}.zip`)
    ];
    for (const candidate of candidates) {
      if (await pathExists(candidate)) return { skinId: null, name: "Local skin", username: targetUsername, appliedAt: null };
    }
    return null;
  }
  async applyOfflineSkin(installationId, targetUsername, skinId, skinName) {
    if (!/^[A-Za-z0-9_]{3,16}$/.test(targetUsername) || !/^[A-Za-z0-9]{12}$/.test(skinId)) {
      throw new AppError("skin-name-invalid", "The offline username or selected catalog skin is invalid.");
    }
    const installation = this.installations.get(installationId);
    if (!installation) throw new AppError("installation-missing", "Choose an installation before applying a skin.");
    const bytes = await this.downloadSkinBytes(skinId);
    const width = bytes.readUInt32BE(16);
    const height = bytes.readUInt32BE(20);
    if (width !== 64 || height !== 64 && height !== 32) {
      throw new AppError("skin-size-invalid", "Minecraft skins must be 64×64 or legacy 64×32 PNG images.");
    }
    const installedMods = await this.content.listMods(installationId);
    const customSkinLoader = installedMods.some((mod) => mod.enabled && /custom.?skin.?loader/i.test(mod.filename));
    const offlineSkinsReloaded = installedMods.some((mod) => mod.enabled && /offline.?skins/i.test(mod.filename));
    const filename = `${targetUsername}.png`;
    if (installation.loader.type === "vanilla" || installation.loader.type === "optifine") {
      const destination2 = await this.installOfflineSkinResourcePack(installation.gameDir, installation.gameVersion, targetUsername, bytes);
      await this.saveAppliedSkin(installation.gameDir, skinId, skinName, targetUsername);
      return { path: destination2, username: targetUsername, skinId, name: skinName };
    }
    if (!customSkinLoader && !offlineSkinsReloaded) {
      throw new AppError("skin-mod-missing", "Mist Launcher could not find the client-side skin mod in this installation. Try applying the skin again.");
    }
    const directory = customSkinLoader ? path.join(installation.gameDir, "CustomSkinLoader", "LocalSkin", "skins") : path.join(installation.gameDir, "config", "offlineskins");
    await ensureDir(directory);
    const destination = path.join(directory, filename);
    await node_fs.promises.writeFile(destination, bytes, { mode: 384 });
    await this.disableOfflineSkinResourcePack(installation.gameDir, targetUsername);
    await this.saveAppliedSkin(installation.gameDir, skinId, skinName, targetUsername);
    return { path: destination, username: targetUsername, skinId, name: skinName };
  }
  async downloadSkinBytes(skinId) {
    const response = await this.http.request(`https://mosaicary.com/api/skins/${skinId}.png`, {
      method: "GET",
      headers: { Accept: "image/png" }
    }, { timeoutMs: 2e4, retries: 1 });
    if (!response.ok) throw new AppError("skin-not-found", "The selected skin is no longer available in the public catalog.");
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length < 32 || bytes.length > 2 * 1024 * 1024 || bytes.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") {
      throw new AppError("skin-image-invalid", "The skin service did not return a valid PNG image.");
    }
    const width = bytes.readUInt32BE(16);
    const height = bytes.readUInt32BE(20);
    if (width !== 64 || height !== 64 && height !== 32) {
      throw new AppError("skin-size-invalid", "Minecraft skins must be 64×64 or legacy 64×32 PNG images.");
    }
    return bytes;
  }
  async saveAppliedSkin(gameDir, skinId, name, username) {
    await writeJsonAtomic(path.join(gameDir, "mist-offline-skin.json"), {
      skinId,
      name: name.slice(0, 120),
      username,
      appliedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  async installOfflineSkinResourcePack(gameDir, gameVersion, username, png) {
    const version = gameVersion.split("-")[0];
    const meta = offlineSkinPackMeta(version);
    const files = {
      "pack.mcmeta": fflate.strToU8(JSON.stringify({ pack: meta })),
      "assets/minecraft/textures/entity/steve.png": new Uint8Array(png),
      "assets/minecraft/textures/entity/alex.png": new Uint8Array(png),
      "assets/minecraft/textures/entity/player/wide/steve.png": new Uint8Array(png),
      "assets/minecraft/textures/entity/player/wide/alex.png": new Uint8Array(png),
      "assets/minecraft/textures/entity/player/slim/steve.png": new Uint8Array(png),
      "assets/minecraft/textures/entity/player/slim/alex.png": new Uint8Array(png)
    };
    const packName = `MistOfflineSkin-${username}.zip`;
    const packPath = path.join(gameDir, "resourcepacks", packName);
    await ensureDir(path.dirname(packPath));
    await node_fs.promises.writeFile(packPath, fflate.zipSync(files, { level: 6 }));
    const options = await readOptions(gameDir);
    const entry = `file/${packName}`;
    const selected = parseResourcePackList(options.get("resourcePacks")).filter((value) => value !== entry && value !== "vanilla");
    options.set("resourcePacks", JSON.stringify(["vanilla", ...selected, entry]));
    options.set("incompatibleResourcePacks", options.get("incompatibleResourcePacks") ?? "[]");
    await writeOptions(gameDir, options);
    return packPath;
  }
  async disableOfflineSkinResourcePack(gameDir, username) {
    const entry = `file/MistOfflineSkin-${username}.zip`;
    const options = await readOptions(gameDir);
    const legacyEntry = `file/SacrifyOfflineSkin-${username}.zip`;
    const selected = parseResourcePackList(options.get("resourcePacks")).filter((value) => value !== entry && value !== legacyEntry);
    if (options.has("resourcePacks")) {
      options.set("resourcePacks", JSON.stringify(selected.includes("vanilla") ? selected : ["vanilla", ...selected]));
      await writeOptions(gameDir, options);
    }
  }
  async info() {
    const authStatus = this.auth.status();
    return {
      name: APP_NAME,
      version: APP_VERSION,
      platform: process.platform,
      arch: process.arch,
      electron: process.versions.electron,
      node: process.versions.node,
      chrome: process.versions.chrome,
      dataDir: this.paths.dataDir,
      gameRoot: this.paths.gameRoot(),
      isDev: !electron.app.isPackaged,
      msAuthConfigured: authStatus.configured,
      msAuthSource: authStatus.source,
      curseforgeConfigured: this.curseforge.isConfigured(),
      safeStorageAvailable: this.secure.isAvailable(),
      safeStorageBackend: this.secure.backendName(),
      totalMemoryMb: Math.floor(os.totalmem() / 1024 / 1024),
      locale: electron.app.getLocale(),
      paths: {
        logs: this.paths.logsDir,
        backups: this.paths.backupsDir,
        installations: this.paths.installationsDir,
        versions: path.join(this.paths.gameRoot(), "versions")
      }
    };
  }
  async updateSettings(patch) {
    const next = await this.settings.update(patch);
    this.paths.setGameRoot(next.gameRoot);
    this.downloads.setConcurrency(next.downloadConcurrency);
    if (patch.microsoftClientId) this.logger.info("settings", "Microsoft client ID configured.");
    return next;
  }
  async resetSettings() {
    const next = await this.settings.reset();
    this.paths.setGameRoot(next.gameRoot);
    this.downloads.setConcurrency(next.downloadConcurrency);
    return next;
  }
  async chooseGameRoot() {
    const result = await electron.dialog.showOpenDialog({
      title: "Choose the shared Minecraft folder",
      properties: ["openDirectory", "createDirectory"]
    });
    const selected = result.filePaths[0];
    if (!selected) return null;
    return this.updateSettings({ gameRoot: selected });
  }
  async secretStatus() {
    return {
      curseforge: Boolean(MIST_CURSEFORGE_API_KEY || this.secure.get("curseforge.apiKey")),
      microsoftClientId: Boolean(
        MIST_MS_CLIENT_ID || this.secure.get("microsoft.clientId") || this.settings.get().microsoftClientId
      )
    };
  }
  async setSecret(key, value) {
    if (key === "curseforge") {
      await this.secure.set("curseforge.apiKey", value);
      this.logger.addSecret(value);
      this.logger.info("settings", value ? "CurseForge API key stored in the OS credential vault." : "CurseForge API key removed.");
      return;
    }
    await this.secure.delete("microsoft.clientId");
    await this.settings.update({ microsoftClientId: value });
    this.logger.info("settings", value ? "Microsoft client ID saved." : "Microsoft client ID cleared.");
  }
  async listInstallations() {
    const list = this.installations.list();
    for (const installation of list) {
      const profileId = installation.loader.profileId || installation.gameVersion;
      const json = await this.meta.installedVersionJson(profileId);
      if (!json) {
        installation.missingFiles = [`Minecraft ${installation.gameVersion} files are not installed`];
      } else if (!await this.installer.isInstalled(profileId)) {
        installation.missingFiles = ["Game files need to be downloaded or repaired"];
      } else if (!await pathExists(installation.gameDir)) {
        installation.missingFiles = ["The installation folder is missing"];
      }
    }
    return list;
  }
  async createInstallation(input) {
    const installation = await this.installations.create(input, { memoryMb: this.settings.get().defaultMemoryMb });
    await this.setActiveInstallation(installation.id);
    this.emit("dataChanged");
    return installation;
  }
  async updateInstallation(id, patch) {
    const installation = await this.installations.update(id, patch);
    this.emit("dataChanged");
    return installation;
  }
  async setActiveInstallation(id) {
    const settings = this.settings.get();
    const recent = [id, ...settings.recentInstallations.filter((entry) => entry !== id)].slice(0, 6);
    await this.settings.update({ lastInstallationId: id, recentInstallations: recent });
  }
  async duplicateInstallation(id, options) {
    const source = this.installations.get(id);
    if (!source) throw new AppError("installation-missing", "That installation no longer exists.");
    const copy = await this.installations.duplicate(source, options);
    this.emit("dataChanged");
    return copy;
  }
  /**
   * Removing an installation never silently deletes user data: the caller must
   * request deletion explicitly, and only launcher-owned folders can be trashed.
   */
  async removeInstallation(id, options) {
    const installation = this.installations.get(id);
    if (!installation) return;
    if (options.deleteFiles) {
      const owned = isInside(this.paths.installationsDir, installation.gameDir);
      if (!owned) {
        throw new AppError(
          "unsafe-delete",
          "This installation uses a custom folder outside Mist Launcher’s data directory, so its files were not deleted.",
          { hint: "The entry can still be removed without deleting files. Delete the folder yourself if you are sure." }
        );
      }
      if (options.moveToTrash) await trashPath(installation.gameDir);
      else await node_fs.promises.rm(installation.gameDir, { recursive: true, force: true });
    }
    await this.installations.remove(id);
    const settings = this.settings.get();
    if (settings.lastInstallationId === id) {
      const next = this.installations.list()[0]?.id ?? null;
      await this.settings.update({ lastInstallationId: next, recentInstallations: settings.recentInstallations.filter((entry) => entry !== id) });
    }
    this.emit("dataChanged");
  }
  async userFileCount(id) {
    const installation = this.installations.get(id);
    if (!installation) throw new AppError("installation-missing", "That installation no longer exists.");
    const count = async (folder) => (await node_fs.promises.readdir(path.join(installation.gameDir, folder)).catch(() => [])).length;
    const worlds = (await node_fs.promises.readdir(path.join(installation.gameDir, "saves"), { withFileTypes: true }).catch(() => [])).filter((entry) => entry.isDirectory()).length;
    const known = /* @__PURE__ */ new Set(["mods", "saves", "resourcepacks", "shaderpacks", "logs", "crash-reports", "config", "screenshots", ".mist", ".sacrify", "options.txt"]);
    const top = await node_fs.promises.readdir(installation.gameDir, { withFileTypes: true }).catch(() => []);
    return {
      mods: await count("mods"),
      worlds,
      resourcePacks: await count("resourcepacks"),
      shaders: await count("shaderpacks"),
      other: top.filter((entry) => !known.has(entry.name)).length
    };
  }
  async exportInstallation(id) {
    const profile = this.installations.exportProfile(id);
    const result = await electron.dialog.showSaveDialog({
      title: "Export installation profile",
      defaultPath: `${safeFileName(profile.name)}.mist-installation.json`,
      filters: [{ name: "Mist Launcher installation profile", extensions: ["json"] }]
    });
    if (result.canceled || !result.filePath) return null;
    await writeJsonAtomic(result.filePath, profile);
    return { path: result.filePath };
  }
  async importInstallation() {
    const result = await electron.dialog.showOpenDialog({
      title: "Import installation profile",
      properties: ["openFile"],
      filters: [{ name: "Mist Launcher installation profile", extensions: ["json"] }]
    });
    const file = result.filePaths[0];
    if (!file) return null;
    let data;
    try {
      data = JSON.parse(await node_fs.promises.readFile(file, "utf8"));
    } catch {
      throw new AppError("import-invalid", "That profile could not be read as JSON.");
    }
    const installation = await this.installations.importProfile(data);
    this.emit("dataChanged");
    return installation;
  }
  async checkInstallationUpdate(id) {
    const installation = this.installations.get(id);
    if (!installation) throw new AppError("installation-missing", "That installation no longer exists.");
    if (installation.modpack?.projectId) {
      const provider = installation.modpack.source === "modrinth" ? this.modrinth : this.curseforge;
      if (!provider.isConfigured()) {
        return { updateAvailable: null, latest: null, reason: "The content provider is not configured." };
      }
      const versions = await provider.versions({
        source: installation.modpack.source,
        projectId: installation.modpack.projectId,
        projectType: "modpack"
      });
      const latest = versions.find((version) => version.releaseType === "release") ?? versions[0];
      if (!latest) return { updateAvailable: null, latest: null, reason: "No versions are published for this pack." };
      const available = latest.id !== installation.modpack.versionId ? latest.versionNumber : null;
      await this.installations.setUpdateAvailable(id, available);
      return {
        updateAvailable: available,
        latest: latest.versionNumber,
        reason: available ? null : "This modpack is up to date."
      };
    }
    if (installation.loader.type === "vanilla") {
      const manifest = await this.meta.manifest();
      const latest = manifest.latest.release;
      const available = cmpVersion(latest, installation.gameVersion) > 0 ? latest : null;
      await this.installations.setUpdateAvailable(id, available);
      return { updateAvailable: available, latest, reason: available ? null : "This is the latest release." };
    }
    return { updateAvailable: null, latest: null, reason: "Loader installations are updated by installing a newer loader build." };
  }
  async ensureInstallationFiles(id) {
    const installation = this.installations.get(id);
    if (!installation) throw new AppError("installation-missing", "That installation no longer exists.");
    const profileId = installation.loader.profileId || installation.gameVersion;
    const job = this.downloads.create({
      kind: "game",
      title: `Repairing ${installation.name}`,
      subtitle: `Minecraft ${installation.gameVersion}`,
      source: "Mojang · piston-meta.mojang.com",
      installationId: installation.id
    });
    job.start();
    job.setRetry(() => {
      void this.ensureInstallationFiles(id).catch(() => void 0);
    });
    try {
      await this.installer.ensure(profileId, { job, force: true });
      job.complete("Files verified");
      this.emit("dataChanged");
      return { jobId: job.id };
    } catch (error) {
      job.fail(error);
      throw error;
    }
  }
  async setIconFromFile(id) {
    const installation = this.installations.get(id);
    if (!installation) throw new AppError("installation-missing", "That installation no longer exists.");
    const result = await electron.dialog.showOpenDialog({
      title: "Choose an icon image",
      properties: ["openFile"],
      filters: [{ name: "Images", extensions: ["png", "jpg", "jpeg", "webp"] }]
    });
    const file = result.filePaths[0];
    if (!file) return installation;
    const stat = await node_fs.promises.stat(file);
    if (stat.size > 5 * 1024 * 1024) throw new AppError("icon-too-large", "Choose an image smaller than 5 MB.");
    const extension = path.extname(file).toLowerCase();
    const target = path.join(this.paths.configDir, "icons", `${id}${extension}`);
    await ensureDir(path.dirname(target));
    await node_fs.promises.copyFile(file, target);
    const updated = await this.installations.setIcon(id, `custom:${path.basename(target)}`);
    this.emit("dataChanged");
    return updated;
  }
  async iconData(id) {
    const installation = this.installations.get(id);
    if (!installation?.icon.startsWith("custom:")) return null;
    const file = path.join(this.paths.configDir, "icons", path.basename(installation.icon.slice("custom:".length)));
    try {
      const data = await node_fs.promises.readFile(file);
      const extension = path.extname(file).toLowerCase();
      const mime = extension === ".png" ? "image/png" : extension === ".webp" ? "image/webp" : "image/jpeg";
      return `data:${mime};base64,${data.toString("base64")}`;
    } catch {
      return null;
    }
  }
  async installVersion(versionId, options = {}) {
    const job = this.downloads.create({
      kind: "game",
      title: `Installing Minecraft ${versionId}`,
      subtitle: "Official Mojang files",
      source: "Mojang · piston-meta.mojang.com"
    });
    job.start();
    job.setRetry(() => {
      void this.installVersion(versionId, options).catch(() => void 0);
    });
    try {
      await this.installer.ensure(versionId, { job });
      let installationId = null;
      const existing = this.installations.list().find((installation) => installation.loader.type === "vanilla" && installation.loader.profileId === versionId);
      if (existing) {
        installationId = existing.id;
      } else if (options.createInstallation !== false) {
        const installation = await this.installations.create(
          {
            name: options.name?.trim() || `Minecraft ${versionId}`,
            gameVersion: versionId,
            loader: { type: "vanilla", profileId: versionId },
            icon: "grass"
          },
          { memoryMb: this.settings.get().defaultMemoryMb }
        );
        installationId = installation.id;
        await this.setActiveInstallation(installation.id);
      }
      job.complete("Ready to play");
      this.emit("dataChanged");
      return { jobId: job.id, installationId };
    } catch (error) {
      job.fail(error);
      throw error;
    }
  }
  async play(installationId, server) {
    let auth;
    try {
      auth = await this.auth.getLaunchAuth();
    } catch (error) {
      return {
        ok: false,
        installationId,
        plan: null,
        error: error instanceof Error ? error.message : String(error),
        pid: null
      };
    }
    if (server) {
      const address = server.address.trim().toLowerCase();
      if (address.length > 253 || !/^[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/i.test(address) || address.includes("..")) {
        return { ok: false, installationId, plan: null, error: "The selected server address is invalid.", pid: null };
      }
      if (!Number.isInteger(server.port) || server.port < 1 || server.port > 65535) {
        return { ok: false, installationId, plan: null, error: "The selected server port is invalid.", pid: null };
      }
      server = { name: server.name.replace(/[\u0000-\u001f]/g, " ").trim().slice(0, 100) || address, address, port: server.port };
    }
    const result = await this.launcher.play(installationId, {
      accessToken: auth.accessToken,
      uuid: auth.uuid,
      name: auth.name,
      xuid: auth.xuid,
      clientId: auth.clientId,
      userType: auth.userType
    }, server);
    if (result.ok) await this.setActiveInstallation(installationId);
    return result;
  }
  async plan(installationId) {
    let auth = null;
    try {
      auth = await this.auth.getLaunchAuth();
    } catch {
      auth = null;
    }
    return this.launcher.plan(
      installationId,
      auth ? { accessToken: auth.accessToken, uuid: auth.uuid, name: auth.name, xuid: auth.xuid, clientId: auth.clientId, userType: auth.userType } : null
    );
  }
  async openInstallationFolder(id) {
    const installation = this.installations.get(id);
    if (!installation) throw new AppError("installation-missing", "That installation no longer exists.");
    await ensureDir(installation.gameDir);
    const error = await electron.shell.openPath(installation.gameDir);
    if (error) throw new AppError("open-folder", "Could not open the installation folder.", { detail: error });
  }
  async openScreenshotsFolder(id) {
    const installation = this.installations.get(id);
    if (!installation) throw new AppError("installation-missing", "That installation no longer exists.");
    const screenshotsDir = path.join(installation.gameDir, "screenshots");
    await ensureDir(screenshotsDir);
    const error = await electron.shell.openPath(screenshotsDir);
    if (error) throw new AppError("open-folder", "Could not open the screenshots folder.", { detail: error });
  }
  async pickFile(options = {}) {
    const result = await electron.dialog.showOpenDialog({
      title: options.title,
      properties: options.multi ? ["openFile", "multiSelections"] : ["openFile"],
      filters: options.filters?.length ? options.filters : [{ name: "All files", extensions: ["*"] }]
    });
    const out = [];
    for (const file of result.filePaths) {
      const stat = await node_fs.promises.stat(file).catch(() => null);
      out.push({ path: file, name: path.basename(file), size: stat?.size ?? 0, isDirectory: stat?.isDirectory() ?? false });
    }
    return out;
  }
  async pickFolder(title) {
    const result = await electron.dialog.showOpenDialog({ title, properties: ["openDirectory", "createDirectory"] });
    const folder = result.filePaths[0];
    if (!folder) return null;
    return { path: folder, name: path.basename(folder), size: 0, isDirectory: true };
  }
  async copyText(text2) {
    electron.clipboard.writeText(text2);
  }
  async openExternal(url) {
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return false;
      await electron.shell.openExternal(parsed.toString());
      return true;
    } catch {
      return false;
    }
  }
  async openPath(target) {
    const error = await electron.shell.openPath(target);
    if (error) throw new AppError("open-path", `Could not open ${target}.`, { detail: error });
  }
  async showInFolder(target) {
    electron.shell.showItemInFolder(target);
  }
  async pickJava() {
    return this.java.pickCustom();
  }
  async importWorld(installationId) {
    return this.worlds.importFolder(installationId);
  }
  async installModpack(input) {
    const result = await this.modpacks.install(input);
    this.emit("dataChanged");
    return result;
  }
}
function safeFileName(value) {
  return value.replace(/[<>:"/\\|?*\u0000-\u001f]/g, "_").slice(0, 80) || "profile";
}
function str(value, field = "value") {
  if (typeof value !== "string" || value.length === 0) throw new AppError("invalid-argument", `Expected a non-empty string for ${field}.`);
  return value;
}
function optionalString(value) {
  return typeof value === "string" && value.length > 0 ? value : null;
}
function num(value) {
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) throw new AppError("invalid-argument", "Expected a number.");
  return parsed;
}
function trustedSender(event) {
  const url = event.senderFrame?.url ?? "";
  if (url.startsWith("file://")) return true;
  try {
    const parsed = new URL(url);
    return (parsed.hostname === "127.0.0.1" || parsed.hostname === "localhost") && (parsed.protocol === "http:" || parsed.protocol === "https:");
  } catch {
    return false;
  }
}
function buildHandlers(services2) {
  const windowOf = (event) => electron.BrowserWindow.fromWebContents(event.sender);
  const installationDir = async (id) => {
    const installation = services2.installations.get(id);
    if (!installation) throw new AppError("installation-missing", "That installation no longer exists.");
    return installation.gameDir;
  };
  const openFolder = async (target) => {
    await ensureDir(target);
    await services2.openPath(target);
  };
  return {
    /* ---------------------------------------------------------------- app */
    "app.info": async () => services2.info(),
    "app.openExternal": async (_event, args) => services2.openExternal(str(args[0], "url")),
    "app.openPath": async (_event, args) => services2.openPath(str(args[0], "path")),
    "app.openScreenshotsFolder": async (_event, args) => services2.openScreenshotsFolder(str(args[0], "installationId")),
    "app.showInFolder": async (_event, args) => services2.showInFolder(str(args[0], "path")),
    "app.pickFile": async (_event, args) => services2.pickFile(args[0] ?? {}),
    "app.pickFolder": async (_event, args) => services2.pickFolder(optionalString(args[0]) ?? void 0),
    "app.copyToClipboard": async (_event, args) => services2.copyText(str(args[0], "text")),
    "app.minimize": async (event) => {
      windowOf(event)?.minimize();
    },
    "app.toggleMaximize": async (event) => {
      const window = windowOf(event);
      if (!window) return false;
      if (window.isMaximized()) {
        window.unmaximize();
        return false;
      }
      window.maximize();
      return true;
    },
    "app.close": async (event) => {
      windowOf(event)?.close();
    },
    "app.isMaximized": async (event) => windowOf(event)?.isMaximized() ?? false,
    "app.quit": async () => {
      electron.app.quit();
    },
    /* ----------------------------------------------------------- settings */
    "settings.get": async () => services2.settings.get(),
    "settings.update": async (_event, args) => services2.updateSettings(args[0] ?? {}),
    "settings.reset": async () => services2.resetSettings(),
    "settings.chooseGameRoot": async () => services2.chooseGameRoot(),
    "settings.detectJava": async () => services2.java.detect(true),
    "settings.secretStatus": async () => services2.secretStatus(),
    "settings.setSecret": async (_event, args) => {
      const key = str(args[0], "key");
      if (key !== "curseforge" && key !== "microsoftClientId") throw new AppError("invalid-argument", "Unknown secret key.");
      await services2.setSecret(key, optionalString(args[1]));
    },
    /* ----------------------------------------------------------- accounts */
    "accounts.list": async () => services2.auth.list(),
    "accounts.current": async () => services2.auth.current(),
    "accounts.authStatus": async () => services2.auth.status(),
    "accounts.addOffline": async (_event, args) => services2.auth.addOffline(str(args[0], "username")),
    "accounts.beginDeviceCode": async () => services2.auth.beginDeviceCode(),
    "accounts.pollDeviceCode": async (_event, args) => services2.auth.pollDeviceCode(str(args[0], "flowId")),
    "accounts.cancelFlow": async (_event, args) => services2.auth.cancelFlow(str(args[0], "flowId")),
    "accounts.select": async (_event, args) => services2.auth.select(str(args[0], "uuid")),
    "accounts.remove": async (_event, args) => services2.auth.remove(str(args[0], "uuid")),
    "accounts.refresh": async (_event, args) => services2.auth.refresh(str(args[0], "uuid")),
    /* ----------------------------------------------------------- versions */
    "versions.list": async (_event, args) => services2.meta.list(Boolean(args[0])),
    "versions.detail": async (_event, args) => services2.meta.detail(str(args[0], "id")),
    "versions.install": async (_event, args) => {
      const id = str(args[0], "id");
      const options = args[1] ?? {};
      return services2.installVersion(id, options);
    },
    "versions.cancel": async (_event, args) => services2.downloads.cancel(str(args[0], "jobId")),
    "versions.status": async (_event, args) => services2.installer.status(str(args[0], "id")),
    "versions.openFolder": async (_event, args) => {
      const id = optionalString(args[0]);
      const target = id ? services2.paths.versionDir(id) : path.join(services2.paths.gameRoot(), "versions");
      await openFolder(target);
    },
    /* ------------------------------------------------------ installations */
    "installations.list": async () => services2.listInstallations(),
    "installations.get": async (_event, args) => {
      const installation = services2.installations.get(str(args[0], "id"));
      if (!installation) throw new AppError("installation-missing", "That installation no longer exists.");
      return installation;
    },
    "installations.create": async (_event, args) => services2.createInstallation(args[0]),
    "installations.update": async (_event, args) => services2.updateInstallation(str(args[0], "id"), args[1]),
    "installations.remove": async (_event, args) => services2.removeInstallation(str(args[0], "id"), args[1]),
    "installations.duplicate": async (_event, args) => services2.duplicateInstallation(str(args[0], "id"), args[1]),
    "installations.setActive": async (_event, args) => services2.setActiveInstallation(str(args[0], "id")),
    "installations.openFolder": async (_event, args) => services2.openInstallationFolder(str(args[0], "id")),
    "installations.exportToFile": async (_event, args) => services2.exportInstallation(str(args[0], "id")),
    "installations.importFromFile": async () => services2.importInstallation(),
    "installations.worldCount": async (_event, args) => {
      const dir = await installationDir(str(args[0], "id"));
      const entries = await node_fs.promises.readdir(path.join(dir, "saves"), { withFileTypes: true }).catch(() => []);
      return entries.filter((entry) => entry.isDirectory()).length;
    },
    "installations.userFileCount": async (_event, args) => services2.userFileCount(str(args[0], "id")),
    "installations.checkUpdate": async (_event, args) => services2.checkInstallationUpdate(str(args[0], "id")),
    "installations.ensureFiles": async (_event, args) => services2.ensureInstallationFiles(str(args[0], "id")),
    "installations.setIcon": async (_event, args) => services2.setIconFromFile(str(args[0], "id")),
    "installations.iconData": async (_event, args) => services2.iconData(str(args[0], "id")),
    "installations.scan": async () => services2.listInstallations(),
    "installations.listDirectory": async (_event, args) => {
      const id = str(args[0], "installationId"), root = await installationDir(id);
      const relative = args[1] == null ? "" : String(args[1]);
      if (relative.length > 1e3 || relative.includes("\0") || path.isAbsolute(relative) || /^[a-zA-Z]:/.test(relative) || relative.startsWith("\\\\")) throw new AppError("file-path-invalid", "That path is not inside this installation.");
      const parts = relative.replace(/\\/g, "/").split("/").filter(Boolean);
      if (parts.some((part) => part === "." || part === "..")) throw new AppError("file-path-invalid", "That path is not inside this installation.");
      const target = parts.length ? resolveInside(root, ...parts) : path.resolve(root);
      const [realRoot, realTarget] = await Promise.all([node_fs.promises.realpath(root), node_fs.promises.realpath(target)]);
      if (!isInside(realRoot, realTarget)) throw new AppError("file-path-invalid", "That path is not inside this installation.");
      if (!(await node_fs.promises.stat(realTarget)).isDirectory()) throw new AppError("file-not-directory", "This item is not a folder.");
      const entries = await node_fs.promises.readdir(realTarget, { withFileTypes: true }), output = [];
      for (const entry of entries.slice(0, 500)) {
        if (entry.isSymbolicLink()) continue;
        const child = path.join(realTarget, entry.name), childStat = await node_fs.promises.lstat(child).catch(() => null);
        if (!childStat || childStat.isSymbolicLink()) continue;
        output.push({ name: entry.name, relativePath: [...parts, entry.name].join("/"), kind: childStat.isDirectory() ? "directory" : "file", size: childStat.isFile() ? childStat.size : null, modifiedAt: childStat.mtime.toISOString() });
      }
      output.sort((a,b) => a.kind === b.kind ? a.name.localeCompare(b.name, undefined, {sensitivity:"base"}) : a.kind === "directory" ? -1 : 1);
      return { path: parts.join("/"), parentPath: parts.slice(0,-1).join("/"), entries: output };
    },
    "installations.openEntry": async (_event, args) => {
      const id = str(args[0], "installationId"), root = await installationDir(id), relative = String(args[1] ?? "");
      if (!relative || relative.length > 1e3 || relative.includes("\0") || path.isAbsolute(relative) || /^[a-zA-Z]:/.test(relative)) throw new AppError("file-path-invalid", "That file is not inside this installation.");
      const parts = relative.replace(/\\/g, "/").split("/").filter(Boolean);
      if (parts.some((part) => part === "." || part === "..")) throw new AppError("file-path-invalid", "That file is not inside this installation.");
      const target = resolveInside(root, ...parts), [realRoot, realTarget] = await Promise.all([node_fs.promises.realpath(root), node_fs.promises.realpath(target)]);
      if (!isInside(realRoot, realTarget)) throw new AppError("file-path-invalid", "That file is not inside this installation.");
      if ((await node_fs.promises.stat(realTarget)).isDirectory()) throw new AppError("file-is-directory", "Open folders from the file list.");
      const error = await electron.shell.openPath(realTarget);
      if (error) throw new AppError("file-open-failed", error);
      return true;
    },
    /* ------------------------------------------------------------- loaders */
    "loaders.available": async (_event, args) => services2.loaders.available(str(args[0], "gameVersion")),
    "loaders.install": async (_event, args) => {
      const result = await services2.loaders.install(str(args[0], "installationId"), args[1]);
      services2.emit("dataChanged");
      services2.toast("success", "Mod loader installed", "The installation is ready for compatible mods.");
      return result;
    },
    "loaders.remove": async (_event, args) => {
      await services2.loaders.remove(str(args[0], "installationId"));
      services2.emit("dataChanged");
    },
    /* ---------------------------------------------------------------- java */
    "java.detect": async () => services2.java.detect(true),
    "java.status": async (_event, args) => {
      const installation = services2.installations.get(str(args[0], "installationId"));
      if (!installation) throw new AppError("installation-missing", "That installation no longer exists.");
      const resolved = await services2.meta.resolve(installation.loader.profileId || installation.gameVersion);
      return services2.java.status(resolved.javaMajor, installation.javaPath || services2.settings.get().javaPath);
    },
    "java.installRuntime": async (_event, args) => services2.java.installRuntime(str(args[0], "component"), `Installing Java runtime ${str(args[0], "component")}`),
    "java.pick": async () => services2.pickJava(),
    /* -------------------------------------------------------------- launch */
    "launch.play": async (_event, args) => services2.play(str(args[0], "installationId"), args[1]),
    "launch.plan": async (_event, args) => services2.plan(str(args[0], "installationId")),
    "launch.kill": async (_event, args) => services2.launcher.kill(str(args[0], "installationId")),
    "launch.running": async () => services2.launcher.states(),
    "launch.state": async (_event, args) => services2.launcher.state(str(args[0], "installationId")),
    "launch.openGameDir": async (_event, args) => services2.openInstallationFolder(str(args[0], "installationId")),
    /* ------------------------------------------------------------- catalog */
    "catalog.search": async (_event, args) => services2.content.search(args[0]),
    "catalog.project": async (_event, args) => services2.content.project(str(args[0]), str(args[1], "projectId")),
    "catalog.versions": async (_event, args) => services2.content.versions(args[0]),
    "catalog.install": async (_event, args) => services2.content.install(args[0]),
    "catalog.categories": async (_event, args) => services2.content.categories(str(args[0]), str(args[1])),
    /* ---------------------------------------------------------------- mods */
    "mods.list": async (_event, args) => services2.content.listMods(str(args[0], "installationId")),
    "mods.setEnabled": async (_event, args) => services2.content.setModEnabled(str(args[0], "installationId"), str(args[1], "filename"), Boolean(args[2])),
    "mods.remove": async (_event, args) => services2.content.removeMod(str(args[0], "installationId"), str(args[1], "filename")),
    "mods.checkUpdates": async (_event, args) => services2.content.checkModUpdates(str(args[0], "installationId")),
    "mods.update": async (_event, args) => {
      await services2.content.updateMod(str(args[0], "installationId"), str(args[1], "filename"));
      services2.emit("dataChanged");
    },
    "mods.openFolder": async (_event, args) => openFolder(path.join(await installationDir(str(args[0], "installationId")), "mods")),
    "mods.installLocal": async (_event, args) => {
      const installationId = str(args[0], "installationId");
      const picked = await services2.pickFile({
        title: "Add mod file",
        filters: [{ name: "Mod files", extensions: ["jar", "zip"] }],
        multi: true
      });
      const installed = [];
      const warnings = [];
      for (const file of picked) {
        const result = await services2.content.installLocalMod(installationId, file.path);
        installed.push(...result.installed);
        warnings.push(...result.warnings);
      }
      services2.emit("dataChanged");
      return { installed, skipped: [], warnings };
    },
    /* ------------------------------------------------------------ modpacks */
    "modpacks.install": async (_event, args) => services2.installModpack(args[0]),
    "modpacks.update": async (_event, args) => {
      const result = await services2.modpacks.update(str(args[0], "installationId"));
      services2.emit("dataChanged");
      return result;
    },
    "modpacks.exportToFile": async (_event, args) => services2.modpacks.exportToFile(str(args[0], "installationId")),
    "modpacks.importFromFile": async () => {
      const result = await services2.modpacks.importFromFile();
      services2.emit("dataChanged");
      return result;
    },
    /* ------------------------------------------------------ resource packs */
    "resourcepacks.list": async (_event, args) => services2.content.listResourcePacks(str(args[0], "installationId")),
    "resourcepacks.setEnabled": async (_event, args) => services2.content.setResourcePackEnabled(str(args[0], "installationId"), str(args[1], "filename"), Boolean(args[2])),
    "resourcepacks.reorder": async (_event, args) => services2.content.reorderResourcePacks(str(args[0], "installationId"), args[1]),
    "resourcepacks.remove": async (_event, args) => services2.content.removeResourcePack(str(args[0], "installationId"), str(args[1], "filename")),
    "resourcepacks.installLocal": async (_event, args) => {
      const installationId = str(args[0], "installationId");
      const picked = await services2.pickFile({
        title: "Add resource packs",
        filters: [{ name: "Resource packs", extensions: ["zip"] }],
        multi: true
      });
      const installed = [];
      for (const file of picked) {
        const result = await services2.content.installLocalResourcePack(installationId, file.path);
        installed.push(...result.installed);
      }
      services2.emit("dataChanged");
      return { installed, skipped: [], warnings: [] };
    },
    "resourcepacks.openFolder": async (_event, args) => openFolder(path.join(await installationDir(str(args[0], "installationId")), "resourcepacks")),
    /* -------------------------------------------------------------- shaders */
    "shaders.list": async (_event, args) => services2.content.listShaders(str(args[0], "installationId")),
    "shaders.setEnabled": async (_event, args) => services2.content.setShaderEnabled(str(args[0], "installationId"), str(args[1], "filename"), Boolean(args[2])),
    "shaders.remove": async (_event, args) => services2.content.removeShader(str(args[0], "installationId"), str(args[1], "filename")),
    "shaders.installLocal": async (_event, args) => {
      const installationId = str(args[0], "installationId");
      const picked = await services2.pickFile({
        title: "Add shader pack",
        filters: [{ name: "Shader packs", extensions: ["zip"] }],
        multi: true
      });
      const installed = [];
      for (const file of picked) {
        const result = await services2.content.installLocalShader(installationId, file.path);
        installed.push(...result.installed);
      }
      services2.emit("dataChanged");
      return { installed, skipped: [], warnings: ["Shaders are selected in-game through Iris or OptiFine."] };
    },
    "shaders.openFolder": async (_event, args) => openFolder(path.join(await installationDir(str(args[0], "installationId")), "shaderpacks")),
    /* --------------------------------------------------------------- worlds */
    "worlds.list": async (_event, args) => services2.worlds.list(str(args[0], "installationId")),
    "worlds.openFolder": async (_event, args) => services2.worlds.openFolder(str(args[0], "installationId"), optionalString(args[1]) ?? void 0),
    "worlds.backup": async (_event, args) => services2.worlds.backup(str(args[0], "installationId"), str(args[1], "worldFolder"), optionalString(args[2]) ?? void 0),
    "worlds.delete": async (_event, args) => services2.worlds.delete(str(args[0], "installationId"), str(args[1], "worldFolder")),
    "worlds.importFolder": async (_event, args) => services2.importWorld(str(args[0], "installationId")),
    "worlds.datapacks": async (_event, args) => services2.content.listDatapacks(str(args[0], "installationId"), str(args[1], "worldFolder")),
    "worlds.setDatapackEnabled": async (_event, args) => services2.content.setDatapackEnabled(
      str(args[0], "installationId"),
      str(args[1], "worldFolder"),
      str(args[2], "filename"),
      Boolean(args[3])
    ),
    "worlds.removeDatapack": async (_event, args) => services2.content.removeDatapack(str(args[0], "installationId"), str(args[1], "worldFolder"), str(args[2], "filename")),
    "worlds.openDatapackFolder": async (_event, args) => {
      const gameDir = await installationDir(str(args[0], "installationId"));
      const world = str(args[1], "worldFolder");
      await openFolder(resolveInside(path.join(gameDir, "saves"), world, "datapacks"));
    },
    /* -------------------------------------------------------------- backups */
    "backups.list": async (_event, args) => services2.worlds.listBackups(optionalString(args[0]) ?? void 0),
    "backups.restore": async (_event, args) => {
      await services2.worlds.restore(str(args[0], "backupId"));
      services2.emit("dataChanged");
    },
    "backups.remove": async (_event, args) => services2.worlds.removeBackup(str(args[0], "backupId")),
    "backups.openFolder": async (_event, args) => services2.worlds.openBackupsFolder(optionalString(args[0]) ?? void 0),
    /* ----------------------------------------------------------------- jobs */
    "jobs.list": async () => services2.downloads.list(),
    "jobs.cancel": async (_event, args) => services2.downloads.cancel(str(args[0], "jobId")),
    "jobs.retry": async (_event, args) => services2.downloads.retry(str(args[0], "jobId")),
    "jobs.clearFinished": async () => services2.downloads.clearFinished(),
    /* ----------------------------------------------------------------- logs */
    "logs.launcher": async (_event, args) => services2.diagnostics.launcher(args[0] ? num(args[0]) : 500),
    "logs.files": async () => services2.diagnostics.files(),
    "logs.game": async (_event, args) => services2.diagnostics.game(str(args[0], "installationId"), args[1] ? num(args[1]) : 400),
    "logs.crash": async (_event, args) => services2.diagnostics.crash(str(args[0], "path")),
    "logs.diagnostics": async (_event, args) => services2.diagnostics.diagnostics(optionalString(args[0]) ?? void 0),
    /* ----------------------------------------------------------------- news */
    "news.list": async () => services2.news.list(),
    "servers.list": async (_event, args) => {
      const query = args[0] ?? {};
      const filter = query.filter === "cracked" || query.filter === "premium" ? query.filter : "all";
      const sort = query.sort === "popular" ? "popular" : "recommended";
      const page = Number.isFinite(query.page) ? Math.max(1, Math.min(1e3, Math.floor(query.page))) : 1;
      return services2.servers.list({ search: typeof query.search === "string" ? query.search.slice(0, 100) : "", filter, sort, page });
    },
    "worldChat.latest": async () => services2.worldChat.latest(),
    "worldChat.feed": async (_event, args) => services2.worldChat.feed(
      str(args[0], "channel"),
      args[1] == null ? 0 : num(args[1]),
      args[2] == null ? 0 : num(args[2])
    ),
    "worldChat.send": async (_event, args) => services2.worldChat.send(
      services2.auth.current(),
      str(args[0], "channel"),
      str(args[1], "message"),
      args[2] == null ? null : num(args[2])
    ),
    "worldChat.react": async (_event, args) => services2.worldChat.react(services2.auth.current(), str(args[0], "channel"), num(args[1]), str(args[2], "reaction")),
    "worldChat.report": async (_event, args) => services2.worldChat.report(services2.auth.current(), num(args[0]), str(args[1], "reason")),
    "worldChat.uploads": async (_event, args) => services2.worldChat.uploads(str(args[0], "channel")),
    "worldChat.upload": async (_event, args) => services2.worldChat.upload(services2.auth.current(), str(args[0], "channel"), str(args[1], "file path")),
    "skins.browse": async (_event, args) => {
      const query = args[0] ?? {};
      const category = query.category;
      const arms = query.arms;
      const sort = query.sort;
      if (category != null && !["girls", "boys", "characters", "creatures"].includes(String(category))) throw new AppError("invalid-argument", "Invalid skin category.");
      if (arms != null && arms !== "classic" && arms !== "slim") throw new AppError("invalid-argument", "Skin arms must be classic or slim.");
      if (sort != null && !["new", "popular", "downloads"].includes(String(sort))) throw new AppError("invalid-argument", "Invalid skin sort order.");
      const page = query.page == null ? 1 : num(query.page);
      const text2 = typeof query.query === "string" ? query.query.slice(0, 80) : "";
      return services2.browseSkins({ query: text2, category, arms, sort, page });
    },
    "skins.texture": async (_event, args) => services2.skinTexture(str(args[0], "skin id")),
    "skins.applied": async (_event, args) => {
      const account = services2.auth.current();
      if (!account || account.kind !== "offline") return null;
      return services2.getAppliedOfflineSkin(str(args[0], "installationId"), account.name);
    },
    "skins.applyOffline": async (_event, args) => {
      const account = services2.auth.current();
      if (!account || account.kind !== "offline") throw new AppError("skin-offline-required", "Select an offline profile to apply a local skin.");
      const installationId = str(args[0], "installationId");
      const installation = services2.installations.get(installationId);
      if (!installation) throw new AppError("installation-missing", "Choose an installation before applying a skin.");
      return services2.applyOfflineSkin(installationId, account.name, str(args[1], "skin id"), str(args[2], "skin name").slice(0, 120));
    }
  };
}
function registerIpc(services2) {
  const handlers = buildHandlers(services2);
  electron.ipcMain.handle(INVOKE_CHANNEL, async (event, method, args) => {
    if (!trustedSender(event)) {
      return { ok: false, error: { message: "Blocked IPC call from an untrusted frame.", code: "forbidden", hint: null } };
    }
    if (typeof method !== "string") {
      return { ok: false, error: { message: "Invalid IPC call.", code: "invalid-argument", hint: null } };
    }
    const handler = handlers[method];
    if (!handler) {
      return { ok: false, error: { message: `Unknown launcher action: ${method}`, code: "unknown-action", hint: null } };
    }
    try {
      const value = await handler(event, Array.isArray(args) ? args : []);
      return { ok: true, value };
    } catch (error) {
      if (error instanceof AppError) {
        services2.logger.warn("ipc", `${method} failed: ${error.message}`);
        return { ok: false, error: { message: error.message, code: error.code, hint: error.hint } };
      }
      const message = error instanceof Error ? error.message : String(error);
      services2.logger.error("ipc", `${method} threw unexpectedly: ${message}`, {
        stack: error instanceof Error ? error.stack?.split("\n").slice(0, 4).join(" | ") : void 0
      });
      return { ok: false, error: { message, code: "internal", hint: "Open Help & Logs to copy diagnostics." } };
    }
  });
}
const SHOTS = [
  { name: "01-home-dark", route: "/home" },
  { name: "02-installations", route: "/installations" },
  { name: "03-versions", route: "/versions", waitMs: 1200 },
  { name: "04-modpacks", route: "/modpacks", waitMs: 1600 },
  { name: "05-mods", route: "/mods", waitMs: 1200 },
  { name: "06-resourcepacks", route: "/resourcepacks" },
  { name: "07-shaders", route: "/shaders" },
  { name: "08-worlds", route: "/worlds" },
  { name: "09-accounts", route: "/accounts" },
  { name: "10-settings", route: "/settings" },
  { name: "11-help", route: "/help" },
  { name: "12-home-light", route: "/home", setup: "window.__mistSetTheme && window.__mistSetTheme('light')" },
  { name: "13-home-reviews", route: "/home", setup: "(async()=>{for(let i=0;i<30&&!document.querySelector('#mist-home-mod-review');i++)await new Promise(r=>setTimeout(r,100));document.querySelector('#mist-home-mod-review')?.scrollIntoView({block:'center'});return true})()", waitMs: 1200 },
  { name: "14-modpack-changelog", route: "/modpacks", setup: "(async()=>{for(let i=0;i<40&&!document.querySelector('.project-card');i++)await new Promise(r=>setTimeout(r,100));document.querySelector('.project-card')?.click();for(let i=0;i<40&&!document.querySelector('.project-detail');i++)await new Promise(r=>setTimeout(r,100));for(let i=0;i<30&&!document.querySelector('[data-project-tab=changelog]');i++)await new Promise(r=>setTimeout(r,100));document.querySelector('[data-project-tab=changelog]')?.click();return true})()", waitMs: 1400 },
  { name: "15-modpack-versions", route: "/modpacks", setup: "(async()=>{for(let i=0;i<40&&!document.querySelector('.project-card');i++)await new Promise(r=>setTimeout(r,100));document.querySelector('.project-card')?.click();for(let i=0;i<40&&!document.querySelector('.project-detail');i++)await new Promise(r=>setTimeout(r,100));for(let i=0;i<30&&!document.querySelector('[data-project-tab=versions]');i++)await new Promise(r=>setTimeout(r,100));document.querySelector('[data-project-tab=versions]')?.click();return true})()", waitMs: 1400 },
  { name: "16-modpack-scroll-check", route: "/modpacks", setup: "(async()=>{for(let i=0;i<40&&!document.querySelector('.project-card');i++)await new Promise(r=>setTimeout(r,100));document.querySelector('.project-card')?.click();for(let i=0;i<40&&!document.querySelector('.project-detail');i++)await new Promise(r=>setTimeout(r,100));document.querySelector('[data-project-tab=overview]')?.click();const body=document.querySelector('.project-detail')?.closest('.modal-body');if(body)body.scrollTop=500;return true})()", waitMs: 900 }
];
async function runScreenshotHarness(window, directory) {
  await node_fs.promises.mkdir(directory, { recursive: true });
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await wait(2500);
  for (const shot of SHOTS) {
    try {
      await window.webContents.executeJavaScript(`window.location.hash = '#${shot.route}'; true`);
      if (shot.setup) await window.webContents.executeJavaScript(`(async()=>{await (${shot.setup});return true})()`);
      if (shot.name === "01-home-dark") {
        await window.webContents.executeJavaScript(`(async()=>{for(let i=0;i<100;i++){const cards=document.querySelectorAll('.home-featured-pack');const loading=document.querySelector('.home-featured-pack-loading');if(cards.length||!loading)break;await new Promise(r=>setTimeout(r,150));}return true})()`);
      }
      await wait(shot.waitMs ?? 900);
      const state = await window.webContents.executeJavaScript(
        `(async () => {
          const settings = await window.mist.settings.get()
          return JSON.stringify({
            hash: location.hash,
            title: document.querySelector('.titlebar-title')?.textContent,
            sidebar: document.querySelector('.sidebar')?.className,
            collapsed: settings.sidebarCollapsed,
            innerWidth,
            fontScale: settings.fontScale,
            actions: [...document.querySelectorAll('.hero-actions > *')].map((el) => ({ text: el.textContent, x: el.getBoundingClientRect().x, y: el.getBoundingClientRect().y, width: el.getBoundingClientRect().width, height: el.getBoundingClientRect().height })),
            review: (() => { const el=document.querySelector('#mist-home-mod-review'); const rect=el?.getBoundingClientRect(); return el ? { hidden:el.hidden, top:Math.round(rect.top), height:Math.round(rect.height), videos:el.querySelectorAll('.mist-review-result').length, iframe:el.querySelector('iframe')?.src } : null })(),
            topDock: (() => { const el=document.querySelector('#mist-left-dock'); const rect=el?.getBoundingClientRect(); const style=el&&getComputedStyle(el); return el ? { hidden:el.hidden, display:style.display, position:style.position, x:Math.round(rect.x), y:Math.round(rect.y), width:Math.round(rect.width), height:Math.round(rect.height), children:el.children.length } : null })(),
            project: (() => { const el=document.querySelector('.project-detail'); if(!el)return null; const rect=(selector)=>{const node=el.querySelector(selector);const r=node?.getBoundingClientRect();return r?{x:Math.round(r.x),y:Math.round(r.y),width:Math.round(r.width),height:Math.round(r.height)}:null};return {scrollTop:Math.round(el.closest('.modal-body')?.scrollTop||0),tabs:[...el.querySelectorAll('.mist-project-tabs button')].map(b=>({name:b.dataset.projectTab,active:b.classList.contains('is-active')})),head:rect('.project-detail-head'),tabBar:rect('.mist-project-tabs'),info:rect('.mist-project-info'),install:rect('.install-box'),versions:rect('.mist-version-browser'),versionRows:el.querySelectorAll('.mist-version-row').length,enabledVersionInstalls:[...el.querySelectorAll('.mist-version-row button:not(:disabled)')].length,footerInstallDisabled:[...el.querySelectorAll('.modal-footer button')].find(b=>/install/i.test(b.textContent))?.disabled??null} })()
          })
        })()`
      );
      process.stdout.write(`state ${shot.name}: ${state}
`);
      const image = await window.webContents.capturePage();
      await node_fs.promises.writeFile(path.join(directory, `${shot.name}.png`), image.toPNG());
      process.stdout.write(`captured ${shot.name}
`);
    } catch (error) {
      process.stdout.write(`failed ${shot.name}: ${error instanceof Error ? error.message : String(error)}
`);
    }
  }
  window.close();
}
const isDev = !electron.app.isPackaged;
let mainWindow = null;
let youtubeIdentityConfigured = false;
let services = null;
if (MIST_DATA_DIR) {
  const dataDir = path.resolve(MIST_DATA_DIR);
  electron.app.setPath("userData", path.join(dataDir, ".shell"));
  electron.app.setPath("sessionData", path.join(dataDir, ".cache"));
}
if (MIST_SCREENSHOTS) {
  electron.app.disableHardwareAcceleration();
  electron.app.commandLine.appendSwitch("disable-gpu");
}
const gotLock = electron.app.requestSingleInstanceLock();
if (!gotLock) {
  electron.app.quit();
} else {
  electron.app.on("second-instance", () => {
    if (!mainWindow) {
      void createWindow();
      return;
    }
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
  });
}
function buildMenu() {
  if (process.platform !== "darwin") {
    electron.Menu.setApplicationMenu(null);
    return;
  }
  electron.Menu.setApplicationMenu(
    electron.Menu.buildFromTemplate([
      { role: "appMenu" },
      { role: "editMenu" },
      { role: "viewMenu" },
      { role: "windowMenu" }
    ])
  );
}
async function createWindow() {
  if (!services) {
    services = new Services();
    await services.init();
    registerIpc(services);
    services.setVisibilityHandler((installationId, behavior) => {
      if (behavior === "hide") mainWindow?.hide();
      if (behavior === "close") mainWindow?.close();
      if (behavior === "keep") mainWindow?.show();
      services?.logger.info("launcher", `Game ${installationId} started; launcher behavior: ${behavior}.`);
    });
  }
  if (!youtubeIdentityConfigured) {
    youtubeIdentityConfigured = true;
    electron.session.defaultSession.webRequest.onBeforeSendHeaders({
      urls: ["https://www.youtube.com/*", "https://*.youtube.com/*", "https://www.youtube-nocookie.com/*", "https://*.youtube-nocookie.com/*"]
    }, (details, callback) => {
      const requestHeaders = { ...details.requestHeaders };
      const currentReferer = requestHeaders.Referer ?? requestHeaders.referer ?? "";
      if (!currentReferer || /^file:/i.test(currentReferer)) requestHeaders.Referer = "http://localhost/";
      callback({ requestHeaders });
    });
  }
  mainWindow = new electron.BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1040,
    minHeight: 680,
    show: false,
    frame: false,
    backgroundColor: "#0b0d12",
    title: "Mist Launcher",
    icon: path.join(__dirname, "../../build/icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
      spellcheck: false
    }
  });
  mainWindow.on("ready-to-show", () => {
    mainWindow?.show();
  });
  mainWindow.on("maximize", () => mainWindow?.webContents.send(EVENTS_CHANNEL, { type: "windowState", payload: { maximized: true } }));
  mainWindow.on("unmaximize", () => mainWindow?.webContents.send(EVENTS_CHANNEL, { type: "windowState", payload: { maximized: false } }));
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https://") || url.startsWith("http://")) void electron.shell.openExternal(url);
    return { action: "deny" };
  });
  mainWindow.webContents.on("will-navigate", (event, url) => {
    const current = mainWindow?.webContents.getURL() ?? "";
    if (url !== current) event.preventDefault();
  });
  const rendererUrl = process.env.ELECTRON_RENDERER_URL;
  if (rendererUrl) {
    await mainWindow.loadURL(rendererUrl);
  } else {
    await mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
  if (MIST_SCREENSHOTS) {
    void runScreenshotHarness(mainWindow, path.resolve(MIST_SCREENSHOTS));
  }
}
electron.app.whenReady().then(async () => {
  if (MIST_VERIFY) {
    const { runVerification } = await Promise.resolve().then(() => require("./chunks/verify-Bkncm0pX.js"));
    await runVerification();
    return;
  }
  buildMenu();
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) void createWindow();
  });
  try {
    await createWindow();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const { dialog } = await import("electron");
    dialog.showErrorBox("Mist Launcher could not start", message);
    electron.app.quit();
  }
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") electron.app.quit();
});
electron.app.on("before-quit", () => {
  services?.logger.close();
});
process.on("uncaughtException", (error) => {
  services?.logger.error("launcher", `Uncaught exception: ${error.message}`, { stack: error.stack?.slice(0, 500) });
});
process.on("unhandledRejection", (reason) => {
  services?.logger.error("launcher", "Unhandled rejection", {
    reason: reason instanceof Error ? reason.message : String(reason)
  });
});
exports.AppError = AppError;
exports.Services = Services;
exports.isDev = isDev;
