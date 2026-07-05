"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import type { FacultyStatus, Appointment } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { demoAppointments } from "@/data/dummy";
import { toast } from "sonner";

interface FacultyContextType {
  appointments: Appointment[];
  status: FacultyStatus;
  acceptAppointment: (id: string) => void;
  declineAppointment: (id: string) => void;
  setStatus: (status: FacultyStatus) => void;
}

const FacultyContext = createContext<FacultyContextType | undefined>(undefined);

export function FacultyProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [status, setStatusState] = useState<FacultyStatus>("Available");
  const { user } = useAuth();

  // Load from session storage for persistence during demo
  useEffect(() => {
    if (user?.uid && user.role === "faculty") {
      const storedAppointments = sessionStorage.getItem(`campussync_faculty_appointments_${user.uid}`);
      const storedStatus = sessionStorage.getItem(`campussync_faculty_status_${user.uid}`);
      
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (storedAppointments) {
        setAppointments(JSON.parse(storedAppointments));
      } else {
        // Initialize with demo data if empty
        setAppointments(demoAppointments);
      }
      
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (storedStatus) {
        setStatusState(storedStatus as FacultyStatus);
      }
    } else {
      setAppointments([]);
      setStatusState("Available");
    }
  }, [user?.uid, user?.role]);

  // Save to session storage whenever state changes
  useEffect(() => {
    if (user?.uid && user.role === "faculty") {
      sessionStorage.setItem(`campussync_faculty_appointments_${user.uid}`, JSON.stringify(appointments));
      sessionStorage.setItem(`campussync_faculty_status_${user.uid}`, status);
    }
  }, [appointments, status, user?.uid, user?.role]);

  const acceptAppointment = useCallback(
    (id: string) => {
      setAppointments((prev) => 
        prev.map((apt) => (apt.id === id ? { ...apt, status: "confirmed" } : apt))
      );
      toast.success("Appointment confirmed!");
    },
    []
  );

  const declineAppointment = useCallback(
    (id: string) => {
      setAppointments((prev) => 
        prev.map((apt) => (apt.id === id ? { ...apt, status: "cancelled" } : apt))
      );
      toast.info("Appointment declined");
    },
    []
  );
  
  const setStatus = useCallback(
    (newStatus: FacultyStatus) => {
      setStatusState(newStatus);
      toast.success(`Status set to ${newStatus}`);
    },
    []
  );

  return (
    <FacultyContext.Provider value={{ appointments, status, acceptAppointment, declineAppointment, setStatus }}>
      {children}
    </FacultyContext.Provider>
  );
}

export function useFaculty() {
  const context = useContext(FacultyContext);
  if (context === undefined) {
    throw new Error("useFaculty must be used within a FacultyProvider");
  }
  return context;
}
