import type { ViewType } from "../types";

interface NavigationProps {
  view: ViewType;
  onToggleView: () => void;
}

export default function Navigation({ view, onToggleView }: NavigationProps) {
  return (
    <nav className="bg-white/80 rounded-lg shadow-md p-4 mb-6 flex justify-center space-x-6">
      <button
        className={`px-4 py-2 rounded-full font-semibold transition ${
          view === "game"
            ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white"
            : "text-gray-600 hover:text-gray-800"
        }`}
        onClick={() => onToggleView()}
      >
        Play Game
      </button>
      <button
        className={`px-4 py-2 rounded-full font-semibold transition ${
          view === "blog"
            ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white"
            : "text-gray-600 hover:text-gray-800"
        }`}
        onClick={() => onToggleView()}
      >
        Blog
      </button>
    </nav>
  );
}
