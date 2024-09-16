import { PokemonData } from "../api/pokemonApi";

export enum ReduxActionTypes {
    FETCH_POKEMONS = "FETCH_POKEMONS",
    FETCH_POKEMONS_SUCCESS = "FETCH_POKEMONS_SUCCESS",
    FETCH_POKEMONS_ERROR = "FETCH_POKEMONS_ERROR"
}

interface FetchPokemonsDataActionPayload {
    page: number;
}

export interface FetchPokemonsDataAction {
    type: ReduxActionTypes.FETCH_POKEMONS;
    payload: FetchPokemonsDataActionPayload;
}


interface FetchPokemonsDataSuccessActionPayload {
    pokemons: PokemonData[];
}

export interface FetchPokemonsDataSuccessAction {
    type: ReduxActionTypes.FETCH_POKEMONS_SUCCESS;
    payload: FetchPokemonsDataSuccessActionPayload;
}

export interface FetchPokemonsDataErrorAction {
    type: ReduxActionTypes.FETCH_POKEMONS_ERROR;
    error: string;
}

export type ActionTypes =
    FetchPokemonsDataAction
    | FetchPokemonsDataSuccessAction
    | FetchPokemonsDataErrorAction;