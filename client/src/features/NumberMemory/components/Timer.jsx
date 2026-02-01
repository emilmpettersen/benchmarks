import React, { useEffect, useState } from 'react';

const Timer = ({ duration = 5000, size = 100, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const [progress, setProgress] = useState(1);

  useEffect(() => {
    let start = null;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const fraction = Math.max(1 - elapsed / duration, 0);
      setProgress(fraction);

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [duration]);

  const center = size / 2;

  return (
    <svg width={size} height={size}>
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke="#1e3a8a" // Tailwind's sky-800
        fill="none"
        strokeWidth={strokeWidth}
        opacity="0.2"
      />
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke="#fff"
        fill="none"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={circumference * progress}
        strokeLinecap="round"
        transform={`rotate(-90 ${center} ${center})`}
        style={{
          transition: 'stroke-dashoffset 50ms linear',
        }}
      />
    </svg>
  );
};

export default Timer;
