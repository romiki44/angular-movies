import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent implements OnInit {
  constructor() {}

  @Input()
  movies;

  ngOnInit(): void {}

  remove(index: number) {
    console.log(`removing index ${index}`);
    this.movies.splice(index, 1);
  }
}
