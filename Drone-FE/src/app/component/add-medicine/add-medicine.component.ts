import { Medicine } from './../../model/medicine';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css']
})
export class AddMedicineComponent {

  constructor(private httpClient: HttpClient) { }

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;

  medicineWeight: any;
  medicineCode: any;
  medicineName: any;

  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }


  onUpload() {
    console.log(this.selectedFile);
    const medicine = new Medicine();

    medicine.code = this.medicineCode;
    medicine.name = this.medicineName;
    medicine.weight = this.medicineWeight;

    const uploadMedicineData = new FormData();
    uploadMedicineData.append('imageFile', this.selectedFile, this.selectedFile.name);
    uploadMedicineData.set('code', this.medicineCode);
    uploadMedicineData.set('name', this.medicineName);
    uploadMedicineData.set('weight', this.medicineWeight);

    this.httpClient.post('http://localhost:8090/medicine/upload', uploadMedicineData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );


  }

  getImage() {
    this.httpClient.get('http://localhost:8090/medicine/get/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

  addNewMedicine() {

  }
}