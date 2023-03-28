import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'CreateCategorie',
  templateUrl: './create-categoriy.component.html',
  styleUrls: ['./create-categoriy.component.css'],
})
export class CreateCategorie {
  constructor(private router: Router) {}

  volver(): void {
    this.router.navigate(['']);
  }
}
