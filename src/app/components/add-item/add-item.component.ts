import { MatDialogRef } from '@angular/material';
import { ItemService } from './../../services/item.service';
import { Component, OnInit } from '@angular/core';
import { AppError } from 'src/app/common/app-error.error';
import { BadRequestError } from 'src/app/common/bad-request.error';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  isSavePending:boolean = false;
  constructor(private itemService:ItemService,
              private dialogRef:MatDialogRef<AddItemComponent>) { }

  ngOnInit() {
  }

  onSave(){
    if(this.itemService.itemForm.valid){
      this.isSavePending = true;
      if(!this.id.value){
        //this.onClose(this.itemService.itemForm.value)
        this.saveItem(this.itemService.itemForm.value)
      }else{
        //this.onClose(this.itemService.itemForm.value)
        this.updateItem(this.itemService.itemForm.value);
      }
    }
  }

  saveItem(item){
    this.itemService.create(item)
    .subscribe(item =>{
      this.isSavePending=false;
      this.onClose(item);
    },(error:AppError) =>{
      if(error instanceof BadRequestError)
         console.log(error);
      else throw error;
    })
  }

  updateItem(item){
    this.itemService.update(item)
    .subscribe(item =>{
      this.isSavePending=false;
      this.onClose(item); 
    },(error:AppError) =>{
      if(error instanceof BadRequestError) 
        console.log(error);
      else throw error;
    });
  }

  clearForm(){
    this.itemService.itemForm.reset();
  }

  get id(){
    return this.itemService.itemForm.get('id');
  }

  get city(){
    return this.itemService.itemForm.get('city');
  }

  get startDate(){
    return this.itemService.itemForm.get("startDate");
  }

  get endDate(){
    return this.itemService.itemForm.get('endDate');
  }

  get status(){
    return this.itemService.itemForm.get('status');
  }

  get price(){
    return this.itemService.itemForm.get('price');
  }

  get color(){
    return this.itemService.itemForm.get('color');
  }

  onClose(item){ 
    this.dialogRef.close(item);
    this.itemService.itemForm.reset();
  }

}
