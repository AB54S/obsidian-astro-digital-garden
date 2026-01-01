# Obsidian Astro Digital Garden

**The official companion plugin for [Obsidian Spaceship](https://github.com/ayeebosss/obsidian-spaceship).**

This plugin bridges your Obsidian vault to your Astro-powered Digital Garden.

## Features

- **One-Click Publish**: Instantly copy your current note to your blog repository.
- **Image Handling**: (Coming Soon) Automatically copies referenced images.
- **Frontmatter Management**: Ensures your notes are ready for Astro.

## Installation

1.  Search for **"Obsidian Astro Digital Garden"** in Obsidian Community Plugins (once approved).
2.  OR install manually:
    *   Download `main.js`, `manifest.json`, and `styles.css` from the [Latest Release](../../releases/latest).
    *   Copy them to `.obsidian/plugins/obsidian-astro-digital-garden/`.

## Configuration

1.  Open **Settings** -> **Obsidian Astro Digital Garden**.
2.  **Blog Repository Path**: Enter the absolute path to your local Astro blog folder (e.g., `/Users/me/Documents/my-blog`).
3.  **Assets Folder**: (Optional) Where images should go relative to the blog root.

## Usage

1.  Open the note you want to publish.
2.  Open the Command Palette (`Cmd/Ctrl + P`).
3.  Run **"Digital Garden: Publish Current Note"**.
4.  Commit and push your blog repository changes.

## Development

```bash
npm install
npm run dev
```

