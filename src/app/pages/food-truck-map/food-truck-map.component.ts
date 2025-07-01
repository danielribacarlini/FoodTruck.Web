import { Component, OnInit } from '@angular/core';
import { FoodTruckService } from '../../services/food-truck.service';
import { FoodTruck } from '../../models/food-truck.model';
import * as L from 'leaflet';

@Component({
  selector: 'app-food-truck-map',
  standalone: false,
  templateUrl: './food-truck-map.component.html',
  styleUrl: './food-truck-map.component.scss'
})
// export class FoodTruckMapComponent implements OnInit {
//   foodTrucks: FoodTruck[] = [];
//   loading = true;
//   error: string | null = null;

//   constructor(private foodTruckService: FoodTruckService) {}

//   ngOnInit(): void {
//     this.foodTruckService.getFoodTrucks().subscribe({
//       next: data => {
//         this.foodTrucks = data;
//         this.loading = false;
//       },
//       error: err => {
//         this.error = 'Failed to load food trucks';
//         this.loading = false;
//         console.error(err);
//       }
//     });
//   }
// }
export class FoodTruckMapComponent implements OnInit {
    map!: L.Map;
  lat: number = 37.7749;
  lng: number = -122.4194;
  foodTrucks: FoodTruck[] = [];

  constructor(private foodTruckService: FoodTruckService) {}

  fetchFoodTrucks(): void {
    this.foodTruckService.getNearbyFoodTrucks(this.lat, this.lng).subscribe({
      next: (data) => this.foodTrucks = data,
      error: (err) => console.error('Error fetching food trucks', err)
    });
  }

   ngOnInit(): void {
    //this.initMap();
    this.fetchFoodTrucks();
  }

//   ngAfterViewInit(): void {
//   this.map = L.map('map').setView([this.lat, this.lng], 13);

//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 18,
//     attribution: '© OpenStreetMap'
//   }).addTo(this.map);
// }

  initMap(): void {
    this.map = L.map('map').setView([this.lat, this.lng], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  // fetchFoodTrucks(): void {
  //   this.foodTruckService.getNearbyFoodTrucks(this.lat, this.lng).subscribe({
  //     next: (data) => {
  //       this.foodTrucks = data;

  //       // Limpiar marcadores anteriores si se recarga
  //       this.map.eachLayer((layer) => {
  //         if ((layer as any)._icon) this.map.removeLayer(layer);
  //       });

  //       // Volver a agregar capa base
  //       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

  //       data.forEach(truck => {
  //         const lat = parseFloat(truck.latitude as any);
  //         const lng = parseFloat(truck.longitude as any);
          
  //         if (!isNaN(lat) && !isNaN(lng)) {
  //           L.marker([lat, lng])
  //             .addTo(this.map)
  //             .bindPopup(`<strong>${truck.applicant}</strong><br>${truck['location']}`);
  //         }
  //       });
  //     },
  //     error: (err) => console.error('Error fetching food trucks', err)
  //   });
  // }
}