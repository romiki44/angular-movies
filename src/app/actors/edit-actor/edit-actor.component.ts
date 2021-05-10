import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActorCreationDTO, ActorDTO } from '../actors.model';

@Component({
  selector: 'app-edit-actor',
  templateUrl: './edit-actor.component.html',
  styles: [],
})
export class EditActorComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  model: ActorDTO = {
    name: 'Tom Holland',
    dateOfBirth: new Date(1996, 5, 17),
    biography: 'About Tomeke',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/f/fd/Tom_Holland_MTV_2018_%2802%29.jpg',
  };

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log('edit-actor:' + params.id);
    });
  }

  saveChanges(actorCreationDTO: ActorCreationDTO) {
    console.log('Edit saving', actorCreationDTO);
  }
}
