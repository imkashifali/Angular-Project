import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurentData } from './restaurent.module';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css']
})
export class RestaurentDashComponent implements OnInit {
  FormValue!: FormGroup

  storeAllData:any
  showAdd!:any;
  showBtn!:any;

  restaurentModelObject: RestaurentData = new RestaurentData
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.FormValue = this.formBuilder.group({
      name: ['',Validators.required],
      email: ['',Validators.required],
      mobile: ['',Validators.required],
      address: ['',Validators.required],
      services: ['',Validators.required]
    })
    this.getAllData()
  }
  addRes() {
    this.restaurentModelObject.name = this.FormValue.value.name;
    this.restaurentModelObject.email = this.FormValue.value.email;
    this.restaurentModelObject.mobile = this.FormValue.value.mobile;
    this.restaurentModelObject.address = this.FormValue.value.address;
    this.restaurentModelObject.services = this.FormValue.value.services;

    this.api.postRestaurant(this.restaurentModelObject).subscribe(res => {
      console.log(res);
      alert("Restaurant Created Successfully")

      let ref= document.getElementById("clear");
      ref?.click()
      this.FormValue.reset()
      this.getAllData()
    },
      err => {
        console.log("something went wrong ");

      })
  }

  clickAddRest(){
    this.FormValue.reset()
    this.showAdd=true;
    this.showBtn=false;
  }
  getAllData(){
     this.api.getRestaurant().subscribe(res=>{
      this.storeAllData =res
     })
  }

  deleteRecord(data:any){
    this.api.deleteRestaurant(data.id).subscribe(res=>{
      alert("record delete")
      this.getAllData()
    })
  }

  editRecord(data:any){
    this.showAdd=false;
    this.showBtn=true;
    this.restaurentModelObject.id=data.id
    this.FormValue.controls["name"].setValue(data.name);
    this.FormValue.controls["email"].setValue(data.email);
    this.FormValue.controls["mobile"].setValue(data.mobile);
    this.FormValue.controls["address"].setValue(data.address);
    this.FormValue.controls["services"].setValue(data.services);

  }

  upgrade(){
    this.restaurentModelObject.name = this.FormValue.value.name;
    this.restaurentModelObject.email = this.FormValue.value.email;
    this.restaurentModelObject.mobile = this.FormValue.value.mobile;
    this.restaurentModelObject.address = this.FormValue.value.address;
    this.restaurentModelObject.services = this.FormValue.value.services;

    this.api.updateRestaurant(this.restaurentModelObject,this.restaurentModelObject.id).subscribe(res=>{
      alert("Record Update Now")

      let ref= document.getElementById("clear");
      ref?.click()
      this.FormValue.reset()
      this.getAllData()

    })
  }




}


