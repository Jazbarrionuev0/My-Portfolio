/**
 * Theme Variables Documentation
 *
 * This file serves as documentation for the color variables used in the portfolio.
 * The actual variables are defined in globals.css as CSS variables and in tailwind.config.ts
 *
 * Usage:
 * - In Tailwind classes: bg-portfolio-bg, text-portfolio-accent, etc.
 * - In CSS: var(--portfolio-bg), var(--portfolio-accent), etc.
 */

export const portfolioColors = {
  // Main colors
  background: "hsl(var(--portfolio-bg))", // #F8F3E3 - pastel light yellow/brown
  accent: "hsl(var(--portfolio-accent))", // #FF00CC - bright pink accent
  text: "hsl(var(--portfolio-text))", // Near black for text
  textMuted: "hsl(var(--portfolio-text-muted))", // Medium gray for less important text

  // Card colors
  cardBackground: "hsl(var(--portfolio-card-bg))", // Black for card background
  cardText: "hsl(var(--portfolio-card-text))", // White for text on dark cards
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
