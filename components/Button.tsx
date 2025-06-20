import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'medium' | 'large';
}

const baseStyles = 'rounded-full font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black shadow-sm';

const sizeStyles = {
  medium: 'px-6 py-2 text-base',
  large: 'px-8 py-3 text-lg',
};

const variants = {
  primary: 'bg-black text-white hover:bg-[#222]',
  secondary: 'bg-white text-black border border-black hover:bg-[#f3f3f3]',
  danger: 'bg-red-500 text-white hover:bg-red-600',
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  ...props
}) => {
  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizeStyles[size]} cursor-pointer`} {...props}>
      {children}
    </button>
  );
};

export default Button;
