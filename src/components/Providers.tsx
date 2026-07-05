"use client";

import { Toaster } from "sonner";
import { useEffect } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { RequestsProvider } from "@/context/RequestsContext";
import { FacultyProvider } from "@/context/FacultyContext";
import { UIProvider } from "@/context/UIContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import { initAnalytics } from "@/lib/firebase/analytics";
import { ensureFirestoreOnline } from "@/lib/firebase/connection";
import { isDemoMode } from "@/lib/firebase/config";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Ensure page starts at top on first load
    window.scrollTo(0, 0);

    if (isDemoMode) return;

    void (async () => {
      try {
        await ensureFirestoreOnline();
        await initAnalytics();
      } catch (error) {
        console.warn("Firebase init warning:", error);
      }
    })();
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <UIProvider>
          <RequestsProvider>
            <FacultyProvider>
              <ScrollToTop />
              {children}
              <Toaster position="top-right" richColors closeButton />
            </FacultyProvider>
          </RequestsProvider>
        </UIProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
