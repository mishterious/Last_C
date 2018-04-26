import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() myID;
  _id: any;
  rest: any;
  name: any;
  error: any;
  reviews: any;

  constructor(
    private _httpService: HttpService, 
    private _route: ActivatedRoute, 
    private _router: Router
  ) { }

  ngOnInit() {
    this.rest = { name: " " };
    this._route.params.subscribe((params: Params) => this._id = params['id']);
    this.restByID(this._id);
  }

  restByID(_id){
    // console.log(_id);
    let tempObservable = this._httpService.by(_id);
    tempObservable.subscribe(data => {
      // data['messages']['stars'].sort();
      function compare(a, b){
        const starta = a.stars
        const startb = b.stars

        let comparison = 0;
        if(starta > startb){
          comparison = -1;
        } else if (starta < startb){
          comparison = 1;
        }
        return comparison;
      }

      console.log(data);
      data['messages'].sort(compare);
      this.rest = data
      console.log(this.rest);
      
    })
  }

  deleteByID(_id){
    // console.log(_id);
    let tempObservable = this._httpService.deleteByID(_id);
    tempObservable.subscribe(data => {
      console.log(data+ "345678765432123456789765432");
    })
    this._router.navigate(['/all']); 
  }
}
