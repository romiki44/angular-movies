import { Component, OnInit } from '@angular/core';
import { MovieTheatersCreationDTO } from '../movie-theaters.model';

@Component({
  selector: 'app-create-movie-theater',
  templateUrl: './create-movie-theater.component.html',
  styles: [],
})
export class CreateMovieTheaterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  saveChanges(movieTheater: MovieTheatersCreationDTO) {
    console.log(movieTheater);
  }
}
