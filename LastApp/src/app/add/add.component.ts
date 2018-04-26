import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  mov: any;
  _id: any;
  name: any;
  error: any;
  rest: any;
  message: any;
  mystar: any;
  data: any;

  constructor(
    private _httpService: HttpService, 
    private _route: ActivatedRoute, 
    private _router: Router
  ) {}

  ngOnInit() {
    this.mov = { title: " "};
    this._route.params.subscribe((params: Params) => this._id = params['id']);
  }


  onSubmit() {
    
    console.log("==========================",this.mov);
    let tempObservable = this._httpService.create(this.mov)
    tempObservable.subscribe(data => {
      console.log(data);
      if((data as any).message == "Unique Error"){
        this.error = data["error"];
      }
      else if((data as any).message == "Error"){
        // console.log("See this particular user", data );
        this.error = data["error"];
        console.log("==========32454321345=======================" + data)
        console.log(this.error);
      }
      else{
        console.log("37489032479824")
        console.log(data);
        // this.addReview(data._id);
        this._router.navigate(['/all']); 
      }
    });   
  }

  addReview(_id) {
    console.log("WERE EHR!!!!!!!!!++++++++++++")
    console.log(this._id);
    console.log("WERE EHR!!!!!!!!!++++++++++++")

      if(this.rest.stars == "5"){
        this.mystar = 5;
      }
      else if(this.rest.stars == "4"){
        this.mystar = 4;
      }
      else if(this.rest.stars == "3"){
        this.mystar = 3;
      }
      else if(this.rest.stars == "2"){
        this.mystar = 2;
      }
      else{
        this.mystar = 1;
      }

      this.message = { name: this.rest.name, stars: this.mystar, review: this.rest.review };
      console.log(this.message);
      let tempObservable = this._httpService.addReview(this.data._id, this.message)
      tempObservable.subscribe(data => {
        // console.log("See this particular user", data );
        this.error = data;
        console.log("==========32454321345=======================" + data)
        console.log(this.error);
        
      })
      this._router.navigate(['/all']); 
  }

  byName(name){
    let tempObservable = this._httpService.byName(this.mov.name)
    tempObservable.subscribe(data => {
      this.mov = data;
      this.error = this.mov+" ALREADY EXIST!!!!"
      console.log(this.mov + " ALREADY EXIST!!!!")
      if(!this.mov){
        this.onSubmit()
      }else{
        this.error = "This Rest is already here!";
        this._router.navigate(['/new']);
      }
    })
  }

}