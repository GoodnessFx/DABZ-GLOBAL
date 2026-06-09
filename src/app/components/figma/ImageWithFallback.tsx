import React, { useState } from 'react'

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [error, setError] = useState(false);

  return (
    <img
      {...props}
      src={error ? "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80&auto=format&fit=crop" : props.src}
      onError={(e) => {
        setError(true);
        props.onError?.(e);
      }}
    />
  );
}
