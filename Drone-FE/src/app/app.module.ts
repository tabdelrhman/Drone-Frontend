import { DroneService } from './service/drone-service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule,Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DroneComponent } from './Component/drone/drone.component';
import { MedicineComponent } from './Component/medicine/medicine.component';
import { AddMedicineComponent } from './Component/add-medicine/add-medicine.component';
import { AddDroneComponent } from './Component/add-drone/add-drone.component';
import { FormsModule } from '@angular/forms';

const routes:Routes =[
  {path:'add-drone' , component: AddDroneComponent},
  {path:'add-medicine' , component: AddMedicineComponent},
  {path:'home' , component: DroneComponent},
  {path:'' , redirectTo:'home' ,pathMatch: 'full'},
  {path:"**" , component: DroneComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    DroneComponent,
    MedicineComponent,
    AddMedicineComponent,
    AddDroneComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [
    DroneService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
