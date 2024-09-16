import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';


export interface PokemonData {
    name: string;
    url: string;
}

interface GetPokemonsResponse {
    count: number;
    results: PokemonData[];
}

export const fetchPokemons = async (limit: number, offset: number): Promise<GetPokemonsResponse> => {
  const response = await axios.get<GetPokemonsResponse>(`${API_URL}?limit=${limit}&offset=${offset}`);
  return response.data;
};

interface OtherSprites {
    dream_world: {
        front_default: string;
    };
    home: {
        front_default: string;
        front_shiny: string;
    };
    "official-artwork": {
        front_default: string;
        front_shiny: string;
    };
    
}

interface Sprite {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
    other: OtherSprites;
}

export interface GetPokemonDetailsResponse {
    id: number;
    base_experience: number;
    height: number;
    weight: number;
    sprites: Sprite;
}

export const fetchPokemonDetails = async (name: string): Promise<GetPokemonDetailsResponse> => {
  const response = await axios.get<GetPokemonDetailsResponse>(`${API_URL}/${name}`);
  return response.data;
};
