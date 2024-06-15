import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GreetingsComponent } from './greetings/greetings.component';
import { GameComponent } from './game/game.component';
import { BoardComponent } from './game-component/board/board.component';
import { SquareComponent } from './game-component/square/square.component';

@NgModule({
  declarations: [
    AppComponent,
    GreetingsComponent,
    GameComponent,
    BoardComponent,
    SquareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
