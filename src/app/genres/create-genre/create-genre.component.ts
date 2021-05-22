import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenreCreationDTO } from '../genres.model';
import { GenresService } from '../genres.service';
import { parseWebApiErrors } from '../../utilities/utils';

@Component({
  selector: 'app-create-genre',
  templateUrl: './create-genre.component.html',
  styleUrls: ['./create-genre.component.css'],
})
export class CreateGenreComponent implements OnInit {
  constructor(private router: Router, private genreService: GenresService) {}

  errors: string[] = [];

  ngOnInit(): void {}

  saveChanges(genreCreationDTO: GenreCreationDTO) {
    this.genreService.create(genreCreationDTO).subscribe(
      () => {
        this.router.navigate(['/genres']);
      },
      (error) => {
        console.error(error);
        this.errors = parseWebApiErrors(error);
      }
    );
  }
}
