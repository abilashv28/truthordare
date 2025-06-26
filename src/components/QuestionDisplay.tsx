interface QuestionDisplayProps {
  onBackToCategories: () => void;
  onResetGame: () => void;
}
export default function QuestionDisplay({
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
