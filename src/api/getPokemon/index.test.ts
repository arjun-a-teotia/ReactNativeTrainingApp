import {setupServer} from 'msw/node';
import {rest} from 'msw';

import {AuthorityResource} from 'src/api/resources';
import {Authority} from 'src/models';

import {getAuthorities} from '.';

describe('getAuthorities()', () => {
  const url = 'https://api.ratings.food.gov.uk/Authorities';

  const exampleAuthorities: readonly AuthorityResource[] = [
    {
      LocalAuthorityId: 406,
      Name: 'York',
    },
    {
      LocalAuthorityId: 198,
      Name: 'Aberdeenshire',
    },
  ];

  const server = setupServer();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('retrieves authorities sorted by name', async () => {
    server.use(
      rest.get(url, (_req, response, context) => {
        return response(context.json({authorities: exampleAuthorities}));
      }),
    );

    const actualAuthorities = await getAuthorities();

    const expectedAuthorities: readonly Authority[] = [
      {
        id: 198,
        name: 'Aberdeenshire',
      },
      {
        id: 406,
        name: 'York',
      },
    ];

    expect(actualAuthorities).toStrictEqual(expectedAuthorities);
  });

  it('throws when fails to get authorities', async () => {
    server.use(
      rest.get(url, (_request, response, context) => {
        return response(context.status(500));
      }),
    );

    await expect(getAuthorities()).rejects.toThrow(
      'Failed to get authorities (500)',
    );
  });
});
