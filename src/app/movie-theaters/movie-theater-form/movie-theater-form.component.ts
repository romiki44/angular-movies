import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoordinatesMap } from 'src/app/utilities/map/coordinate';
import { CoordinatesMapWithMessage } from '../../utilities/map/coordinate';
import {
  MovieTheatersCreationDTO,
  MovieTheatersDTO,
} from '../movie-theaters.model';

@Component({
  selector: 'app-movie-theater-form',
  templateUrl: './movie-theater-form.component.html',
  styleUrls: ['./movie-theater-form.component.css'],
})
export class MovieTheaterFormComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  @Input()
  model: MovieTheatersDTO;
  @Output()
  onSaveChanges = new EventEmitter<MovieTheatersCreationDTO>();

  form: FormGroup;
  initialCoordinates: CoordinatesMapWithMessage[] = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', { validators: [Validators.required] }],
      longitude: ['', { validators: [Validators.required] }],
      latitude: ['', { validators: [Validators.required] }],
    });

    if (this.model !== undefined) {
      this.form.patchValue(this.model);
      this.initialCoordinates.push({
        latitude: this.model.latitude,
        longitude: this.model.longitude,
        message: this.model.name,
      });
      console.log(this.initialCoordinates);
    }
  }

  onSelectedLocation(coordinates: CoordinatesMap) {
    this.form.patchValue(coordinates);
  }

  saveChanges() {
    this.onSaveChanges.emit(this.form.value);
  }
}
