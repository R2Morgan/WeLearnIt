import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangelogPageComponent } from './features/changelog-page/changelog-page.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ChangelogPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ChangelogModule { }
