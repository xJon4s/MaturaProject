import { Deck } from './../deck';
import { MppService } from './../mpp.service';
import { Player } from './../player';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Gameplayer } from '../gameplayer';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Data } from '@angular/router';

export interface DialogData {
  player: Gameplayer;
}

@Component({
  selector: 'mp-player-item',
  templateUrl: './player-item.component.html',
  styleUrls: ['./player-item.component.scss']
})
export class PlayerItemComponent implements OnInit {

  @Input() player!:Gameplayer;
  players!:Array<Player>;
  decks!: Array<Deck>;
  gameplayers!:Array<Gameplayer>;
  aplayer!:Player;
  adeck!:Deck;

  @Output() uploaded:EventEmitter<string> = new EventEmitter<string>();

  constructor(private mpp: MppService,
    public dialog: MatDialog
    ) {


  }

  ngOnInit(): void {
    this.getPlayers();
    this.getGameplayers();
    this.getDecks();
    let temp:Player = new Player(-2,"temp","temp","temp");
    for (let index = 0; index < this.players.length; index++) {
      if(this.player.pid==this.players[index].pid){
        this.aplayer = this.players[index];
        break;
      }
    }

    for (let index = 0; index < this.decks.length; index++) {
      if(this.player.did==this.decks[index].did){
        this.adeck = this.decks[index];
        break;
      }
    }
  }


  //opens dialog to check if a player is to be removed
  karl():void {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      data: {player: this.player},
    });

    dialogRef.afterClosed().subscribe((res)=> {
      if(res == "update")
      {
        this.uploaded.emit("update");
        console.log("player-item: emitted")
      }
    });
  }

  getPlayers(): void {
    this.players = this.mpp.getPlayers();
  }

  getGameplayers(): void {
    this.gameplayers = this.mpp.getGameplayers();
  }

  getDecks(): void {
    this.decks = this.mpp.getDecks();
  }

}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<PlayerItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private mpp:MppService
  ){}


  karl2():void {
    this.dialogRef.close('dont update');
  }

  karl3():void {
    this.mpp.removeGamePlayer(this.data.player);
    this.dialogRef.close('update');
  }

}
