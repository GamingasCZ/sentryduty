import { getPokemon, POKEMON_COUNT } from "./pokemon";
import { describe, expect, test } from "vitest";
import { readdirSync } from "fs";

const base = import.meta.env.BASE_URL

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

