# Mist Launcher

A modern, modular Minecraft: Java Edition launcher for Windows, built with Electron.

## Features

- **Microsoft & offline accounts** — sign in with device-code flow or play offline
- **Installations** — create and manage multiple instances with per-instance settings
- **Mods, modpacks, resource packs & shaders** — browse, install, enable, and update from in-app catalogs
- **Worlds** — manage saves, datapacks, and one-click backups
- **Server browser** — search servers with quick-play
- **Skins** — browse and apply skins (3D preview via skinview3d)
- **World Chat** — community feed, uploads, and reactions
- **Job queue** — track downloads/installs with progress, cancel, and retry
- **Logs & diagnostics** — launcher and game logs with crash reporting

## Tech stack

- Electron
- React + Zustand
- Vite
- electron-builder (NSIS installer)

## Download

Prebuilt installers are attached to each [Release](https://github.com/Sacrifizer/MistLauncher/releases).

> The installer is not code-signed yet, so Windows SmartScreen may show
> "Windows protected your PC". Click **More info → Run anyway** to continue.

## Build from source

```bash
npm install
npm run build:installer
```

The installer is written to the path configured under `build.directories.output` in `package.json`.

## License

[MIT](LICENSE)
