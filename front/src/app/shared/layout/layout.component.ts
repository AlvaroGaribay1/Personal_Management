import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TokenService } from '../../services/token/token.service';



  @Component({
    selector: 'app-layout',
    imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLinkActive, RouterLink],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.css',
  })
  export class LayoutComponent implements OnInit {
    email: any;
    username: any;
    role: any;
    id: any;

    constructor(private tokenService: TokenService) {}

    ngOnInit(): void {
      this.email = sessionStorage.getItem('email');
      this.username = sessionStorage.getItem('username');
      this.role = sessionStorage.getItem('role');
      this.id = sessionStorage.getItem('id');
    }

    logout(): void {
      this.tokenService.removeToken();
    }
  };

