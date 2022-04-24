import { Deck } from './../deck';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MppService } from '../mpp.service';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'mp-stastistic-deck',
  templateUrl: './stastistic-deck.component.html',
  styleUrls: ['./stastistic-deck.component.scss']
})
export class StastisticDeckComponent implements OnInit {
  decks!:Array<Deck>
  searchTerm!:string;

  constructor(
    private mpp:MppService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getDecks();
    this.searchTerm="";
  }
  getDecks() {
    this.decks = this.mpp.getDecks();
  }

  decksLike(): Array<Deck> {
    return this.decks.filter(
      deck => deck.commander.toUpperCase().includes(this.searchTerm?.toUpperCase())
    );
  }

  navigateToInspect(id:number) {
    this.router.navigate(["/statistics/deck/", id]);
  }

}
