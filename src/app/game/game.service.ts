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
  public gamePoints: { [key: string]: number } = { X: 0, O: 0 };
  public pvpMode: boolean = true;

  constructor() {
    this.NewGame();
  }

  NewGame() {
    this.activePlayer = "X";
    this.turnCount = 0;
    this.isGameRunning = false;
    this.isGameOver = false;
    this.winner = false;
    this.board = this.CreateBoard();
  }

  CreateBoard() {
    let board = [];

    for (let i = 0; i < 9; i++) {
      board.push({ id: i, state: null });
    }

    return board;
  }

  get getBoard() {
    return this.board;
  }

  set setBoard(board: any) {
    this.board = [...board];
  }

  ChangePlayerTurn(squareClicked: any) {
    this.UpadateBoard(squareClicked);

    if (!this.isGameOver) {
      this.activePlayer = (this.activePlayer === "X") ? "O" : "X";
    }

    this.turnCount++;
    this.isGameOver = this.isGameOver ? true : false;
    this.CheckBotMovement();
  }

  ChangeGameMode() {
    this.NewGame();
    this.pvpMode = !this.pvpMode;
    this.gamePoints = { X: 0, O: 0 };
  }

  CheckBotMovement() {
    if (this.pvpMode || this.activePlayer === "X") {
      return;
    }

    this.MakeBotMovement();

    if (!this.isGameOver) {
      this.activePlayer = (this.activePlayer === "X") ? "O" : "X";
    }

    this.turnCount++;
    this.isGameOver = this.isGameOver ? true : false;
  }

  MakeBotMovement() {
    let bestScore = -Infinity;
    let move = -1;

    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i].state === null) {
        this.board[i].state = "O";
        let score = this.minimax(this.board, 0, false);
        this.board[i].state = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }

    if (move !== -1) {
      this.board[move].state = "O";
      if (this.isWinner) {
        this.winner = true;
        this.isGameOver = true;
        this.gamePoints["O"]++;
      }
    }
  }

  minimax(board: any, depth: number, isMaximizing: boolean): number {
    if (this.checkWinner(board, "O")) return 10 - depth;
    if (this.checkWinner(board, "X")) return depth - 10;
    if (this.isBoardFull(board)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i].state === null) {
          board[i].state = "O";
          let score = this.minimax(board, depth + 1, false);
          board[i].state = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i].state === null) {
          board[i].state = "X";
          let score = this.minimax(board, depth + 1, true);
          board[i].state = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  checkWinner(board: any, player: string): boolean {
    return this.checkRows(board, "row", player) || this.checkRows(board, "col", player) || this.checkDiag(board, player);
  }

  isBoardFull(board: any): boolean {
    return board.every((square: any) => square.state !== null);
  }

  UpadateBoard(squareClicked: any) {
    this.board[squareClicked.id].state = squareClicked.state;

    if (this.isWinner) {
      this.winner = true;
      this.isGameOver = true;
      this.gamePoints[this.activePlayer]++;
    }
  }

  get gameOver(): boolean {
    return this.turnCount > 8 || this.winner ? true : false;
  }

  get isWinner(): boolean {
    return this.checkDiag(this.board, this.activePlayer) || this.checkRows(this.board, "row", this.activePlayer) || this.checkRows(this.board, "col", this.activePlayer) ? true : false;
  }

  checkRows(board: any, mode: any, player: string): boolean {
    const ROW = mode === "row" ? true : false;
    const DIST = ROW ? 1 : 3;
    const INC = ROW ? 3 : 1;
    const NUMTIMES = ROW ? 7 : 3;

    for (let i = 0; i < NUMTIMES; i += INC) {
      let firstSquare = board[i].state;
      let secondSquare = board[i + DIST].state;
      let thirdSquare = board[i + (DIST * 2)].state;

      if (firstSquare && secondSquare && thirdSquare) {
        if (firstSquare === secondSquare && secondSquare === thirdSquare && firstSquare === player) {
          return true;
        }
      }
    }

    return false;
  }

  checkDiag(board: any, player: string) {
    const timesRun = 2;
    const midSquare = board[4].state;

    for (let i = 0; i <= timesRun; i += 2) {
      let upperCorner = board[i].state;
      let lowerCorner = board[8 - i].state;

      if (midSquare && upperCorner && lowerCorner) {
        if (midSquare === upperCorner && upperCorner === lowerCorner && midSquare === player) {
          return true;
        }
      }
    }

    return false;
  }
}
