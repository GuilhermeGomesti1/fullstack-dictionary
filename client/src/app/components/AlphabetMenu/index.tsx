import React from "react";

interface AlphabetMenuProps {
  startLetter: string;
  onFilterByLetter: (letter: string) => void;
  isMobile: boolean;
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const AlphabetMenu: React.FC<AlphabetMenuProps> = ({
  startLetter,
  onFilterByLetter,
  isMobile,
}) => {
  return isMobile ? (
    <select
      value={startLetter}
      onChange={(e) => onFilterByLetter(e.target.value)}
      className="p-1 border border-gray-300 rounded w-full"
    >
      <option value="">A-Z</option>
      {alphabet.map((letter) => (
        <option key={letter} value={letter}>
          {letter}
        </option>
      ))}
    </select>
  ) : (
    <div className="flex flex-wrap gap-[7px]">
      {alphabet.map((letter) => (
        <button
          key={letter}
          className={`px-2 py-1 rounded w-[32px] ${
            startLetter === letter
              ? "bg-[#FF6B00]  text-white transition-all duration-250 ease-in-out hover:brightness-110 hover:scale-103"
              : "bg-gray-300 transition-all duration-250 ease-in-out hover:brightness-110 hover:scale-103"
          }`}
          onClick={() => onFilterByLetter(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default AlphabetMenu;
