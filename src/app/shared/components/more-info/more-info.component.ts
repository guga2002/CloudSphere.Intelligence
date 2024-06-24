import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-more-info',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './more-info.component.html',
  styleUrl: './more-info.component.css',
})
export class MoreInfoComponent {}
