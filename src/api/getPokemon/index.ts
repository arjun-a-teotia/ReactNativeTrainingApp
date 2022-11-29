import {Pokemon, PokemonResource} from 'src/models';

const toModel = (response: PokemonResource): Array<Pokemon> => {
  return response.results;
};

const getPokemon = async (
  offset: number = 20,
  limit: number = 20,
): Promise<Pokemon[]> => {
  const baseUrl = 'https://pokeapi.co/api/v2';
  const url = `${baseUrl}/pokemon?offset=${offset}&limit=${limit}`;

  const result = await fetch(url);
  const {status} = result;

  if (status !== 200) {
    throw new Error(`Failed to get pokemon (${status})`);
  }

  const response = await result.json();

  return toModel(response);
};

export {getPokemon};
