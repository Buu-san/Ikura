---
version: alpha
name: Sunhouse Classic Retail
description: A high-contrast retail system with bold Vietnamese consumer branding, simple sans typography, and restrained component styling.
colors:
  primary: "#333333"
  secondary: "#E5E7EB"
  tertiary: "#82DFF0"
  neutral: "#FFFFFF"
  surface: "#FFFFFF"
  on-surface: "#333333"
  background: "#FFFFFF"
  accent: "#82DFF0"
  error: "#D64545"
typography:
  headline-display:
    fontFamily: "Stag Sans VU Semibold, Arial, sans-serif"
    fontSize: "40px"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  headline-lg:
    fontFamily: "Stag Sans VU Semibold, Arial, sans-serif"
    fontSize: "32px"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "0px"
  headline-md:
    fontFamily: "Stag Sans VU Medium, Arial, sans-serif"
    fontSize: "26px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0px"
  headline-sm:
    fontFamily: "Stag Sans VU Medium, Arial, sans-serif"
    fontSize: "22px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0px"
  body-lg:
    fontFamily: "Stag Sans VU Book, Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0px"
  body-md:
    fontFamily: "Stag Sans VU Book, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0px"
  body-sm:
    fontFamily: "Stag Sans VU Book, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0px"
  label-lg:
    fontFamily: "Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0px"
  label-md:
    fontFamily: "Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0px"
  label-sm:
    fontFamily: "Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0px"
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px
spacing:
  xs: 6px
  sm: 16px
  md: 26px
  lg: 40px
  xl: 132px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    height: "40px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    height: "40px"
  button-link:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: "0px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "16px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
---

# Sunhouse Classic Retail

## Overview
Sunhouse presents as a mainstream consumer-retail brand: familiar, trustworthy, and promotional rather than experimental. The visual tone is energetic but practical, with strong product merchandising, clear hierarchy, and a preference for straightforward navigation over dense storytelling. The interface feels spacious at the page level, yet individual components stay compact and utilitarian.

## Colors
- **Primary (#333333):** The main ink color for text, icons, and key controls. It reads as neutral charcoal rather than pure black, keeping the experience softer and more retail-friendly.
- **Secondary (#E5E7EB):** A light divider and border tone used to separate cards and panels without adding visual weight.
- **Tertiary (#82DFF0):** A bright accent used sparingly for highlights, utility cues, and decorative emphasis. It brings a modern pop against the otherwise subdued system.
- **Neutral (#FFFFFF):** The base white used for surfaces and contrast-heavy content areas.
- **Surface (#FFFFFF):** Card and panel backgrounds stay clean and white, reinforcing the brand’s simple, catalog-like presentation.
- **On-surface (#333333):** Default readable text on white backgrounds; keep it consistent to preserve clarity.
- **Background (#FFFFFF):** Overall page foundation is light, allowing photography and promotional imagery to carry the brand expression.
- **Error (#D64545):** Reserved for warnings or destructive states; it should feel assertive but not neon.

## Typography
The site relies on plain, highly legible sans serif typography with no decorative flair. Stag Sans VU is the preferred brand voice for headline and body content, while Arial acts as the pragmatic fallback and utility face for labels and UI chrome. Headings are semibold to medium in weight, with compact line heights and no noticeable letter-spacing treatment; labels and controls remain regular weight and simple, matching the no-nonsense retail tone. Use larger headlines for promotional messaging, body-md for general paragraph copy, and label sizes for navigation and buttons.

## Layout
The layout favors wide, full-bleed sections with content layered over large promotional imagery. Spacing is generous at the section level, using a rhythm that steps from 6px micro-gaps to large 40px and 132px structural jumps. Inside cards and controls, padding stays tight and efficient, typically around 8px 16px for actions and 16px for cards. The overall grid feels fixed-max-width visually, but the hero treatment expands edge-to-edge to maximize merchandising impact.

## Elevation & Depth
Depth is subtle and mostly created through image layering, borders, and contrast rather than strong shadows. Cards use a thin 1px border with little or no shadow, keeping the system clean and easy to scan. The primary promotional content gains emphasis through scale, overlap, and tonal separation instead of heavy elevation. This restraint helps the page feel stable and commercial rather than trendy.

## Shapes
The shape language is modest and pragmatic. Rounded corners are limited to 4px on buttons and 8px on cards, with 16px and full-round values reserved for softer utility elements like chips or pills. Overall, the system feels slightly softened but still structured, avoiding the playful, over-curved look common in consumer apps.

## Components
Buttons are compact and rectangular, built for quick retail interactions. `button-primary` uses a charcoal fill with white text, 4px corners, and 8px 16px padding for a clear call to action. `button-secondary` inverts this with a transparent fill and charcoal border, keeping the same sizing for consistency. `button-link` is text-only and should be reserved for low-emphasis navigation or inline actions. Hover and active states should remain restrained: lighten contrast slightly, but avoid dramatic color shifts or oversized shadows.

Cards use `card` as a clean white container with a light border, 8px radius, and 16px padding. They should frame products, promos, or content blocks without competing with imagery. Inputs follow the same low-friction language as cards: white surface, 4px rounding, charcoal text, and modest padding. Chips should be pill-shaped, compact, and quiet, used for metadata or filters rather than primary navigation.

Navigation and utility elements should stay minimal and text-led, matching the top bar in the screenshot. Icons can be used, but they should remain secondary to labels and never introduce a heavier visual system than the rest of the page.

## Do's and Don'ts
- Do keep text contrast high by pairing white surfaces with `#333333` ink.
- Do use the accent `#82DFF0` sparingly for highlights, not as a dominant brand fill.
- Do maintain compact button sizing and simple 4px radii for functional controls.
- Do rely on thin borders and spacing to separate content instead of heavy shadows.
- Don't introduce ornate gradients, glass effects, or highly layered elevation.
- Don't replace the clean sans-serif system with decorative or condensed display fonts.
- Don't round cards and inputs aggressively; preserve the restrained retail look.
- Don't overuse saturated colors in UI chrome, since the brand should feel practical and product-first.