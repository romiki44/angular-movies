export interface ActorCreationDTO {
  name: string;
  dateOfBirth: Date;
  picture: File;
  biography: string;
}

export interface ActorDTO {
  id: number;
  name: string;
  dateOfBirth: Date;
  picture: string;
  biography: string;
}

export interface ActorsMovieDTO {
  id: number;
  name: string;
  character: string;
  picture: string;
}
