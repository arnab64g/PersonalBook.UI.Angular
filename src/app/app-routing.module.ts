import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './gaurds/auth.guard';
import { GradeListComponent } from './components/education/grade/grade-list/grade-list.component';
import { SemesterComponent } from './components/education/semester/semester/semester.component';
import { ResultComponent } from './components/education/result/result/result.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { CourseComponent } from './components/education/course/course/course.component';
import { HomeComponent } from './components/home/home.component';
import { EducationComponent } from './components/education/education/education.component';
import { FinanceComponent } from './components/finance/finance/finance.component';

const routes: Routes = [
  {path: '', component : HomeComponent},
  {path : 'signup', component: SignupComponent},
  {path : 'login', component: LoginComponent},
  {path : 'finance', component: FinanceComponent, canActivate: [AuthGuard]},
  {path : 'home', component : HomeComponent, canActivate: [AuthGuard]},
  {path: 'education', component : EducationComponent, canActivate: [AuthGuard]},
  {path : 'profile', component:ProfileComponent, canActivate:[AuthGuard]},
  {path : 'grade', component: GradeListComponent, canActivate:[AuthGuard] },
  {path : 'semester', component: SemesterComponent, canActivate:[AuthGuard] },
  {path : 'course', component: CourseComponent, canActivate:[AuthGuard] },
  {path : 'result', component: ResultComponent, canActivate:[AuthGuard] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
