import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieTheatersCreationDTO } from '../movie-theaters.model';
import { MovieTheatersService } from '../movie-theaters.service';

@Component({
  selector: 'app-create-movie-theater',
  templateUrl: './create-movie-theater.component.html',
  styles: [],
})
export class CreateMovieTheaterComponent implements OnInit {
  constructor(
    private movieTheaterService: MovieTheatersService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  saveChanges(movieTheaterDto: MovieTheatersCreationDTO) {
    this.movieTheaterService.create(movieTheaterDto).subscribe(() => {
      this.router.navigate(['/movietheaters']);
    });
  }
}
