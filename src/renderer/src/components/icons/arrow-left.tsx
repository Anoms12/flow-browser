"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

export interface ArrowLeftIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ArrowLeftIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  asChild?: boolean;
}

const pathVariants: Variants = {
  normal: { d: "m12 19-7-7 7-7", x: 0, scale: 1 },
  animate: {
    d: "m12 19-7-7 7-7",
    x: -5,
    scale: 1.1,
    transition: {
      duration: 0.4
    }
  }
};

const secondPathVariants: Variants = {
  normal: { d: "M19 12H5", x: 0, scale: 1 },
  animate: {
    d: "M19 12H5",
    x: -5,
    scale: 1.1,
    transition: {
      duration: 0.4
    }
  }
};

const ArrowLeftIcon = forwardRef<ArrowLeftIconHandle, ArrowLeftIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, asChild = false, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);
    const Comp = asChild ? Slot : "div";

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal")
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start("animate");
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start("normal");
        } else {
          onMouseLeave?.(e);
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <Comp
        className={cn(
          `cursor-pointer select-none hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
          asChild ? "" : "p-2",
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path d="m12 19-7-7 7-7" variants={pathVariants} animate={controls} />
          <motion.path d="M19 12H5" variants={secondPathVariants} animate={controls} />
        </svg>
      </Comp>
    );
  }
);

ArrowLeftIcon.displayName = "ArrowLeftIcon";

export { ArrowLeftIcon };
