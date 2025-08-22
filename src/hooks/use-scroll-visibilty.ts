"use client";

import { useState, useEffect, useRef } from "react";

interface Options {
  /**
   * Jumlah pixel scroll sebelum navbar mulai disembunyikan.
   * @default 50
   */
  threshold?: number;
}


export function useScrollVisibility({ threshold = 50 }: Options = {}): boolean {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      
      if (currentScrollY > lastScrollY.current && currentScrollY > threshold) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
     
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isVisible;
}