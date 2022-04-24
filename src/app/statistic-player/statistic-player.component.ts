import { Router } from '@angular/router';
import { Player } from './../player';
import { MppService } from './../mpp.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mp-statistic-player',
  templateUrl: './statistic-player.component.html',
  styleUrls: ['./statistic-player.component.scss']
})
export class StatisticPlayerComponent implements OnInit {
  players!: Array<Player>
  searchTerm!:string;


  constructor(
    private mpp:MppService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getPlayers();
    this.searchTerm = "";
  }

  getPlayers(){
    this.players = this.mpp.getPlayers();
  }

  playersLike(): Array<Player> {
    return this.players.filter(
      player => player.nname.toUpperCase().includes(this.searchTerm?.toUpperCase())
    );
  }

  navigateToInspect(id:number) {
    this.router.navigate(["/statistics/player/", id]);
  }

}
