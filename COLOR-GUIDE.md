# Portfolio Theme Color System

This document provides a guide to the color system used in the portfolio project.

## Color Variables

The theme colors are defined as CSS variables in `src/app/globals.css` and are available through Tailwind utility classes.

### Main Colors

| Variable | HSL Value | Hex Value | Usage |
|----------|-----------|-----------|-------|
| `--portfolio-bg` | 43 77% 93% | #F8F3E3 | Main background color (light yellow/brown) |
| `--portfolio-accent` | 323 100% 50% | #FF00CC | Primary accent color (bright pink) |
| `--portfolio-text` | 0 0% 10% | #1A1A1A | Main text color (near black) |
| `--portfolio-text-muted` | 0 0% 40% | #666666 | Secondary text color (medium gray) |
| `--portfolio-card-bg` | 0 0% 0% | #000000 | Card background color |
| `--portfolio-card-text` | 0 0% 100% | #FFFFFF | Card text color |

## How to Use

### In Tailwind Classes

```jsx
<div className="bg-portfolio-bg">
  <h1 className="text-portfolio-text">Title</h1>
  <p className="text-portfolio-text-muted">Subtitle</p>
  <button className="bg-portfolio-accent text-portfolio-card-text">Click Me</button>
</div>

// Examples from the codebase:
<h4 className="text-portfolio-accent font-semibold">HELLO, MY NAME IS JAZMIN</h4>
<Button className="bg-portfolio-accent hover:bg-portfolio-accent">Category</Button>
```

### In CSS

```css
.my-element {
  background-color: hsl(var(--portfolio-bg));
  color: hsl(var(--portfolio-accent));
}
```

### In Inline Styles (Less Recommended)

```jsx
<div style={{ backgroundColor: 'hsl(var(--portfolio-accent))' }}>
  Content
</div>
```

## Benefits of This Approach

1. **Consistency**: All colors are defined in one place
2. **Maintainable**: Change a color once, it updates everywhere
3. **Semantic**: Variables are named after their purpose, not their value
4. **Dark Mode Ready**: The structure supports adding a dark theme in the future

## Technical Implementation

The system uses Tailwind CSS's theme extension and CSS variables. Here's how it works:

1. CSS variables are defined in `src/app/globals.css` using HSL values
2. Tailwind utility classes are mapped to these variables in `tailwind.config.ts`
3. Components use the utility classes instead of hardcoded color values
