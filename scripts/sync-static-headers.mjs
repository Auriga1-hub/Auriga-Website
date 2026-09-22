#!/usr/bin/env node
// Regenerates the <header class="site-navbar">...</header> block in every
// pre-rendered static HTML page so it always matches src/components/navbar.jsx.
//
// Single source of truth: src/data/navConfig.js
//
// Run manually with `npm run sync-header`, or automatically before `npm run build`
// (wired up as the "prebuild" script in package.json).

import { readFileSync, writeFileSync, globSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { navItems, navCTAs } from "../src/data/navConfig.js";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildHeaderHtml() {
  const menuItems = navItems
    .map((item) => {
      if (item.type === "link") {
        return `                    <li><a href="${item.path}" class="menu-link">${escapeHtml(item.label)}</a></li>`;
      }

      const subItems = item.items
        .map((sub) => `                            <li><a href="${sub.path}">${escapeHtml(sub.label)}</a></li>`)
        .join("\n");

      return `                    <li class="has-children">
                        <span class="menu-link nav-label">${escapeHtml(item.label)} <span class="dropdown-arrow">\u25be</span></span>
                        <ul class="dropdown">
${subItems}
                        </ul>
                    </li>`;
    })
    .join("\n\n");

  const ctaItems = navCTAs
    .map((cta) => `                    <li class="${cta.className}"><a href="${cta.path}">${escapeHtml(cta.label)}</a></li>`)
    .join("\n");

  return `    <header class="site-navbar">
        <div class="header-container">
            <div class="site-logo">
                <a href="/" class="logo-wrapper">
                    <img src="/images/logo.webp" alt="Auriga Football Club" class="navbar-logo">
                </a>
            </div>

            <button class="mobile-toggle" id="mobile-toggle" aria-label="Toggle menu">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <nav class="site-navigation" id="site-navigation" aria-label="Main navigation">
                <ul class="site-menu">
${menuItems}

${ctaItems}
                </ul>
            </nav>
        </div>
    </header>`;
}

function syncFile(filePath, headerHtml) {
  const original = readFileSync(filePath, "utf8");
  const match = original.match(/[ \t]*<header class="site-navbar">[\s\S]*?<\/header>/);
  if (!match) return false;

  if (match[0] === headerHtml) return false;

  const updated = original.replace(match[0], headerHtml);
  writeFileSync(filePath, updated, "utf8");
  return true;
}

function main() {
  const headerHtml = buildHeaderHtml();
  const files = globSync(["public/**/*.html", "*.html"], { cwd: rootDir })
    .map((f) => path.join(rootDir, f));

  let changed = 0;
  for (const file of files) {
    if (syncFile(file, headerHtml)) {
      changed += 1;
      console.log(`updated: ${path.relative(rootDir, file)}`);
    }
  }

  console.log(`\nsync-header: checked ${files.length} file(s), updated ${changed}.`);
}

main();
