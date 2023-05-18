import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesPageComponent } from './features/messages-page/messages-page.component';
import { SharedModule } from '../shared/shared.module';
import { MessageComponent } from './ui/message/message';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MessagesPageComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ]
})
export class MessagesModule { }
