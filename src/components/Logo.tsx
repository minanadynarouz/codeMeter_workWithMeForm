import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = "", size = 32 }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      width={size}
      height={size}
      className={className}
    >
      <defs>
        <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Outer Cross / Circuit Shape */}
      <path
        d="M35 15 C35 25, 25 35, 15 35 C10 35, 8 40, 8 50 C8 60, 10 65, 15 65 C25 65, 35 75, 35 85 C35 90, 40 92, 50 92 C60 92, 65 90, 65 85 C65 75, 75 65, 85 65 C90 65, 92 60, 92 50 C92 40, 90 35, 85 35 C75 35, 65 25, 65 15 C65 10, 60 8, 50 8 C40 8, 35 10, 35 15 Z"
        className="stroke-indigo-600 dark:stroke-cyan-400"
        strokeWidth="2.5"
        strokeLinejoin="round"
        filter="url(#logo-glow)"
      />
      
      {/* Circuit Traces inside the Cross Arms */}
      <g className="stroke-indigo-600 dark:stroke-cyan-400 fill-indigo-600 dark:fill-cyan-400">
        {/* Top Arm Traces */}
        <path d="M42 24 L42 14" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="42" cy="14" r="1.5" />
        <path d="M50 26 L50 11" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="50" cy="11" r="1.5" />
        <path d="M58 24 L58 14" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="58" cy="14" r="1.5" />
        
        {/* Bottom Arm Traces */}
        <path d="M42 76 L42 86" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="42" cy="86" r="1.5" />
        <path d="M50 74 L50 89" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="50" cy="89" r="1.5" />
        <path d="M58 76 L58 86" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="58" cy="86" r="1.5" />

        {/* Left Arm Traces */}
        <path d="M24 42 L14 42" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="14" cy="42" r="1.5" />
        <path d="M26 50 L11 50" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="11" cy="50" r="1.5" />
        <path d="M24 58 L14 58" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="14" cy="58" r="1.5" />

        {/* Right Arm Traces */}
        <path d="M76 42 L86 42" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="86" cy="42" r="1.5" />
        <path d="M74 50 L89 50" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="89" cy="50" r="1.5" />
        <path d="M76 58 L86 58" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="86" cy="58" r="1.5" />
      </g>

      {/* Central Shield */}
      <path
        d="M50 32 L68 36 C68 48, 62 58, 50 64 C38 58, 32 48, 32 36 Z"
        className="fill-indigo-950/20 dark:fill-slate-950/60 stroke-indigo-600 dark:stroke-cyan-400"
        strokeWidth="2.5"
        strokeLinejoin="round"
        filter="url(#logo-glow)"
      />

      {/* Inside Shield: Core Circle and Nodes */}
      <g className="stroke-indigo-600 dark:stroke-cyan-400 fill-indigo-600 dark:fill-cyan-400">
        <circle cx="50" cy="48" r="4.5" filter="url(#logo-glow)" />
        
        {/* Radiating circuit traces from the center circle */}
        <path d="M50 43.5 L50 38" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="50" cy="38" r="1.5" />
        
        <path d="M50 52.5 L50 58" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="50" cy="58" r="1.5" />

        <path d="M45.5 48 L40 48" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="40" cy="48" r="1.5" />

        <path d="M54.5 48 L60 48" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="60" cy="48" r="1.5" />

        {/* Diagonals */}
        <path d="M46.8 44.8 L43 41" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="43" cy="41" r="1.5" />

        <path d="M53.2 44.8 L57 41" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="57" cy="41" r="1.5" />

        <path d="M46.8 51.2 L43 55" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="43" cy="55" r="1.5" />

        <path d="M53.2 51.2 L57 55" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="57" cy="55" r="1.5" />
      </g>
    </svg>
  );
}
