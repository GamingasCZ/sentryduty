import { generateDailySeed, generatePokemonForRound, getPokemon, POKEMON_COUNT } from "./pokemon";
import { describe, expect, test } from "vitest";
import { readdirSync } from "fs";

describe.concurrent("Loading Pokemon", async () => {
    let pokemon = await getPokemon()
    let portraitsDir = readdirSync("public/portraits")
    let footprintsDir = readdirSync("public/footprints")

    test("JSON structure, ensure Pokemon has a portrait and a footprint", () => {
        pokemon.forEach(pk => {
            expect(pk).toHaveProperty("name")
            expect(pk).toHaveProperty("id")
            expect(portraitsDir).toContain(`${pk.id}.png`)
            expect(footprintsDir).toContain(`${pk.id}.png`)
            expect(pk).toHaveProperty("hint")
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
    
    test("Generate pokemon for round", () => {
        expect(generatePokemonForRound()).toBe(0)
    })
})
