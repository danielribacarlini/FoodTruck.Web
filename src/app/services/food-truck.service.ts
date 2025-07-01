import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoodTruck } from '../models/food-truck.model';

@Injectable({
  providedIn: 'root'
})
export class FoodTruckService {
  private apiUrl = 'http://localhost:5000/api/foodtruck';

  constructor(private http: HttpClient) {}

  getFoodTrucks(): Observable<FoodTruck[]> {
    return this.http.get<FoodTruck[]>(this.apiUrl);
  }

    getNearbyFoodTrucks(lat: number, lng: number): Observable<FoodTruck[]> {
    const url = `${this.apiUrl}?lat=${lat}&lng=${lng}`;
    return this.http.get<FoodTruck[]>(url);
  }
}