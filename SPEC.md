# Obsidian-First Blog System – SRS

**Project Name:** Obsidian Spaceship (working title)

**Purpose:** Enable users to write content in Obsidian (Markdown), generate a static site with a Substack-like UX using tailwind, and optionally extend with themes, comments, and subscriptions.

---

## 1. Overall Description

### 1.1 Product Perspective

* The system is **static-first**, Obsidian-centric.
* Users write posts as Markdown in their vault.
* The system converts Markdown → HTML → fully styled website.
* Optional features (comments, subscriptions, graphs) are adapters or external integrations.
* Deployment is platform-agnostic: GitHub Pages, Netlify, Vercel, Cloudflare Pages.

### 1.2 Product Functions

* Parse Markdown + frontmatter.
* Render posts, homepage, and lists.
* Optional: Graph visualization of content links.
* Optional: Comments via GitHub Discussions (Giscus) or Issues (Utterances).
* Optional: Subscription signup (via email providers).

### 1.3 User Characteristics

* Users know Obsidian basics.
* Users want minimal setup.
* Users may want to customize themes.

### 1.4 Constraints

* Must not break the original vault structure.
* All posts/images remain usable in Obsidian.
* System must be fully static by default.

---

## 2. Functional Requirements

### 2.1 Content Handling

* **FR1:** Accept Markdown files from `src/content` or user vault folder.
* **FR2:** Parse frontmatter:
  ```yaml
  title: string
  date: ISO8601
  summary: string (optional)
  draft: boolean (optional)
  tags: list (optional)
  image: filename (optional)
  ```
* **FR3:** Render Markdown into HTML while preserving links and images.

### 2.2 Layout & Navigation

* **FR4:** Home page lists posts in reverse chronological order.
* **FR5:** Post page displays title, date, content, summary (if available), and featured image.
* **FR6:** Navigation bar with:
  * Home
  * About (optional)
  * Tags (optional)
* **FR7:** Sidebar (optional) with graph or recent posts.
* **FR8:** Support multiple layouts:
  * PostLayout
  * ListLayout
  * BaseLayout

### 2.3 Styling & Theming

* **FR9:** Default light/dark GitHub-inspired theme.
* **FR10:** Font and accent color configurable via settings (CSS variables).
* **FR11:** Users can create custom themes overriding tokens.

### 2.4 Optional Features / Adapters

* **FR12:** Comments adapter:
  * Giscus (GitHub Discussions)
  * Utterances (GitHub Issues)
* **FR13:** Subscriptions:
  * RSS feed generation.
  * Optional email signup integration.
* **FR14:** Graph view:
  * JSON output of post links.
  * Visual rendering with D3 or Sigma.js.

### 2.5 Deployment

* **FR15:** Static site output.
* **FR16:** Deployment documentation for:
  * GitHub Pages
  * Netlify
  * Vercel
  * Cloudflare Pages
* **FR17:** Optional edge/SSR deployment for dynamic adapters.

---

## 3. Non-Functional Requirements

### 3.1 Usability

* Easy for Obsidian users to drop `.md` files and see content.
* Minimal configuration required.

### 3.2 Performance

* Fast page loads: minimal JS, mostly static.
* Graph view renders asynchronously.

### 3.3 Maintainability

* Modular structure:
  ```
  packages/
      core/
      astro-theme/
      obsidian-plugin/
      adapters/
  ```
* Clear separation: content → layout → adapters.

### 3.4 Security

* No sensitive user data stored locally.
* Comments/subscriptions handled by external services.

### 3.5 Compatibility

* Browser: latest Chrome, Firefox, Safari.
* OS: Windows, Mac, Linux.
* Obsidian vaults from version X onwards.

---

## 4. External Interface Requirements

### 4.1 User Interfaces

* Home page
* Post page
* Optional sidebar/graph view
* Theme picker (light/dark + custom)

### 4.2 Hardware Interfaces

* None (static site).

### 4.3 Software Interfaces

* Astro build pipeline
* Obsidian plugin API (for export/validation)
* GitHub API (for comments via adapters)
* RSS/email providers

### 4.4 Communication Interfaces

* Optional network calls for comments or subscriptions.
* Optional webhook endpoints for email signup.

---

## 5. System Architecture (high-level)

```
[Obsidian Vault]
        |
        v
[Plugin / Export Script] -- validates frontmatter, exports site.json
        |
        v
[Astro Theme / Layouts]
        |
        v
[Static Site Output] --> [Hosting Platform: GitHub Pages / Netlify / Vercel / Cloudflare]
        |
        v
[Optional Adapters: Comments / Graph / Subscriptions]
```

---

## 6. Folder / File Structure (proposed)

```
obsidian-spaceship/
├── src/
│   ├── content/       # Markdown files (vault)
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── PostLayout.astro
│   │   └── ListLayout.astro
│   ├── components/
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── styles/
│   │   └── global.css
├── packages/
│   ├── core/          # Markdown parser, graph builder
│   ├── adapters/      # Comments, subscriptions
│   └── obsidian-plugin/ # Validation + export
├── public/            # Images / assets
├── dist/              # Build output
└── README.md
```
