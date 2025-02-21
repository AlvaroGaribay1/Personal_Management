import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { TokenService } from '../../services/auth/token.service';



  @Component({
    selector: 'app-layout',
    imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.css',
  })
  export class LayoutComponent {
    email = sessionStorage.getItem('email');
    username = sessionStorage.getItem('username');
    role = sessionStorage.getItem('role');

    constructor(private tokenService: TokenService) {}

    logout(): void {
      this.tokenService.removeToken();
    }
  };

