export type User = {
  readonly id?: number;
  readonly name?: string;
  readonly email: string;
  readonly password: string;
};
export type Pokemon = {
  readonly name: string;
  readonly url: string;
};
export type PokemonResource = {
  readonly count?: null | number;
  readonly next?: null | string;
  readonly previous: null | string;
  readonly results: Pokemon[];
};
export interface Pokedex {
  abilities: Ability[];
  base_experience: null;
  forms: Species[];
  game_indices: any[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Moves[];
  name: string;
  order: number;
  past_types: any[];
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}
export interface Moves {
  move: Species;
}
export interface Sprites {
  other: Other;
}
export interface Other {
  'official-artwork': {
    front_default: string;
  };
}
export interface Ability {
  ability: Species;
  is_hidden: boolean;
  slot: number;
}
export interface Species {
  name: string;
  url: string;
}
export interface Stat {
  base_stat: number;
  effort: number;
  stat: Species;
}
export interface Type {
  slot: number;
  type: Species;
}
export type PokemonLink = {
  readonly name: string;
  readonly id: string;
};
export type PokemonParam = {
  readonly pokemon: Pokemon;
};