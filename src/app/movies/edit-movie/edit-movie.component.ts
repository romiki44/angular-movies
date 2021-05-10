import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieCreationDTO, MovieDTO } from '../movies.model';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css'],
})
export class EditMovieComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  model: MovieDTO = {
    title: 'Spider-Man',
    inTheaters: true,
    summary: 'About Spider-Man',
    releaseDate: new Date(2010, 11, 17),
    trailer: 'Vese9a_nu5A',
    poster:
      'https://static.posters.cz/image/750/plagaty/spider-man-protector-of-the-city-i74197.jpg',
  };

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {});
  }

  saveChanges(movieCreationDTO: MovieCreationDTO) {
    console.log(movieCreationDTO);
  }
}
