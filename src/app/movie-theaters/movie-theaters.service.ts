import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  MovieTheatersCreationDTO,
  MovieTheatersDTO,
} from './movie-theaters.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieTheatersService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl + '/movietheaters';

  public get(): Observable<MovieTheatersDTO[]> {
    return this.http.get<MovieTheatersDTO[]>(this.apiUrl);
  }

  public getById(id: number): Observable<MovieTheatersDTO> {
    return this.http.get<MovieTheatersDTO>(`${this.apiUrl}/${id}`);
  }

  public create(movieTheatersDto: MovieTheatersCreationDTO) {
    return this.http.post(this.apiUrl, movieTheatersDto);
  }

  public edit(id: number, movieTheatersDto: MovieTheatersCreationDTO) {
    return this.http.put(`${this.apiUrl}/${id}`, movieTheatersDto);
  }

  public delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
