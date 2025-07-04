import BottleSpinner from "./BottleSpinner";
import CategorySelector from "./CategorySelector";
import History from "./History";
import PlayerSelector from "./PlayerSelector";
import TruthDareModal from "./TruthDareModal";
import LanguageSwitcher from "./LanguageSwitcher";
import { useGameLogic } from "../hooks/useGameLogic";
import { useTranslation } from "react-i18next";

export default function Game() {
  const { t } = useTranslation();
  const {
    category,
    mode,
    question,
    history,
    spinning,
    angle,
    playerCount,
    playerNames,
    namesEntered,
    selectedPlayers,
    showModal,
    activeModalPlayer,
    actions
  } = useGameLogic();

  return (
    <div className="bg-white/80 rounded-3xl shadow-2xl p-6 pt-4 max-w-xl w-full text-center mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 drop-shadow-lg">
          {t('app.title')}
        </h1>
        <div className="scale-90 transform-origin-right">
          <LanguageSwitcher />
        </div>
      </div>

      {/* Player Setup */}
      {playerCount === 0 || !namesEntered ? (
        <PlayerSelector
          playerCount={playerCount}
          playerNames={playerNames}
          onPlayerCountChange={actions.handlePlayerCountChange}
          onNameChange={actions.handleNameChange}
          onSubmit={actions.handleNameSubmit}
          onBack={actions.handleBackToPlayerCount}
        />
      ) : null}

      {/* Category Selection */}
      {playerCount > 0 && namesEntered && !category && (
        <CategorySelector
          actions={{
            handleCategorySelect: actions.handleCategorySelect,
            handleFullReset: actions.handleFullReset,
            handleBackToPlayerNames: actions.handleBackToPlayerNames
          }}
        />
      )}

      {/* Bottle Spinner */}
      {category && (
        <div className="flex flex-col items-center gap-6">
          <div className="text-lg font-semibold text-gray-700 mb-4">
            {t('app.category')}: <span className="capitalize">{t(`categories.${category}`)}</span>
          </div>
          <div className="w-full max-w-[340px] h-[340px] relative mx-auto mb-2">
            <BottleSpinner
              spinning={spinning}
              angle={angle}
              player1={selectedPlayers.length > 0 ? playerNames[selectedPlayers[0]] : undefined}
              player2={selectedPlayers.length > 1 ? playerNames[selectedPlayers[1]] : undefined}
              allPlayers={playerNames}
              selectedPlayers={selectedPlayers}
              actions={{
                handleSpin: actions.handleSpin,
                handleBackToCategory: actions.handleBackToCategory,
                handleFullReset: actions.handleFullReset
              }}
            />
          </div>
          <div className="mt-6 flex flex-col gap-3">              <button
              className="py-3 px-8 rounded-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold shadow-lg hover:from-green-600 hover:to-teal-600 transition transform hover:scale-105 active:scale-95"
              onClick={actions.handleSpin}
              disabled={spinning}>
              {spinning ? t('app.spinning') : t('app.spinBottle')}
            </button>
            <div className="flex justify-center gap-4 mt-2">
              <button
                className="text-sm text-gray-500 hover:text-gray-700 underline transition"
                onClick={actions.handleBackToCategory}
                disabled={spinning}>
                {t('app.backToCategories')}
              </button>
              <button className="text-sm text-red-500 hover:text-red-700 underline transition" onClick={actions.handleFullReset} disabled={spinning}>
                {t('app.resetGame')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History */}
      {category && history.length > 0 && <History history={history} />}

      {/* Truth or Dare Modal */}
      <TruthDareModal
        show={showModal}
        playerNames={playerNames}
        selectedPlayers={selectedPlayers}
        activeModalPlayer={activeModalPlayer}
        mode={mode}
        question={question}
        onPlayerChoice={actions.handlePlayerChoice}
        onClose={actions.closeModal}
      />
    </div>
  );
}
