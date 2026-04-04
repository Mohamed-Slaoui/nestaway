import { useEffect, useState } from "react";

type CursorPosition = {
  x: number;
  y: number;
  visible: boolean;
};

export function CursorDot() {
  const [position, setPosition] = useState<CursorPosition>({
    x: 0,
    y: 0,
    visible: false,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");

    if (!mediaQuery.matches) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY, visible: true });
    };

    const handlePointerLeave = () => {
      setPosition((current) => ({ ...current, visible: false }));
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed z-[9999] hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-clay transition-opacity duration-200 md:block ${
        position.visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ left: position.x, top: position.y }}
    />
  );
}
