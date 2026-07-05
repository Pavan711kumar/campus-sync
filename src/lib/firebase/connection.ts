import { enableNetwork, waitForPendingWrites } from "firebase/firestore";
import { getFirebaseDb, isDemoMode } from "@/lib/firebase/config";

let connectionReady: Promise<void> | null = null;

/**
 * Ensure Firestore network is enabled before any read/write.
 * Fixes "client is offline" on first load in Next.js.
 */
export async function ensureFirestoreOnline(): Promise<void> {
  if (isDemoMode || typeof window === "undefined") return;

  if (!connectionReady) {
    connectionReady = (async () => {
      const db = getFirebaseDb();
      try {
        await enableNetwork(db);
        await waitForPendingWrites(db);
      } catch {
        // Network may already be enabled
      }
    })();
  }

  return connectionReady;
}

export function resetFirestoreConnection(): void {
  connectionReady = null;
}
