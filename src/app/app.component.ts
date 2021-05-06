import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-movies';
  moviesInTheaters;
  moviesFutureReleases;
  display = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.moviesInTheaters = [
        {
          title: 'Spider-Man',
          releaseDate: new Date('2012-04-25'),
          price: 1479.99,
        },
        {
          title: 'Moana',
          releaseDate: new Date('2016-11-15'),
          price: 385.49,
        },
      ];

      this.moviesFutureReleases = [
        {
          title: 'Avengers',
          releaseDate: new Date('2022-07-20'),
          price: 1057.39,
        },
        {
          title: 'Toy Story',
          releaseDate: new Date('2021-09-10'),
          price: 742.89,
        },
      ];
    }, 800);
  }

  handleRating(rate: number) {
    alert(`User selected ${rate}/5`);
  }

  handleInput($event) {
    this.title = (<HTMLInputElement>$event.target).value;
  }
}
