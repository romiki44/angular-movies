import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenreDTO, GenreCreationDTO } from './genres.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl + '/genres';

  getAll(): Observable<GenreDTO[]> {
    //return [{ id: 1, name: 'Drama' }];
    return this.http.get<GenreDTO[]>(this.apiUrl);
  }

  create(genre: GenreCreationDTO) {
    return this.http.post(this.apiUrl, genre);
  }

  getById(id: number): Observable<GenreDTO> {
    return this.http.get<GenreDTO>(`${this.apiUrl}/${id}`);
  }

  edit(id: number, genre: GenreCreationDTO) {
    return this.http.put<GenreDTO>(`${this.apiUrl}/${id}`, genre);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
