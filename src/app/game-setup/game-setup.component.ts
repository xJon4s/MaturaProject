import { Player } from './../player';
import {
  Component,
  Input,
  OnInit,
  SystemJsNgModuleLoader,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef
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
export class GameSetupComponent implements OnInit, AfterViewInit, OnDestroy {
  stateCtrl = new FormControl();
  filteredPlayers!: Observable<Player[]>;

  players!: Array<Player>;
  gameplayers: Array<Gameplayer> = [];
  gameplayerslength:number = 0;

  /* @Input() eingabe!:string; */

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private mpp: MppService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnDestroy(): void {
    this.players = [];
    this.gameplayers = [];
  }
  async ngAfterViewInit(): Promise<void> {
    
    await this.mpp.activateService();
    if(this.mpp.reset){
      this.mpp.reset = false;
      window.location.reload();
    }
    this.getGameplayers();
    this.getPlayers();

    try {
      this.filteredPlayers = this.stateCtrl.valueChanges.pipe(
        startWith(''),
        map((player) => this._filterPlayer(player))
      );
    } catch (e) {
      console.log("filzterdings" + e);
    } 
  }

  async ngOnInit() {
    
  }

  private _filterPlayer(value: string): Player[] {
    if(value==undefined)
      value = "";
    this.getGameplayers();
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
    let ret: boolean = true;
    if (this.gameplayers !== undefined && this.gameplayers !== null) {
      for (let index = 0; index < this.gameplayers.length; index++ || ret) {
        if (this.gameplayers[index].pid == player.pid) {
        ret = false;
        }
      }
    }
    return ret;
  }

  //Opens choose-deck-component with parameter of playerid
  addPlayer(player: Player): void {
    let test: number = this.isInThere(player);
    if (this.isInThere(player) >= 0) {
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
          return index;
        } else {
          /* console.log(this.players[index].nname + "!=" + player); */
        }
      }
    }
    return -1;
  }

  getPlayers(): void {
    this.players = this.mpp.getPlayers();
  }

  getGameplayers(): void {
    this.gameplayers = this.mpp.getGameplayers();
  }

  //recieve event emitted from child to update players
  updatePlayer(event: string):void{
    console.log("gamesetup: updatePlayer" + event);
    this.karljonas();
  }



  //emits an event to trigger Observer
  karljonas():void {
    console.log("game.setup: karljonas");
    this.stateCtrl.updateValueAndValidity({ onlySelf: false, emitEvent: true });
  }

  startGame():void {
    if(this.mpp.gameplayers !== undefined && this.mpp.gameplayers.length > 1){
      this.mpp.gameplayersalive = this.mpp.gameplayers.length;
      this.router.navigate(['/game'])
    }
  }
}
