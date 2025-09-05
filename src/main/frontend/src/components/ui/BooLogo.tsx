import React, { useEffect, useRef } from 'react';

export function BooLogo() {
  const textRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    const setupAnimation = async () => {
      if (textRef.current) {
        const textElement = textRef.current;

        // Wait a tick for the browser to render the SVG and calculate its length
        await new Promise(resolve => setTimeout(resolve, 100));

        const textLength = textElement.getTotalLength();
        if (textLength > 0) {
          textElement.style.strokeDasharray = textLength.toString();
          textElement.style.strokeDashoffset = textLength.toString();

          // Dynamically import and run the animation
          const anime = (await import('animejs')).default;
          anime({
            targets: textElement,
            strokeDashoffset: [textLength, 0],
            easing: 'easeInOutSine',
            duration: 2000,
            direction: 'alternate',
            loop: true,
          });
        }
      }
    };

    setupAnimation();
  }, []);

  return (
    <svg width="120" height="50" viewBox="0 0 120 50" className="text-purple-400">
      <style>
        {`
          .boo-text {
            font-family: 'Arial', sans-serif;
            font-size: 40px;
            font-weight: bold;
            stroke: currentColor;
            stroke-width: 1.5;
            fill: none;
          }
        `}
      </style>
      <text ref={textRef} x="5" y="40" className="boo-text">BOO</text>
    </svg>
  );
}
