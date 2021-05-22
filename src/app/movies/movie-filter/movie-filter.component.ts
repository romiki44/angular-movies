import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MoviesService } from '../movies.service';
import { GenreDTO } from '../../genres/genres.model';
import { MovieDTO } from '../movies.model';
import { GenresService } from '../../genres/genres.service';
import { HttpResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.css'],
})
export class MovieFilterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private moviesService: MoviesService,
    private genresService: GenresService,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {}

  form: FormGroup;
  genres: GenreDTO[];
  movies: MovieDTO[];
  currentPage = 1;
  recordsPerPage = 10;
  initialFormValues: any;
  totalAmountOfRecords;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: '',
      genreId: 0,
      upcomingReleases: false,
      inTheaters: false,
    });

    this.initialFormValues = this.form.value;
    this.readParametersFromURL();

    this.genresService.getAll().subscribe((genres) => {
      this.genres = genres;

      this.filterMovies(this.form.value);

      this.form.valueChanges.subscribe((values) => {
        this.filterMovies(values);
        this.writeParametersInUrl();
      });
    });
  }

  filterMovies(values: any) {
    values.page = this.currentPage;
    values.recordsPerPage = this.recordsPerPage;

    this.moviesService
      .filter(values)
      .subscribe((response: HttpResponse<MovieDTO[]>) => {
        this.movies = response.body;
        this.totalAmountOfRecords = response.headers.get(
          'totalAmountOfRecords'
        );
      });
  }

  private readParametersFromURL() {
    this.activatedRoute.queryParams.subscribe((params) => {
      var obj: any = {};

      if (params.title) {
        obj.title = params.title;
      }
      if (params.genreId) {
        obj.genreId = Number(params.genreId);
      }
      if (params.upcomingReleases) {
        obj.upcomingReleases = params.upcomingReleases;
      }
      if (params.inTheaters) {
        obj.inTheaters = params.inTheaters;
      }
      if (params.page) {
        this.currentPage = params.page;
      }
      if (params.recordsPerPage) {
        this.recordsPerPage = params.recordsPerPage;
      }

      this.form.patchValue(obj);
    });
  }

  private writeParametersInUrl() {
    const queryStrings = [];
    const formValues = this.form.value;

    if (formValues.title) {
      queryStrings.push(`title=${formValues.title}`);
    }
    if (formValues.genreId != '0') {
      queryStrings.push(`genreId=${formValues.genreId}`);
    }
    if (formValues.upcomingReleases) {
      queryStrings.push(`upcomingReleases=${formValues.upcomingReleases}`);
    }
    if (formValues.inTheaters) {
      queryStrings.push(`inTheaters=${formValues.inTheaters}`);
    }

    queryStrings.push(`page=${this.currentPage}`);
    queryStrings.push(`recordsPerPage=${this.recordsPerPage}`);

    this.location.replaceState('movies/filter', queryStrings.join('&'));
  }

  paginatorUpdate(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.recordsPerPage = event.pageSize;
    this.writeParametersInUrl();
    this.filterMovies(this.form.value);
  }

  clearForm() {
    this.form.patchValue(this.initialFormValues);
  }

  onDelete() {
    this.filterMovies(this.form.value);
  }
}
