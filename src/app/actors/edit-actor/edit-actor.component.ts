import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorCreationDTO, ActorDTO } from '../actors.model';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-edit-actor',
  templateUrl: './edit-actor.component.html',
  styles: [],
})
export class EditActorComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private actorService: ActorsService,
    private router: Router
  ) {}

  model: ActorDTO;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.actorService
        .getById(params.id)
        .subscribe((actor) => (this.model = actor));
    });
  }

  saveChanges(actorCreationDTO: ActorCreationDTO) {
    this.actorService.edit(this.model.id, actorCreationDTO).subscribe(() => {
      this.router.navigate(['/actors']);
    });
  }
}
