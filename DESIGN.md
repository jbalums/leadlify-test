---
version: alpha
name: Invincible Marketer
description: A faithful recreation of the reference marketing page, with gold accents, black backgrounds, and Inter Tight typography.
colors:
  primary: "#d6af43"
  background: "#000000"
  surface: "#141414"
  light: "#f5f5f5"
  text: "#cccccc"
  white: "#ffffff"
  alert: "#e43b2c"
  focus: "#fbca2a"
typography:
  display:
    fontFamily: "Inter Tight, Arial, sans-serif"
    fontSize: "52px"
    lineHeight: "1.3"
  body:
    fontFamily: "Inter Tight, Arial, sans-serif"
    fontSize: "18px"
    lineHeight: "1.5"
rounded:
  DEFAULT: "15px"
  button: "20px"
  video: "50px"
  accordion: "10px"
spacing:
  page-max: "1170px"
  section: "40px"
  column-inset: "10px"
components:
  button:
    rounded: "20px"
  accordion:
    rounded: "10px"
---

# Invincible Marketer design

## Overview

The authoritative visual reference is https://class.theinvinciblemarketer.com/s/im/.
The user requested replication, so the original design and copy take precedence
over new creative directions. This is an English marketing landing page for
prospective affiliate marketing students, readable on desktop and phones.
The signature is metallic gold type and glowing video frames against black
textured backgrounds, alternating with light sections containing sales proof.

The CSS in `src/app/reference.css` owns the reference layout and presentation.
`src/app/globals.css` owns semantic tokens and accessibility enhancements.
This document mirrors those values. Original fonts are locally hosted Inter
Tight Regular and Bold, using the preserved `Name_of_the_font` CSS family alias.

## Colors

Gold denotes brand emphasis and calls to action. Black and near-black form the
main surfaces. White and light gray sections provide visual breaks for reviews
and testimonials. Gray supports longer passages. Red preserves the original
pricing notes and warning emphasis. A gold focus outline remains visible.
The metallic gradient uses #fbca2a, #fdf9ce, #c2922e, #eed688, and #d6bc65.

## Typography

Use the original locally served Inter Tight fonts for display and body text.
Desktop hero type is 52px with a 1.3 line height. Section headings are 45px;
body passages are generally 18px with a 1.5 line height. Preserve the original
mobile font-size classes. Only the hero is an h1; other prominent section titles
are h2 elements and long-form passages are regular text blocks.

## Layout

Preserve the reference's 1170px centered container, original column proportions,
spacing, section order, and desktop/mobile variants. At 767px and below, columns
stack, mobile-specific imagery replaces desktop variants, and headline type
reduces. Videos reserve a 16:9 frame and reviews reserve their original 1000px
embed height. The main document owns scrolling.
Document images keep their intrinsic width/height attributes for space reservation,
with `max-width: 100%` and `height: auto` in globals.css so they resize proportionally.

## Elevation & Depth

Retain gold glows around main video frames and the founder panel. Light cards
use the source's faint shadow. Preserve textured background assets instead of
approximating them with unrelated generated graphics.

## Shapes

Gold call-to-action buttons use 20px rounded corners. Large video frames use
50px corners on desktop and 20px on mobile. FAQ items use 10px corners.

## Components

The page has ten React sections. `VideoEmbed` is the shared responsive media
primitive. FAQs use native details/summary with the source content and styling,
supporting pointer, touch, Enter, and Space. CTAs lead to the original checkout;
policy links lead to their original destinations. No checkout is simulated.

The runtime token mapping is direct: `colors.primary` maps to `--color-gold`,
`colors.background` to `--color-background`, `colors.surface` to `--color-surface`,
and the other named colors to their matching `--color-*` variables in globals.css.
The common font stack maps to `--font-body`. Component-specific reference values
remain in reference.css and inline React styles.

Preserve the original Font Awesome icon family with locally hosted fonts.
Hover and pressed states exist on links and FAQ controls. Visible focus applies
to links, summaries, buttons, and media frames. Reduced motion disables button
shine and pulse animation. Native scrollbars remain visible and themed.

## Do's and Don'ts

- Preserve all visible reference sections, proof images, testimonials, and copy.
- Keep media aspect ratios stable and navigation destinations explicit.
- Keep local assets independent of the source page's builder runtime.
- Avoid adding unrelated navigation, dashboards, or a new visual identity.
- Do not import the original tracking or funnel-platform scripts.
