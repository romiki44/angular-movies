import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenreCreationDTO } from '../genres.model';

@Component({
  selector: 'app-edit-genre',
  templateUrl: './edit-genre.component.html',
  styleUrls: ['./edit-genre.component.css'],
})
export class EditGenreComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  model: GenreCreationDTO = { name: 'Drama' };

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log('edit-genre:' + params.id);
    });
  }

  saveChanges(genreCreationDTO: GenreCreationDTO) {
    console.log(genreCreationDTO);
    this.router.navigate(['/genres']);
  }
}
