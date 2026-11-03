---
version: alpha
name: Rinnai Modern
description: A clean, approachable retail and brand system with bright whitespace, one strong red accent, and soft editorial imagery.
colors:
  primary: "#cf000e"
  secondary: "#333333"
  tertiary: "#e5e7eb"
  neutral: "#ffffff"
  surface: "#ffffff"
  on-surface: "#333333"
  muted-surface: "#f5f5f5"
  border: "#e5e7eb"
  overlay: "#7a7474"
  success: "#2f855a"
  error: "#d64545"
typography:
  headline-display:
    fontFamily: Gilroy
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: 0px
  headline-lg:
    fontFamily: Gilroy
    fontSize: 32px
    fontWeight: 700
    lineHeight: 38px
    letterSpacing: 0px
  headline-md:
    fontFamily: Gilroy
    fontSize: 24px
    fontWeight: 700
    lineHeight: 29px
    letterSpacing: 0px
  headline-sm:
    fontFamily: Gilroy
    fontSize: 20px
    fontWeight: 500
    lineHeight: 28px
    letterSpacing: 0px
  title-md:
    fontFamily: Gilroy
    fontSize: 18px
    fontWeight: 500
    lineHeight: 22px
    letterSpacing: 0px
  body-lg:
    fontFamily: Gilroy
    fontSize: 16px
    fontWeight: 500
    lineHeight: 22.4px
    letterSpacing: 0px
  body-md:
    fontFamily: Gilroy
    fontSize: 16px
    fontWeight: 400
    lineHeight: 22px
    letterSpacing: 0px
  body-sm:
    fontFamily: Gilroy
    fontSize: 14px
    fontWeight: 500
    lineHeight: 20px
    letterSpacing: 0px
  label-lg:
    fontFamily: Gilroy
    fontSize: 16px
    fontWeight: 400
    lineHeight: 40px
    letterSpacing: 0px
  label-md:
    fontFamily: Gilroy
    fontSize: 14px
    fontWeight: 500
    lineHeight: 20px
    letterSpacing: 0px
  label-sm:
    fontFamily: Gilroy
    fontSize: 12px
    fontWeight: 500
    lineHeight: 16px
    letterSpacing: 0.02em
  nav-md:
    fontFamily: Gilroy
    fontSize: 16px
    fontWeight: 400
    lineHeight: 22px
    letterSpacing: 0px
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px
spacing:
  xs: 10px
  sm: 26px
  md: 40px
  lg: 60px
  xl: 110px
components:
  button-primary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.neutral}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    size: "120px"
    height: "40px"
  button-secondary:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.secondary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    size: "120px"
    height: "40px"
  button-tertiary:
    backgroundColor: "transparent"
    textColor: "{colors.secondary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: "0px"
    height: "auto"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "16px"
  input:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  chip:
    backgroundColor: "{colors.muted-surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    padding: "6px 12px"
---

# Rinnai Modern

## Overview
Rinnai’s visual language is clean, trustworthy, and family-oriented, with a light editorial feel rather than a dense utility interface. The system uses lots of white space, a single vivid red accent, and soft photography to communicate warmth, health, and reliability. Overall it feels professional but approachable, with straightforward hierarchy and minimal decoration.

## Colors
- **Primary (#cf000e):** A strong brand red used for the logo, section markers, and key emphasis. It should be reserved for moments that need immediate recognition or action.
- **Secondary (#333333):** A deep charcoal used for navigation, body text, and primary dark UI surfaces. It provides most of the contrast in the interface without feeling harsh black.
- **Neutral / Surface (#ffffff):** Pure white is the dominant canvas color, supporting the spacious, airy feel of the page and keeping attention on imagery and content.
- **Muted Surface (#f5f5f5):** A very light gray used for subtle separation in cards or blocks when a slightly warmer alternative to white is needed.
- **Border (#e5e7eb):** A soft gray for outlines and card boundaries. It adds structure without creating heavy visual weight.
- **Overlay (#7a7474):** A mid-tone gray suitable for overlays, captions, or muted bars placed over imagery.
- **Error (#d64545):** A clear red used for validation or destructive states; it should remain distinct from the brand accent while staying in the same warm family.
- **Success (#2f855a):** A restrained green for confirmation states, used sparingly so it does not compete with the red brand system.

## Typography
Gilroy is the core typeface across the interface, giving the site a modern, rounded, slightly friendly tone. Headlines use bold weights for clarity and brand confidence, while body copy is medium-weight or regular depending on emphasis. The scale centers on 32px, 24px, 20px, and 18px headings, with 16px body copy for readability and 14px labels for navigation and utility actions.

Uppercase styling is not a defining feature here; the system reads best in sentence case with clean, minimal letter spacing. Labels and small utility text can use a slightly tighter, more deliberate rhythm, but the overall typography should stay open and readable.

## Layout & Spacing
The layout is built around a wide desktop canvas with a strong full-bleed hero area and generous horizontal margins. Content blocks are separated by large vertical gaps, using the spacing rhythm in the 10px, 26px, 40px, 60px, and 110px range to preserve a calm, premium feel. Sections should feel airy rather than crowded, with cards and content rails aligned to a simple grid and consistent gutters.

Use large edge padding around major content areas and keep interior padding modest so imagery remains the primary focus. The interface favors fixed-width alignment on desktop, but components should still behave fluidly within their containers.

## Elevation & Depth
Depth is intentionally restrained. Rather than relying on shadows, the design separates layers through white space, subtle borders, and tonal overlays on imagery. The strongest visual hierarchy comes from contrast: red brand accents, dark text, and large photographic panels against white backgrounds.

When a card needs separation, use the light border and minimal padding defined in the card token set. Shadows should remain absent or extremely subtle so the system stays crisp and modern.

## Shapes
The shape language is soft and modest. Interactive elements use small radii, especially 4px for buttons and inputs, while larger containers can move to 8px for a slightly more relaxed editorial feel. Avoid exaggerated rounding; the brand should feel dependable, not playful or bubbly.

The overall silhouette is rectangular and stable, with rounded corners used only to soften edges slightly.

## Components
### Buttons
- **Primary (`button-primary`):** Dark charcoal fill with white text, 8px 16px padding, 40px height, and 4px radius. This is the main action style and should feel solid and dependable.
- **Secondary (`button-secondary`):** White background with charcoal border and text. Use it for lower-priority actions when you still want a clear clickable target.
- **Tertiary (`button-tertiary`):** Text-only, no border, no fill, and minimal padding. Use for lightweight navigation actions or inline triggers.
- **Hover states:** Strong emphasis can shift toward the brand red via `button-primary-hover`, but keep motion and styling restrained.

### Cards
Cards are simple white panels with a light border, 8px radius, and 16px padding. They should not rely on shadow for elevation. Content cards work best with concise copy, restrained imagery, and consistent internal spacing.

### Inputs
Inputs should use a white background, soft 4px radius, and modest 8px 12px padding. Borders should stay light and neutral so form fields blend into the page rather than dominate it.

### Chips
Use chips for compact labels, filters, or status markers. They should be pill-shaped via `rounded.full`, with muted backgrounds and clear dark text. Keep chip content short and avoid dense clusters.

### Navigation and links
Navigation items are lightweight and text-led, using 16px type and dark charcoal color. The dropdown chevrons and iconography should stay thin and understated. Links should remain simple and functional rather than decorative.

### Hero and promotional blocks
Hero sections should feel expansive and image-first, often with a dark translucent or charcoal caption bar over the bottom edge. Caption text is best kept large, white, and short for immediate legibility.

## Do's and Don'ts
- Do keep most of the interface on a white background with a single strong red accent.
- Do use Gilroy consistently across headings, navigation, and body copy.
- Do preserve generous spacing between sections and let photography breathe.
- Do prefer subtle borders over heavy shadows for structure.
- Don't introduce multiple bright accent colors that compete with the brand red.
- Don't use oversized corner radii or overly playful shapes.
- Don't crowd layouts with dense text blocks or tightly packed cards.
- Don't rely on deep shadows or complex effects to create hierarchy.