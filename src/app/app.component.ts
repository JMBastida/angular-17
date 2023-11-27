import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {CoreMaterialModule} from "./core/utils/core-material.module";

/* Playing with standalone component */

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CoreMaterialModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-cafler-app';
}
