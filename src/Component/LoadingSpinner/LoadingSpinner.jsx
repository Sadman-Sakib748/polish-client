import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[120px]">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-2 rounded bg-indigo-500"
            style={{
              height: "40px",
              animation: "wave-bounce 1s ease-in-out infinite",
              animationDelay: `${i * 0.15}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Custom animation */}
      <style>
        {`
          @keyframes wave-bounce {
            0%, 100% {
              transform: scaleY(0.5);
              opacity: 0.6;
            }
            50% {
              transform: scaleY(1.5);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner;
