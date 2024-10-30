import { generateDailySeed, generatePokemonForRound, getPokemon, POKEMON_COUNT, ROUNDS } from "./pokemon";
import { describe, expect, test } from "vitest";
import { readdirSync } from "fs";

describe.concurrent("Loading Pokemon", async () => {
    let pokemon = await getPokemon()
    let portraitsDir = readdirSync("public/portraits")
    let footprintsDir = readdirSync("public/footprints")
    let spriteDir = readdirSync("public/sprites")

    test("JSON structure, ensure Pokemon has a portrait and a footprint", () => {
        let i = 1
        pokemon.forEach(pk => {
            expect(pk).toHaveProperty("name")
            expect(pk).toHaveProperty("id")
            expect(pk).toHaveProperty("hint")
            expect(portraitsDir).toContain(`${pk.id}.webp`)
            expect(footprintsDir).toContain(`${i}.webp`)
            expect(spriteDir).toContain(`${pk.id}.webp`)
            i += 1
        })
    })

    test("JSON length", () => expect(pokemon.length).toBe(POKEMON_COUNT))

    test("Portraits length", () => expect(portraitsDir).toHaveLength(POKEMON_COUNT))
    test("Footprints length", () => expect(footprintsDir).toHaveLength(POKEMON_COUNT))

})

describe("Game", () => {
    test("Generate seed for today", () => {
        expect(generateDailySeed()).toBeTypeOf('number')
    })

    test("Check seeds for duplicates for the next 365 days", () => {
        let seedsForNextYear = []
        for (let i = 0; i < 365; i++)
            seedsForNextYear.push(generateDailySeed(i))
        let seedsSet = new Set(seedsForNextYear)
        expect(seedsForNextYear.length - seedsSet.size).toBeLessThan(5)
    })
    
    describe("Generate Pokemon", () => {
        let round = generatePokemonForRound()
        test("Round is valid", () => {
            expect(round[0].length == round[1].length && round[0].length == ROUNDS).toBeTruthy()
        })
        test("Round has no duplicate choices", () => {

            for (const r of round[0]) {
                let roundChoiceArray = r as number[]
                expect(new Set(roundChoiceArray).size == roundChoiceArray.length).toBeTruthy()
            }
        })
    })
})
