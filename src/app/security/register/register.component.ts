import { Component, OnInit } from '@angular/core';
import { UserCredentials } from '../security.model';
import { SecurityService } from '../security.service';
import { parseWebApiErrors } from '../../utilities/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {}

  errors: string[] = [];

  ngOnInit(): void {}

  register(userCredentials: UserCredentials) {
    this.errors = [];
    this.securityService.register(userCredentials).subscribe(
      (authenticationResponse) => {
        console.log('register:', authenticationResponse);
        this.securityService.saveToken(authenticationResponse);
        this.router.navigate(['/']);
      },
      (error) => (this.errors = parseWebApiErrors(error))
    );
  }
}
