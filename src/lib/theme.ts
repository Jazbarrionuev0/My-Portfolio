/**
 * Theme Variables Documentation
 *
 * This file serves as documentation for the color variables used in the portfolio.
 * The actual variables are defined in globals.css as CSS variables and in tailwind.config.ts
 *
 * Light Theme:
 * - Clean white background with accessible colors
 * - Purple accent for better contrast and accessibility
 * - High contrast text for readability
 *
 * Dark Theme:
 * - Dark background with bright pink accent (original design preserved)
 * - Pink accent color works well against dark backgrounds
 *
 * Usage:
 * - In Tailwind classes: bg-portfolio-bg, text-portfolio-accent, etc.
 * - In CSS: var(--portfolio-bg), var(--portfolio-accent), etc.
 */

export const portfolioColors = {
  // Main colors (theme-adaptive)
  background: "hsl(var(--portfolio-bg))", // White in light, dark in dark mode
  accent: "hsl(var(--portfolio-accent))", // Purple in light, pink in dark mode
  text: "hsl(var(--portfolio-text))", // Dark text for optimal readability
  textMuted: "hsl(var(--portfolio-text-muted))", // Accessible muted text

  // Card colors
  cardBackground: "hsl(var(--portfolio-card-bg))", // Light gray in light, dark in dark mode
  cardText: "hsl(var(--portfolio-card-text))", // Dark text in light, light text in dark mode
};

/**
 * How to use theme variables:
 *
 * 1. In Tailwind classes:
 *    <div className="bg-portfolio-bg text-portfolio-text">...</div>
 *    <button className="bg-portfolio-accent text-portfolio-card-text">...</button>
 *
 * 2. In CSS modules or styled components:
 *    .myClass {
 *      background-color: var(--portfolio-bg);
 *      color: var(--portfolio-text);
 *    }
 *
 * 3. In inline styles (not recommended, use Tailwind when possible):
 *    <div style={{ backgroundColor: 'hsl(var(--portfolio-bg))' }}>...</div>
 */
