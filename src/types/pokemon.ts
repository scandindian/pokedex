export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: PokemonTypeDetail[];
  moves: string[];
}

export interface PokemonTypeDetail {
  name: string;
  icon: string | null;
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonType {
  slot: number;
  type: PokemonTypeRoot;
}
export interface PokemonTypeRoot {
  name: string;
  url: string;
}

export interface PokemonMove {
  move: PokemonMoveRoot;
  version_group_details: VersionGroupDetail[];
}

export interface PokemonMoveRoot {
  name: string;
  url: string;
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: MoveLearnMethod;
  order: null | number;
  version_group: VersionGroup;
}

export interface MoveLearnMethod {
  name: string;
  url: string;
}

export interface VersionGroup {
  name: string;
  url: string;
}
