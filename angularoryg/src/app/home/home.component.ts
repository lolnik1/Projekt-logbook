import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Employee } from '../employee';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Location } from '@angular/common';
import { AlertService } from '../alert.service';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router/src/events';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggedEmployee: Employee = null;

  canGoBack: boolean = false;

  currentRouteId: number = 0;

  inQuickReport: boolean = false;

  @Output()
  onQuickReportEvent = new EventEmitter<boolean>();

  constructor(private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private location: Location,
    private alertService: AlertService,
    private router: Router) {
      
    this.loggedEmployee = JSON.parse(localStorage.getItem("currentUser")) as Employee;
  }

  ngOnInit() {

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  onGoBackClick() {
    this.canGoBack = false;
  }

  onQuickReportClick() {
    this.canGoBack = true;
    this.inQuickReport = true;
    this.onQuickReportEvent.emit(true);
  }

  itSystemListOnDetailsPage(event) {
    this.canGoBack = true;
  }
}
