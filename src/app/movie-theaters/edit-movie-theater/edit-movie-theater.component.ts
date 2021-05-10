import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  MovieTheatersCreationDTO,
  MovieTheatersDTO,
} from '../movie-theaters.model';

@Component({
  selector: 'app-edit-movie-theater',
  templateUrl: './edit-movie-theater.component.html',
  styles: [],
})
export class EditMovieTheaterComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  model: MovieTheatersDTO = {
    name: 'Aquaman',
    latitude: 18.485587128307838,
    longitude: -69.94995117187501,
  };

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log('edit-movie-theater:' + params.id);
    });
  }

  saveChanges(movieTheater: MovieTheatersCreationDTO) {
    console.log(movieTheater);
  }
}
