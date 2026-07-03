"use client";

import { DataErrorState } from "@/components/shared/DataErrorState";

interface TutorErrorStateProps {
  message?: string;
}

export function TutorErrorState({
  message = "Failed to load data from the backend server",
}: TutorErrorStateProps) {
  return <DataErrorState message={message} moduleName="Tutor" />;
}
