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
