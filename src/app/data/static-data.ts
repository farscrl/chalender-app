export interface Genre {
  id: string;
  name: string;
}

export interface Region {
  id: string;
  name: string;
}

export interface EventLanguage {
  id: string;
  name: string;
}


export const eventLanguages: EventLanguage[] = [
  {
    id: 'rm',
    name: 'rumantsch'
  },
  {
    id: 'de',
    name: 'tudestg'
  },
  {
    id: 'it',
    name: 'talian'
  },
  {
    id: 'fr',
    name: 'franzos'
  },
  {
    id: 'en',
    name: 'englais'
  },
  {
    id: 'xx',
    name: 'auter'
  },
];
