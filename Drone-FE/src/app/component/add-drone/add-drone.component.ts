import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Drone } from 'src/app/model/drone';

@Component({
  selector: 'app-add-drone',
  templateUrl: './add-drone.component.html',
  styleUrls: ['./add-drone.component.css']
})
export class AddDroneComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  models: string[];
  retrieveResonse: any;
  message: string;
  droneModel: string;
  weightLimit: number;
  batteryCapacity: number;
  droneResponse: any;
  sucIsVisible: boolean;
  failIsVisible: boolean;

  ngOnInit() {
    this.getAllModels();
    this.droneModel = 'default';
    this.sucIsVisible = false;
    this.failIsVisible = false;
  }

  getAllModels() {

    this.httpClient.get('http://localhost:8090/drone-models')
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.models = this.retrieveResonse;
        }
      );
  }

  async addNewDrone() {

    this.droneResponse = null;
    this.addNewDronePostReq();
    if (this.droneResponse === null) {
      this.message = 'false';
      this.failIsVisible = true;
      this.sucIsVisible = false;

    }
  }

  addNewDronePostReq() {
    const drone = new Drone();
    drone.batteryCapacity = this.batteryCapacity;
    drone.model = this.droneModel;
    drone.weightLimit = this.weightLimit;


    this.httpClient.post('http://localhost:8090/add-drone', drone, { observe: 'response' })
      .subscribe((response) => {
        this.droneResponse = response;
        if (response.status === 201) {
          this.message = 'true';
          this.failIsVisible = false;
          this.sucIsVisible = true;
        } else {
          this.message = 'false';
          this.failIsVisible = true;
          this.sucIsVisible = false;
        }
      }
      )
  }
}

