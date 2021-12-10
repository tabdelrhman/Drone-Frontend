import { AppComponent } from './../../app.component';
import { async } from '@angular/core/testing';
import { DroneService } from './../../service/drone-service';
import { Drone } from './../../model/drone';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drone',
  templateUrl: './drone.component.html',
  styleUrls: ['./drone.component.css']
})
export class DroneComponent implements OnInit {

  retrieveResonse: any[];
  drones: Drone[];
  IsVisible: boolean;
  message: string;
  droneIdForApi: number;
  constructor(private droneService: DroneService) {
  }
  ngOnInit() {
    this.IsVisible = false;
    this.getAllDrones();

  }

   getAllDrones() {
     this.doGetAllDronesCall();
  }

  getAllAvailableDrones(){
    this.doGetAllAvailableDronesCall();
  }

  doGetAllAvailableDronesCall(){
    this.droneService.getListAvailableDrones().subscribe(
      data => {
        this.drones = data;
      });
  }
   doGetAllDronesCall() {
     this.droneService.getListDrones().subscribe(
      data => {
        this.drones = data;
      });
  }

  loadDrone(droneId, droneState) {
    if (!(droneState === 'IDLE' || droneState === 'LOADING')) {
      this.message = 'Drone with id: ' + droneId + ' is not available at this moment because it is In ' + droneState + ' state.';
      this.IsVisible = true;
      AppComponent.droneId = droneId;
    } else {
      this.message = 'Drone with id: ' + droneId + ' has been loaded!';
      this.IsVisible = true;
      this.droneIdForApi = droneId;
      AppComponent.droneId = droneId;
    }
  }

  updateDroneState(state){
    this.droneService.updateDroneState(state,AppComponent.droneId).subscribe(
      data => {
        console.log(data);
      this.message = 'Drone state changed to: ' + state;
      this.IsVisible = true;
      });
    console.log(this.drones);
  }

}
