import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActorCreationDTO } from '../actors.model';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-create-actor',
  templateUrl: './create-actor.component.html',
  styles: [],
})
export class CreateActorComponent implements OnInit {
  constructor(private actorService: ActorsService, private router: Router) {}

  ngOnInit(): void {}

  saveChanges(actorCreationDTO: ActorCreationDTO) {
    this.actorService.create(actorCreationDTO).subscribe(() => {
      this.router.navigate(['/actors']);
    });
  }
}
