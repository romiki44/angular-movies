import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../security/security.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(public securityService: SecurityService) {}

  username: string;

  ngOnInit(): void {
    // this.username = this.securityService.getFieldFromJWT('email');
    // console.log('username:', this.username);
  }

  logout() {
    this.securityService.logout();
  }
}
