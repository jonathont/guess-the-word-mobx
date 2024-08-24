import "./App.css";
import { useState } from "react";
import { observer } from "mobx-react-lite";

import { useStore } from "./stores/store";
import GameStore, { GuessResult } from "./stores/gameStore";

function App() {

    const [guess, setGuess] = useState("");
    const [message, setMessage] = useState("");

    let { gameStore: store }: { gameStore: GameStore } = useStore();

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setMessage('');

            switch (store.makeGuess(guess)) {
                case GuessResult.Correct:
                    setMessage(`You win! You took ${store.guesses.length} guesses.`)
                    break;
                case GuessResult.InvalidWord:
                    setMessage('Word not in list');
            }

            setGuess('');
        }
    };

    return (
        <>
            <h1>Guess the Word</h1>
            <div className="card">
                {store.preGuesses.map((x) => {
                    return <p key={`word-${x}`}>{x}</p>;
                })}
                <p>
                    <input
                        type="text"
                        placeholder="Guess a word"
                        value={guess}
                        onChange={(evt) => setGuess(evt.currentTarget.value)}
                        onKeyDown={handleKeyPress}
                    />
                </p>
                <p>{message}</p>
                {store.postGuesses.map((x) => {
                    return <p key={`word-${x}`}>{x}</p>;
                })}
                <p>Guess count: {store.guesses.length}</p>
            </div>
        </>
    );
}

export default observer(App);
