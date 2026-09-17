/**
 * Scroll reveal.
 *
 * A marker element, nothing more: the animation lives in globals.css and is
 * driven by a view timeline. The content is present and visible in the server
 * HTML, and browsers without scroll-driven animation simply show it — which is
 * the right fallback, not a degraded one.
 */
export default function FadeIn({ children, className = '', as: Component = 'div' }) {
  return (
    <Component data-reveal className={className}>
      {children}
    </Component>
  );
}
