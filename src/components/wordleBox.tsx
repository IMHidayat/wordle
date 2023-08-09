type wordleBoxProps = {
  wordToGuess: string[];
  guessedWords: string[][];
  keyInput: string[];
};

export default function WordleBox({
  wordToGuess,
  guessedWords,
  keyInput,
}: wordleBoxProps) {
  return (
    <div className="grid mb-8 gap-1 w-full max-w-md xl:w-fit min col-span-5">
      {Array(6)
        .fill("")
        .map((_, i) => {
          return (
            <div className="flex gap-1 justify-center" key={i}>
              {Array(5)
                .fill("")
                .map((_, i2) => {
                  return (
                    <span
                      className={`flex-1 xl:flex-initial grid h-16 sm:h-[4.5rem] md:h-20 xl:h-16 xl:w-16 rounded place-items-center text-4xl font-bold uppercase border border-black 
                          ${
                            guessedWords.length >= i + 1 &&
                            guessedWords[i][i2] === wordToGuess[i2]
                              ? "bg-green-500"
                              : guessedWords.length >= i + 1 &&
                                wordToGuess.includes(guessedWords[i][i2])
                              ? "bg-yellow-500"
                              : "bg-zinc-900"
                          }`}
                      key={i2}
                    >
                      {guessedWords.length === i && keyInput[i2]}
                      {guessedWords.length >= i + 1 && guessedWords[i][i2]}
                    </span>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
}
