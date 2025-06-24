import React from "react";

interface BottleSpinnerProps {
  spinning: boolean;
  result: "truth" | "dare" | null;
  onSpin: () => void;
  angle: number;
}

export default function BottleSpinner({ spinning, result, onSpin, angle }: BottleSpinnerProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-40 h-48 flex flex-col items-center justify-center">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-pink-600 font-bold text-lg select-none" style={{letterSpacing: 1}}>Truth</div>
        <img
          src="/bottle.svg"
          alt="Spinning Bottle"
          className="w-32 h-32 drop-shadow-xl"
          style={{
            transition: spinning ? 'transform 4.5s cubic-bezier(0.23, 1.2, 0.32, 1.1)' : 'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)',
            transform: `rotate(${angle}deg) scale(${spinning ? 1.08 : 1})`,
            filter: spinning ? 'brightness(1.1) drop-shadow(0 0 16px #a5b4fc)' : 'none',
          }}
        />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-blue-600 font-bold text-lg select-none" style={{letterSpacing: 1}}>Dare</div>
      </div>
      <button
        className="py-2 px-8 rounded-full bg-green-500 text-white font-bold shadow hover:bg-green-600 transition"
        onClick={onSpin}
        disabled={spinning}
      >
        {spinning ? "Spinning..." : "Spin the Bottle"}
      </button>
    </div>
  );
}
