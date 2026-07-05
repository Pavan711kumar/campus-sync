"use client";

import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import { getFirebaseApp } from "@/lib/firebase/config";

let analytics: Analytics | null = null;

export async function initAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") return null;
  if (analytics) return analytics;

  const supported = await isSupported();
  if (!supported) return null;

  try {
    analytics = getAnalytics(getFirebaseApp());
    return analytics;
  } catch {
    return null;
  }
}

export function getFirebaseAnalytics(): Analytics | null {
  return analytics;
}
