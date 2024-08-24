import { makeAutoObservable } from "mobx";
import { WordList } from "../wordlist";

export enum GuessResult {
    Correct,
    Incorrect,
    InvalidWord    
}

export default class WordStore {

    solution: string = '';
    guesses: string[] = [];

    constructor() {
        this.solution = WordList[this.randomIntFromInterval(0, WordList.length - 1)];
        
        makeAutoObservable(this);
        
        // Explicit way to set up observables (instead of using makeAutoObservable):
        // makeObservable(this, {
        //     solution: observable,
        //     guesses: observable,
        //     preGuesses: computed,
        //     postGuesses: computed
        // })
    }

    get preGuesses(): string[] {
        return this.guesses.filter((x) => x < this.solution).sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
    }

    get postGuesses(): string[] {
        return this.guesses.filter((x) => x > this.solution).sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
    }

    makeGuess(guess: string): GuessResult {
        if (this.guesses.includes(guess)) {
            return GuessResult.Incorrect;
        }

        if (WordList.includes(guess)) {
            this.guesses.push(guess);
            if (guess === this.solution) {
                return GuessResult.Correct;
            }
        } else {
            return GuessResult.InvalidWord;
        }

        return GuessResult.Incorrect;
    }

    // https://stackoverflow.com/a/7228322
    private randomIntFromInterval(min: number, max: number) {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

}