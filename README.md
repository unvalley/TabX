<p align="center">
    <a href="https://chrome.google.com/webstore/detail/tabx/pnomgepiknocmkmncjkcchojfiookljb?hl=en&authuser=1" target="_blank">
        <img src="src/assets/tabX.png" height="100px"/>
    </a>
</p>
<h2 align="center">TabX</h2>
<p align="center">TabX is a simple tab management tool 🪣</p>

<p align="center">
    <img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/unvalley/TabX/CI" />
    <a href="https://chrome.google.com/webstore/detail/tabx/pnomgepiknocmkmncjkcchojfiookljb?hl=en&authuser=1">
        <img alt="Install Chrome" src="https://img.shields.io/badge/Install-Chrome-blue"/>
    </a>
</p>

## Application Image (v0.0.6)

| ![TabX_light](https://user-images.githubusercontent.com/38400669/133642613-118dc73f-3135-4c50-86b2-612bdb8e1e3a.png) | ![TabX_dark](https://user-images.githubusercontent.com/38400669/133642626-a4ac5004-0825-4597-8021-7c68d7daef44.png) |
| :------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: |
|                                                      Light Mode                                                      |                                                      Dark Mode                                                      |

## Instlattion

- Install from [Chrome Web Store](https://chrome.google.com/webstore/detail/tabx/pnomgepiknocmkmncjkcchojfiookljb?hl=en&authuser=1)
- Please wait for Firefox.

## Motivation

> The problem of having too many tabs open occurs when we use a browser. Opening too many tabs affect memory consumption and prevent comfortable browsing.
> Recently, some extensions and browsers have approached this problem, but they are a bit overloaded, at least for me.
> This extension is inspired by OneTab.
> The goal of TabX is to create a simpler and easier to use tab management tool.

## How to use

1. After install [TabX](https://chrome.google.com/webstore/detail/tabx/pnomgepiknocmkmncjkcchojfiookljb?hl=en&authuser=1), you can show the icon in extension area (beside search bar).
2. When you click the icon, TabX stores your opend tabs (exclude pinned tabs).
3. Manage your tabs at TabX page with below features!

## Features

- ✅ Store your tabs
- 💎 Simple UI
- 🌌 Built-in dark mode
- 🔍 Fuzzy search (thanks to [Fuse.js](https://github.com/krisk/Fuse)! )
- ⛓ Import & Export (OneTab compatible)
- 📝 Edit description of tab group
- 🌏 i18n support (only English & Japanese)
- ⚡️ Remove duplicated stored tabs (We call this "Unique" feature)

## FutureWork

- 🛠 Add tab filtering option (date, domain, etc..)
- 🔦 Search from anywhere
- 👨‍💻 Keyboard shortcuts

## Build

1. Fork and clone this repository.
2. Open terminal in the cloned root folder and run: 
  - `npm run install`
  - `npm run build`
3. Zip the dist folder that created by `npm run build`
4. Load the `dist.zip` at chrome://extensions/ (click "Load unpacked" and open the dist.zip)
5. After run `npm run dev`, you can use TabX dev-mode.

## License

[MIT](LICENSE.md)
