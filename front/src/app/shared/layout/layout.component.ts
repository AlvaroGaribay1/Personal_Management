import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';


  @Component({
    selector: 'app-layout',
    imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.css',
  })

  export class LayoutComponent {};
