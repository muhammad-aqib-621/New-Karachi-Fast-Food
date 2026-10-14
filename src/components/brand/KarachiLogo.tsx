import React from 'react';

interface KarachiLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const KarachiLogo: React.FC<KarachiLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const dimensions = {
    sm: { icon: 38, text: 'text-sm', sub: 'text-[9px]' },
    md: { icon: 46, text: 'text-base sm:text-lg', sub: 'text-[10px]' },
    lg: { icon: 64, text: 'text-xl sm:text-2xl', sub: 'text-xs' },
  }[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Circular Emblem Logo matching the authentic restaurant flyer */}
      <div
        className="relative shrink-0 rounded-full p-[2px] bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-500 shadow-md shadow-amber-500/20"
        style={{ width: dimensions.icon, height: dimensions.icon }}
      >
        <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden border border-amber-500/40 relative">
          {/* Subtle golden radial backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.25)_0%,_transparent_70%)]" />

          {/* SVG representation of the authentic emblem */}
          <svg
            viewBox="0 0 100 100"
            className="w-[88%] h-[88%] drop-shadow-sm"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer golden circular path with dots/stars */}
            <circle cx="50" cy="50" r="47" stroke="#F59E0B" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="42" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 2" />

            {/* Waffle Cone Basket Base */}
            <path
              d="M30 62 L38 82 Q50 86 62 82 L70 62 Q50 68 30 62 Z"
              fill="#D97706"
              stroke="#B45309"
              strokeWidth="1.5"
            />
            {/* Waffle lattice lines */}
            <path d="M35 66 L58 84" stroke="#92400E" strokeWidth="1" />
            <path d="M43 64 L65 78" stroke="#92400E" strokeWidth="1" />
            <path d="M65 66 L42 84" stroke="#92400E" strokeWidth="1" />
            <path d="M57 64 L35 78" stroke="#92400E" strokeWidth="1" />

            {/* Creamy Vanilla / Rabri Ice Cream Scoop */}
            <circle cx="50" cy="48" r="18" fill="#FEF3C7" />
            <path
              d="M32 54 Q40 60 50 56 Q60 60 68 54 Q65 40 50 34 Q35 40 32 54 Z"
              fill="#FDE68A"
            />

            {/* Chocolate / Rose syrup drizzle */}
            <path
              d="M40 38 Q45 46 44 54 M49 35 Q52 45 50 55 M57 39 Q55 48 58 53"
              stroke="#78350F"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Glossy Red Cherry on Top with Stem */}
            <circle cx="50" cy="27" r="7" fill="#DC2626" />
            <circle cx="48" cy="25" r="2" fill="#FCA5A5" opacity="0.9" />
            <path
              d="M50 21 Q55 12 62 14"
              stroke="#15803D"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            {/* Star at bottom */}
            <polygon
              points="50,88 52,93 57,93 53,96 55,100 50,97 45,100 47,96 43,93 48,93"
              fill="#F59E0B"
              transform="scale(0.8) translate(12, 10)"
            />
          </svg>
        </div>
      </div>

      {/* Brand Text Lockup */}
      {showText && (
        <div className="flex flex-col text-left leading-none">
          <span className={`font-black tracking-tight text-slate-900 dark:text-white uppercase ${dimensions.text}`}>
            New Karachi
          </span>
          <span className={`font-bold text-amber-600 dark:text-amber-400 tracking-wider uppercase ${dimensions.sub} mt-0.5`}>
            Fast Food &amp; Falooda
          </span>
        </div>
      )}
    </div>
  );
};
