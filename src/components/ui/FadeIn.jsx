import React from 'react';
import { motion } from 'framer-motion';

export default function FadeIn({ 
  children, 
  delay = 0, 
  direction = "up", 
  className = "",
  duration = 0.6,
  staggerChildren = false
}) {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 }
  };

  const hiddenState = {
    opacity: 0,
    ...directions[direction]
  };

  const visibleState = {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: duration,
      delay: delay,
      ease: [0.16, 1, 0.3, 1], // Cubic bezier sofisticado
      when: staggerChildren ? "beforeChildren" : false,
      staggerChildren: staggerChildren ? 0.1 : 0
    }
  };

  return (
    <motion.div
      initial={hiddenState}
      whileInView={visibleState}
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}