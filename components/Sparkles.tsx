
"use client";
import React, { useEffect, useState } from "react";

interface SparklesCoreProps {
  id: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}

export const SparklesCore: React.FC<SparklesCoreProps> = ({
  id,
  background = "transparent",
  minSize = 0.4,
  maxSize = 1,
  particleDensity = 1200,
  className,
  particleColor = "#FFFFFF",
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  
  // This is a simplified placeholder for a particle effect.
  // A real implementation would use a library like tsParticles or a custom canvas animation.
  // For this example, we will simulate a static starfield with CSS.

  const stars = Array.from({ length: particleDensity / 10 }).map((_, i) => {
    const style = {
      position: 'absolute' as 'absolute',
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${Math.random() * (maxSize - minSize) + minSize}px`,
      height: `${Math.random() * (maxSize - minSize) + minSize}px`,
      backgroundColor: particleColor,
      borderRadius: '50%',
      animation: `twinkle ${Math.random() * 5 + 2}s linear infinite`,
    };
    return <div key={i} style={style}></div>;
  });

  return (
    <div id={id} className={`relative w-full h-full ${className}`} style={{ background }}>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
      {stars}
    </div>
  );
};
