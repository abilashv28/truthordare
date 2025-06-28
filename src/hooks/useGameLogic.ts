import { useState, useEffect } from "react";
import type { Category, GameMode } from "../types";
import { questions } from "../data/questions";
import { usePersistentState } from "./usePersistentState";

export function useGameLogic() {
  const [category, setCategory] = usePersistentState<Category | null>('TRUTH_OR_DARE_CATEGORY', null);
  const [mode, setMode] = useState<GameMode>(null); // mode not persisted; keep useState
  const [question, setQuestion] = useState<string>(""); // question not persisted
  const [history, setHistory] = usePersistentState<string[]>('TRUTH_OR_DARE_HISTORY', []);
  const [spinning, setSpinning] = useState(false);
  const [angle, setAngle] = useState(0);
  const [playerCount, setPlayerCount] = usePersistentState<number>('TRUTH_OR_DARE_PLAYER_COUNT', 0);
  const [playerNames, setPlayerNames] = usePersistentState<string[]>('TRUTH_OR_DARE_PLAYER_NAMES', []);
  const [currentPlayerIdx, setCurrentPlayerIdx] = usePersistentState<number | null>('TRUTH_OR_DARE_CURRENT_PLAYER_IDX', null);
  const [namesEntered, setNamesEntered] = usePersistentState<boolean>('TRUTH_OR_DARE_NAMES_ENTERED', false);
  const [selectedPlayers, setSelectedPlayers] = usePersistentState<number[]>('TRUTH_OR_DARE_SELECTED_PLAYERS', []);
  const [showModal, setShowModal] = useState(false);
  const [activeModalPlayer, setActiveModalPlayer] = useState<number | null>(null);

  useEffect(() => {
    const storedNames = localStorage.getItem('TRUTH_OR_DARE_PLAYER_NAMES');
    if ((!storedNames || JSON.parse(storedNames).length === 0) && playerCount > 0) {
      const defaultNames = Array.from({ length: playerCount }, (_, i) => `Player ${i + 1}`);
      setPlayerNames(defaultNames);
    }
  }, [playerCount]);

  function getRandom(arr: string[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function handleSpin() {
    setSpinning(true);

    // Pick a random player
    const playerIdx = Math.floor(Math.random() * playerNames.length);
    setSelectedPlayers([playerIdx]);
    setCurrentPlayerIdx(playerIdx);

    // Spin animation
    const spins = Math.floor(Math.random() * 3) + 4; // 4 to 6 spins
    const finalAngle = Math.floor(Math.random() * 360); // random angle for realism
    setAngle(spins * 360 + finalAngle);

    setTimeout(() => {
      setSpinning(false);

      // Show the modal to select Truth or Dare
      setShowModal(true);
    }, 4600);
  }

  function handlePlayerChoice(choice: "truth" | "dare", playerIdx: number) {
    if (category) {
      setMode(choice);
      const q =
        choice === "truth"
          ? getRandom(questions[category].truths)
          : getRandom(questions[category].dares);
      setQuestion(q);
      setHistory([`${playerNames[playerIdx]}: ${q}`, ...history]);
      setActiveModalPlayer(playerIdx);
    }
  }

  function closeModal() {
    setShowModal(false);
    setMode(null);
    setQuestion("");
    setActiveModalPlayer(null);
  }

  function handleReset() {
    setMode(null);
    setQuestion("");
    setAngle(0);
  }

  function handleFullReset() {
    // Reset all game state
    setCategory(null);
    setMode(null);
    setQuestion("");
    setHistory([]);
    setSpinning(false);
    setAngle(0);
    setCurrentPlayerIdx(null);
    setSelectedPlayers([]);
    setShowModal(false);
    setActiveModalPlayer(null);
    // Reset player related state to go back to player selection
    setNamesEntered(false);
    setPlayerCount(0);
    setPlayerNames([]);
  }

  function handleCategorySelect(cat: Category) {
    setCategory(cat);
    setMode(null);
    setQuestion("");
    setHistory([]);
  }

  function handleBackToCategory() {
    setCategory(null);
    setMode(null);
    setQuestion("");
    setHistory([]);
  }

  function handlePlayerCountChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const count = parseInt(e.target.value);
    setPlayerCount(count);
    setPlayerNames(Array(count).fill(""));
  }

  function handleBackToPlayerCount() {
    // Reset to the player count selection state
    setPlayerCount(0);
    setPlayerNames([]);
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const names = [...playerNames];
    names[index] = e.target.value;
    setPlayerNames(names);
  }

  function handleNameSubmit() {
    if (playerNames.every((name) => name.trim() !== "")) {
      setNamesEntered(true);
      setCurrentPlayerIdx(0);
    }
  }

  function handleNextPlayer() {
    setCurrentPlayerIdx((prev) => (prev !== null ? (prev + 1) % playerCount : null));
  }

  return {
    category,
    mode,
    question,
    history,
    spinning,
    angle,
    playerCount,
    playerNames,
    namesEntered,
    currentPlayerIdx,
    selectedPlayers,
    showModal,
    activeModalPlayer,
    actions: {
      handleSpin,
      handlePlayerChoice,
      closeModal,
      handleReset,
      handleFullReset,
      handleCategorySelect,
      handleBackToCategory,
      handlePlayerCountChange,
      handleNameChange,
      handleNameSubmit,
      handleNextPlayer,
      handleBackToPlayerCount
    }
  };
}
