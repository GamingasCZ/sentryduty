import { getPokemon, POKEMON_COUNT } from "./pokemon";
import { describe, expect, test } from "vitest";


const base = import.meta.env.BASE_URL

describe("Loading Pokemon", async () => {
    let pokemon = await getPokemon()

    test("JSON structure", () => {
        pokemon.forEach(pk => {
            expect(pk).toHaveProperty("name")
            expect(pk).toHaveProperty("id")
            expect(pk).toHaveProperty("hint")
        })
    })

    test("JSON length", () => expect(pokemon.length).toBe(POKEMON_COUNT))

})
