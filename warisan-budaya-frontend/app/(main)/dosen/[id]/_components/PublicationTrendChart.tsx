"use client";
import React from "react";

type Activity = { year: number; count: number };

export default function PublicationTrendChart({ data }: { data: Activity[] }) {
  const width = 700;
  const height = 160;
  const padding = 24;

  if (!data || data.length === 0) {
    return <div className="h-40 flex items-center justify-center text-sm text-slate-400">No data</div>;
  }

  const years = data.map((d) => d.year);
  const counts = data.map((d) => d.count);
  const minY = 0;
  const maxY = Math.max(...counts) || 1;

  const x = (i: number) => padding + (i * (width - padding * 2)) / (data.length - 1);
  const y = (v: number) => height - padding - ((v - minY) * (height - padding * 2)) / (maxY - minY || 1);

  const pathD = data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(d.count)}`)
    .join(" ");

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        <defs>
          <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
        <path d={`${pathD} L ${x(data.length - 1)} ${height - padding} L ${x(0)} ${height - padding} Z`} fill="url(#grad)" />
        <path d={pathD} fill="none" stroke="#2563EB" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        {data.map((d, i) => (
          <g key={d.year}>
            <circle cx={x(i)} cy={y(d.count)} r={3.5} fill="#1D4ED8" />
          </g>
        ))}

        {/* X labels */}
        {data.map((d, i) => (
          <text key={d.year} x={x(i)} y={height - 6} fontSize={10} fill="#64748B" textAnchor="middle">
            {d.year}
          </text>
        ))}
      </svg>
    </div>
  );
}
