import { Component, OnInit } from '@angular/core';
import { MovieCreationDTO } from '../movies.model';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styles: [],
})
export class CreateMovieComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  saveChanges(movieCreationDTO: MovieCreationDTO) {
    console.log(movieCreationDTO);
  }
}
