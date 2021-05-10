import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieDTO, MovieCreationDTO } from '../movies.model';
import { MultipleSelectorModel } from '../../utilities/multiple-selector/multiple-selector.model';

@Component({
  selector: 'app-form-movie',
  templateUrl: './form-movie.component.html',
  styleUrls: ['./form-movie.component.css'],
})
export class FormMovieComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  @Input()
  model: MovieDTO;
  @Output()
  onSaveChanges = new EventEmitter<MovieCreationDTO>();

  form: FormGroup;
  nonSelectedGenres: MultipleSelectorModel[] = [
    { key: 1, value: 'Action' },
    { key: 2, value: 'Comedy' },
    { key: 3, value: 'Sci-fi' },
  ];

  selectedGenres: MultipleSelectorModel[] = [];

  nonSelectedMovieTheaters: MultipleSelectorModel[] = [
    { key: 1, value: 'Agora' },
    { key: 2, value: 'Sambil' },
    { key: 3, value: 'Megacentro' },
  ];

  selectedMovieTheaters: MultipleSelectorModel[] = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', { validators: [Validators.required] }],
      summary: '',
      inTheaters: false,
      trailer: '',
      releaseDate: '',
      poster: '',
      genresIds: '',
      movieTheatersIds: '',
    });

    if (this.model !== undefined) {
      this.form.patchValue(this.model);
    }
  }

  saveChanges() {
    const genresIds = this.selectedGenres.map((value) => value.key);
    this.form.get('genresIds').setValue(genresIds);

    const moviesTheatersIds = this.selectedMovieTheaters.map(
      (value) => value.key
    );
    this.form.get('movieTheatersIds').setValue(moviesTheatersIds);

    this.onSaveChanges.emit(this.form.value);
  }

  onImageSelected(file: File) {
    this.form.get('poster').setValue(file);
  }

  changeMarkdown(content: string) {
    this.form.get('summary').setValue(content);
  }
}
