import type { GameMode } from "../types";

interface QuestionDisplayProps {
  playerName: string;
  mode: GameMode;
  question: string;
  onNextTurn: () => void;
  onBackToCategories: () => void;
  onResetGame: () => void;
}

export default function QuestionDisplay({
  playerName,
  mode,
  question,
  onNextTurn,
  onBackToCategories,
  onResetGame
}: QuestionDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-2xl font-semibold text-gray-800 animate-fade-in">
        {playerName}, your {mode === "truth" ? "Truth" : "Dare"}:
      </div>
      <div className="text-xl text-gray-700 mb-2 animate-fade-in">
        {question}
      </div>
      <button
        className="mt-2 py-2 px-6 rounded-full bg-green-500 text-white font-bold shadow hover:bg-green-600 transition"
        onClick={onNextTurn}
      >
        Next Turn
      </button>
      <button
        className="text-xs text-gray-500 underline"
        onClick={onBackToCategories}
      >
        Back to Categories
      </button>
      <button
        className="text-xs text-red-500 underline mt-2"
        onClick={onResetGame}
      >
        Reset Game
      </button>
    </div>
  );
}
