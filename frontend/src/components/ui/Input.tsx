import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from './Button';

interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  multiline?: boolean;
}

const Input = forwardRef<HTMLInputElement & HTMLTextAreaElement, InputProps>(
  ({ className, label, error, multiline, ...props }, ref) => {
    const inputStyles = cn(
      'flex w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm transition-all placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-accent-orange focus:border-accent-orange disabled:cursor-not-allowed disabled:opacity-50',
      error && 'border-alert focus:ring-alert focus:border-alert',
      className
    );

    return (
      <div className="w-full">
        {label && (
          <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-secondary mb-1.5 ml-1">
            {label}
          </label>
        )}
        {multiline ? (
          <textarea
            ref={ref}
            className={cn(inputStyles, 'min-h-[100px] resize-none')}
            {...props as any}
          />
        ) : (
          <input
            ref={ref}
            className={cn('h-12', inputStyles)}
            {...props as any}
          />
        )}
        {error && (
          <p className="mt-1.5 text-xs text-alert font-medium ml-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
