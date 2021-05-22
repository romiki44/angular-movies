import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieCreationDTO, MovieDTO } from '../movies.model';
import { MoviesService } from '../movies.service';
import { MultipleSelectorModel } from '../../utilities/multiple-selector/multiple-selector.model';
import { ActorsMovieDTO } from '../../actors/actors.model';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css'],
})
export class EditMovieComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService,
    private router: Router
  ) {}

  model: MovieDTO;
  selectedGenres: MultipleSelectorModel[];
  nonSelectedGenres: MultipleSelectorModel[];
  selectedMovieTheaters: MultipleSelectorModel[];
  nonSelectedMovieTheaters: MultipleSelectorModel[];
  selectedActors: ActorsMovieDTO[];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.moviesService.putGet(params.id).subscribe((putGetDto) => {
        this.model = putGetDto.movie;

        this.selectedGenres = putGetDto.selectedGenres.map((genre) => {
          return <MultipleSelectorModel>{ key: genre.id, value: genre.name };
        });

        this.nonSelectedGenres = putGetDto.nonSelectedGenres.map((genre) => {
          return <MultipleSelectorModel>{ key: genre.id, value: genre.name };
        });

        this.selectedMovieTheaters = putGetDto.selectedMovieTheaters.map(
          (movieTheater) => {
            return <MultipleSelectorModel>{
              key: movieTheater.id,
              value: movieTheater.name,
            };
          }
        );

        this.nonSelectedMovieTheaters = putGetDto.nonSelectedMovieTheaters.map(
          (movieTheater) => {
            return <MultipleSelectorModel>{
              key: movieTheater.id,
              value: movieTheater.name,
            };
          }
        );

        this.selectedActors = putGetDto.actors;
      });
    });
  }

  saveChanges(movieCreationDTO: MovieCreationDTO) {
    this.moviesService.edit(this.model.id, movieCreationDTO).subscribe(() => {
      this.router.navigate(['/movie/' + this.model.id]);
    });
  }
}
