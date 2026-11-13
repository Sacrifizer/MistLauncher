"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const electron = require("electron");
const index = require("../index.js");
require("node:path");
require("node:fs");
require("node:os");
require("fflate");
require("node:crypto");
require("node:stream");
require("node:stream/promises");
require("node:child_process");
require("node:util");
require("node:zlib");
require("node:fs/promises");
async function runVerification() {
  const versionId = process.env.MIST_VERIFY || process.env.SACRIFY_VERIFY || "26.3";
  const services = new index.Services();
  const report = { versionId, steps: [] };
  const steps = report.steps;
  const log = (message, data) => {
    process.stdout.write(`[verify] ${message}${data === void 0 ? "" : ` ${JSON.stringify(data)}`}
`);
  };
  try {
    await services.init();
    log("services ready", { dataDir: services.paths.dataDir, gameRoot: services.paths.gameRoot() });
    log("installing vanilla files");
    const installJob = services.downloads.create({
      kind: "game",
      title: `Verify install ${versionId}`,
      source: "Mojang"
    });
    installJob.start();
    const progress = setInterval(() => {
      const snapshot = installJob.snapshot();
      log("install progress", {
        phase: snapshot.phase,
        done: snapshot.doneBytes,
        total: snapshot.totalBytes,
        items: `${snapshot.itemsDone}/${snapshot.itemsTotal}`
      });
    }, 8e3);
    const started = Date.now();
    try {
      await services.installer.ensure(versionId, { job: installJob });
      installJob.complete("verified");
    } finally {
      clearInterval(progress);
    }
    const status = await services.installer.status(versionId);
    steps.push({ step: "vanilla-install", seconds: Math.round((Date.now() - started) / 1e3), status });
    log("vanilla installed", status);
    const resolved = await services.meta.resolve(versionId);
    if ((process.env.MIST_VERIFY_JAVA ?? process.env.SACRIFY_VERIFY_JAVA) !== "0") {
      log("ensuring Java", { major: resolved.javaMajor, component: resolved.javaVersion?.component });
      const java = await services.java.ensure(
        resolved.javaVersion?.component ?? null,
        resolved.javaMajor,
        `Verification: Java ${resolved.javaMajor}`
      );
      steps.push({ step: "java", path: java.path, major: java.major, version: java.version, vendor: java.vendor });
      log("java ready", { path: java.path, major: java.major });
    }
    const installation = await services.installations.create(
      {
        name: `Verify ${versionId}`,
        gameVersion: versionId,
        loader: { type: "vanilla", profileId: versionId },
        icon: "grass"
      },
      { memoryMb: 4096 }
    );
    const plan = await services.plan(installation.id);
    steps.push({
      step: "launch-plan",
      missing: plan.missing,
      warnings: plan.warnings,
      javaMajor: plan.javaMajor,
      classpathCount: plan.classpathCount,
      mainClass: plan.mainClass,
      commandRedacted: plan.command.includes("<redacted>")
    });
    log("launch plan", { missing: plan.missing, warnings: plan.warnings, java: plan.javaPath, classpath: plan.classpathCount });
    log("resolving Fabric versions");
    const loaders = await services.loaders.available(versionId);
    const fabric = loaders.find((entry) => entry.type === "fabric");
    const fabricVersion = fabric?.versions.find((entry) => entry.stable) ?? fabric?.versions[0];
    if (fabricVersion) {
      log("installing Fabric", fabricVersion.version);
      const result = await services.loaders.install(installation.id, { type: "fabric", version: fabricVersion.version });
      const fabricInstallation = services.installations.get(installation.id);
      const fabricPlan = await services.plan(installation.id);
      steps.push({
        step: "fabric",
        jobId: result.jobId,
        profileId: result.profileId,
        planVersion: fabricPlan.versionId,
        missing: fabricPlan.missing,
        loader: fabricInstallation?.loader
      });
      log("fabric ready", { profileId: result.profileId, missing: fabricPlan.missing });
    }
    log("searching Modrinth for a compatible mod");
    const search = await services.content.search({
      source: "modrinth",
      projectType: "mod",
      query: "sodium",
      gameVersion: versionId,
      loader: "fabric",
      offset: 0,
      limit: 5
    });
    const project = search.hits[0];
    if (project) {
      const versions = await services.content.versions({
        source: "modrinth",
        projectId: project.id,
        gameVersion: versionId,
        loader: "fabric",
        projectType: "mod"
      });
      const modVersion = versions.find((entry) => entry.releaseType === "release") ?? versions[0];
      if (modVersion) {
        log("installing mod", { project: project.title, version: modVersion.versionNumber });
        const install = await services.content.install({
          installationId: installation.id,
          projectType: "mod",
          source: "modrinth",
          projectId: project.id,
          versionId: modVersion.id,
          withDependencies: true
        });
        const mods = await services.content.listMods(installation.id);
        steps.push({ step: "mod-install", install, mods: mods.map((mod) => ({ name: mod.name, file: mod.filename, enabled: mod.enabled })) });
        log("mod installed", { count: install.installed.length, skipped: install.skipped, mods: mods.length });
      }
    }
    const diagnostics = await services.diagnostics.diagnostics(installation.id);
    steps.push({ step: "diagnostics", redactions: diagnostics.redactions, bytes: diagnostics.text.length });
    await services.downloads.clearFinished();
    report.ok = true;
    process.stdout.write(`VERIFY_RESULT ${JSON.stringify(report)}
`);
    electron.app.quit();
  } catch (error) {
    report.ok = false;
    report.error = error instanceof Error ? error.message : String(error);
    report.hint = error instanceof index.AppError ? error.hint : void 0;
    report.detail = error instanceof index.AppError ? error.detail : void 0;
    process.stdout.write(`VERIFY_RESULT ${JSON.stringify(report)}
`);
    process.exitCode = 1;
    electron.app.quit();
  }
}
exports.runVerification = runVerification;
