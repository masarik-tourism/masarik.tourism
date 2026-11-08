import React from 'react';

interface WhatsAppIconProps {
  className?: string;
  variant?: 'colored' | 'white' | 'currentColor';
}

export const WhatsAppIcon: React.FC<WhatsAppIconProps> = ({
  className = 'w-4 h-4',
  variant = 'colored',
}) => {
  if (variant === 'colored') {
    return (
      <svg
        className={className}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Official WhatsApp Green circular background */}
        <circle cx="16" cy="16" r="16" fill="#25D366" />
        {/* Crisp white speech bubble ring outline with tail */}
        <path
          d="M16 6.5C10.75 6.5 6.5 10.75 6.5 16c0 1.77.48 3.42 1.33 4.84L6.5 25.5l4.81-1.26A9.45 9.45 0 0016 25.5c5.25 0 9.5-4.25 9.5-9.5S21.25 6.5 16 6.5z"
          stroke="white"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Solid white telephone handset inside the speech bubble */}
        <path
          d="M20.8 18.6c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.21-.24-.58-.49-.5-.67-.51-.17 0-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z"
          fill="white"
        />
      </svg>
    );
  }

  const strokeColor = variant === 'white' ? 'white' : 'currentColor';
  const fillColor = variant === 'white' ? 'white' : 'currentColor';

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 2.5C6.75 2.5 2.5 6.75 2.5 12c0 1.77.48 3.42 1.33 4.84L2.5 21.5l4.81-1.26A9.45 9.45 0 0012 21.5c5.25 0 9.5-4.25 9.5-9.5S17.25 2.5 12 2.5z"
        stroke={strokeColor}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M16.8 14.6c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.21-.24-.58-.49-.5-.67-.51-.17 0-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z"
        fill={fillColor}
      />
    </svg>
  );
};
