import { Component, OnInit } from '@angular/core';
import { ActorCreationDTO } from '../actors.model';

@Component({
  selector: 'app-create-actor',
  templateUrl: './create-actor.component.html',
  styles: [],
})
export class CreateActorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  saveChanges(actorCreationDTO: ActorCreationDTO) {
    console.log('Saving changes', actorCreationDTO);
  }
}
