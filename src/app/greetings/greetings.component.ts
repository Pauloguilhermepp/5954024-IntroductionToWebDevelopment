import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-greetings',
  templateUrl: './greetings.component.html',
  styleUrl: './greetings.component.css'
})
export class GreetingsComponent {

  constructor(private router: Router) { }

  navigateToGame() {
    this.router.navigate(['/game']);
  }

}
