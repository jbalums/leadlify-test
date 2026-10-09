// One-time source import. The application renders native React components and
// local assets; it never fetches the reference HTML at runtime.
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import * as cheerio from "cheerio";
import { normalizeReferenceCss } from "./fix-css.mjs";

const root = process.cwd();
const html = await fs.readFile(
  path.join(root, ".reference/reference.html"),
  "utf8",
);
const $ = cheerio.load(html);
const normalize = (url) => {
  url = url.replaceAll("&quot;", "").replaceAll("&amp;", "&").trim();
  return url.startsWith("//") ? `https:${url}` : url;
};
const assetMap = new Map();
const failures = [];
await fs.mkdir("public/assets", { recursive: true });
await fs.mkdir("src/components/sections", { recursive: true });

async function download(url) {
  url = normalize(url);
  if (assetMap.has(url)) return assetMap.get(url);
  const filename = `${crypto.createHash("sha1").update(url).digest("hex").slice(0, 8)}-${decodeURIComponent(new URL(url).pathname.split("/").pop()).replace(/[^a-zA-Z0-9_.-]/g, "-")}`;
  const local = `/assets/${filename}`;
  assetMap.set(url, local);
  try {
    try {
      await fs.access(path.join(root, "public", local));
      return local;
    } catch {}
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    await fs.writeFile(
      path.join(root, "public", local),
      Buffer.from(await response.arrayBuffer()),
    );
  } catch (error) {
    failures.push({ url, reason: error.message });
    assetMap.set(url, url);
  }
  return assetMap.get(url);
}

const sections = $(".container.fullContainer")
  .toArray()
  .filter((el) => !/display\s*:\s*none/.test($(el).attr("style") || ""));
$(".elCustomJS_code").each((_, el) => {
  $(el).html($(el).attr("data-custom-js") || "");
});
$(".elCustomJSBg").remove();

let css = await (
  await fetch("https://www.theinvinciblemarketer.com/assets/lander.css")
).text();
css +=
  "\n" +
  $("style")
    .toArray()
    .map((el) => $(el).html())
    .join("\n");
const iconCss = await (
  await fetch("https://use.fontawesome.com/releases/v5.9.0/css/all.css")
).text();
css +=
  "\n" +
  iconCss.replaceAll(
    "../webfonts/",
    "https://use.fontawesome.com/releases/v5.9.0/webfonts/",
  );

const urls = new Set();
for (const section of sections) {
  $(section)
    .find("img")
    .each((_, el) => urls.add(normalize($(el).attr("src"))));
  for (const match of $.html(section).matchAll(/url\(["']?([^"')]+)["']?\)/g))
    urls.add(normalize(match[1]));
}
for (const match of css.matchAll(/url\(["']?(https?:[^"')]+)["']?\)/g))
  urls.add(normalize(match[1]));
const queue = [...urls];
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (queue.length) await download(queue.shift());
  }),
);

function replaceUrls(text) {
  for (const [remote, local] of assetMap) {
    text = text
      .replaceAll(remote, local)
      .replaceAll(remote.replace(/^https:/, ""), local);
  }
  return text;
}
css = normalizeReferenceCss(
  replaceUrls(css).replace(/\/\*# sourceMappingURL=[\s\S]*?\*\//g, ""),
);

const names = [
  "Announcement",
  "Hero",
  "MemberResults",
  "WhoItsFor",
  "AboutAaron",
  "WhyItWorks",
  "WhatsIncluded",
  "Guarantee",
  "FinalOffer",
  "Footer",
];
let styleNumber = 0;
let headingCount = 0;
const propNames = {
  class: "className",
  for: "htmlFor",
  tabindex: "tabIndex",
  allowfullscreen: "allowFullScreen",
  frameborder: "frameBorder",
  readonly: "readOnly",
  colspan: "colSpan",
  rowspan: "rowSpan",
};
const voids = new Set(["img", "br", "hr", "input", "source", "wbr"]);

function styleToObject(text) {
  text = text.replace(/\/\*[\s\S]*?\*\//g, "");
  const obj = {};
  const important = [];
  for (const declaration of text.split(/;(?![^()]*\))/)) {
    const colon = declaration.indexOf(":");
    if (colon < 0) continue;
    const key = declaration.slice(0, colon).trim();
    let value = replaceUrls(declaration.slice(colon + 1).trim());
    if (!key || !value || key === "cursor" || key === "outline") continue;
    if (/!important/.test(value)) {
      important.push(`${key}:${value};`);
      continue;
    }
    const camel = key
      .replace(/^-webkit-/, "Webkit-")
      .replace(/^-moz-/, "Moz-")
      .replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    obj[camel] = value;
  }
  return { obj, important };
}

function render(node, depth = 0) {
  if (node.type === "text") {
    const value = node.data.replace(/\s+/g, " ");
    return value.trim() ? `{${JSON.stringify(value)}}` : "";
  }
  if (node.type !== "tag") return "";
  let tag = node.name;
  const attrs = { ...node.attribs };
  if (["script", "style", "textarea"].includes(tag)) return "";
  if ((attrs.class || "").includes("dropZoneForSections")) return "";
  if (tag === "reference-video") {
    return `<VideoEmbed src=${JSON.stringify(attrs.src)} title=${JSON.stringify(attrs.title)} ${attrs.eager ? "eager" : ""} />`;
  }
  if (tag === "font") {
    tag = "span";
    attrs.style = `${attrs.style || ""};color:${attrs.color || "inherit"};`;
    delete attrs.color;
  }
  if (tag === "h1" || /\belHeadline\b/.test(attrs.class || "")) {
    const size = Number(
      (attrs.style || "").match(/font-size:\s*(\d+)px/)?.[1] || 0,
    );
    if (node.parent?.attribs?.id === "headline-21580") {
      tag = "h1";
      headingCount++;
      attrs.id = "main-heading";
    } else if (size >= 40 && tag !== "span") tag = "h2";
    else if (tag === "h1") tag = "div";
  }
  if (tag === "iframe") {
    attrs.title = "Verified Invincible Marketer member reviews";
    attrs.loading = "lazy";
    delete attrs.frameborder;
  }
  if (tag === "img") {
    attrs.src = replaceUrls(normalize(attrs.src));
    delete attrs.height;
    if (depth > 6 && !attrs.src.includes("reviews.png")) attrs.loading = "lazy";
    attrs.decoding = "async";
    if (!attrs.alt && !attrs.src.includes("connect.png")) {
      const filename = path
        .basename(attrs.src)
        .replace(/^[a-f0-9]+-/, "")
        .replace(/\.[^.]+$/, "");
      const labels = {
        reviews: "Over 3,500 members have taken this journey",
        cards: "Accepted payment methods",
        "Aaron-award": "Aaron Chen with his ClickFunnels Two Comma Club award",
        "IM-Bundle": "Invincible Marketer training program and system",
        "DFY-Affiliate-Funnel": "Done-for-you affiliate funnel",
        mbg: "30-day money-back guarantee",
      };
      attrs.alt = labels[filename] || filename.replace(/-/g, " ");
    }
  }
  if (tag === "a" && attrs.href?.startsWith("/"))
    attrs.href = `https://class.theinvinciblemarketer.com${attrs.href}`;
  if (tag === "a" && attrs.href === "#") attrs.href = "#main-heading";
  if (tag === "i") attrs["aria-hidden"] = "true";
  let extraClass = "";
  const props = [];
  for (let [key, value] of Object.entries(attrs)) {
    if (
      /^(data-(de-|ce|trigger|animate|delay|gramm|bold|block-|col|google-font|video-type|wistia-url|vimeo-url|custom-js|displaytype|element-theme)|contenteditable|aria-disabled|wmode|allowtransparency|mozallowfullscreen|webkitallowfullscreen|oallowfullscreen|msallowfullscreen)/.test(
        key,
      )
    )
      continue;
    if (/^on/.test(key)) continue;
    if (key === "style") {
      const { obj, important } = styleToObject(value);
      if (Object.keys(obj).length) props.push(`style={${JSON.stringify(obj)}}`);
      if (important.length) {
        extraClass = ` ref-style-${++styleNumber}`;
        css += `\n.ref-style-${styleNumber}{${important.join("")}}`;
      }
      continue;
    }
    if (key === "class") continue;
    if (key === "allowfullscreen") {
      props.push("allowFullScreen");
      continue;
    }
    props.push(`${propNames[key] || key}=${JSON.stringify(value)}`);
  }
  const cleanClass =
    (attrs.class || "")
      .replace(
        /\b(ui-sortable|ui-droppable|ui-resizable|de-editable|hiddenElementTools|elemShowTitle)\b/g,
        "",
      )
      .replace(/\s+/g, " ")
      .trim() + extraClass;
  if (cleanClass) props.unshift(`className=${JSON.stringify(cleanClass)}`);
  const children = (node.children || [])
    .map((child) => render(child, depth + 1))
    .join("");
  return `<${tag}${props.length ? " " + props.join(" ") : ""}${voids.has(tag) ? " />" : `>${children}</${tag}>`}`;
}

for (let index = 0; index < sections.length; index++) {
  const section = sections[index];
  $(section)
    .find(".elVideoWrapper")
    .each((_, el) => {
      const iframe = $(el).find("iframe");
      const src = iframe.attr("src");
      if (!src) return;
      const title = src.includes("wxtgl9l14y")
        ? "Watch: The Invincible Marketer system"
        : src.includes("dgqpny9d01")
          ? "Take a look inside Aaron's actual account"
          : "Invincible Marketer member testimonial";
      $(el)
        .empty()
        .append(
          `<reference-video src="${src.replaceAll("&", "&amp;")}" title="${title}" ${index === 1 ? 'eager="true"' : ""}></reference-video>`,
        );
    });
  $(section)
    .find(".accordion-item")
    .each((_, el) => {
      el.name = "details";
      $(el).find("input").remove();
      const label = $(el).find("label").get(0);
      if (label) {
        label.name = "summary";
        delete label.attribs.for;
      }
      $(el).find(".icon").attr("aria-hidden", "true");
    });
  section.name =
    index === 0
      ? "header"
      : index === sections.length - 1
        ? "footer"
        : "section";
  section.attribs["aria-label"] = [
    "Program overview",
    "Invincible Marketer introduction",
    "Member reviews and sales results",
    "Is Invincible Marketer for you?",
    "Meet Aaron Chen",
    "The value-first approach and testimonials",
    "Included in Invincible Marketer",
    "30-day action-based guarantee",
    "Pricing and frequently asked questions",
    "Legal information",
  ][index];
  await fs.writeFile(
    `src/components/sections/${names[index]}.tsx`,
    `import VideoEmbed from '../VideoEmbed';\n\nexport default function ${names[index]}() {\n  return (${render(section)});\n}\n`,
  );
}
await fs.writeFile("src/app/reference.css", css);
await fs.writeFile(
  "public/assets/manifest.json",
  JSON.stringify(
    {
      source: "https://class.theinvinciblemarketer.com/s/im/",
      assets: Object.fromEntries(assetMap),
      failures,
    },
    null,
    2,
  ),
);
await fs.writeFile(
  "src/app/page.tsx",
  `${names.map((n) => `import ${n} from '@/components/sections/${n}';`).join("\n")}\n\nexport default function Home() {\n  return <><a className="skip-link" href="#main-heading">Skip to content</a><Announcement /><main id="content" className="containerWrapper">${names
    .slice(1, -1)
    .map((n) => `<${n} />`)
    .join("")}</main><Footer /></>;\n}\n`,
);
console.log(
  JSON.stringify(
    {
      sections: sections.length,
      headingCount,
      assets: assetMap.size,
      failures,
    },
    null,
    2,
  ),
);
