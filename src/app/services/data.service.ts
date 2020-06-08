import { NotFoundError } from './../common/not-found.error';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators'; 
import { throwError } from 'rxjs'; 
import { AppError } from '../common/app-error.error';

@Injectable()
export class DataService {


  constructor(private url, private httpClient:HttpClient) { }

  getAll(){ 
    return this.httpClient.get(this.url)
    .pipe(catchError(this.handleError))
  }

  get(id){
    return this.httpClient.get(this.url+"/"+id)
      .pipe(catchError(this.handleError))
  }

  create(resource){
    let headers = new HttpHeaders(); 
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post(this.url,resource,{ headers: headers })
      .pipe(catchError(this.handleError))
  }

  update(resource){
    let headers = new HttpHeaders(); 
    headers.append('Content-Type', 'application/json');
    return this.httpClient.put(this.url,resource,{ headers: headers })
      .pipe(catchError(this.handleError))
  }

  delete(userId){
    return this.httpClient.delete(this.url+"/"+userId)
      .pipe(catchError(this.handleError))
  }

  private handleError(error:Response){
    if(error.status === 404)
        return throwError(new NotFoundError(error));
    return throwError(new AppError());
  }
}
