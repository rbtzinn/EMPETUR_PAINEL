import React, { useState, useEffect, useRef } from 'react';

export default function FadeIn({ children, delay = 0, direction = "up", className = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setIsVisible(true);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (isVisible) return 'translateY(0)';
    return direction === 'up' ? 'translateY(40px)' : 'translateY(0)';
  };

  return (
    <div
      ref={domRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: `${delay}s`
      }}
    >
      {children}
    </div>
  );
}
