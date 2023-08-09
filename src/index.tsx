import { useCallback, useEffect, useState } from "react";
import words from "./words.json";

import WordleBox from "./components/wordleBox";
import Keyboard from "./components/Keyboard";

export default function Index() {
  const [wordToGuess, setWordToGuess] = useState<string[]>(() => {
    return words[Math.floor(Math.random() * words.length)].split("");
  });
  const [guessedWords, setGuessedWords] = useState<string[][]>([]);
  const [keyInput, setKeyInput] = useState<string[]>([]);

  const keyDown = useCallback(
    (e: KeyboardEvent) => {
      if (keyInput.length === 5 && e.key === "Enter") {
        setGuessedWords((prev) => [...prev, [...keyInput]]);
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
    [keyInput]
  );

  useEffect(() => {
    console.log(wordToGuess);
  }, [wordToGuess]);

  useEffect(() => {
    document.addEventListener("keydown", keyDown);
    return () => {
      document.removeEventListener("keydown", keyDown);
    };
  }, [keyDown]);
  return (
    <>
      <main className="flex py-8 px-1 text-white  flex-col items-center justify-start h-screen bg-zinc-950">
        <h1 className="text-3xl mb-2 font-bold">Wordle</h1>

        <div className="grid mb-0 gap-1 w-full max-w-md xl:w-fit min col-span-5">
          <WordleBox
            guessedWords={guessedWords}
            keyInput={keyInput}
            wordToGuess={wordToGuess}
          />
        </div>

        <div className="grid gap-2 w-full max-w-5xl ">
          <Keyboard />
        </div>
      </main>
    </>
  );
}
