import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieDTO, MovieCreationDTO } from '../movies.model';
import { MultipleSelectorModel } from '../../utilities/multiple-selector/multiple-selector.model';
import { ActorsMovieDTO } from '../../actors/actors.model';

@Component({
  selector: 'app-form-movie',
  templateUrl: './form-movie.component.html',
  styleUrls: ['./form-movie.component.css'],
})
export class FormMovieComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  @Input()
  model: MovieDTO;
  @Input()
  nonSelectedGenres: MultipleSelectorModel[] = [];
  @Input()
  nonSelectedMovieTheaters: MultipleSelectorModel[] = [];
  @Input()
  selectedActors: ActorsMovieDTO[] = [];
  @Input()
  selectedGenres: MultipleSelectorModel[] = [];
  @Input()
  selectedMovieTheaters: MultipleSelectorModel[] = [];
  @Output()
  onSaveChanges = new EventEmitter<MovieCreationDTO>();

  form: FormGroup;

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
      actors: '',
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

    const actors = this.selectedActors.map((value) => {
      return { id: value.id, character: value.character };
    });
    this.form.get('actors').setValue(actors);

    this.onSaveChanges.emit(this.form.value);
  }

  onImageSelected(file: File) {
    this.form.get('poster').setValue(file);
  }

  changeMarkdown(content: string) {
    this.form.get('summary').setValue(content);
  }
}
