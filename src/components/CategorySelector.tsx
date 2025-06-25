import type { Category } from "../types";

interface CategorySelectorProps {
  actions: {
   handleCategorySelect: (category: Category) => void;
    handleFullReset?: () => void;
  };
}


export default function CategorySelector({ actions }: CategorySelectorProps) {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <div className="text-lg font-semibold text-gray-700 mb-2">
        Choose a Category
      </div>
      <button
        className="py-2 px-6 rounded-full bg-green-400 text-white font-bold shadow hover:bg-green-500 transition"
       onClick={() => actions.handleCategorySelect("normal")}
      >
         😊 Normal 😊
      </button>
      <button
        className="py-2 px-6 rounded-full bg-yellow-500 text-white font-bold shadow hover:bg-yellow-600 transition"
        onClick={() => actions.handleCategorySelect("teenage")}
      >
        👧 Teenage 👧
      </button>
      <button
        className="py-2 px-6 rounded-full bg-pink-600 text-white font-bold shadow hover:bg-pink-700 transition"
        onClick={() => actions.handleCategorySelect("spicy")}
      >
         🌶️ Spicy 🌶️
      </button>
      <button
        className="text-sm text-red-500 hover:text-red-700 underline transition"
        onClick={actions.handleFullReset}
        // disabled={spinning}
      >
        Reset Game
      </button>
    </div>
  );
}
