import { Component, signal, inject, viewChild, viewChildren } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FoodTruckService } from '../../services/food-truck.service';
import { FoodTruck } from '../../models/food-truck.model';
import { GoogleMap, MapAdvancedMarker, MapInfoWindow } from '@angular/google-maps';

@Component({
  selector: 'app-food-truck-map',
  standalone: false,
  templateUrl: './food-truck-map.component.html',
  styleUrl: './food-truck-map.component.scss'
})

export class FoodTruckMapComponent {
  infoWindow = viewChild.required(MapInfoWindow);
  markersRef = viewChildren(MapAdvancedMarker);
  
  private foodTruckService = inject(FoodTruckService);

  center = signal<google.maps.LatLngLiteral>({lat: 37.7749, lng: -122.4194});
  zoom = signal(10);

  foodTrucks$ = this.foodTruckService.getNearbyFoodTrucks(this.center());

  $foodTrucks = toSignal(this.foodTrucks$, {
    initialValue: [],
  });

  oenInfoWindow(foodtruck: FoodTruck, marker: MapAdvancedMarker){
    const content = `
      <h1 class="font-bold text-kl">${foodtruck.applicant}</h1>
      <p>${foodtruck.locationDescription}</p>
    `;
    this.infoWindow().open(marker, false, content);
  }

  goToPoint(foodTruck: FoodTruck, position: number){
    const markers = this.markersRef();
    const markerRef = markers[position];

    this.oenInfoWindow(foodTruck, markerRef);
  }
}