import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import words from "./words.json";

import WordleBox from "./components/wordleBox";
import Keyboard from "./components/Keyboard";

export default function Index() {
  const [wordToGuess, setWordToGuess] = useState<string[]>(() => {
    return words[Math.floor(Math.random() * words.length)].split("");
  });
  const [boxColorHint, setBoxColorHint] = useState<number[][]>([]);
  const [guessedWords, setGuessedWords] = useState<string[][]>([]);
  const [keyInput, setKeyInput] = useState<string[]>([]);

  const boxColorCalc = useCallback(() => {
    const wordToGuess_: string[] = [...wordToGuess];
    console.log();
    const test: number[] = [...keyInput].map((s, i, arr) => {
      if (wordToGuess_.includes(s)) {
        if (wordToGuess_[i] === s) {
          arr.splice(i, 1, "");
          wordToGuess_.splice(wordToGuess_.indexOf(s), 1, "");
          return 1;
        } else if (
          wordToGuess_[wordToGuess_.indexOf(s)] === arr[wordToGuess_.indexOf(s)]
        ) {
          return 0;
        } else {
          arr.splice(i, 1, "");
          wordToGuess_.splice(wordToGuess_.indexOf(s), 1, "");
          return 2;
        }
      } else {
        return 0;
      }
    });
    return test;
  }, [wordToGuess, keyInput]);

  const keyDown = useCallback(
    (e: KeyboardEvent) => {
      if (keyInput.length === 5 && e.key === "Enter") {
        setGuessedWords((prev) => [...prev, [...keyInput]]);
        setBoxColorHint((prev) => [...prev, boxColorCalc()]);
        setKeyInput([]);
        return;
      }

      if (e.ctrlKey && e.key === "Backspace") {
        setKeyInput([]);
      } else if (e.key === "Backspace") {
        const keyInput_ = [...keyInput];
        keyInput_.pop();
        setKeyInput(keyInput_);
      } else {
        if (!/^[a-z]$/i.test(e.key) || keyInput.length === 5) return;
        setKeyInput([...keyInput, e.key]);
      }
    },
    [keyInput, boxColorCalc]
  );

  const screenKeyboardClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const eTargetValue = (e.target as HTMLButtonElement).value;
      if (eTargetValue === "backspace") {
        setKeyInput((prev) => [...prev].slice(0, prev.length - 1));
      } else if (eTargetValue === "enter" && keyInput.length === 5) {
        setGuessedWords((prev) => [...prev, [...keyInput]]);
        setBoxColorHint((prev) => [...prev, boxColorCalc()]);
        setKeyInput([]);
      } else {
        if (eTargetValue.length > 1 || keyInput.length === 5) return;
        setKeyInput([...keyInput, (e.target as HTMLButtonElement).value]);
      }
    },
    [boxColorCalc, keyInput]
  );

  useEffect(() => {
    // console.log(boxColorHint);
    // console.log(wordToGuess);
    console.log(keyInput);
  }, [wordToGuess, boxColorHint, keyInput]);

  useEffect(() => {
    document.addEventListener("keydown", keyDown);
    return () => {
      document.removeEventListener("keydown", keyDown);
    };
  }, [keyDown]);
  return (
    <>
      <main className="flex py-8 xl:py-4 px-1 text-white  flex-col items-center justify-start min-h-screen bg-zinc-950">
        <h1 className="text-3xl mb-2 font-bold">Wordle</h1>

        <div className="grid mb-8 xl:mb-4 gap-1 w-full max-w-md xl:w-fit min col-span-5">
          <WordleBox
            boxColorHint={boxColorHint}
            guessedWords={guessedWords}
            keyInput={keyInput}
          />
        </div>

        <div className="grid gap-2 w-fit max-w-5xl">
          <Keyboard screenKeyboardClick={screenKeyboardClick} />
        </div>
        <motion.span
          className={`grid mt-8 w-20 h-16 sm:h-[4.5rem] md:h-20 xl:h-16 xl:w-16 rounded place-items-center text-4xl font-bold uppercase border border-black  bg-zinc-900`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          L
        </motion.span>
      </main>
    </>
  );
}
