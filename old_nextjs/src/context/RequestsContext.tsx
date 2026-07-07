"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import type { TrackedRequest, RequestType, RequestStatus } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface RequestsContextType {
  requests: TrackedRequest[];
  addRequest: (type: RequestType, targetId: string, targetName: string) => void;
  cancelRequest: (id: string) => void;
  hasRequested: (targetId: string) => boolean;
}

const RequestsContext = createContext<RequestsContextType | undefined>(undefined);

export function RequestsProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<TrackedRequest[]>([]);
  const { user } = useAuth();

  // Load from session storage for persistence during demo
  useEffect(() => {
    if (user?.uid) {
      const stored = sessionStorage.getItem(`campussync_requests_${user.uid}`);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setRequests(JSON.parse(stored));
    } else {
      setRequests([]);
    }
  }, [user?.uid]);

  // Save to session storage whenever requests change
  useEffect(() => {
    if (user?.uid) {
      sessionStorage.setItem(`campussync_requests_${user.uid}`, JSON.stringify(requests));
    }
  }, [requests, user?.uid]);

  const addRequest = useCallback(
    (type: RequestType, targetId: string, targetName: string) => {
      if (!user) {
        toast.error("You must be logged in to make a request.");
        return;
      }
      
      const newRequest: TrackedRequest = {
        id: `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        type,
        targetId,
        targetName,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      
      setRequests((prev) => [...prev, newRequest]);
      toast.success(`Request sent for ${targetName}`);
    },
    [user]
  );

  const cancelRequest = useCallback((id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    toast.success("Request cancelled");
  }, []);

  const hasRequested = useCallback(
    (targetId: string) => {
      return requests.some((r) => r.targetId === targetId);
    },
    [requests]
  );

  return (
    <RequestsContext.Provider value={{ requests, addRequest, cancelRequest, hasRequested }}>
      {children}
    </RequestsContext.Provider>
  );
}

export function useRequests() {
  const context = useContext(RequestsContext);
  if (context === undefined) {
    throw new Error("useRequests must be used within a RequestsProvider");
  }
  return context;
}
