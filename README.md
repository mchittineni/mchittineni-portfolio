# Manideep Chittineni — Portfolio

A statically-generated personal portfolio for a Cloud & Platform engineer, built
with **Nuxt 4** and **Tailwind CSS v4**, deployed to **GitHub Pages** (with
alternative **AWS / Azure / GCP** CDN paths) via **GitHub Actions**.

![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxt.js&logoColor=white)
![Vue](https://img.shields.io/badge/Vue-3-4FC08D?logo=vue.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-coverage_%E2%89%A590%25-6E9F18?logo=vitest&logoColor=white)

> **Single source of truth: npm.** Use `package-lock.json` only — do not add
> other lockfiles (`pnpm-lock.yaml` / `yarn.lock`).

---

## Table of contents

- [Overview](#overview)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Testing](#testing)
- [Editing content](#editing-content)
- [Building for production](#building-for-production)
- [Deployment](#deployment)

---

## Overview

The site ships **six interfaces over one dataset**. Everything renders ahead of
time with `nuxt generate`, so the deployed artifact is plain HTML/CSS/JS with no
server runtime.

| Route       | Interface     | What it is                                                               |
| ----------- | ------------- | ------------------------------------------------------------------------ |
| `/`         | Portfolio     | The conventional read. Canonical URL.                                    |
| `/console`  | Control plane | Career as platform resources — Deployments, Repositories, Node Pools.    |
| `/cloud`    | Multi-cloud   | The same story per vendor, chrome reskinned for AWS / Azure / GCP / OCI. |
| `/agent`    | Agent         | Questions answered as visible tool-call traces. Scripted, no model call. |
| `/ide`      | Editor        | The background as a source tree, with an integrated terminal.            |
| `/terminal` | Terminal      | A real shell: history, completion, pipes, shareable commands.            |
| `/modes`    | Chooser       | All six side by side, with number-key shortcuts. Linked from every page. |

All content lives in `content/`, so no interface owns it and none can drift from
another. A first-time visitor gets a boot gate offering all six; it is a
client-only overlay rendered after mount, so the prerendered HTML never contains
it and crawlers, link previews and no-JS visitors always land on the portfolio
itself. After that first visit the gate never returns — `/modes` is the durable
way back, reachable from the floating switcher on every interface.

## Tech stack

| Layer     | Choice                                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------------------------- |
| Framework | [Nuxt 4](https://nuxt.com) (Vue 3, `<script setup>`)                                                                      |
| Rendering | Static Site Generation (Nitro `static` preset, all routes prerendered)                                                    |
| Styling   | [Tailwind CSS v4](https://tailwindcss.com) via `@nuxtjs/tailwindcss` + a plain-CSS design system in `assets/css/main.css` |
| Testing   | [Vitest](https://vitest.dev) + `@nuxt/test-utils` + Vue Test Utils, v8 coverage gated at 90%                              |
| Hosting   | **GitHub Pages** (primary), or **AWS / Azure / GCP** CDN (alternatives; see [`infra/`](infra/))                           |
| CI/CD     | **GitHub Actions** with OIDC across all clouds (no long-lived keys); format + unit tests + audit + gitleaks + Dependabot  |
| IaC       | **CloudFormation** (AWS) _and_ **Terraform** for all three clouds (see [`infra/`](infra/))                                |
| Tooling   | Prettier, PostCSS, Autoprefixer                                                                                           |

## Project structure

```
.
├── app.vue                     # <NuxtLayout><NuxtPage /></NuxtLayout> + <BootGate />
├── nuxt.config.ts              # SSG config, prerendered routes, <head> (SEO/OG/Twitter)
├── vitest.config.ts            # Nuxt test environment + coverage thresholds
├── assets/css/main.css         # Design system: tokens, components, animations
├── content/                    # Single source of truth for every interface
│   ├── profile.ts              # Identity, stats, contact details, socials
│   ├── experience.ts           # Roles
│   ├── projects.ts             # Repositories + language palette
│   ├── skills.ts               # Skill pools, proficiency, certifications
│   └── index.ts                # Re-exports + platform projections (deployments, events…)
├── layouts/
│   ├── default.vue             # Marketing chrome: nav (+ mobile menu), footer
│   └── bare.vue                # Full-viewport shell for the other interfaces
├── pages/                      # index, modes, console, cloud, agent, ide, terminal
├── components/
│   ├── AboutSection.vue        # Hero (id="about")
│   ├── SkillsSection.vue       # Skills, proficiency, certifications
│   ├── ExperienceSection.vue   # Work timeline
│   ├── ProjectsSection.vue     # Filterable repositories, source + live-demo links
│   ├── ContactSection.vue      # Contact form (mailto) + info + socials
│   ├── BootGate.vue            # First-visit interface chooser (client-only)
│   ├── ModeSwitcher.vue        # Menu across all six interfaces + theme toggle
│   └── console/                # ResourceTable, DescribePane, StatusPill, LangBar
├── composables/
│   ├── useMode.ts              # Interface detection + persistence
│   ├── useShell.ts             # Shell engine: parser, pipes, history, completion
│   └── useTheme.ts             # Light / dark / system, persisted per visitor
├── utils/commands.ts           # Terminal command allowlist
├── plugins/reveal.client.ts    # IntersectionObserver scroll-reveal (client-only)
├── test/                       # Vitest specs, mirroring the source tree
├── public/                     # Served as-is: profile.jpg, resume PDF, robots.txt, .nojekyll
├── infra/                      # IaC per cloud: AWS/ (CFN + Terraform), Azure/, GCP/ (Terraform)
└── .github/
    ├── dependabot.yml          # Semiannual npm + github-actions update PRs
    └── workflows/
        ├── ci.yml              # PR/push gate: format, unit tests, build, npm audit, gitleaks
        ├── deploy_pages.yml    # Auto deploy to GitHub Pages (push to main)
        └── deploy_prod.yml     # Manual deploy → AWS / Azure / GCP (toggleable)
```

## Getting started

Requires **Node.js 24.x** (matching the CI runner) and npm.

```bash
npm ci          # install exact, locked dependencies
npm run dev     # start the dev server at http://localhost:3000
```

## Available scripts

| Script                  | Description                                                      |
| ----------------------- | ---------------------------------------------------------------- |
| `npm run dev`           | Start the Nuxt dev server with HMR on `:3000`                    |
| `npm run build`         | Build the app (server + client bundles)                          |
| `npm run generate`      | **Prerender the static site** into `.output/public` (used by CI) |
| `npm run preview`       | Locally preview the built output                                 |
| `npm test`              | Run the unit suite once                                          |
| `npm run test:watch`    | Run the unit suite in watch mode                                 |
| `npm run test:coverage` | Run the suite with coverage and enforce the 90% thresholds       |
| `npm run format`        | Format the codebase with Prettier                                |
| `npm run format:check`  | Verify formatting (CI gate; non-zero on drift)                   |

## Testing

Unit tests run on **Vitest** in the `nuxt` environment (`@nuxt/test-utils`), so
specs get the same auto-imports, `~` aliases and runtime config the app itself
runs on — there is no hand-maintained mock layer. Components and pages are
mounted with `mountSuspended`; DOM is happy-dom.

```bash
npm test                 # whole suite
npm test -- test/utils   # one directory
npm run test:coverage    # + coverage, fails below 90%
```

`test/setup.ts` fills the two gaps in the test window — `localStorage` (which
happy-dom declares but never wires up) and auto-unmounting components between
specs, so one page's key handlers cannot leak into the next.

Coverage thresholds are enforced in [`vitest.config.ts`](vitest.config.ts) at
**90%** for statements, branches, functions and lines across `components/`,
`composables/`, `content/`, `layouts/`, `pages/`, `plugins/` and `utils/`. Every
workflow that builds the site runs `npm run test:coverage` first, so a failing
test blocks CI, the Pages deploy and the production deploy alike.

## Editing content

Content is **data-driven** and lives entirely in `content/` — edit the arrays
there rather than the markup. The console, cloud, agent, editor and terminal
interfaces all derive their views from the same records, so one edit updates
every interface.

| To change…                                      | Edit                                                   |
| ----------------------------------------------- | ------------------------------------------------------ |
| Name, summary, headline stats, contact, socials | [`content/profile.ts`](content/profile.ts)             |
| Roles, dates, metrics, bullet points            | [`content/experience.ts`](content/experience.ts)       |
| Repositories, categories, demo links, languages | [`content/projects.ts`](content/projects.ts)           |
| Skill pools, proficiency bars, certifications   | [`content/skills.ts`](content/skills.ts)               |
| Page `<title>`, description, OG/Twitter tags    | [`nuxt.config.ts`](nuxt.config.ts)                     |
| Résumé PDF / profile photo                      | replace files in [`public/`](public/) (same filenames) |

Formatting is enforced with **Prettier** (`.prettierrc`, `.prettierignore`). Run
`npm run format` before committing; CI runs `npm run format:check`.

## Building for production

```bash
npm run generate      # outputs static files to .output/public
npm run preview       # serve the production build locally to verify
```

`.output/public` is the deployed artifact: `index.html`, a prerendered
`404.html`, hashed `_nuxt/` assets, and everything under `public/`.

## Deployment

Two hosting paths are configured — use whichever you prefer (don't run both
against the same domain).

### GitHub Pages (primary)

On every push to `main` (or a manual run),
[`deploy_pages.yml`](.github/workflows/deploy_pages.yml) runs the unit suite,
generates the site and publishes it via `actions/deploy-pages`. It builds with
`NUXT_APP_BASE_URL=/<repo>/` so assets resolve under the project-page subpath,
and ships [`public/.nojekyll`](public/.nojekyll) so `_nuxt/` isn't stripped.

**One-time setup:** GitHub → **Settings → Pages → Build and deployment →
Source: GitHub Actions**.

> **Custom domain or user site at root?** Set `NUXT_APP_BASE_URL` to `/` in the
> workflow and add a `CNAME`. GitHub Pages cannot set custom response headers
> (no HSTS/CSP) — the AWS/CloudFront path can.

### Cloud CDN — AWS / Azure / GCP (alternative)

A manual **`workflow_dispatch`** run of
[`deploy_prod.yml`](.github/workflows/deploy_prod.yml) tests and builds once,
then fans the artifact out to whichever clouds the run's checkboxes enable. Each
cloud job authenticates with **GitHub OIDC** (no stored keys), reads its resource
names from the deploy secret it provisioned, syncs the files and invalidates the
CDN. A `concurrency` group serializes deploys.

| Cloud | Secrets                                                       | Variables         |
| ----- | ------------------------------------------------------------- | ----------------- |
| AWS   | `AWS_DEPLOY_ARN`, `AWS_DEPLOY_REGION`, `SECRETS_MANAGER_ARN`  | —                 |
| Azure | `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID` | `AZURE_KEY_VAULT` |
| GCP   | `GCP_WORKLOAD_IDENTITY_PROVIDER`, `GCP_SERVICE_ACCOUNT`       | `GCP_PROJECT`     |

The repo must also define a **`Prod`** GitHub environment — every deploy job runs
in it, and each OIDC trust is scoped to `environment:Prod`.

➡️ **Per-cloud provisioning, the deploy-identity matrix and the security model
are documented in [`infra/README.md`](infra/README.md).**

---

© Manideep Chittineni. All rights reserved.
