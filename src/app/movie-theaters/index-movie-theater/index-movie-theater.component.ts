import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieTheatersService } from '../movie-theaters.service';
import { MovieTheatersDTO } from '../movie-theaters.model';

@Component({
  selector: 'app-index-movie-theater',
  templateUrl: './index-movie-theater.component.html',
  styles: [],
})
export class IndexMovieTheaterComponent implements OnInit {
  constructor(
    private movieTheaterService: MovieTheatersService,
    private router: Router
  ) {}

  movieTheaters: MovieTheatersDTO[];
  displayColumns = ['name', 'actions'];

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.movieTheaterService.get().subscribe((movieTheaters) => {
      this.movieTheaters = movieTheaters;
    });
  }

  delete(id: number) {
    this.movieTheaterService.delete(id).subscribe(() => this.loadData());
  }
}
