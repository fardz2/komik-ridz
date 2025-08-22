"use client";

import { useState, useEffect, useRef } from "react";

interface Options {
  /**
   * Jumlah pixel scroll sebelum navbar mulai disembunyikan.
   * @default 50
   */
  threshold?: number;
}

/**
 * Hook untuk mendeteksi arah scroll dan mengatur visibilitas elemen.
 * @returns `true` jika elemen harus terlihat (scroll ke atas atau di area threshold), 
 * `false` jika harus disembunyikan (scroll ke bawah).
 */
export function useScrollVisibility({ threshold = 50 }: Options = {}): boolean {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Sembunyikan hanya jika scroll ke bawah dan melewati threshold
      if (currentScrollY > lastScrollY.current && currentScrollY > threshold) {
        setIsVisible(false);
      } else {
        // Tampilkan jika scroll ke atas
        setIsVisible(true);
      }
      
      // Update posisi scroll terakhir tanpa re-render
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]); // Effect hanya akan berjalan ulang jika threshold berubah

  return isVisible;
}