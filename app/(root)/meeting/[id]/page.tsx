"use client";

import React from "react";
import MeetingWrapper from "@/components/meeting-wrapper";
import { useParams } from "next/navigation";

const Meeting = () => {
  const { id } = useParams();
  return <MeetingWrapper id={id as string} />;
};

export default Meeting;
