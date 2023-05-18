import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutPageModule } from './about/about-page.module';
import { ContactPageModule } from './contact/contact-page.module';
import { HomePageModule } from './home/home-page.module';
import { SharedModule } from './shared/shared.module';
import { CoursesPageModule } from './courses/courses-page.module';
import { LoginPageModule } from './login/login-page.module';
import { WelcomePageModule } from './welcome/welcome-page.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SettingsModule } from './settings/settings.module';
import { QuestionsModule } from './questions/questions.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { MessagesModule } from './messages/messages.module';
import { MyCoursesModule } from './my-courses/my-courses.module';
import { ChangelogModule } from './changelog/changelog.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './shared/utils/auth.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AboutPageModule,
    ContactPageModule,
    HomePageModule,
    SharedModule,
    CoursesPageModule,
    LoginPageModule,
    WelcomePageModule,
    NotificationsModule,
    SettingsModule,
    CoursesPageModule,
    QuestionsModule,
    QuizzesModule,
    MessagesModule,
    MyCoursesModule,
    ChangelogModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularFireModule.initializeApp(
    {
      apiKey: "AIzaSyDMeq81KNk_DHNRBpg7Tr7B1Yf2wNlEq28",
      authDomain: "welearnit-stf.firebaseapp.com",
      databaseURL: "https://welearnit-stf-default-rtdb.firebaseio.com",
      projectId: "welearnit-stf",
      storageBucket: "welearnit-stf.appspot.com",
      messagingSenderId: "971952653267",
      appId: "1:971952653267:web:d54a4c3553e980460fe526"
    }),
      AngularFireAuthModule,
      AngularFireDatabaseModule
  ],
  exports: [
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

