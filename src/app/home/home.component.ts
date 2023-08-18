import { MppService } from '../mpp.service';
import { Player } from './../player';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(private mpp: MppService) { }

  async ngOnInit(): Promise<void> {
    await this.mpp.activateService();
  }

  startGameSetUp():void {}
}
