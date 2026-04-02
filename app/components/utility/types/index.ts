export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    other: {
      'official-artwork': { 
        front_default: string 
      };
    };
  };
  types: { 
    type: { name: string } 
  }[];
  abilities: { 
    ability: { name: string } 
  }[];
}