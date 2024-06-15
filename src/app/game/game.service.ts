import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public board: any = [];
  public boardSize: number = 9;
  public activePlayer: string = "X";
  public turnCount: number = 0;
  public isGameRunning: boolean = false;
  public isGameOver: boolean = false;
  public winner: boolean = false;

  constructor() {
    this.NewGame();
  }

  NewGame() {
    this.activePlayer = "X";
    this.turnCount = 0;
    this.isGameRunning = false;
    this.isGameOver = false;
    this.board = this.CreateBoard();
  }

  CreateBoard() {
    let board = [];

    for (let i = 0; i < 9; i++) {
      board.push( {id:i, state: null} );
    }

    return board;
  }

  get getBoard() {
    return this.board;
  }

  set setBoard(board: any) {
    this.board = [... board];
  }

  ChangePlayerTurn(squareClicked: any) {
    this.UpadateBoard(squareClicked);

    if (!this.isGameOver) {
      this.activePlayer = (this.activePlayer === "X") ? "O" : "X";
    }

    this.turnCount++;
    this.isGameOver = this.isGameOver ? true : false;
  }

  UpadateBoard(squareClicked: any) {
    this.board[squareClicked.id].state = squareClicked.state;

    if(this.isWinner) {
      this.winner = true;
      this.isGameOver = true;
    }
  }

  get gameOver(): boolean {
    return this.turnCount > 8 || this.winner ? true : false;
  }

  get isWinner(): boolean {
    return this.checkDiag() || this.checkRows(this.board, "row") || this.checkRows(this.board, "col") ? true : false;
  }

  checkRows(board: any, mode: any) : boolean {
    const ROW = mode === "row" ? true : false;
    const DIST = ROW ? 1 : 3;
    const INC = ROW ? 3 : 1;
    const NUMTIMES = ROW ? 7 : 3;

    for (let i = 0; i < NUMTIMES; i += INC) {
      let firstSquare = board[i].state;
      let secondSquare = board[i+DIST].state;
      let thirdSquare = board[i+(DIST*2)].state;

      if (firstSquare && secondSquare && thirdSquare) {
        if (firstSquare === secondSquare && secondSquare === thirdSquare) {
          return true;
        }
      }
    }

    return false;
  }

  checkDiag() {
    const timesRun = 2;
    const midSquare = this.board[4].state;

    for (let i = 0; i <= timesRun; i += 2) {
      let upperCorner = this.board[i].state;
      let lowerCorner = this.board[8-i].state;

      if (midSquare && upperCorner && lowerCorner) {
        if (midSquare === upperCorner && upperCorner === lowerCorner) {
          return true;
        }
      }
    }

    return false;
  }


}
