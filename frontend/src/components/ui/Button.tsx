import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]';

    const variants = {
      primary: 'bg-accent-orange text-white hover:bg-[#c44d2d] hover:-translate-y-0.5 shadow-sm hover:shadow-md',
      secondary: 'bg-off-white text-graphite hover:bg-[#dfd8d4] hover:-translate-y-0.5',
      outline: 'border border-gray-300 bg-transparent text-graphite hover:bg-gray-50 hover:-translate-y-0.5',
      ghost: 'text-graphite hover:bg-gray-100',
      danger: 'bg-alert text-white hover:bg-alert/90',
    };

    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 py-2',
      lg: 'h-12 px-8 text-lg uppercase tracking-widest text-xs font-bold',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, cn };
