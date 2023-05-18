import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './about/features/about/about-page.component';
import { ChangelogPageComponent } from './changelog/features/changelog-page/changelog-page.component';
import { ContactPageComponent } from './contact/features/contact-page/contact-page.component';
import { CoursesPageComponent } from './courses/features/courses-page/courses-page.component';
import { HomePageComponent } from './home/features/home-page/home-page.component';
import { ForgotPasswordPageComponent } from './login/features/forgot-password-page/forgot-password-page.component';
import { LoginPageComponent } from './login/features/login-page/login-page.component';
import { RegisterPageComponent } from './login/features/register-page/register-page.component';
import { MessagesPageComponent } from './messages/features/messages-page/messages-page.component';
import { MyCoursesPageComponent } from './my-courses/features/courses-page/my-courses-page.component';
import { EnrollComponent } from './my-courses/features/enroll/enroll.component';
import { NotificationsPageComponent } from './notifications/features/notifications-page/notifications-page.component';
import { AddQuestionPageComponent } from './questions/features/add-question-page/add-question-page.component';
import { QuestionsPageComponent } from './questions/features/questions-page/questions-page.component';
import { AddQuizPageComponent } from './quizzes/features/add-quiz-page/add-quiz-page.component';
import { QuizzesPageComponent } from './quizzes/features/quizzes-page/quizzes-page.component';
import { SettingsPageComponent } from './settings/features/settings-page/settings-page.component';
import { WelcomePageComponent } from './welcome/features/welcome-page/welcome-page.component';
import { AuthGuard } from './shared/utils/auth.guard';
import { NewLectureComponent } from './my-courses/features/new-lecture/new-lecture.component';

const routes: Routes = [
  {path: 'about', component: AboutPageComponent},
  {path: 'add-question', component: AddQuestionPageComponent, canActivate: [AuthGuard] },
  {path: 'add-quiz', component: AddQuizPageComponent, canActivate: [AuthGuard] },
  {path: 'changelog', component: ChangelogPageComponent},
  {path: 'contact', component: ContactPageComponent},
  {path: 'courses', component: CoursesPageComponent},
  {path: 'enroll', component: EnrollComponent, canActivate: [AuthGuard] },
  {path: 'forgot-password', component: ForgotPasswordPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'messages', component: MessagesPageComponent, canActivate: [AuthGuard] },
  {path: 'my-courses', component: MyCoursesPageComponent, canActivate: [AuthGuard] },
  {path: 'new-lecture', component: NewLectureComponent, canActivate: [AuthGuard] },
  {path: 'notifications', component: NotificationsPageComponent, canActivate: [AuthGuard] },
  {path: 'questions', component: QuestionsPageComponent, canActivate: [AuthGuard] },
  {path: 'quizzes', component: QuizzesPageComponent, canActivate: [AuthGuard] },
  {path: 'register', component: RegisterPageComponent},
  {path: 'settings', component: SettingsPageComponent, canActivate: [AuthGuard] },
  {path: 'welcome', component: WelcomePageComponent, canActivate: [AuthGuard] },
  {path: '', component: HomePageComponent},
  {path: '*', component: HomePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
