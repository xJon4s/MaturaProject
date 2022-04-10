import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Deck } from '../deck';
import { MppService } from '../mpp.service';
import { Player } from '../player';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Gameplayer } from '../gameplayer';

@Component({
  selector: 'mp-choose-deck',
  templateUrl: './choose-deck.component.html',
  styleUrls: ['./choose-deck.component.scss'],
})
export class ChooseDeckComponent implements OnInit {
  stateCtrl = new FormControl();
  filteredDecks: Observable<Deck[]>;
  decks!: Array<Deck>;
  players!: Array<Player>;
  aplayer!: Player;
  gameplayers!: Array<Gameplayer>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private mpp: MppService
  ) {
    this.getDecks();
    this.getPlayers();
    this.getGameplayers();
    this.filteredDecks = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map((deck) => (this._filterDeck(deck)))
    );
  }

  ngOnInit(): void {
    this.getPlayers();
    this.getDecks();
    this.aplayer = this.players[this.route.snapshot.params.code];
  }

  private _filterDeck(value: String): Deck[] {
    const filterValue = value.toLowerCase();
    const filterdecksOne: Deck[] = this.decks.filter((deck) =>
      deck.commander.toLowerCase().includes(filterValue)
    );
    return filterdecksOne.filter((deck) => this.isNotUsed(deck.did));
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

  addDeck(deck: Deck) {
    console.log('addDeck has started with ' + deck.commander);
    if (this.isInThere(deck) >= 0) {
      console.log('addDeck has finished');
      this.mpp.addGamePlayer(this.aplayer.pid, deck.did);
      this.router.navigate(['/game-setup']);
    } else {
      console.log('unglaublich laut schreien');
    }
  }

  isNotUsed(did: number): boolean {
    if (this.gameplayers !== undefined && this.gameplayers !== null) {
      for (let index = 0; index < this.gameplayers.length; index++) {
        if(this.gameplayers[index].did==did){
          return false
        }
      }
    } else {
      //tragisch
    }
    return true;
  }

  isInThere(deck: Deck): number {
    let deckc: string = '' + deck.commander;
    console.log('isInThere has started with ' + deckc);
    if (this.decks != undefined) {
      for (let index = 0; index < this.decks.length; index++) {
        if (this.decks[index].did == deck.did) {
          console.log('isInThere has finished with' + index);
          return index;
        } else {
          /*           console.log(this.players[index].nname + "!=" + deckc) */
        }
      }
    }
    console.log('isInThere has finished with -1');
    return -1;
  }
}
