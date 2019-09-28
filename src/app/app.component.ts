import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private iconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    this.iconRegistry.addSvgIcon(
      'asmat',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/asmat.svg')
    );
  }
}
