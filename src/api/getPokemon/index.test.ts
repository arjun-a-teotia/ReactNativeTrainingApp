import { setupServer } from 'msw/node';
import { rest } from 'msw';

import { Pokemon } from '../../models';

import { getPokemon } from '.';

describe('getPokemon()', () => {
    const url = 'https://pokeapi.co/api/v2/pokemon';

    const examplePokemon: readonly Pokemon[] = [
        {
            name: 'Pikachu',
            url: 'www.google.com',
        },
        {
            name: 'Mikachu',
            url: 'www.facebook.com',
        },
    ];

    const server = setupServer();

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('retrieves pokemon', async () => {
        server.use(
            rest.get(url, (_req, response, context) => {
                return response(context.json({ previous: null,count: 2, results: examplePokemon }));
            }),
        );

        const actualPokemons = await getPokemon();

        const expectedPokemon: readonly Pokemon[] = [
            {
                name: 'Pikachu',
                url: 'www.google.com',
            },
            {
                name: 'Mikachu',
                url: 'www.facebook.com',
            },
        ];

        expect(actualPokemons).toStrictEqual(expectedPokemon);
    });

    it('throws when fails to get pokemon', async () => {
        server.use(
            rest.get(url, (_request, response, context) => {
                return response(context.status(500));
            }),
        );

        await expect(getPokemon()).rejects.toThrow('Failed to get pokemon (500)');
    });
});
