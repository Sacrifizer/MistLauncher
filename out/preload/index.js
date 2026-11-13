"use strict";
const electron = require("electron");
const EVENTS_CHANNEL = "mist:event";
const INVOKE_CHANNEL = "mist:invoke";
async function call(method, ...args) {
  const envelope = await electron.ipcRenderer.invoke(INVOKE_CHANNEL, method, args);
  if (!envelope || typeof envelope !== "object") throw new Error("The launcher did not respond.");
  if (!envelope.ok) {
    const error = new Error(envelope.error.message);
    error.code = envelope.error.code;
    error.hint = envelope.error.hint;
    throw error;
  }
  return envelope.value;
}
const listeners = /* @__PURE__ */ new Map();
electron.ipcRenderer.on(EVENTS_CHANNEL, (_event, message) => {
  const set = listeners.get(message.type);
  if (!set) return;
  for (const listener of [...set]) {
    try {
      listener(message.payload);
    } catch {
    }
  }
});
function on(type, listener) {
  let set = listeners.get(type);
  if (!set) {
    set = /* @__PURE__ */ new Set();
    listeners.set(type, set);
  }
  const wrapped = listener;
  set.add(wrapped);
  return () => {
    set?.delete(wrapped);
  };
}
const events = {
  jobs: (listener) => on("jobs", listener),
  gameState: (listener) => on("gameState", listener),
  gameLog: (listener) => on("gameLog", listener),
  account: (listener) => on("account", listener),
  deviceCode: (listener) => on("deviceCode", listener),
  logsChanged: (listener) => on("logsChanged", listener),
  dataChanged: (listener) => on("dataChanged", listener),
  toast: (listener) => on("toast", listener),
  navigate: (listener) => on("navigate", listener)
};
const api = {
  app: {
    info: () => call("app.info"),
    openExternal: (url) => call("app.openExternal", url),
    openPath: (target) => call("app.openPath", target),
    openScreenshotsFolder: (installationId) => call("app.openScreenshotsFolder", installationId),
    showInFolder: (target) => call("app.showInFolder", target),
    pickFile: (options) => call("app.pickFile", options),
    pickFolder: (title) => call("app.pickFolder", title),
    copyToClipboard: (text) => call("app.copyToClipboard", text),
    minimize: () => call("app.minimize"),
    toggleMaximize: () => call("app.toggleMaximize"),
    close: () => call("app.close"),
    isMaximized: () => call("app.isMaximized"),
    quit: () => call("app.quit")
  },
  settings: {
    get: () => call("settings.get"),
    update: (patch) => call("settings.update", patch),
    reset: () => call("settings.reset"),
    chooseGameRoot: () => call("settings.chooseGameRoot"),
    detectJava: () => call("settings.detectJava"),
    secretStatus: () => call("settings.secretStatus"),
    setSecret: (key, value) => call("settings.setSecret", key, value)
  },
  accounts: {
    list: () => call("accounts.list"),
    current: () => call("accounts.current"),
    authStatus: () => call("accounts.authStatus"),
    addOffline: (username) => call("accounts.addOffline", username),
    beginDeviceCode: () => call("accounts.beginDeviceCode"),
    pollDeviceCode: (flowId) => call("accounts.pollDeviceCode", flowId),
    cancelFlow: (flowId) => call("accounts.cancelFlow", flowId),
    select: (uuid) => call("accounts.select", uuid),
    remove: (uuid) => call("accounts.remove", uuid),
    refresh: (uuid) => call("accounts.refresh", uuid)
  },
  versions: {
    list: (refresh) => call("versions.list", refresh),
    detail: (id) => call("versions.detail", id),
    install: (id, options) => call("versions.install", id, options),
    cancel: (jobId) => call("versions.cancel", jobId),
    status: (id) => call("versions.status", id),
    openFolder: (id) => call("versions.openFolder", id)
  },
  installations: {
    list: () => call("installations.list"),
    get: (id) => call("installations.get", id),
    create: (input) => call("installations.create", input),
    update: (id, patch) => call("installations.update", id, patch),
    remove: (id, options) => call("installations.remove", id, options),
    duplicate: (id, options) => call("installations.duplicate", id, options),
    setActive: (id) => call("installations.setActive", id),
    openFolder: (id) => call("installations.openFolder", id),
    exportToFile: (id) => call("installations.exportToFile", id),
    importFromFile: () => call("installations.importFromFile"),
    worldCount: (id) => call("installations.worldCount", id),
    userFileCount: (id) => call("installations.userFileCount", id),
    checkUpdate: (id) => call("installations.checkUpdate", id),
    ensureFiles: (id) => call("installations.ensureFiles", id),
    setIcon: (id) => call("installations.setIcon", id),
    iconData: (id) => call("installations.iconData", id),
    scan: () => call("installations.scan"),
    listDirectory: (id, relativePath = "") => call("installations.listDirectory", id, relativePath),
    openEntry: (id, relativePath) => call("installations.openEntry", id, relativePath)
  },
  loaders: {
    available: (gameVersion) => call("loaders.available", gameVersion),
    install: (installationId, loader) => call("loaders.install", installationId, loader),
    remove: (installationId) => call("loaders.remove", installationId)
  },
  java: {
    detect: () => call("java.detect"),
    status: (installationId) => call("java.status", installationId),
    installRuntime: (component) => call("java.installRuntime", component),
    pick: () => call("java.pick")
  },
  launch: {
    play: (installationId, server) => call("launch.play", installationId, server),
    plan: (installationId) => call("launch.plan", installationId),
    kill: (installationId) => call("launch.kill", installationId),
    running: () => call("launch.running"),
    state: (installationId) => call("launch.state", installationId),
    openGameDir: (installationId) => call("launch.openGameDir", installationId)
  },
  catalog: {
    search: (params) => call("catalog.search", params),
    project: (source, projectId) => call("catalog.project", source, projectId),
    versions: (args) => call("catalog.versions", args),
    install: (request) => call("catalog.install", request),
    categories: (source, projectType) => call("catalog.categories", source, projectType)
  },
  mods: {
    list: (installationId) => call("mods.list", installationId),
    setEnabled: (installationId, filename, enabled) => call("mods.setEnabled", installationId, filename, enabled),
    remove: (installationId, filename) => call("mods.remove", installationId, filename),
    checkUpdates: (installationId) => call("mods.checkUpdates", installationId),
    update: (installationId, filename) => call("mods.update", installationId, filename),
    openFolder: (installationId) => call("mods.openFolder", installationId),
    installLocal: (installationId) => call("mods.installLocal", installationId)
  },
  modpacks: {
    install: (input) => call("modpacks.install", input),
    update: (installationId) => call("modpacks.update", installationId),
    exportToFile: (installationId) => call("modpacks.exportToFile", installationId),
    importFromFile: () => call("modpacks.importFromFile")
  },
  resourcepacks: {
    list: (installationId) => call("resourcepacks.list", installationId),
    setEnabled: (installationId, filename, enabled) => call("resourcepacks.setEnabled", installationId, filename, enabled),
    reorder: (installationId, orderedFilenames) => call("resourcepacks.reorder", installationId, orderedFilenames),
    remove: (installationId, filename) => call("resourcepacks.remove", installationId, filename),
    installLocal: (installationId) => call("resourcepacks.installLocal", installationId),
    openFolder: (installationId) => call("resourcepacks.openFolder", installationId)
  },
  shaders: {
    list: (installationId) => call("shaders.list", installationId),
    setEnabled: (installationId, filename, enabled) => call("shaders.setEnabled", installationId, filename, enabled),
    remove: (installationId, filename) => call("shaders.remove", installationId, filename),
    installLocal: (installationId) => call("shaders.installLocal", installationId),
    openFolder: (installationId) => call("shaders.openFolder", installationId)
  },
  worlds: {
    list: (installationId) => call("worlds.list", installationId),
    openFolder: (installationId, worldFolder) => call("worlds.openFolder", installationId, worldFolder),
    backup: (installationId, worldFolder, label) => call("worlds.backup", installationId, worldFolder, label),
    delete: (installationId, worldFolder) => call("worlds.delete", installationId, worldFolder),
    importFolder: (installationId) => call("worlds.importFolder", installationId),
    datapacks: (installationId, worldFolder) => call("worlds.datapacks", installationId, worldFolder),
    setDatapackEnabled: (installationId, worldFolder, filename, enabled) => call("worlds.setDatapackEnabled", installationId, worldFolder, filename, enabled),
    removeDatapack: (installationId, worldFolder, filename) => call("worlds.removeDatapack", installationId, worldFolder, filename),
    openDatapackFolder: (installationId, worldFolder) => call("worlds.openDatapackFolder", installationId, worldFolder)
  },
  backups: {
    list: (installationId) => call("backups.list", installationId),
    restore: (backupId) => call("backups.restore", backupId),
    remove: (backupId) => call("backups.remove", backupId),
    openFolder: (backupId) => call("backups.openFolder", backupId)
  },
  jobs: {
    list: () => call("jobs.list"),
    cancel: (jobId) => call("jobs.cancel", jobId),
    retry: (jobId) => call("jobs.retry", jobId),
    clearFinished: () => call("jobs.clearFinished")
  },
  logs: {
    launcher: (limit) => call("logs.launcher", limit),
    files: () => call("logs.files"),
    game: (installationId, limit) => call("logs.game", installationId, limit),
    crash: (path) => call("logs.crash", path),
    diagnostics: (installationId) => call("logs.diagnostics", installationId)
  },
  news: {
    list: () => call("news.list")
  },
  servers: {
    list: (query) => call("servers.list", query)
  },
  worldChat: {
    feed: (channel, afterId, beforeId) => call("worldChat.feed", channel, afterId, beforeId),
    latest: () => call("worldChat.latest"),
    send: (channel, text, replyTo) => call("worldChat.send", channel, text, replyTo),
    react: (channel, messageId, emoji) => call("worldChat.react", channel, messageId, emoji),
    report: (messageId, reason) => call("worldChat.report", messageId, reason),
    uploads: (channel) => call("worldChat.uploads", channel),
    upload: (channel, filePath) => call("worldChat.upload", channel, filePath)
  },
  skins: {
    browse: (query) => call("skins.browse", query),
    texture: (skinId) => call("skins.texture", skinId),
    applied: (installationId) => call("skins.applied", installationId),
    applyOffline: (installationId, skinId, skinName) => call("skins.applyOffline", installationId, skinId, skinName)
  },
  events
};
electron.contextBridge.exposeInMainWorld("mist", api);

