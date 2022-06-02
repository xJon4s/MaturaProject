import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { Deck } from './deck';
import { Gameplayer } from './gameplayer';
import { Player } from './player';

@Injectable({
  providedIn: 'root',
})
export class MppService{
  //fetch von Datenbank
  private players!: Array<Player>;

  //fetch von Datenbank
  decks!: Array<Deck>;

  URL:string = "http://localhost:8080";
  reset:boolean = false;
  gameplayers!: Array<Gameplayer>;
  gameplayersalive!:number;
  activePlayer:Gameplayer | null = null;
  activePlayerIndex:number | null = null;
  activeAction:number | null = null;
  @Output() emitter:EventEmitter<number> = new EventEmitter();

  constructor(
    private http:HttpClient
  ) {}

  //Sets the variables form DB
  private setPlayers(object:any[]){
    let temp:Array<Player> = [];
    object.forEach(function(element){
      temp.push(new Player(element.pid,element.fname,element.lname,element.nname));
      console.log(element.pid);
    });
    this.players = temp;
  }

  //Sets the variables form DB
  private setDecks(object:any[]){
    let temp:Array<Deck> = [];
    object.forEach(function(element){
      temp.push(new Deck(element.did, element.commander,element.name,element.pid));
      console.log(element.pid);
    });
    this.decks = temp;
  }

  async activateService(){
    console.log("started");
    console.log("started");
    console.log("started");
    console.log("started");
    await this.http.get<any>(`${this.URL}/db/player`).toPromise().then(
      res => this.setPlayers(res)
    );

    await this.http.get<any>(`${this.URL}/db/deck`).toPromise().then(
      res => this.setDecks(res)
    );
  }


  async test(){
    console.log("started");
    this.http.get<Object>(`${this.URL}/db/player`).subscribe(
      res => console.log(res)
    )
    console.log(this.players);
  }

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
    return this.gameplayers as Array<Gameplayer>;
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
    for (let index = 0; index < (this.gameplayers as Gameplayer[]).length; index++) {
      if (toBeRemoved.pid == (this.gameplayers as Gameplayer[])[index].pid) {
        (this.gameplayers as Gameplayer[]).splice(index,1);
        break;
      }
    }
  }

  findWinnerGamePlayer(): Gameplayer | null{
    const gameplayersalive = (this.gameplayers as Gameplayer[]).filter((playerssss) => playerssss.alive);
    if(gameplayersalive.length == 1){
      return gameplayersalive[0];
    }else{
      return null;
    }

  }

  findWinnerPlayer(): Player{
    const a:number = (this.gameplayers as Gameplayer[]).filter((playerssss) => playerssss.alive)[0].pid;
    return this.players.filter((playersss) => playersss.pid == a)[0];
  }
}
