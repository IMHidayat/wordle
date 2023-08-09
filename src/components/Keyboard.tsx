export default function Keyboard() {
  return ["qwertyuiop", "asdfghjkl", "zxcvbnmE"].map((words, i) => {
    return (
      <div className="flex gap-[.2rem] sm:gap-1 justify-center" key={i}>
        {words.split("").map((letter, i2) => {
          return (
            <button
              className="grid w-7 h-10 sm:w-8 md:w-12 md:h-14 xl:w-14 xl:h-16 place-items-center md:text-lg xl:text-xl uppercase font-semibold text-white bg-zinc-800 rounded-lg "
              type="button"
              key={i2}
            >
              {letter == "E" ? (
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="50"
                  viewBox="0 0 1024 1024"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M864 170h-60c-4.4 0-8 3.6-8 8v518H310v-73c0-6.7-7.8-10.5-13-6.3l-141.9 112a8 8 0 0 0 0 12.6l141.9 112c5.3 4.2 13 .4 13-6.3v-75h498c35.3 0 64-28.7 64-64V178c0-4.4-3.6-8-8-8z"></path>
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
