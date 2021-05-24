import { Component, OnInit } from '@angular/core';
import { UserCredentials } from '../security.model';
import { SecurityService } from '../security.service';
import { Router } from '@angular/router';
import { parseWebApiErrors } from '../../utilities/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {}

  errors: string[] = [];

  ngOnInit(): void {}

  login(userCredentials: UserCredentials) {
    this.securityService.login(userCredentials).subscribe(
      (authenticatedResponse) => {
        console.log('login:', authenticatedResponse);
        this.securityService.saveToken(authenticatedResponse);
        this.router.navigate(['/']);
      },
      (error) => (this.errors = parseWebApiErrors(error))
    );
  }
}
