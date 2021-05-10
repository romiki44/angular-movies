import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  moviesInTheaters;
  moviesFutureReleases;

  ngOnInit(): void {
    this.moviesInTheaters = [
      {
        title: 'Spider-Man',
        releaseDate: new Date('2012-04-25'),
        price: 1479.99,
        poster:
          'https://upload.wikimedia.org/wikipedia/en/b/bd/Spider-Man_Far_From_Home_poster.jpg',
      },
      {
        title: 'Moana',
        releaseDate: new Date('2016-11-15'),
        price: 385.49,
        poster:
          'https://upload.wikimedia.org/wikipedia/en/2/26/Moana_Teaser_Poster.jpg',
      },
    ];

    this.moviesFutureReleases = [
      {
        title: 'Avengers',
        releaseDate: new Date('2022-07-20'),
        price: 1057.39,
        poster:
          'https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg',
      },
      {
        title: 'Inception',
        releaseDate: new Date('2021-09-10'),
        price: 742.89,
        poster:
          'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg',
      },
    ];
  }
}
