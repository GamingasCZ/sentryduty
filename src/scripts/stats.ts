import { ref } from "vue";
import { hasLocalStorage, LocalStorageKeys } from "./settings";
import { getDaysRunningFor } from "./pokemon";

const DEFAULT_LIVES = 2

export const SCORE = ref(0)
export const LIVES = ref(DEFAULT_LIVES)
export const ALL_GUESSES = ref<number[]>([])
export const TIME_SPENT = ref(0)
export const TIME_SPENT_ROUNDS = ref<number[]>([])
export const DAY_PLAYING_OFFSET = ref(0)
export const DIFFICULTY = ref<0 | 1 | 2>(0)

export const resetGame = () => {
    SCORE.value = 0
    LIVES.value = DEFAULT_LIVES
    ALL_GUESSES.value = []
    TIME_SPENT.value = 0
}

interface RecordArray {
    [index: number]: SaveRecord;
}

export interface SaveData {
    games: RecordArray
}

export interface SaveRecord {
    score: number
    time: number
    timesRounds: number[]
    guesses: number[]
    date: number
    difficulty: 0 | 1 | 2
    livesLeft: number
}

export const saveScore = (record: SaveRecord) => {
    if (!hasLocalStorage()) return
    
    let saveData: SaveData = JSON.parse(localStorage.getItem(LocalStorageKeys.SaveData)!) ?? {games: {}}
    saveData.games[getDaysRunningFor()] = record

    localStorage.setItem(LocalStorageKeys.SaveData JSON.stringify(saveData))    
}