import React from 'react';
import { Star } from 'lucide-react';

interface StarButtonProps {
  active: boolean;
  onToggle: () => void;
  label?: string;
  size?: number;
  className?: string;
}

/** Reusable star toggle that reflects wishlist membership. */
export function StarButton({
  active,
  onToggle,
  label = active ? 'Remove from My Schedule' : 'Add to My Schedule',
  size = 18,
  className = '',
}: StarButtonProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-pressed={active}
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center rounded-full transition-all active:scale-90 ${className}`}
    >
      <Star
        size={size}
        className={active ? 'text-tertiary fill-tertiary' : 'text-outline hover:text-tertiary'}
      />
    </button>
  );
}
