import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from './ui/contact-form/contact-form.component';
import { ContactPageComponent } from './features/contact-page/contact-page.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ContactPageComponent, 
    ContactFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
  ]
})
export class ContactPageModule { }
