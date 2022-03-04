import { Gameplayer } from './../gameplayer';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MppService } from '../mpp.service';

@Component({
  selector: 'mp-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gameplayers!: Array<Gameplayer>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mpp: MppService
  ) {
  }

  ngOnInit(): void {
    this.getGameplayers();
    for (let index = 0; index < this.gameplayers.length; index++) {
      const element = this.gameplayers[index];
      for (let jndex = 0; jndex < this.gameplayers.length; jndex++) {
        element._cdmg[jndex] = 21;
      }
    }
  }

  getGameplayers():void {
    this.gameplayers = this.mpp.getGameplayers();
  }

}
