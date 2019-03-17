import {NgModule} from '@angular/core';
import {MatTableModule, MatToolbarModule} from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatTableModule
  ],
  exports: [
    MatToolbarModule,
    MatTableModule
  ]
})
export class MaterialModule {
}
