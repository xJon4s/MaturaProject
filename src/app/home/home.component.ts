import { Player } from './../player';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

  startGameSetUp():void {}
}
