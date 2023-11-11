import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { GradeListComponent } from './components/education/grade/grade-list/grade-list.component';
import { AddEditGradeComponent } from './components/education/grade/add-edit-grade/add-edit-grade.component';
import { DeleteGradePopupComponent } from './components/education/grade/delete-grade-popup/delete-grade-popup.component';
import { SemesterComponent } from './components/education/semester/semester/semester.component';
import { ResultComponent } from './components/education/result/result/result.component';
import { AddEditResultComponent } from './components/education/result/add-edit-result/add-edit-result.component';
import { DeleteResultComponent } from './components/education/result/delete-result/delete-result.component';
import { AddEditSemesterComponent } from './components/education/semester/add-edit-semester/add-edit-semester.component';
import { DeleteSemesterComponent } from './components/education/semester/delete-semester/delete-semester.component';
import { MatTabsModule} from '@angular/material/tabs'
import { SignupComponent } from './components/user/signup/signup.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { DeleteCourseComponent } from './components/education/course/delete-course/delete-course.component';
import { AddEditCourseComponent } from './components/education/course/add-edit-course/add-edit-course.component';
import { CourseComponent } from './components/education/course/course/course.component';
import {MatInputModule} from '@angular/material/input';
import { MatPaginatorModule} from '@angular/material/paginator';
import { HomeComponent } from './components/home/home.component';
import { EducationComponent } from './components/education/education/education.component';
import { ExpenseComponent } from './components/finance/expense/expense.component';
import { SecondaryComponent } from './components/education/secondaryschool/secondary/secondary.component';
import { AddEditSecondaryResultComponent } from './components/education/secondaryschool/add-edit-secondary-result/add-edit-secondary-result.component'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DeleteSecondaryResultComponent } from './components/education/secondaryschool/delete-secondary-result/delete-secondary-result.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { ToastrModule } from 'ngx-toastr';
import { AddEditExpenseComponent } from './components/finance/add-edit-expense/add-edit-expense.component';
import { DeleteExpenseComponent } from './components/finance/delete-expense/delete-expense.component';
import { FinanceComponent } from './components/finance/finance/finance.component';
import { CategoryComponent } from './components/finance/category/category.component';
import { NgChartsModule } from 'ng2-charts';
import {MatCardModule} from '@angular/material/card'
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    GradeListComponent,
    AddEditGradeComponent,
    DeleteGradePopupComponent,
    SemesterComponent,
    CourseComponent,
    ResultComponent,
    AddEditResultComponent,
    DeleteResultComponent,
    AddEditGradeComponent,
    DeleteResultComponent,
    AddEditSemesterComponent,
    DeleteSemesterComponent,
    DeleteCourseComponent,
    AddEditCourseComponent,
    HomeComponent,
    EducationComponent,
    ExpenseComponent,
    SecondaryComponent,
    AddEditSecondaryResultComponent,
    DeleteSecondaryResultComponent,
    AddEditExpenseComponent,
    DeleteExpenseComponent,
    FinanceComponent,
    CategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    NgSelectModule, 
    MatDialogModule,
    MatTabsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ToastrModule.forRoot({
      positionClass:'toast-top-right',
      timeOut:5000
    }),
    NgChartsModule,
    MatCardModule,
    MatRippleModule,
    NgxPrintModule
  ],
  providers: [{
    provide : HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }
