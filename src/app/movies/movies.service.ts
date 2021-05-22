import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {
  MoviePostGetDTO,
  MovieCreationDTO,
  MovieDTO,
  HomeDTO,
} from './movies.model';
import { formatDateFormData } from '../utilities/utils';
import { MoviePutGetDTO } from './movies.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl + '/movies';

  getHomePageMovies(): Observable<HomeDTO> {
    return this.http.get<HomeDTO>(this.apiUrl);
  }

  putGet(id: number): Observable<MoviePutGetDTO> {
    return this.http.get<MoviePutGetDTO>(`${this.apiUrl}/putget/${id}`);
  }

  edit(id: number, movieCreationDto: MovieCreationDTO) {
    const formData = this.BuildFormData(movieCreationDto);
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  getById(id: number): Observable<MovieDTO> {
    return this.http.get<MovieDTO>(`${this.apiUrl}/${id}`);
  }

  filter(values: any): Observable<any> {
    const params = new HttpParams({ fromObject: values });
    return this.http.get<MovieDTO[]>(`${this.apiUrl}/filter`, {
      params,
      observe: 'response',
    });
  }

  postGet(): Observable<MoviePostGetDTO> {
    return this.http.get<MoviePostGetDTO>(`${this.apiUrl}/postget`);
  }

  create(movieCreationDto: MovieCreationDTO): Observable<number> {
    const formData = this.BuildFormData(movieCreationDto);
    return this.http.post<number>(this.apiUrl, formData);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  private BuildFormData(movie: MovieCreationDTO): FormData {
    const formData = new FormData();

    formData.append('title', movie.title);
    formData.append('summary', movie.summary);
    formData.append('trailer', movie.trailer);
    formData.append('inTheaters', String(movie.inTheaters));
    if (movie.releaseDate) {
      formData.append('releaseDate', formatDateFormData(movie.releaseDate));
    }
    if (movie.poster) {
      formData.append('poster', movie.poster);
    }
    formData.append('genresIds', JSON.stringify(movie.genresIds));
    formData.append('movieTheatersIds', JSON.stringify(movie.movieTheatersIds));
    formData.append('actors', JSON.stringify(movie.actors));

    return formData;
  }
}
