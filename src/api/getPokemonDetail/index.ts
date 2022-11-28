import {Authority} from 'src/models';
import {AuthorityResource} from 'src/api/resources';

const toModel = (response: Array<AuthorityResource>): Array<Authority> => {
  const authorities = response.map(authority => ({
    id: authority.LocalAuthorityId,
    name: authority.Name,
  }));

  return authorities.sort(({name: a}, {name: b}) => a.localeCompare(b));
};

const getAuthorities = async (): Promise<readonly Authority[]> => {
  const baseUrl = 'https://api.ratings.food.gov.uk';
  const url = `${baseUrl}/Authorities`;

  const options: RequestInit = {
    headers: {
      accept: 'application/json',
      'x-api-version': '2',
    },
  };

  const result = await fetch(url, options);
  const {status} = result;

  if (status !== 200) {
    throw new Error(`Failed to get authorities (${status})`);
  }

  const response = await result.json();
  const {authorities} = response;

  return toModel(authorities);
};

export {getAuthorities};
