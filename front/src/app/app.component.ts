import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LayoutComponent } from "./shared/layout/layout.component";



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front_management';
}
