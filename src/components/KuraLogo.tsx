import React from 'react';

interface LogoProps {
  className?: string;
  size?: number | string;
}

export function KuraLogoIcon({ className = '', size = 32 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="kuraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" /> {/* Electric Cyan */}
          <stop offset="50%" stopColor="#1E3A8A" /> {/* Deep Royal */}
          <stop offset="100%" stopColor="#0F2744" /> {/* KURA Navy */}
        </linearGradient>
        <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Background Soft Medical Shield/Cross */}
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 7H13V11H17V13H13V17H11V13H7V11H11V7Z"
        fill="url(#kuraGradient)"
        opacity="0.12"
      />

      {/* Stylized 'K' Vertical Stem */}
      <rect
        x="5.5"
        y="4.5"
        width="2"
        height="15"
        rx="1"
        fill="url(#kuraGradient)"
      />

      {/* Stylized 'K' Diagonal Upper Arm */}
      <path
        d="M7 11.5L14.5 5"
        stroke="url(#kuraGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Stylized 'K' Diagonal Lower Arm */}
      <path
        d="M9.5 10L14.5 19"
        stroke="url(#kuraGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* EKG Heartbeat Pulse Intersecting the Logo */}
      <path
        d="M2.5 12H4.5L5.5 9.5L7 14L8 11L9.5 12.5L12 12H13.5L15 9L16.5 15L18 11.5L19.5 12H21.5"
        stroke="#38BDF8"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#logoGlow)"
        opacity="0.95"
      />
    </svg>
  );
}

export function KuraFullLogo({ className = '', size = 36 }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="w-10 h-10 rounded-2xl bg-white border border-[#D1E5F4] flex items-center justify-center shadow-xs transition-transform hover:scale-105">
        <KuraLogoIcon size={size} />
      </div>
      <div className="flex flex-col">
        <span className="cherry-title text-2xl font-bold text-[#0F2744] tracking-wide leading-none">KURA</span>
        <span className="text-[9px] font-extrabold tracking-wider text-[#38BDF8] uppercase leading-none mt-1">
          LITERACY AI
        </span>
      </div>
    </div>
  );
}
