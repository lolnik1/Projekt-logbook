import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from '../alert.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription, pipe } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {

  message: any;
  visible: boolean = false;

  subscription: Subscription;
  timer: Observable<any>;

  @ViewChild('alert')
  alertElement;

  hideTimeout: number = 4000;

  constructor(private alertService: AlertService) { }

  ngOnInit() {

    this.alertService.getMessage().subscribe(message => {
      this.message = message;
      this.visible = true;

      if (this.message && (this.message.type === 'success' || this.message.timedDismiss)) {
        this.setTimer();
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  unsubscribe() {
    if (this.subscription && this.subscription instanceof Subscription) {
      this.subscription.unsubscribe();
    }
  }

  setTimer(): void {
    this.timer = Observable.timer(this.hideTimeout);
    this.subscription = this.timer.subscribe(tim => {

      this.close();
    });
  }

  close(): void {
    if (this.visible) {
      this.visible = false;
    }
  }
}
