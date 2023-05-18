import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './features/welcome-page/welcome-page.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    WelcomePageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class WelcomePageModule { }
