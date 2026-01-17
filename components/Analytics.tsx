"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    const event = {
      path: pathname,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
    };
  
    // For now, just log to console
    // Later: send to API endpoint
    console.log("[PageView]", event);
  }, [pathname]);

  return null;
}
