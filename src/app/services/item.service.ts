import { HttpClient , HttpHeaders} from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends DataService{

  items = [{"id":1,"city":"Neftegorsk","startDate":"4/13/2013","endDate":"5/18/2013","price":"55.82","status":"Seldom","color":"#fd4e19"},
  {"id":2,"city":"Lancai","startDate":"5/19/2012","endDate":"11/29/2014","price":"22.49","status":"Yearly","color":"#ff5055"},
  {"id":3,"city":"Hekou","startDate":"8/28/2011","endDate":"4/7/2014","price":"9.48","status":"Often","color":"#903761"},
  {"id":4,"city":"Ballymahon","startDate":"8/19/2013","endDate":"8/3/2015","price":"47.53","status":"Often","color":"#cd387d"},
  {"id":5,"city":"Wesoła","startDate":"3/7/2015","endDate":"4/3/2014","price":"46.66","status":"Never","color":"#e6eeb9"},
  {"id":6,"city":"New Sibonga","startDate":"6/26/2011","endDate":"1/18/2015","price":"66.36","status":"Often","color":"#bcb97e"},
  {"id":7,"city":"Novoanninskiy","startDate":"5/22/2013","endDate":"8/2/2013","price":"83.96","status":"Once","color":"#335d34"},
  {"id":8,"city":"Potrerillos","startDate":"11/30/2012","endDate":"7/13/2013","price":"3.19","status":"Weekly","color":"#03c2cd"},
  {"id":9,"city":"Sobienie Jeziory","startDate":"11/11/2011","endDate":"1/21/2014","price":"96.92","status":"Never","color":"#0fe37d"},
  {"id":10,"city":"Limoeiro do Ajuru","startDate":"3/22/2015","endDate":"5/13/2013","price":"13.53","status":"Once","color":"#676c7c"}];
  constructor(private fb:FormBuilder, httpClient:HttpClient,private http:HttpClient) { 
    super('http://localhost:8080/items',httpClient)
  }

  itemForm = this.fb.group({
    id:[],
    city:['',Validators.required],
    startDate:['',Validators.required],
    endDate:['',Validators.required],
    price:['',Validators.required],
    status:['',Validators.required],
    color:['',Validators.required]
  })

  // getAll(){
  //   return of(this.items);
  // }

  populateItemForm(item){
    let itemformValue = {
      id:item.id,
      city:item.city,
      startDate:new Date(item.startDate),
      endDate:new Date(item.endDate),
      status:item.status,
      price:item.price,
      color:item.color
    }
    this.itemForm.setValue(itemformValue)
  }

  searchDateRange(dates) {
    let headers = new HttpHeaders(); 
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:8080/searchDate?start="+dates.startDate+ "&&endDate="+dates.endDate,dates,{headers:headers});
  }

  
}
