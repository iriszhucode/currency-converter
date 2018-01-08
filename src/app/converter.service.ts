import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class ConverterService {
  results:any;

  constructor(public http:HttpClient) { }
  	
  fetchData(): Observable<any> {
    if(this.results != null) {	
      return Observable.of(this.results);
    } else {
      return this.http.get('https://api.fixer.io/latest?base=USD')
        .do(data => this.results = data)
        .catch(error => { 
          console.log(error); 
          return Observable.of(error); 
        });
    }
  }
}



