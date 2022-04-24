import { GameComponent } from './game/game.component';
import { GameSetupComponent } from './game-setup/game-setup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChooseDeckComponent } from './choose-deck/choose-deck.component';
import { SelectStatisticComponent } from './select-statistic/select-statistic.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'game-setup', component: GameSetupComponent},
  { path: 'game-setup/:code', component: ChooseDeckComponent},
  { path: 'game', component: GameComponent},
  { path: 'statistics', component: SelectStatisticComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
