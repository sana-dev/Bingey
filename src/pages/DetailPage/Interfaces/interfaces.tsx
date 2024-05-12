export interface Genre {
  id: number;
  name: string;
}

export interface Language {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface Actor {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
}

export interface MovieDetail {
  title: string;
  overview: string;
  release_date: string;
  poster_path?: string;
  genres?: Genre[];
  original_language?: string;
  spoken_languages?: Language[];
  production_companies?: ProductionCompany[];
  vote_average?: number;
  mainCharacter?: Actor;
  runtime?: number;
}
