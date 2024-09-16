import { ReduxActionTypes } from "../pokemonActionTypes"

export const fetchPokemonData = (page: number) => {  
    return {
        type: ReduxActionTypes.FETCH_POKEMONS,
        payload: { page: page },
    }
}