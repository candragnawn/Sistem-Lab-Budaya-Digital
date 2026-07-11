"use client";
import React from "react";

export default function ResearchBarChart({ 
  researchCount, 
  pengabdianCount, 
  publicationCount 
}: { 
  researchCount: number; 
  pengabdianCount: number; 
  publicationCount: number 
}) {
  const width = 320;
  const height = 160;
  const padding = 20;

  const maxVal = Math.max(researchCount, pengabdianCount, publicationCount, 1);

  const bars = [
    { label: "Penelitian", value: researchCount, color: "#0EA5A4" },
    { label: "Pengabdian", value: pengabdianCount, color: "#F59E0B" },
    { label: "Publikasi", value: publicationCount, color: "#60A5FA" },
  ];

  const barWidth = (width - padding * 2) / bars.length - 12;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        {bars.map((b, i) => {
          const x = padding + i * (barWidth + 12);
          const h = (b.value / maxVal) * (height - padding * 2);
          return (
            <g key={b.label}>
              <rect x={x} y={height - padding - h} width={barWidth} height={h} rx={6} fill={b.color} />
              <text x={x + barWidth / 2} y={height - padding + 14} fontSize={11} fill="#475569" textAnchor="middle">{b.label}</text>
              <text x={x + barWidth / 2} y={height - padding - h - 6} fontSize={12} fontWeight={700} fill="#0F172A" textAnchor="middle">{b.value}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
