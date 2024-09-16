import { combineReducers } from "redux";
import pokemonData from "./pokemonReducer";

const rootReducer = combineReducers({
    pokemonData,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;