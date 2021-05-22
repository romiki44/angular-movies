import { Component, OnInit } from '@angular/core';
import { MovieCreationDTO } from '../movies.model';
import { MoviesService } from '../movies.service';
import { MultipleSelectorModel } from '../../utilities/multiple-selector/multiple-selector.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styles: [],
})
export class CreateMovieComponent implements OnInit {
  constructor(private movieService: MoviesService, private router: Router) {}

  nonSelectedGenres: MultipleSelectorModel[];
  nonSelectedMovieTheaters: MultipleSelectorModel[];

  ngOnInit(): void {
    this.movieService.postGet().subscribe((response) => {
      this.nonSelectedGenres = response.genres.map((genre) => {
        return <MultipleSelectorModel>{ key: genre.id, value: genre.name };
      });

      this.nonSelectedMovieTheaters = response.movieTheaters.map(
        (movieTheater) => {
          return <MultipleSelectorModel>{
            key: movieTheater.id,
            value: movieTheater.name,
          };
        }
      );
    });
  }

  saveChanges(movieCreationDTO: MovieCreationDTO) {
    this.movieService.create(movieCreationDTO).subscribe((id) => {
      this.router.navigate(['/movie/' + id]);
    });
  }
}
