import React from 'react';

interface KiorexLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const KiorexLogo: React.FC<KiorexLogoProps> = ({ 
  className = '', 
  size = 'md', 
  showText = false 
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          icon: 'w-6 h-6',
          text: 'text-sm'
        };
      case 'lg':
        return {
          icon: 'w-12 h-12',
          text: 'text-2xl'
        };
      default: // md
        return {
          icon: 'w-8 h-8',
          text: 'text-lg'
        };
    }
  };

  const sizes = getSizeClasses();

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Stethoscope Icon (no container) */}
      <svg 
        className={sizes.icon} 
        viewBox="0 0 60 60" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Chest piece (circular) */}
        <circle cx="30" cy="40" r="12" fill="none" stroke="#3B82F6" strokeWidth="3.5"/>
        
        {/* Stem with curved tubing */}
        <path 
          d="M30 28 L30 10 Q30 3, 22 3" 
          stroke="#3B82F6" 
          strokeWidth="3.5" 
          fill="none" 
          strokeLinecap="round"
        />
        
        {/* Ear tips */}
        <circle cx="20" cy="3" r="3.5" fill="#4ADE80"/>
        <circle cx="15" cy="3" r="3.5" fill="#4ADE80"/>
        
        {/* K letter in chest piece */}
        <text 
          x="30" 
          y="45" 
          fontSize="14" 
          fontWeight="bold" 
          fill="#3B82F6" 
          textAnchor="middle"
          fontFamily="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        >
          K
        </text>
      </svg>
      
      {/* Text */}
      {showText && (
        <span className={`${sizes.text} font-bold bg-gradient-primary bg-clip-text text-transparent`}>
          Kiorex
        </span>
      )}
    </div>
  );
};

export default KiorexLogo;
