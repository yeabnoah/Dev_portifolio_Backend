"use client";

import SkillInterface from "@/interface/skills";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface InfiniteMovingCardsProps {
  data: SkillInterface[];
  direction: "left" | "right";
  speed: "slow" | "medium" | "fast";
  className?: string;
  pauseOnHover?: boolean;
}

export const InfiniteMovingCards: React.FC<InfiniteMovingCardsProps> = ({
  data,
  direction,
  speed,
  className,
  pauseOnHover,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "medium") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-5xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
      style={{
        display: "flex",
        width: "100%",
      }}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 md:gap-6 gap-2 items-center py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          display: "flex",
          animation: `scroll ${containerRef.current?.style.getPropertyValue(
            "--animation-duration"
          )} linear infinite ${containerRef.current?.style.getPropertyValue(
            "--animation-direction"
          )}`,
        }}
      >
        {data.map((item) => (
          <li
            className="w-full relative rounded-2xl px-2 py-6 md:w-[100px] border border-b-0 border-none flex-grow-0"
            key={item.id}
          >
            <div className="flex flex-col items-center justify-center gap-2">
              {/* Dynamically render the skill icon */}
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-6 h-6 text-gray-900 dark:text-white"
              />
              <div className="text-center">
                <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {item.name}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};