"use client";

import { useEffect, useState } from "react";

const CAMP_DATE = new Date("2026-07-11T07:30:00-07:00").getTime();

function getTimeLeft() {
  const now = Date.now();
  const diff = CAMP_DATE - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) {
    return (
      <div className="flex gap-4 sm:gap-6">
        {["Days", "Hours", "Min", "Sec"].map((label) => (
          <div key={label} className="flex flex-col items-center">
            <span className="text-3xl font-black tabular-nums tracking-tight text-white/20 sm:text-4xl md:text-5xl">
              --
            </span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/25">
              {label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  const blocks = [
    { value: time.days, label: "Days" },
    { value: time.hours, label: "Hours" },
    { value: time.minutes, label: "Min" },
    { value: time.seconds, label: "Sec" },
  ];

  return (
    <div className="flex gap-4 sm:gap-6">
      {blocks.map((block) => (
        <div key={block.label} className="flex flex-col items-center">
          <span className="text-3xl font-black tabular-nums tracking-tight text-white sm:text-4xl md:text-5xl">
            {String(block.value).padStart(2, "0")}
          </span>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/35">
            {block.label}
          </span>
        </div>
      ))}
    </div>
  );
}
