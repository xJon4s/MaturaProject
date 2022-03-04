import { Player } from './../player';
import { Gameplayer } from './../gameplayer';
import { Component, Inject, Input, OnInit } from '@angular/core';
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
  spielera!: Player;
  gameplayers!: Gameplayer[];
  players!: Player[];
  iconname: string = 'sword';
  buttonsdisabled: boolean = true;
  dmgToMe: number = 0;
  pointsdisplayed!: number;
  constructor(private mpp: MppService, public dialog: MatDialog) {}

  ngOnInit(): void {
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
          if (this.mpp.activePlayer?.pid !== this.spieler.pid) {
            this.buttonsdisabled = false;
          }

          //what action was choosen
          switch (this.mpp.activeAction) {
            case 0:
              this.pointsdisplayed = this.spieler.lp;
              break;
            case 1:
              this.pointsdisplayed = this.spieler.getCdmg(this.mpp.activePlayerIndex as number);;
              break;
            case 2:
              this.pointsdisplayed = this.spieler.infect;
              break;

            default:
              break;
          }

          break;

        case 1:
          //When active player is finished
          this.mpp.activePlayer?.dealsDmg(0 - this.dmgToMe);
          this.dmgToMe = 0;
          if (this.mpp.activePlayer?.pid !== this.spieler.pid) {
            this.buttonsdisabled = true;
          }
          this.pointsdisplayed=this.spieler.lp;
          break;
        case 2:
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
        this.pointsdisplayed = this.spieler.getCdmg(this.mpp.activePlayerIndex as number);
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
          this.mpp.emita(0);
          this.iconname = 'finish';
        } else {
          //console.log("theoretisch 2tes");
        }
      });
    } else {
      this.mpp.emita(1);
      await new Promise((f) => setTimeout(f, 500));
      this.iconname = 'sword';
      this.spieler = this.mpp.activePlayer as Gameplayer;
      console.log(this.spieler);
      this.mpp.activePlayer = null;
      this.mpp.activePlayerIndex = null;
      this.mpp.activeAction = null;
    }
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
    this.dialogRef.close(null);
  }

  choose(int: number) {
    this.dialogRef.close(int);
  }
}
