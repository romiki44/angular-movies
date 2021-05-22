import { Injectable } from '@angular/core';
import { ActorCreationDTO, ActorDTO, ActorsMovieDTO } from './actors.model';
import { formatDateFormData } from '../utilities/utils';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActorsService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl + '/actors';

  get(page: number, recordsPerPage: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('recordsPerPage', recordsPerPage.toString());
    return this.http.get<ActorDTO[]>(this.apiUrl, {
      observe: 'response',
      params,
    });
  }

  getById(id: number): Observable<ActorDTO> {
    return this.http.get<ActorDTO>(`${this.apiUrl}/${id}`);
  }

  searchByName(name: string): Observable<ActorsMovieDTO[]> {
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.http.post<ActorsMovieDTO[]>(
      `${this.apiUrl}/searchByName`,
      JSON.stringify(name),
      { headers }
    );
  }

  create(actor: ActorCreationDTO) {
    const formData = this.buildFormData(actor);
    return this.http.post(this.apiUrl, formData);
  }

  edit(id: number, actor: ActorCreationDTO) {
    const formData = this.buildFormData(actor);
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  private buildFormData(actor: ActorCreationDTO): FormData {
    const formData = new FormData();

    formData.append('name', actor.name);
    if (actor.biography) {
      formData.append('biography', actor.biography);
    }
    if (actor.dateOfBirth) {
      formData.append('dateOfBirth', formatDateFormData(actor.dateOfBirth));
    }
    if (actor.picture) {
      formData.append('picture', actor.picture);
    }

    return formData;
  }
}
