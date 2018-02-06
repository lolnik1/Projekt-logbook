import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData: any = {};
  loading: boolean = false;

  returnUrl: string;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {

    this.authenticationService.logout();
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  login(): void {
    this.loading = true;
    this.authenticationService.login(this.loginData.username, this.loginData.password).subscribe(loggedUser => {
      console.log(loggedUser);
      this.router.navigate([this.returnUrl]);
      this.alertService.success("Login successful!");
    },
      error => {
        this.alertService.error(error);
        console.error("LoginComponent: login => Login failed!");
        console.error(error);
        this.loading = false;
      });
  }
}
