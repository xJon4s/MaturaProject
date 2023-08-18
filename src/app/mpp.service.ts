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
    });
    this.players = temp;
  }

  //Sets the variables form DB
  private setDecks(object:any[]){
    let temp:Array<Deck> = [];
    object.forEach(function(element){
      temp.push(new Deck(element.did, element.commander,element.name,element.pid));
    });
    this.decks = temp;
  }

  async activateService(){
    if(this.players == undefined && this.furztrue())
    await this.http.get<any>(`${this.URL}/db/player`).toPromise().then(
      res => {console.log(res);this.setPlayers(res);}
    );
    if(this.decks == undefined && this.furztrue())
    await this.http.get<any>(`${this.URL}/db/deck`).toPromise().then(
      res => this.setDecks(res)
    );
  }

  furztrue():boolean{
    console.log("geat")
    return true;
  }

  //sends game to DB
  async sendIt() {
    let result = await this.http.post<any>(`${this.URL}/db/game`,{
      pid: this.gameplayers[0].pid,
      did: this.gameplayers[0].did,
      gwin: this.gameplayers[0].alive,
      gdmg: this.gameplayers[0].dmg,
      gkills: this.gameplayers[0].kills
    }).toPromise();

    console.log("autoincrement:" + result[0].AUTO_INCREMENT);
    console.log("gameplayers:" + this.gameplayers.length);
    let lauf = 1;

    while (lauf<this.gameplayers.length) {
      console.log("furz" + lauf + "<" + this.gameplayers.length)
      await this.http.post<any>(`${this.URL}/db/games`,{
        gid: result[0].AUTO_INCREMENT-1,
        pid: this.gameplayers[lauf].pid,
        did: this.gameplayers[lauf].did,
        gwin: this.gameplayers[lauf].alive,
        gdmg: this.gameplayers[lauf].dmg,
        gkills: this.gameplayers[lauf].kills
      }).toPromise();
      lauf++;
    }
  }

  emita(id:number):void{
    console.log("emita:" , id);
    this.emitter.emit(id);
  }

  //returns a player indentifyed by its pid
  getPlayer(id:number): Player|null{
    let ret:Player|null = null;
    let players = this.getPlayers();
    for (let index = 0; index < players.length; index++) {
      if(players[index].pid == id){
        ret = players[index]
        break;
      }
    }

    return ret;
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
      let temp: Array<Gameplayer> = [new Gameplayer(pid, did)];
      this.gameplayers = temp;
    } else {
      this.gameplayers.push(new Gameplayer(pid, did));
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

  //Changes the position of two players wia their position in the gameplayers array
  changePosition(pid:number):void{
    let activeplayerPosition = 0;
    let otherplyerPosition = 0;
    let otherPlyer;
    for (let index = 0; index < this.gameplayers.length; index++) {
      const element = this.gameplayers[index];
      if(element.pid == pid){
        otherplyerPosition = index;
        otherPlyer = element;
      }else if(element.pid == this.activePlayer?.pid){
        activeplayerPosition = index;
      }
    }

    this.gameplayers[activeplayerPosition] = otherPlyer as Gameplayer;
    this.gameplayers[otherplyerPosition] = this.activePlayer as Gameplayer;
    this.emita(6);
  }

  //kills all other players
  killAllJediChildren(pid:number):void{
    for (let index = 0; index < this.gameplayers.length; index++) {
      if(this.gameplayers[index].pid !== pid){
        this.gameplayers[index].die();
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
