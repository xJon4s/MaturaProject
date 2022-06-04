import { Router } from '@angular/router';
import { Player } from './../player';
import { Gameplayer } from './../gameplayer';
import { Component, Inject, Input, OnInit, EventEmitter } from '@angular/core';
import { MppService } from '../mpp.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogData } from '../player-item/player-item.component';

@Component({
  selector: 'mp-in-game-player',
  templateUrl: './in-game-player.component.html',
  styleUrls: ['./in-game-player.component.scss'],
})
export class InGamePlayerComponent implements OnInit {
  @Input() spieler!: Gameplayer;
  @Input() index!: number;
  @Input() big!: boolean;
  spielera!: Player;
  gameplayers!: Gameplayer[];
  players!: Player[];
  iconname: string = 'sword';
  buttonsdisabled: boolean = true;
  dmgToMe: number = 0;
  pointsdisplayed!: number;
  won:boolean = false;
  constructor(
    private mpp: MppService,
    public dialog: MatDialog,
    public router:Router
    ) {}

  ngOnInit(): void {
    console.log(this.spieler.pid + '  ' + this.big);
    this.gameplayers = this.mpp.getGameplayers();
    this.players = this.mpp.getPlayers();
    this.pointsdisplayed = this.spieler.lp;
    for (let index = 0; index < this.players.length; index++) {
      if (this.players[index].pid == this.spieler.pid) {
        this.spielera = this.players[index];
      }
    }
    this.mpp.emitter.subscribe((res) => {
      switch (res) {
        case 0:
          //When active player has choosen his action
          if (
            this.mpp.activePlayer?.pid !== this.spieler.pid &&
            this.mpp.activeAction !== 4 &&
            this.spieler.alive
          ) {
            this.buttonsdisabled = false;
          }

          //what action was choosen
          switch (this.mpp.activeAction) {
            case 0:
              this.pointsdisplayed = this.spieler.lp;
              break;
            case 1:
              this.pointsdisplayed = this.spieler.getCdmg(
                this.mpp.activePlayerIndex as number
              );
              break;
            case 2:
              this.pointsdisplayed = this.spieler.infect;
              break;

            case 3:
              //if active player nix
              //if no then die
              this.gameFinish();
              break;

            case 4:
              if(
                this.mpp.activePlayer?.pid === this.spieler.pid){
                  this.iconname = "skull";
                  this.spieler.die();
                  console.log("gameplayersalive:" + this.mpp.gameplayersalive + "by" + this.spieler.pid);
                  this.mpp.gameplayersalive -= 1;
                  console.log("gameplayersalive:" + this.mpp.gameplayersalive + "by" + this.spieler.pid);
                  this.mpp.emita(1);
                }
              break;

            default:
              break;
          }
          break;

        case 1:
          //When active player is finished

          //dng calculated
          this.mpp.activePlayer?.dealsDmg(-this.dmgToMe);
          this.dmgToMe = 0;

          //check if player is alive if not kill
          const min = Math.min.apply(Math, this.spieler._cdmg);
          console.log(min);
          if((this.spieler.lp < 1 || this.spieler.infect < 1 || min < 1) && this.spieler.alive){
            this.spieler.deltDmg(-this.spieler.lp);
            this.iconname = "skull";
            this.spieler.die();
            (this.mpp.gameplayersalive as number) -= 1;
          }
          this.pointsdisplayed = this.spieler.lp;
          if (this.mpp.activePlayer?.pid !== this.spieler.pid) {
            this.buttonsdisabled = true;
          }

          this.mpp.emita(2);
          break;
        case 2:
          //if player is the last one standing he wins
          if((this.mpp.gameplayersalive as number) < 2 && this.mpp.activePlayer?.pid == this.spieler.pid && !this.won){
            this.won = true;
            console.log("spieler:" + this.spieler.pid);
            this.gameFinish();
          }
          break;

        default:
          break;
      }

      this.gameplayers = this.mpp.getGameplayers();
      this.players = this.mpp.getPlayers();
    });
  }

  //Deals dmg via arrowwup or arrow down
  damage(dmg: number): void {
    switch (this.mpp.activeAction) {
      case 0:
        this.spieler.deltDmg(dmg);
        this.dmgToMe += dmg;
        this.pointsdisplayed = this.spieler.lp;
        break;
      case 1:
        this.spieler.deltCdmg(this.mpp.activePlayerIndex as number, dmg);
        this.dmgToMe += dmg;
        this.pointsdisplayed = this.spieler.getCdmg(
          this.mpp.activePlayerIndex as number
        );
        break;
      case 2:
        this.spieler.deltInfect(dmg);
        this.dmgToMe += dmg;
        this.pointsdisplayed = this.spieler.infect;
        break;

      default:
        break;
    }
  }

  //when a player presses the fight button
  async fight() {
    if (this.iconname == 'sword') {
      const dialogRef = this.dialog.open(ChooseActionType, {
        autoFocus: false,
      });
      dialogRef.afterClosed().subscribe((res) => {
        console.log('closed');
        if (res !== null && res !== undefined) {
          console.log('changeIcon');
          console.log(res);
          this.mpp.activeAction = res;
          this.mpp.activePlayer = this.spieler;
          this.mpp.activePlayerIndex = this.index;
          this.iconname = 'finish';
          this.mpp.emita(0);
        } else {
          //console.log("theoretisch 2tes");
        }
      });
    } else if(this.iconname == 'skull'){

    }else{
      this.mpp.emita(1);
      await new Promise((f) => setTimeout(f, 100));
      this.iconname = 'sword';
      this.spieler = this.mpp.activePlayer as Gameplayer;
      console.log(this.spieler);
      this.mpp.activePlayer = null;
      this.mpp.activePlayerIndex = null;
      this.mpp.activeAction = null;
    }
  }

  gameFinish() {
    const dialogRef = this.dialog.open(GameFinishDialog, {
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if(res === null || res === undefined){
        this.mpp.reset = true;
        this.router.navigate(['/home']);
      }else{

      }
    });
  }
}

@Component({
  selector: 'ChooseActionType',
  templateUrl: 'ChooseActionType.html',
})
export class ChooseActionType {
  constructor(
    public dialogRef: MatDialogRef<ChooseActionType> /* @Inject(MAT_DIALOG_DATA) public data: DialogData, */
  ) {}

  onNoClick(): void {

  }

  choose(int: number) {
    this.dialogRef.close(int);
  }
}

@Component({
  selector: 'GameFinishDialog',
  templateUrl: 'GameFinishDialog.html',
})
export class GameFinishDialog implements OnInit{
  winnerg!:Gameplayer;
  winnerp!:Player;
  button:boolean = true;
  constructor(
    public dialogRef: MatDialogRef<GameFinishDialog>,
    public mpp:MppService,
    public router:Router
  ) {}
  async ngOnInit(): Promise<void> {
    this.winnerg = this.mpp.findWinnerGamePlayer() as Gameplayer;
    this.winnerp = this.mpp.findWinnerPlayer();

    console.log("sendit");
    await this.mpp.sendIt();
    console.log("sendited");

    this.button = false;
  }

  finish(){
    this.dialogRef.close(null);
  }

  seeStats(){
    this.dialogRef.close(1);
  }

}
