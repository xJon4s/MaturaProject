import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'mp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'MaturaProject';
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitzer: DomSanitizer
  ) {


    this.matIconRegistry.addSvgIcon(
      'sword',
      this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/sword.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'change',
      this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/change.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'infect',
      this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/infect.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'commander',
      this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/commander.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'finish',
      this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/finish.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'cancel',
      this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/cancel.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'combo',
      this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/combo.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'skull',
      this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/skull.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'surrender',
      this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/surrender.svg'
      )
    );
  }
}
