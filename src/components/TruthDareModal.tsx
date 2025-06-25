import type { GameMode } from "../types";

interface TruthDareModalProps {
  show: boolean;
  playerNames: string[];
  selectedPlayers: number[];
  activeModalPlayer: number | null;
  mode: GameMode;
  question: string;
  onPlayerChoice: (choice: "truth" | "dare", playerIdx: number) => void;
  onClose: () => void;
}

export default function TruthDareModal({
  show,
  playerNames,
  selectedPlayers,
  activeModalPlayer,
  mode,
  question,
  onPlayerChoice,
  onClose
}: TruthDareModalProps) {
  if (!show) return null;

  // If there's only one selected player, we randomly select another player to ask the question
  if (selectedPlayers.length === 1 && activeModalPlayer === null) {
    const askedPlayerIdx = selectedPlayers[0];
    // Get a random player (different from the asked player) to be the asker
    const availablePlayerIndices = playerNames.map((_, idx) => idx).filter(idx => idx !== askedPlayerIdx);
    // If there's only one player, they'll ask themselves
    const askerPlayerIdx = availablePlayerIndices.length > 0 
      ? availablePlayerIndices[Math.floor(Math.random() * availablePlayerIndices.length)]
      : askedPlayerIdx;
    
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center relative">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Time for Truth or Dare!
          </h2>
          
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="font-bold text-xl text-pink-600">
              {playerNames[askerPlayerIdx]} <span className="text-gray-600">will ask</span> {playerNames[askedPlayerIdx]}
            </div>
            
            <div className="flex gap-4 mt-2">
              <button
                className="py-3 px-6 rounded-full bg-blue-500 text-white font-bold shadow hover:bg-blue-600 transition transform hover:scale-105"
                onClick={() => onPlayerChoice("truth", askedPlayerIdx)}
              >
                Truth
              </button>
              <button
                className="py-3 px-6 rounded-full bg-pink-500 text-white font-bold shadow hover:bg-pink-600 transition transform hover:scale-105"
                onClick={() => onPlayerChoice("dare", askedPlayerIdx)}
              >
                Dare
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // If we have an active modal player and a question to display
  if (activeModalPlayer !== null && mode && question) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center relative">
          <div className="flex flex-col items-center gap-4">
            <div className="font-semibold text-lg text-pink-600">
              {playerNames[activeModalPlayer]}, your {mode}:
            </div>
            <div className="text-gray-700 text-base mb-2 p-4 bg-gray-50 rounded-lg">
              {question}
            </div>
            <button
              className="mt-2 py-2 px-6 rounded-full bg-green-500 text-white font-bold shadow hover:bg-green-600 transition"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return null;
}
