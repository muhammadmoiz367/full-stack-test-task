import React from 'react';

interface IconProps {
  Icon: React.ElementType;
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}

const IconButton: React.FC<IconProps> = ({
  Icon,
  onClick,
  className,
  ariaLabel,
}) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`flex items-center ${className}`}
      aria-label={ariaLabel}
    >
      <Icon className='h-5 w-5 text-gray-600' aria-hidden='true' />
    </button>
  );
};

export default IconButton;
