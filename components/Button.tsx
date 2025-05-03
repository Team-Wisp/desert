import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

const baseStyles = 'px-6 py-3 rounded-lg font-medium transition duration-200';

const variants = {
  primary: 'bg-[#111111] text-white hover:bg-[#333333]',
  secondary: 'bg-transparent text-[#111111] border border-[#111111] hover:bg-[#EAEAEA]',
  danger: 'bg-red-500 text-white hover:bg-red-600',
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  ...props
}) => {
  return (
    <button className={`${baseStyles} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
