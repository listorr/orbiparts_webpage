import React from 'react';

// Renders children only when scrolled into view (once). Falls back to immediate render if IntersectionObserver is unavailable.
export default function LazySection({ children, rootMargin = '200px 0px', className = '' }) {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (isVisible) return; // already visible
    if (!ref.current) return;
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { root: null, rootMargin, threshold: 0.01 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : null}
    </div>
  );
}
