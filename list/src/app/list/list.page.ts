import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { Item } from '../../models/item.model';
@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  input:string;
listItems:Array<Item>=[];
  constructor(private storage:StorageService) { }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.storage.readData('list')
    .then( (response:any) => {
      if(response ){
        this.listItems = JSON.parse(response);
      }
     
    })
    .catch ( (error) => console.log(Response)  );
    
  }

  addListItem( name:string){
    this.input ='';
    //this.listItems.push(item);
    //console. log(this.listItems);
    let item = {name: name, id: new Date().getTime(), status: false };
    this.listItems.push( item)
    this.sortlist();
    this.saveList();
  }
  saveList(){
    this.storage.saveData( 'list', this.listItems )
    .then((response) =>{
      //data written successfully
    })
    .catch((error)=>{
      console.log(error);
    });
  }
  deleteItem(id:number){
    this.listItems.forEach( (item,index)=> {
      if(item.id == id ){
        this.listItems.splice( index, 1 );
      }
    });
    this.saveList();
}
changeItemStatus(id:number){
  this.listItems.forEach( (item) =>{
    if( item.id == id ){
      item.status = ( item.status == false ) ? true : false;
    }
  });
  
 // this.saveList();
 this.saveList();
 console.log(this.listItems);
}
sortlist(){
  this.listItems.sort( (item1,item2)=>{
    return item2.id - item1.id;
  }); 
}

}
