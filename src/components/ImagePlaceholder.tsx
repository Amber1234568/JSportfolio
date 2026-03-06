import { useState } from 'react';

interface SmartImageProps {
  src: string;
  alt: string;
  placeholderLabel: string;
  className?: string;
}

export function SmartImage({ src, alt, placeholderLabel, className = '' }: SmartImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-apple-light border-2 border-dashed border-gray-200 rounded-2xl gap-3 p-8 min-h-[200px] ${className}`}
      >
        <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6E6E73" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-apple-secondary text-sm font-medium">Drop image here</p>
          <p className="text-apple-secondary text-xs mt-1 font-mono opacity-70">{placeholderLabel}</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}
