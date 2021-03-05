import { Component, OnInit } from '@angular/core';
import { Product } from '../app.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  public userSearched: string;

  public isUserSearched = false;

  public displayProd = false;

  public selectedProduct: Product[] = [];

  public userSearchedProducts: Product[];

  public contacts = [];

  constructor(public http:HttpClient) {}

  ngOnInit() {
   
    this.http.get("https://node-salesforce-server.herokuapp.com/feed").subscribe((response:any)=>{
      this.contacts = response.records;
    });

  }

  findProductBySearchString(event) {
    this.userSearched = event;
  }

  isUserSearchedHandler(event) {
    console.log(event);
    this.isUserSearched = event;
  }

  displayPopup(prod: Product) {
    if (this.selectedProduct.length === 0) {
      this.selectedProduct.push(prod);
      this.displayProd = true;
    }
  }

  handleFilter(event){
    console.log(event);
  }


  closePopup(value) {
    this.selectedProduct.length = 0;
    this.displayProd = false;
  }

  searchedProduct(event) {
    this.userSearchedProducts = event;
  }
}
