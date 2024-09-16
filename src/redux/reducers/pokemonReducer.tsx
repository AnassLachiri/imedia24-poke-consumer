import { PokemonData } from "../../api/pokemonApi";
import { ActionTypes, ReduxActionTypes } from "../pokemonActionTypes";

export interface ApiDataFetchInitialState {
    data: PokemonData[];
    loading: boolean;
    error: string | null;
}

const InitialValues: ApiDataFetchInitialState = {
    data: [],
    loading: false,
    error: null,
}

const pokemonData = (
    state: ApiDataFetchInitialState = InitialValues,
    action: ActionTypes
): ApiDataFetchInitialState => {
    switch (action.type) {
        case ReduxActionTypes.FETCH_POKEMONS:
            return { ...state, loading: true };
        case ReduxActionTypes.FETCH_POKEMONS_SUCCESS:
            //check if the batch fetched already exists
            return { ...state, loading: false, data: [...state.data, ...(state.data.find(pokemon => pokemon.name === action.payload.pokemons[0].name) ? [] : action.payload.pokemons) ]};
        case ReduxActionTypes.FETCH_POKEMONS_ERROR:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
}

export default pokemonData;