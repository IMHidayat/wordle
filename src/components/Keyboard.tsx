type KeyboardTypes = {
  screenKeyboardClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

export default function Keyboard(p: KeyboardTypes) {
  return [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"],
  ].map((words, i) => {
    return (
      <div className="flex gap-[.2rem] sm:gap-1 justify-center" key={i}>
        {words.map((letter, i2) => {
          return (
            <button
              className={`grid w-[1.8rem] h-10 sm:w-8 md:w-12 md:h-14 xl:w-14 xl:h-16 place-items-center md:text-lg xl:text-xl uppercase font-semibold text-white bg-zinc-800 rounded-lg active:brightness-75 transition ease-out duration-75 active:scale-[.95] ${
                (letter == "backspace" || letter == "enter") &&
                "flex-1 bg-neutral-900"
              }
              `}
              type="button"
              onClick={(e) => p.screenKeyboardClick(e)}
              key={i2}
              value={letter}
            >
              {letter == "backspace" ? (
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0.75}
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.603 2h7.08a1 1 0 011 1v10a1 1 0 01-1 1h-7.08a1 1 0 01-.76-.35L1 8l4.844-5.65A1 1 0 016.603 2zm7.08-1a2 2 0 012 2v10a2 2 0 01-2 2h-7.08a2 2 0 01-1.519-.698L.241 8.65a1 1 0 010-1.302L5.084 1.7A2 2 0 016.603 1h7.08z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M5.83 5.146a.5.5 0 000 .708l5 5a.5.5 0 00.707-.708l-5-5a.5.5 0 00-.708 0z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M11.537 5.146a.5.5 0 010 .708l-5 5a.5.5 0 01-.708-.708l5-5a.5.5 0 01.707 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : letter == "enter" ? (
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={100}
                  viewBox="0 0 1024 1024"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M864 170h-60c-4.4 0-8 3.6-8 8v518H310v-73c0-6.7-7.8-10.5-13-6.3l-141.9 112a8 8 0 0 0 0 12.6l141.9 112c5.3 4.2 13 .4 13-6.3v-75h498c35.3 0 64-28.7 64-64V178c0-4.4-3.6-8-8-8z" />
                </svg>
              ) : (
                letter
              )}
            </button>
          );
        })}
      </div>
    );
  });
}
