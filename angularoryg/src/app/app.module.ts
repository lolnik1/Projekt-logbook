import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeesService } from './employees.service';
import { AppRoutingModule } from './/app-routing.module';
import { ItSystemsService } from './itsystems.service';
import { QuickreportComponent } from './quickreport/quickreport.component';
import { IncidentReportService } from './incidentreport.service';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert.service';
import { ItSystemsListComponent } from './itsystemslist/itsystemslist.component';
import { ItSystemDetailsComponent } from './itsystemdetails/itsystemdetails.component';

@NgModule({
  declarations: [
    AppComponent,
    QuickreportComponent,
    LoginComponent,
    HomeComponent,
    AlertComponent,
    ItSystemsListComponent,
    ItSystemDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [EmployeesService, ItSystemsService, IncidentReportService, AuthenticationService, AuthGuard, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
