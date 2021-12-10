import { Medicine } from './../model/medicine';
import { Drone } from './../model/drone';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DroneService {

    private baseUrl = "http://localhost:8090/" ;

    constructor(private httpClient: HttpClient) { }

     getListDrones() {
        const listDronesUrl = this.baseUrl+"all-drones";
        
        return this.httpClient.get<Drone[]>(listDronesUrl);
      }

      getListAvailableDrones() {
        const listAvailableDronesUrl = this.baseUrl+"available-drones";
        
        return this.httpClient.get<Drone[]>(listAvailableDronesUrl);
      }

      getListMedicine() {
        const listMedicineUrl = this.baseUrl+"all-medicines";
        
        return this.httpClient.get<Medicine[]>(listMedicineUrl);
      }

      loadMedicineToDrone(medicineId,droneId) {
        const loadMedicineUrl = this.baseUrl+"load/medicine/"+medicineId+"/to/"+droneId;
        
        return this.httpClient.post<any>(loadMedicineUrl,'');
      }

      updateDroneState(state,droneId) {
        const droneStateUrl = this.baseUrl+"drone-"+state+"/"+droneId;
        
        return this.httpClient.put<any>(droneStateUrl,'');
      }
}

