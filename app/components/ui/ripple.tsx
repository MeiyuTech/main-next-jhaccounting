import React, { CSSProperties } from "react";

import { cn } from "@/lib/utils";

interface RippleProps {
  mainCircleSize?: number;
  numCircles?: number;
  className?: string;
  startColor?: string;
  endColor?: string;
}

const Ripple = React.memo(function Ripple({
  mainCircleSize = 210,
  numCircles = 3,
  className,
  startColor = "rgba(255, 255, 0, 0.2)",
  endColor = "rgba(255, 200, 0, 0.8)",
}: RippleProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 [mask-image:linear-gradient(to_bottom,white,transparent)]",
        className,
      )}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize - i * 20;
        const delay = `${i * 0.5}s`;
        const currentColor = interpolateColor(startColor, endColor, i / (numCircles - 1));

        return (
          <div
            key={i}
            className="absolute rounded-full animate-breathe"
            style={
              {
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: currentColor,
                animationDelay: delay,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
});

// 颜色插值函数
function interpolateColor(color1: string, color2: string, factor: number) {
  const c1 = parseRGBA(color1);
  const c2 = parseRGBA(color2);

  const r = Math.round(c1.r + factor * (c2.r - c1.r));
  const g = Math.round(c1.g + factor * (c2.g - c1.g));
  const b = Math.round(c1.b + factor * (c2.b - c1.b));
  const a = c1.a + factor * (c2.a - c1.a);

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

// 解析 RGBA 颜色字符串
function parseRGBA(color: string) {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)/);
  return match
    ? {
        r: parseInt(match[1]),
        g: parseInt(match[2]),
        b: parseInt(match[3]),
        a: match[4] ? parseFloat(match[4]) : 1,
      }
    : { r: 0, g: 0, b: 0, a: 1 };
}

Ripple.displayName = "Ripple";

export default Ripple;
