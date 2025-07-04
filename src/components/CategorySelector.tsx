import type { Category } from "../types";
import { useTranslation } from "react-i18next";

interface CategorySelectorProps {
  actions: {
    handleCategorySelect: (category: Category) => void;
    handleFullReset?: () => void;
    handleBackToPlayerNames?: () => void;
  };
}

export default function CategorySelector({ actions }: CategorySelectorProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 mb-4">
      <div className="text-lg font-semibold text-gray-700 mb-2">{t('app.category')}</div>
      <button
        className="py-2 px-6 rounded-full bg-green-400 text-white font-bold shadow hover:bg-green-500 transition"
        onClick={() => actions.handleCategorySelect("normal")}>
        😊 {t('categories.normal')} 😊
      </button>
      <button
        className="py-2 px-6 rounded-full bg-yellow-500 text-white font-bold shadow hover:bg-yellow-600 transition"
        onClick={() => actions.handleCategorySelect("teenage")}>
        👧 {t('categories.teenage')} 👧
      </button>
      <button
        className="py-2 px-6 rounded-full bg-pink-600 text-white font-bold shadow hover:bg-pink-700 transition"
        onClick={() => actions.handleCategorySelect("spicy")}>
        🌶️ {t('categories.spicy')} 🌶️
      </button>

      <div className="flex justify-between mt-4">
        <button className="text-sm text-gray-500 hover:text-gray-700 underline transition" onClick={actions.handleBackToPlayerNames}>
          ← {t('actions.back')}
        </button>
        <button
          className="text-sm text-red-500 hover:text-red-700 underline transition"
          onClick={actions.handleFullReset}
          // disabled={spinning}
        >
          {t('app.resetGame')}
        </button>
      </div>
    </div>
  );
}
