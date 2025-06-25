// No need to import GameMode as it's not used

interface PlayerTurnProps {
  playerName: string;
  onChooseTruth: () => void;
  onChooseDare: () => void;
}

export default function PlayerTurn({ 
  playerName, 
  onChooseTruth, 
  onChooseDare 
}: PlayerTurnProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-2xl font-semibold text-gray-800 animate-fade-in">
        {playerName}, choose:
      </div>
      <div className="flex gap-4 mb-2">
        <button
          className="py-2 px-6 rounded-full bg-blue-500 text-white font-bold shadow hover:bg-blue-600 transition"
          onClick={onChooseTruth}
        >
          Truth
        </button>
        <button
          className="py-2 px-6 rounded-full bg-pink-500 text-white font-bold shadow hover:bg-pink-600 transition"
          onClick={onChooseDare}
        >
          Dare
        </button>
      </div>
    </div>
  );
}
