"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Reset scroll on route change — prevents off-screen portal/layout glitches */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);

  return null;
}
