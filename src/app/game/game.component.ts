import { Component } from '@angular/core';
import { GameService } from './game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {

  constructor(public gameService: GameService) {

  }

  ResetGame() {
    //this.gameService.NewGame();
    window.location.reload();
  }

}
