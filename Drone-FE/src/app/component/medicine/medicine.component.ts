import { AppComponent } from './../../app.component';
import { DroneService } from './../../service/drone-service';
import { Component, OnInit } from '@angular/core';
import { Medicine } from 'src/app/model/medicine';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit {
  retrieveResonse: any[];
  medicines: Medicine[];
  droneIdForApi: number;
  srcImage: any;
  message: String;
  IsVisible: boolean;
  constructor(private droneService: DroneService) {
  }
  ngOnInit() {
    this.getAllMedicines();
    console.log("xxxxxxxxxxxx");
    this.srcImage = 'data:image/jpeg;base64,' + this.medicines[0].medicinePhoto.picByte;

  }

  getAllMedicines() {
     this.doGetAllMedicinesCall();
    console.log("aaaaaaaaaa" + this.retrieveResonse)
  }

  doGetAllMedicinesCall() {
     this.droneService.getListMedicine().subscribe(
      data => {
        console.log(data);
        this.medicines = data;
        this.srcImage = 'data:image/jpeg;base64,' + data[0].medicinePhoto.picByte;
      });
    console.log(this.medicines);
  }

  loadMedicineIntoDrone(medicineId){
    if(AppComponent.droneId){
    this.droneService.loadMedicineToDrone(medicineId,AppComponent.droneId).subscribe(
      data => {
        if (data) {
          this.message = 'Medicine has been added to Drone!';
          this.IsVisible = true;
         }
      });
      
  } else{
    this.message = 'Please select one of drones first!';
    this.IsVisible = true;
  }
}
}
