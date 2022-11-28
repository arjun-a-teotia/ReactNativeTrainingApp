type User = {
  readonly id?: number;
  readonly name?: string;
  readonly email: string;
  readonly password: string;
};
type Pokemon = {
  readonly name?: string;
  readonly url: string;
};
type PokemonResource = {
  readonly count?: null | number;
  readonly next?: null | string;
  readonly previous: null | string;
  readonly results: Pokemon[];
};

export type {User, Pokemon, PokemonResource};
