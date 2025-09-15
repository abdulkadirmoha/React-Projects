import { useState } from "react";
import { clsx } from "clsx";
import { languages } from "./languages";
import { getFarewellText, getRandomWord } from "./utils";
import Confetti from "react-confetti";

function AssemblyEndgame() {
  // =========================
  // 🔹 State & Game Variables
  // =========================
  const [currenWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetter, setGuessedLetter] = useState([]);

  const wrongGuessCount = guessedLetter.filter(
    (letter) => !currenWord.includes(letter)
  ).length;

  const isGameWon = currenWord
    .split("")
    .every((letter) => guessedLetter.includes(letter));

  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;

  const lastGuessLetter = guessedLetter[guessedLetter.length - 1];
  const isLastGuessIncorrect =
    lastGuessLetter && !currenWord.includes(lastGuessLetter);

  // =========================
  // 🔹 Game Logic Functions
  // =========================
  function addGuessedLetter(letter) {
    setGuessedLetter((prev) =>
      prev.includes(letter) ? prev : [...prev, letter]
    );
  }

  function startNewGame() {
    setCurrentWord(getRandomWord());
    setGuessedLetter([]);
  }

  function renderGameStatus() {
    if (!isGameOver && isLastGuessIncorrect) {
      return (
        <p className="farewell-message">
          {getFarewellText(languages[wrongGuessCount - 1].name)}
        </p>
      );
    }
    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    }
    if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      );
    }
    return null;
  }

  // =========================
  // 🔹 Language Chips Section
  // =========================
  const languageElements = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessCount;

    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };

    const className = clsx("chip", isLanguageLost && "lost");

    return (
      <span className={className} key={lang.name} style={styles}>
        {lang.name}
      </span>
    );
  });

  // =========================
  // 🔹 Word Section
  // =========================
  const letterElement = currenWord.split("").map((letter, index) => {
    const shouldRevealLetter = isGameLost || guessedLetter.includes(letter);

    const letterClassName = clsx(
      isGameLost && !guessedLetter.includes(letter) && "missed-letter"
    );

    return (
      <span key={index} className={letterClassName}>
        {shouldRevealLetter ? letter.toUpperCase() : ""}
      </span>
    );
  });

  // =========================
  // 🔹 Keyboard Section
  // =========================
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const keyboardElement = alphabet.split("").map((letter) => {
    const isGuessed = guessedLetter.includes(letter);
    const isCorrect = isGuessed && currenWord.includes(letter);
    const isWrong = isGuessed && !currenWord.includes(letter);

    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button
        className={className}
        key={letter}
        disabled={isGameOver}
        onClick={() => addGuessedLetter(letter)}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  // =========================
  // 🔹 Game Status Styling
  // =========================
  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect,
  });

  // =========================
  // 🔹 Render UI
  // =========================
  return (
    <main>
      {isGameWon && <Confetti />}

      {/* Header Section */}
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>

      {/* Game Status Section */}
      <section className={gameStatusClass}>{renderGameStatus()}</section>

      {/* Language Chips Section */}
      <section className="language-chip">{languageElements}</section>

      {/* Word Section */}
      <section className="word">{letterElement}</section>

      {/* Keyboard Section */}
      <section className="keyboard">{keyboardElement}</section>

      {/* New Game Button */}
      {isGameOver && (
        <button onClick={startNewGame} className="new-game">
          New Game
        </button>
      )}
    </main>
  );
}

export default AssemblyEndgame;
