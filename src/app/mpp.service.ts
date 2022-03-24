import { Observable } from 'rxjs';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Deck } from './deck';
import { Gameplayer } from './gameplayer';
import { Player } from './player';

@Injectable({
  providedIn: 'root',
})
export class MppService {
  //fetch von Datenbank
  players: Array<Player> = [
    new Player(0, 'Alex', 'Alex', 'Player1'),
    new Player(1, 'Jonas', 'Jonas', 'Jonas'),
    new Player(2, 'Elias', 'Elias', 'Player3'),
    new Player(3, 'Michael', 'Michael', 'Player4'),
    new Player(4, 'Christian', 'Christian', 'Player5'),
    new Player(5, 'Mchi', 'Muchi', 'Player6'),
    new Player(6, 'Thaler', 'Thaler', 'Player7'),
    new Player(7, 'Dr', 'Semmpai', 'Pablos'),
  ];

  //fetch von Datenbank
  decks: Array<Deck> = [
    new Deck(0, 'Kenrith', 'Midrange cEDH Combo', 28, 1),
    new Deck(1, 'Sissey', 'Stax cEDH Lock', 29, 4),
    new Deck(2, 'Breya', 'Aggro cEDH  Combo', 28, 4),
    new Deck(3, 'Brago', 'Flicker', 28, 1),
    new Deck(4, 'Arcades', 'Aggro Wall Tribal', 40, 1),
    new Deck(5, 'Karametra', 'Enchantress', 40, 1),
    new Deck(6, 'Muldrotha, the Gravetied', 'Value', 40, 1),
    new Deck(7, 'bo', 'jajajaa', 40, 1),
  ];

  gameplayers!: Array<Gameplayer>;
  gameplayersalive!:number;
  activePlayer:Gameplayer | null = null;
  activePlayerIndex:number | null = null;
  activeAction:number | null = null;
  @Output() emitter:EventEmitter<number> = new EventEmitter();

  constructor() {}

  emita(id:number):void{
    this.emitter.emit(id);
  }

  getPlayers(): Array<Player> {
    return this.players;
  }

  getDecks(): Array<Deck> {
    return this.decks;
  }

  getGameplayers(): Array<Gameplayer> {
    return this.gameplayers;
  }

  addGamePlayer(pid: number, did: number) {
    if (this.gameplayers == undefined) {
      console.log(this.gameplayers);
      let temp: Array<Gameplayer> = [new Gameplayer(pid, did)];
      this.gameplayers = temp;
      console.log('created new array');
    } else {
      console.log(this.gameplayers);
      this.gameplayers.push(new Gameplayer(pid, did));
      console.log('added new player');
    }
  }

  removeGamePlayer(toBeRemoved: Gameplayer): void {
    for (let index = 0; index < this.gameplayers.length; index++) {
      if (toBeRemoved.pid == this.gameplayers[index].pid) {
        this.gameplayers.splice(index,1);
        break;
      }
    }
  }
}
