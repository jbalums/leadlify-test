export function normalizeReferenceCss(css) {
  return css
    .replace(
      /url\("data:([^"\n]+)"\)/g,
      (_, value) => `url("data:${value.replace(/\\a\s*|\s+/g, "")}")`,
    )
    .replace(/\.payselect-container:visible:last\{[^}]*\}/g, "")
    .replaceAll("(min-width: 0\\0)", "(min-width: 0px)");
}
