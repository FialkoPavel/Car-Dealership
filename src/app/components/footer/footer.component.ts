import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public currentVersion: string = 'Current version';
  public version: string = '1.0.0';
  public title: string = 'Car Dealership';
  public secretMessage: string = 'Made with love!';

  constructor() {}

  ngOnInit(): void {}
}
