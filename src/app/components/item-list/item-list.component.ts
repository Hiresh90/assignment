import { FormBuilder, FormGroup } from '@angular/forms';
import { AddItemComponent } from './../add-item/add-item.component';
import { ItemService } from './../../services/item.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialogConfig, MatDialog, MatPaginator, MAT_DIALOG_DATA, MatSort, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  itemDataSource:MatTableDataSource<any>;// = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayColumns:string[] = [
   // 'select',
    "id",		
    "city",		
    "startDate",
    "endDate",	
    "price",	
    "status",	
    "color",
    "action"		  
  ];
  dateForm;
  //selection = new SelectionModel<any>(true, []);
  constructor(private itemService:ItemService,
              private dialog: MatDialog,
              private fb:FormBuilder) { 
                 
              }

  ngOnInit() {

    this.dateForm = this.fb.group({
      startDate:[],
      endDate:[]
    })

    this.itemService.getAll()
    .subscribe(items => {
        this.itemDataSource = new MatTableDataSource(items as any);
        this.itemDataSource.paginator = this.paginator;
        this.itemDataSource.sort = this.sort;
    });

  }

  get startDate(){
    return this.dateForm.get('startDate').value;
  }

  get endDate(){
    return this.dateForm.get('endDate').value;
  }

  addItem(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'add-whitelist-dialog-container',
    dialogConfig.width = "40%";
    dialogConfig.position = {top:'5%'};
    this.dialog.open(AddItemComponent,dialogConfig)
      .afterClosed()
        .subscribe(whiteList =>{
            if(whiteList){
              this.itemDataSource.data.push(whiteList);
              this.itemDataSource.paginator = this.paginator;
            }
        });
  }

  onEdit(event:Event, item){ 
    event.stopPropagation();
    this.itemService.populateItemForm(item);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'add-whitelist-dialog-container',
    dialogConfig.data=item;
    dialogConfig.width = "40%";
    dialogConfig.position = {top:'5%'};
    this.dialog.open(AddItemComponent,dialogConfig)
      .afterClosed()
        .subscribe(whiteList =>{
            if(whiteList){
              let index =  this.itemDataSource.data.map(value => value.id).indexOf(whiteList.id); 
              this.itemDataSource.data.splice(index,1)
              this.itemDataSource.data.splice(index,0,whiteList);
              this.itemDataSource.paginator = this.paginator;
            }
        });
  }

  onDelete(event:Event,item){
    event.stopPropagation();
   
    this.itemService.delete(item.id)
    .subscribe(response => {
        let index = this.itemDataSource.data.map(value => value.id).indexOf(item.id);
        this.itemDataSource.data.splice(index,1);
        this.itemDataSource.paginator = this.paginator; 
    },(error:Response) =>{ 
        if(error ) 
          console.log(error);
        else throw error; 
    });   
   }

   onSearch(){
      this.itemService.searchDateRange(this.dateForm.value)
      .subscribe(items => {
        this.itemDataSource = new MatTableDataSource(items as any);
        this.itemDataSource.paginator = this.paginator;
        this.itemDataSource.sort = this.sort;
    });
   }

}
