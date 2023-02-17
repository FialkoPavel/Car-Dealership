import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public title: string = 'Car Dealership';
  public buttonLink: string = '';
  public buttonText: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/') {
          this.buttonLink = '/dashboard';
          this.buttonText = 'Go to Dashboard';
        } else if (event.url === '/dashboard') {
          this.buttonLink = '/';
          this.buttonText = 'Go to Form';
        }
      }
    });
  }
}
