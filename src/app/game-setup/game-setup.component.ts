import { Player } from './../player';
import {
  Component,
  Input,
  OnInit,
  SystemJsNgModuleLoader,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MppService } from '../mpp.service';
import { Gameplayer } from '../gameplayer';
import { FlexLayoutModule } from '@angular/flex-layout';


@Component({
  selector: 'mp-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.scss'],
})
export class GameSetupComponent implements OnInit {
  stateCtrl = new FormControl();
  filteredPlayers: Observable<Player[]>;

  players!: Array<Player>;
  gameplayers!: Array<Gameplayer>;
  gameplayerslength:number = 0;

  /* @Input() eingabe!:string; */

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private mpp: MppService
  ) {
    this.getPlayers();
    this.getGameplayers();

    this.filteredPlayers = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map((player) => this._filterPlayer(player))
    );
  }

  ngOnInit(): void {
    this.getGameplayers();
  }

  private _filterPlayer(value: string): Player[] {
    if(value==undefined)
      value = "";
    this.getGameplayers();
    console.log(this.gameplayers);
    console.log('abbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
    const filterValue = value.toLowerCase();
    const filteredplayersOne: Player[] = this.players.filter((player) =>
      player.nname.toLowerCase().includes(filterValue)
    );
    return filteredplayersOne.filter((player) =>
      this.isAllreadyInThere(player)
    );
  }

  //checks if param player is allready in use
  isAllreadyInThere(player: Player): boolean {
    console.log('isAlreadyInThere has started');
    let ret: boolean = true;
    if (this.gameplayers !== undefined) {
      console.log(this.gameplayers.length);
      for (let index = 0; index < this.gameplayers.length; index++ || ret) {
        if (this.gameplayers[index].pid == player.pid) {
          console.log(player.nname + '' + ret);
        ret = false;
        }
      }
    }
    return ret;
  }

  //Opens choose-deck-component with parameter of playerid
  addPlayer(player: Player): void {
    console.log('addPlayer has started');
    let test: number = this.isInThere(player);
    if (this.isInThere(player) >= 0) {
      console.log('addPlayer has finished, everything ok');
      this.router.navigate(['/game-setup/', this.isInThere(player)]);
    } else {
      console.log('ganz laut schreien');
    }
  }

  //Checks if parameter "player" exists as nickname in players
  //returns pid if succesfull
  isInThere(player: any): number {
    let playernn: string = '' + player;
    /* console.log("isInThere has started with" + playernn); */
    if (this.players != undefined) {
      for (let index = 0; index < this.players.length; index++) {
        if (this.players[index].nname == player) {
          console.log('it is');
          return index;
        } else {
          /* console.log(this.players[index].nname + "!=" + player); */
        }
      }
    }
    console.log('it is not');
    return -1;
  }

  getPlayers(): void {
    this.players = this.mpp.getPlayers();
  }

  getGameplayers(): void {
    if (this.filteredPlayers !== undefined) {
      this.gameplayers = this.mpp.getGameplayers();
    }
  }

  //emits an event to trigger Observer
  karljonas():void {
    this.stateCtrl.updateValueAndValidity({ onlySelf: false, emitEvent: true });
    console.log("jaja")
  }

  startGame():void {
    this.mpp.gameplayersalive = this.mpp.gameplayers.length;
    this.router.navigate(['/game'])
  }
}
