import React from 'react'

interface VaadroLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'blue' | 'white'
}

export const VaadroLogo: React.FC<VaadroLogoProps> = ({ 
  className = '', 
  size = 'md',
  variant = 'blue'
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  }

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  }

  const isWhite = variant === 'white'

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* Droplet Icon with realistic gradient */}
      <div className="relative flex items-center justify-center mb-1">
        <svg 
          viewBox="0 0 40 46" 
          className={`${iconSizes[size]} drop-shadow-sm transition-transform hover:scale-105 duration-300`} 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="dropletGrad" x1="6" y1="4" x2="34" y2="42" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#03459c" />
            </linearGradient>
            <linearGradient id="dropletHighlight" x1="12" y1="8" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Main Droplet Outer Ring */}
          <path 
            d="M20 3C20 3 6 18.5 6 29C6 36.732 12.268 43 20 43C27.732 43 34 36.732 34 29C34 18.5 20 3 20 3Z" 
            fill="url(#dropletGrad)" 
          />
          {/* Internal Water Drop Cutout / Core */}
          <path 
            d="M20 12C20 12 11 23 11 30C11 35 15 39 20 39C25 39 29 35 29 30C29 23 20 12 20 12Z" 
            fill={isWhite ? "#03459c" : "#ffffff"} 
          />
          {/* Inner Droplet Seed */}
          <path 
            d="M20 18C20 18 15 26 15 30.5C15 33.5 17.2 36 20 36C22.8 36 25 33.5 25 30.5C25 26 20 18 20 18Z" 
            fill="url(#dropletGrad)" 
          />
          {/* Shiny Specular Highlight */}
          <ellipse cx="16" cy="24" rx="2.5" ry="5" transform="rotate(-25 16 24)" fill="url(#dropletHighlight)" />
        </svg>
      </div>

      {/* Brand Title */}
      <div className="flex items-center tracking-wider">
        <span 
          className={`font-extrabold tracking-tight ${textSizes[size]} ${
            isWhite ? 'text-white' : 'text-[#024381]'
          } font-sans`}
          style={{ letterSpacing: '0.04em' }}
        >
          VAADRO
        </span>
        <span className={`text-[10px] font-bold ml-0.5 align-super ${
          isWhite ? 'text-white' : 'text-[#024381]'
        }`}>
          ®
        </span>
      </div>
    </div>
  )
}

