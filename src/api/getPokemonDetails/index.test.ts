import {setupServer} from 'msw/node';
import {rest} from 'msw';
import {Pokedex} from '../../models';
import {getPokemonDetails} from '.';

describe('getPokemonDetails()', () => {
  const apiURL = 'https://pokeapi.co/api/v2/pokemon/899/';

  const examplePokemon: Pokedex = {
    abilities: [
      {
        ability: {
          name: 'intimidate',
          url: 'https://pokeapi.co/api/v2/ability/22/',
        },
        is_hidden: false,
        slot: 1,
      },
    ],
    base_experience: null,
    forms: [
      {
        name: 'wyrdeer',
        url: 'https://pokeapi.co/api/v2/pokemon-form/899/',
      },
    ],
    game_indices: [],
    height: 18,
    held_items: [],
    id: 899,
    is_default: true,
    location_area_encounters:
      'https://pokeapi.co/api/v2/pokemon/899/encounters',
    moves: [],
    name: 'wyrdeer',
    order: -1,
    past_types: [],
    species: {
      name: 'wyrdeer',
      url: 'https://pokeapi.co/api/v2/pokemon-species/899/',
    },
    sprites: {
      other: {
        'official-artwork': {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/899.png',
        },
      },
    },
    stats: [
      {
        base_stat: 103,
        effort: 0,
        stat: {
          name: 'hp',
          url: 'https://pokeapi.co/api/v2/stat/1/',
        },
      },
    ],
    types: [
      {
        slot: 1,
        type: {
          name: 'normal',
          url: 'https://pokeapi.co/api/v2/type/1/',
        },
      },
    ],
    weight: 951,
  };

  const server = setupServer();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('retrieves pokemon data', async () => {
    server.use(
      rest.get(apiURL, (_req, response, context) => {
        return response(context.json(examplePokemon));
      }),
    );

    const actualPokemons = await getPokemonDetails(apiURL);

    const expectedPokemon: Pokedex = examplePokemon;

    expect(actualPokemons).toStrictEqual(expectedPokemon);
  });

  it('throws when fails to get pokemon data', async () => {
    server.use(
      rest.get(apiURL, (_request, response, context) => {
        return response(context.status(500));
      }),
    );

    await expect(getPokemonDetails(apiURL)).rejects.toThrow(
      'Failed to get pokemon data (500)',
    );
  });
});
