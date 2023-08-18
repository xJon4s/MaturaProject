import { Router, ActivatedRoute } from '@angular/router';
import { MppService } from './../mpp.service';
import { Player } from './../player';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mp-display-player',
  templateUrl: './display-player.component.html',
  styleUrls: ['./display-player.component.scss'],
})
export class DisplayPlayerComponent implements OnInit {
  displayedplayer!: Player;

  constructor(private mpp: MppService, private route: ActivatedRoute) {
    this.displayedplayer = this.mpp.getPlayer(this.route.snapshot.params.code) as Player;
  }

  ngOnInit(): void {}
}
