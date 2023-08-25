import React from 'react';
interface IBallIconProps {
  className: string;
}
function BallIcon({ className }: IBallIconProps) {
  return (
    <svg fill="currentColor" className={className} viewBox="0 0 16 16">
      <path
        fillRule="evenodd"
        d="M8 1c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.14-7-7 3.14-7 7-7zm-.01 1.73c-1.35 0-2.57.52-3.5 1.35l.92.55-.66 2.48-2.01.72V8c0 .67.13 1.31.36 1.9l.94-.48 1.55 1.73-.25 1.38c.78.46 1.69.73 2.66.73a5.29 5.29 0 005.26-5.28c0-1.51-.65-2.87-1.67-3.83l-.88.81-2.72-1.15.29-1.07c-.1-.01-.19-.01-.29-.01zm2.51 4.1l1.39 2.54-2.07 2.29-2.08-.81V7.83l2.76-1z"
      ></path>
    </svg>
  );
}

export default BallIcon;
