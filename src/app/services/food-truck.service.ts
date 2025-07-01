import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoodTruck } from '../models/food-truck.model';
import {GoogleMap} from '@angular/google-maps';

@Injectable({
  providedIn: 'root'
})
export class FoodTruckService {
  private apiUrl = 'http://localhost:5000/api/foodtruck';

  constructor(private http: HttpClient) {}

  getFoodTrucks(): Observable<FoodTruck[]> {
    return this.http.get<FoodTruck[]>(this.apiUrl);
  }

    getNearbyFoodTrucks(point: google.maps.LatLngLiteral): Observable<FoodTruck[]> {
    const url = `${this.apiUrl}?lat=${point.lat}&lng=${point.lng}`;
    return this.http.get<FoodTruck[]>(url);
  }
}