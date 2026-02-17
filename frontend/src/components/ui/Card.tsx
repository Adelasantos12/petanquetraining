import { ReactNode } from 'react';
import { cn } from './Button';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function Card({ children, className, hoverEffect = false }: CardProps) {
  return (
    <div className={cn(
      "bg-white border border-gray-100 rounded-xl p-6 transition-all duration-300",
      hoverEffect && "hover:border-accent-orange/20 hover:shadow-xl hover:shadow-accent-orange/5 hover:-translate-y-1",
      className
    )}>
      {children}
    </div>
  );
}
