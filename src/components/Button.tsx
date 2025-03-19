import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'icon';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  title?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  variant = 'primary', 
  className = '',
  title,
  disabled = false
}) => {
  const baseStyles = 'rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-indigo-600 text-white py-2 px-4 hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-white text-gray-700 py-2 px-4 border border-gray-300 hover:bg-gray-50 focus:ring-indigo-500',
    icon: 'p-2 text-gray-600 hover:bg-gray-100 focus:ring-indigo-500'
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      title={title}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
