import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public currentVersion: string = 'Cuurrent version';
  public version: string = '1.0.0';
  public title: string = 'Car Dealership';

  constructor() {}

  ngOnInit(): void {}
}
