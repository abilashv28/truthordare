interface BottleSpinnerProps {
  spinning: boolean;
  angle: number;
  player1?: string;
  player2?: string;
  allPlayers?: string[];
  selectedPlayers: number[];
  actions: {
    handleSpin: () => void;
    handleBackToCategory: () => void;
    handleFullReset: () => void;
  };
}

export default function BottleSpinner({
  spinning,
  angle,
  allPlayers,
  selectedPlayers,
  actions
}: BottleSpinnerProps) {
  // Adjust radius based on number of players
  const playerCount = allPlayers?.length || 0;
  const radius = Math.min(120, 100 + (playerCount > 4 ? (playerCount - 4) * 8 : 0)); // adjust as needed
  const centerX = 150; // updated from 120
  const centerY = 150;
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[300px] h-[300px] flex items-center justify-center overflow-visible">
        {/* Circle outline to emphasize the player circle */}
        <div className="absolute w-[260px] h-[260px] rounded-full border-2 border-gray-300/50"></div>

        {/* Show all player names in a circle */}
        {allPlayers && allPlayers.length > 1 && allPlayers.map((name, idx) => {
          const angleDeg = (360 / allPlayers.length) * idx - 90; // start from top
          const angleRad = (angleDeg * Math.PI) / 180;
          const x = centerX + radius * Math.cos(angleRad);
          const y = centerY + radius * Math.sin(angleRad);

          // Highlight the selected player after spinning stops
          const isSelected = !spinning && selectedPlayers.includes(idx);

          // Adjust font size if there are many players
          const fontSize = playerCount > 6 ? 'text-xs' : 'text-sm';

          return (
            <div
              key={name + idx}
              className={`absolute ${fontSize} font-bold ${isSelected ? 'text-pink-600 bg-white' : 'text-gray-800 bg-white/90'} px-3 py-1 rounded-full shadow-md select-none ${isSelected ? 'scale-110 ring-2 ring-pink-500' : ''}`}
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: 'translate(-50%, -50%)',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                transition: 'all 0.3s ease',
                maxWidth: playerCount > 6 ? '100px' : '120px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                zIndex: isSelected ? 20 : 5,
                // Add a slight border to ensure visibility
                border: '1px solid rgba(0,0,0,0.1)'
              }}
            >
              {name}
            </div>
          );
        })}

        <img
          onClick={actions.handleSpin}
          src="/bottle.svg"
          alt="Spinning Bottle"
          className="w-40 h-40 drop-shadow-xl z-10"
          style={{
            transition: spinning ? 'transform 4.5s cubic-bezier(0.23, 1.2, 0.32, 1.1)' : 'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)',
            transform: `rotate(${angle}deg) scale(${spinning ? 1.08 : 1})`,
            filter: spinning ? 'brightness(1.1) drop-shadow(0 0 16px #a5b4fc)' : 'none',
          }}
        />
      </div>
    </div>
  );
}
