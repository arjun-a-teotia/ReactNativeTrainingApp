import {Pokedex} from '../../models';

const getPokemonDetails = async (
  pokemonDetailsURL: string,
): Promise<Pokedex> => {
  const result = await fetch(pokemonDetailsURL);
  const {status} = result;

  if (status !== 200) {
    throw new Error(`Failed to get pokemon data (${status})`);
  }

  const response = await result.json();
  console.log('response', response);

  return response as Pokedex;
};

export {getPokemonDetails};
