import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-2xl font-semibold text-gray-800 animate-fade-in">
        {playerName}, {t('player.choose')}:
      </div>
      <div className="flex gap-4 mb-2">
        <button
          className="py-2 px-6 rounded-full bg-blue-500 text-white font-bold shadow hover:bg-blue-600 transition"
          onClick={onChooseTruth}
        >
          {t('actions.truth')}
        </button>
        <button
          className="py-2 px-6 rounded-full bg-pink-500 text-white font-bold shadow hover:bg-pink-600 transition"
          onClick={onChooseDare}
        >
          {t('actions.dare')}
        </button>
      </div>
    </div>
  );
}
