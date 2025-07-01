import React from 'react';
interface PlayerSelectorProps {
  playerCount: number;
  playerNames: string[];
  onPlayerCountChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export default function PlayerSelector({
  playerCount,
  playerNames,
  onPlayerCountChange,
  onNameChange,
  onSubmit,
  onBack
}: PlayerSelectorProps) {
  return (
    <>
      {playerCount === 0 && (
        <div className="flex flex-col gap-4 mb-4">
          <label className="text-lg font-semibold text-gray-700 mb-2">
            How many players?
          </label>
          <select
            id="playerCountSelect"
            className="py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={playerCount}
            onChange={onPlayerCountChange}
          >
            <option value={0}>Select players</option>
            {Array.from({ length: 7 }, (_, i) => (
              <option key={i + 2} value={i + 2}>
                {i + 2}
              </option>
            ))}
          </select>
        </div>
      )}

      {playerCount > 0 && (
        <div className="flex flex-col gap-4 mb-4">
          <label className="text-lg font-semibold text-gray-700 mb-2">
            Enter player names
          </label>
          {playerNames.map((name, idx) => (
            <input
              key={idx}
              className="py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 mb-2"
              placeholder={`Player ${idx + 1} name`}
              value={name}
              onChange={(e) => onNameChange(e, idx)}
            />
          ))}
          <button
            className="py-2 px-6 rounded-full bg-green-500 text-white font-bold shadow hover:bg-green-600 transition mt-2"
            disabled={playerNames.some((n) => !n.trim())}
            onClick={onSubmit}
          >
            Continue
          </button>
          <button
            className="py-1 px-4 rounded-full text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition mt-3"
            onClick={onBack}
          >
            Back to Player Count
          </button>
        </div>
      )}
    </>
  );
}
