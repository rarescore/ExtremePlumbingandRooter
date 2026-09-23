import fs from "node:fs";
import path from "node:path";

const ROOT = "/workspace";
const SRC = "/tmp/la-articles/LA_Plumbing_SEO_Articles/articles";

const files = [
  {
    file: "01_plumber_cost_los_angeles_2026.md",
    id: "2010",
    slug: "plumber-cost-los-angeles",
    publishedAt: "2026-09-15 09:00:00",
    related: [
      ["/contact", "Request a free estimate"],
      ["/services", "See our plumbing services"],
      ["/faq", "Pricing and estimate FAQ"],
    ],
  },
  {
    file: "02_emergency_plumber_los_angeles_first_10_minutes.md",
    id: "2009",
    slug: "emergency-plumber-los-angeles-first-10-minutes",
    publishedAt: "2026-09-14 09:00:00",
    related: [
      ["/contact", "Call for emergency help"],
      ["/services/leak-detection", "Leak detection"],
      ["/services/drain-cleaning-rooter-service", "Drain & sewer backups"],
    ],
  },
  {
    file: "03_clogged_drain_when_cheap_snake_wont_fix_it.md",
    id: "2008",
    slug: "clogged-drain-los-angeles-snaking-not-enough",
    publishedAt: "2026-09-13 09:00:00",
    related: [
      ["/services/drain-cleaning-rooter-service", "Drain cleaning & rooter"],
      ["/services/hydro-jetter", "Hydro-jetting"],
      ["/services/camera-inspection", "Camera inspection"],
    ],
  },
  {
    file: "04_hydro_jetting_vs_snaking_los_angeles.md",
    id: "2007",
    slug: "hydro-jetting-vs-snaking-los-angeles",
    publishedAt: "2026-09-12 09:00:00",
    related: [
      ["/services/hydro-jetter", "Hydro-jetting"],
      ["/services/drain-cleaning-rooter-service", "Drain cleaning"],
      ["/services/camera-inspection", "Camera inspection"],
    ],
  },
  {
    file: "05_tree_roots_sewer_line_los_angeles.md",
    id: "2006",
    slug: "tree-roots-sewer-line-los-angeles",
    publishedAt: "2026-09-11 09:00:00",
    related: [
      ["/services/trenchless-sewer-replacement", "Trenchless sewer replacement"],
      ["/services/camera-inspection", "Sewer camera inspection"],
      ["/services/hydro-jetter", "Hydro-jetting"],
    ],
  },
  {
    file: "06_no_hot_water_los_angeles_checklist.md",
    id: "2005",
    slug: "no-hot-water-los-angeles-checklist",
    publishedAt: "2026-09-10 09:00:00",
    related: [
      ["/services/water-heaters", "Water heater repair & replacement"],
      ["/contact", "Free water heater inspection"],
    ],
  },
  {
    file: "07_tankless_water_heater_los_angeles_upgrade_or_mistake.md",
    id: "2004",
    slug: "tankless-water-heater-los-angeles-worth-it",
    publishedAt: "2026-09-09 09:00:00",
    related: [
      ["/services/water-heaters", "Water heaters"],
      ["/contact", "Get a conversion estimate"],
    ],
  },
  {
    file: "08_hidden_leak_high_ladwp_bill_los_angeles.md",
    id: "2003",
    slug: "high-ladwp-bill-hidden-water-leak-los-angeles",
    publishedAt: "2026-09-08 09:00:00",
    related: [
      ["/services/leak-detection", "Leak detection"],
      ["/services/copper-repipe", "Copper repipe"],
      ["/contact", "Schedule leak detection"],
    ],
  },
  {
    file: "09_older_los_angeles_home_plumbing_inspection.md",
    id: "2002",
    slug: "older-los-angeles-home-plumbing-inspection",
    publishedAt: "2026-09-07 09:00:00",
    related: [
      ["/services/camera-inspection", "Sewer camera inspection"],
      ["/services/copper-repipe", "Copper repipe"],
      ["/services/water-heaters", "Water heaters"],
    ],
  },
  {
    file: "10_earthquake_plumbing_los_angeles_checklist.md",
    id: "2001",
    slug: "earthquake-plumbing-los-angeles-checklist",
    publishedAt: "2026-09-06 09:00:00",
    related: [
      ["/services/water-heaters", "Water heater restraint & replacement"],
      ["/services/leak-detection", "Leak detection"],
      ["/contact", "Request a preparedness inspection"],
    ],
  },
];

function escapeHtml(s) {
  return s.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
}

function inline(s) {
  let t = escapeHtml(s);
  t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return t;
}

function mdToHtml(markdown) {
  let src = markdown.replace(/\r\n/g, "\n");
  src = src.replace(/^# .+\n+/, "");
  src = src.replace(/^(?:\*\*[^*]+\*\*[^\n]*\n+)+\n---\n+/, "");
  const blocks = src.trim().split(/\n{2,}/);
  const html = [];
  for (const raw of blocks) {
    const block = raw.trim();
    if (!block) continue;
    if (block.startsWith("### ")) {
      html.push(`<h3>${inline(block.slice(4).replace(/\n/g, " "))}</h3>`);
      continue;
    }
    if (block.startsWith("## ")) {
      html.push(`<h2>${inline(block.slice(3).replace(/\n/g, " "))}</h2>`);
      continue;
    }
    const lines = block.split("\n");
    if (lines.every((l) => l.startsWith("- ") || l.startsWith("* "))) {
      html.push(
        `<ul>${lines.map((l) => `<li>${inline(l.replace(/^[-*] /, ""))}</li>`).join("")}</ul>`,
      );
      continue;
    }
    if (lines.every((l) => /^\d+\.\s/.test(l))) {
      html.push(
        `<ol>${lines.map((l) => `<li>${inline(l.replace(/^\d+\.\s/, ""))}</li>`).join("")}</ol>`,
      );
      continue;
    }
    html.push(`<p>${inline(lines.join(" "))}</p>`);
  }
  return html.join("\n");
}

function parseMeta(markdown) {
  const title = (markdown.match(/^# (.+)$/m) || [, ""])[1].trim();
  const slugLine = markdown.match(/\*\*Suggested URL slug:\*\*\s*`?([^`\n]+)`?/);
  const metaTitle = (markdown.match(/\*\*Meta title:\*\*\s*(.+)/) || [, ""])[1].trim();
  const metaDescription = (markdown.match(/\*\*Meta description:\*\*\s*(.+)/) || [, ""])[1].trim();
  const primary = (markdown.match(/\*\*Primary keyword:\*\*\s*(.+)/) || [, ""])[1].trim();
  return { title, suggested: slugLine?.[1]?.trim() || "", metaTitle, metaDescription, primary };
}

function excerptFrom(html) {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= 180) return text;
  return `${text.slice(0, 177).replace(/\s+\S*$/, "")}…`;
}

const imported = files.map((spec) => {
  const md = fs.readFileSync(path.join(SRC, spec.file), "utf8");
  const meta = parseMeta(md);
  let content = mdToHtml(md);
  const related = spec.related
    .map(([href, label]) => `<li><a href="${href}">${escapeHtml(label)}</a></li>`)
    .join("");
  content += `\n<h2>Talk with Extreme Plumbing & Rooter</h2>
<p>Extreme Plumbing & Rooter is a licensed Los Angeles plumbing company (CA #1086230) serving homes and businesses 24/7. If you want a clear diagnosis and a free, no-pressure estimate, call <a href="tel:+18186317296">(818) 631-7296</a> or <a href="/contact">send a short message</a>.</p>
<h3>Related services</h3>
<ul>${related}</ul>`;

  return {
    id: spec.id,
    slug: spec.slug,
    title: meta.title,
    publishedAt: spec.publishedAt,
    excerpt: excerptFrom(content),
    image: "",
    content,
    metaTitle: meta.metaTitle,
    metaDescription: meta.metaDescription,
    keyword: meta.primary,
  };
});

const articlesPath = path.join(ROOT, "src/lib/articles.json");
const metaPath = path.join(ROOT, "src/lib/articles-meta.json");
const existing = JSON.parse(fs.readFileSync(articlesPath, "utf8"));
const existingMeta = JSON.parse(fs.readFileSync(metaPath, "utf8"));

const bySlug = new Set(imported.map((a) => a.slug));
const filtered = existing.filter((a) => !bySlug.has(a.slug));
const filteredMeta = existingMeta.filter((a) => !bySlug.has(a.slug));

const merged = [...imported, ...filtered];
const mergedMeta = merged.map(({ content, keyword, ...card }) => ({
  id: card.id,
  slug: card.slug,
  title: card.title,
  publishedAt: card.publishedAt,
  excerpt: card.excerpt,
  metaTitle: card.metaTitle,
  metaDescription: card.metaDescription,
}));

fs.writeFileSync(articlesPath, JSON.stringify(merged, null, 2) + "\n");
fs.writeFileSync(metaPath, JSON.stringify(mergedMeta, null, 2) + "\n");

console.log(`Imported ${imported.length} articles. Total: ${merged.length}`);
for (const a of imported) {
  console.log(`- ${a.slug} (${a.content.length} chars) · ${a.metaTitle}`);
}
