"use client";

import React from "react";
import Clock from "react-live-clock";

const Time = ({ variant }: { variant: "time" | "date" }) => {
  const now = new Date();
  const present = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(now);
  return (
    <>
      {variant === "time" && <Clock format="h:mm a" ticking={true} />}
      {variant === "date" && (
        <Clock format="DD/MM/YYYY" ticking={true}>
          {present}
        </Clock>
      )}
    </>
  );
};

export default Time;
