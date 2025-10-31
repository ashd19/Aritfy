"use client";

import { useMotionValue, motion, useMotionTemplate } from "motion/react";
import React, { type MouseEvent as ReactMouseEvent, useState } from "react";
import { cn } from "@/lib/utils";

// Minimal local fallback for CanvasRevealEffect to avoid missing module errors.
// It provides the same props used by CardSpotlight and renders a simple decorative overlay.
const CanvasRevealEffect: React.FC<{
  containerClassName?: string;
  colors?: number[][];
  dotSize?: number;
}> = ({
  containerClassName = "",
  colors = [
    [59, 130, 246],
    [139, 92, 246],
  ],
}) => {
  return (
    <div className={containerClassName} aria-hidden>
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(circle at 20% 20%, rgba(${colors[0].join(
            ","
          )},0.35) 0px, transparent 40%), radial-gradient(circle at 80% 80%, rgba(${colors[1].join(
            ","
          )},0.35) 0px, transparent 40%)`,
        }}
      />
    </div>
  );
};

export const CardSpotlight = ({
  children,
  radius = 350,
  color = "#262626",
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  return (
    <div
      className={cn(
        "group/spotlight p-10 rounded-md relative border border-neutral-800 bg-black dark:border-neutral-800",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute z-0 -inset-px rounded-md opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          backgroundColor: color,
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `,
        }}
      >
        {isHovering && (
          <CanvasRevealEffect
            containerClassName="bg-transparent absolute inset-0 pointer-events-none"
            colors={[
              [59, 130, 246],
              [139, 92, 246],
            ]}
            dotSize={3}
          />
        )}
      </motion.div>

      <div className="relative z-10">{children}</div>
    </div>
  );
};
