import { GenreDTO } from '../genres/genres.model';
import { MovieTheatersDTO } from '../movie-theaters/movie-theaters.model';
import { ActorsMovieDTO } from '../actors/actors.model';

export interface MovieCreationDTO {
  title: string;
  summary: string;
  poster: File;
  inTheaters: boolean;
  releaseDate: Date;
  trailer: string;
  genresIds: number[];
  movieTheatersIds: number[];
  actors: ActorsMovieDTO[];
}

export interface MovieDTO {
  id: number;
  title: string;
  summary: string;
  poster: string;
  inTheaters: boolean;
  releaseDate: Date;
  trailer: string;
  genres: GenreDTO[];
  movieTheaters: MovieTheatersDTO[];
  actors: ActorsMovieDTO[];
  averageVote: number;
  userVote: number;
}

export interface MoviePostGetDTO {
  genres: GenreDTO[];
  movieTheaters: MovieTheatersDTO[];
}

export interface HomeDTO {
  inTheaters: MovieDTO[];
  upcomingReleases: MovieDTO[];
}

export interface MoviePutGetDTO {
  movie: MovieDTO;
  selectedGenres: GenreDTO[];
  nonSelectedGenres: GenreDTO[];
  selectedMovieTheaters: MovieTheatersDTO[];
  nonSelectedMovieTheaters: MovieTheatersDTO[];
  actors: ActorsMovieDTO[];
}
