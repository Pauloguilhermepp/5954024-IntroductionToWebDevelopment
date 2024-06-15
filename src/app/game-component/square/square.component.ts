import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../game/game.service';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrl: './square.component.css'
})
export class SquareComponent implements OnInit{

  @Input() square: any;

  constructor(public gameService: GameService) {}

  ngOnInit(): void {
  }

  ChangePlayer() {
    this.gameService.isGameRunning = true;

    console.log(this.square)

    if (this.gameService.isGameRunning && this.square.state === null) {
      this.square.state = this.gameService.activePlayer;
      this.gameService.ChangePlayerTurn(this.square);  // <---- 

      console.log(this.square)
    }
  }

}
