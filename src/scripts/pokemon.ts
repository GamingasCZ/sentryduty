interface Pokemon {
    name: string
    id: number
    hint: [string, string, string, string]
}

export const POKEMON_COUNT = 100

export const getPokemon = async () => {
    return await import('../assets/pokemon.json').then(res => res.default as Pokemon[])
}

const POKEMON = await getPokemon()
export default POKEMON