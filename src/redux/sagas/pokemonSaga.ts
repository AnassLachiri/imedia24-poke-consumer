import { takeEvery, put, call } from "redux-saga/effects";
import { FetchPokemonsDataAction, FetchPokemonsDataErrorAction, FetchPokemonsDataSuccessAction, ReduxActionTypes } from "../pokemonActionTypes";
import { fetchPokemons } from "../../api/pokemonApi";

function* fetchPokemonsData(action: FetchPokemonsDataAction) {
    try {
        const response = yield call(fetchPokemons, 10, action.payload.page * 10);
        yield put<FetchPokemonsDataSuccessAction>({ type: ReduxActionTypes.FETCH_POKEMONS_SUCCESS, payload: {pokemons: response.results, page: action.payload.page} });
    } catch (error) {
        if (error instanceof Error) {
            yield put<FetchPokemonsDataErrorAction>({
                type: ReduxActionTypes.FETCH_POKEMONS_ERROR,
                error: error.message,
            });
        } else {
            yield put<FetchPokemonsDataErrorAction>({
                type: ReduxActionTypes.FETCH_POKEMONS_ERROR,
                error: "An unknown error occurred",
            });
        }
    }
}
export function* pokemonSaga() {
    yield takeEvery(ReduxActionTypes.FETCH_POKEMONS, fetchPokemonsData)
}