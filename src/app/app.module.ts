import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { GameSetupComponent } from './game-setup/game-setup.component';
import { HomeComponent } from './home/home.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { PlayerItemComponent } from './player-item/player-item.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ReactiveFormsModule} from '@angular/forms';
import { ChooseDeckComponent } from './choose-deck/choose-deck.component';
import {MatDialogModule} from '@angular/material/dialog';
import { GameComponent } from './game/game.component';
import { InGamePlayerComponent, ChooseActionType, GameFinishDialog } from './in-game-player/in-game-player.component';
import { HttpClientModule } from '@angular/common/http';
import { DisplayPlayerComponent } from './display-player/display-player.component';
import { SettingComponent } from './setting/setting.component';
import { SelectStatisticComponent } from './select-statistic/select-statistic.component';
import {MatTabsModule} from '@angular/material/tabs';
import { StatisticPlayerComponent } from './statistic-player/statistic-player.component';
import {MatListModule} from '@angular/material/list';
import { StastisticDeckComponent } from './stastistic-deck/stastistic-deck.component';
import { DisplayDeckComponent } from './display-deck/display-deck.component';


@NgModule({
  declarations: [
    AppComponent,
    GameSetupComponent,
    HomeComponent,
    PlayerItemComponent,
    ChooseDeckComponent,
    GameComponent,
    InGamePlayerComponent,
    ChooseActionType,
    GameFinishDialog,
    DisplayPlayerComponent,
    SettingComponent,
    SelectStatisticComponent,
    StatisticPlayerComponent,
    StastisticDeckComponent,
    DisplayDeckComponent
  ],
  entryComponents: [
    ChooseActionType
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
    MatTabsModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
