import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { FoodTruckMapComponent } from './pages/food-truck-map/food-truck-map.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/header/header.component';
import { LayoutComponent } from './shared/layout/layout.component';



@NgModule({
  declarations: [
    AppComponent,
    FoodTruckMapComponent,
    HeaderComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: FoodTruckMapComponent },
      { path: '**', redirectTo: '' }
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
