// hooks/useClickOutside.ts
import { useEffect } from "react";

const useClickOutside = (
  ref: React.RefObject<HTMLDivElement | null>,
  handler: () => void
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, handler]);
};

export default useClickOutside;
