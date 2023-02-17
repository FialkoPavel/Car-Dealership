import { Component, Input, OnInit } from '@angular/core';
import { IChart } from 'src/core/interfaces/chart.interface';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() citiesData: IChart[] = [];
  private readonly API_KEY = 'AIzaSyDZbWNBK81yJVvpc5wRfCLwPyLYsGpwRbQ';

  cities: string[] = [];

  constructor() {}

  ngOnInit() {
    this.initMap();
  }

  private initMap() {
    const mapElement = document.getElementById('map');
    const mapOptions = {
      zoom: 5,
    };
    const map = new google.maps.Map(mapElement as Element, mapOptions);

    const markers: any = [];
    this.citiesData.forEach((cityName) => {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          cityName.name
        )}&key=${this.API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          const location = data.results[0].geometry.location;
          const markerOptions = {
            position: location,
            map: map,
            title: cityName,
          };
          const marker = new google.maps.Marker(markerOptions as any);
          markers.push(marker);
        })
        .catch((error) => {
          console.error(`Failed to fetch location for ${cityName}`, error);
        });
    });

    const bounds = new google.maps.LatLngBounds();
    markers.forEach((marker: any) => {
      bounds.extend(marker.getPosition());
    });
    map.fitBounds(bounds);
  }
}
