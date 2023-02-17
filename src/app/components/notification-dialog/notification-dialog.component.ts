import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss'],
})
export class NotificationDialogComponent implements OnInit {
  public title: string = 'Request has been received!';
  public content: string =
    'An email with information about your match has been sent to you.';
  public buttonContent: string = 'Close';

  constructor() {}

  ngOnInit(): void {}
}
