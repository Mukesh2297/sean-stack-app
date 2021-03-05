import {
  Component,
  OnInit,
  AfterViewInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { AppService } from '../app.service';
import { Product } from '../app.model';
import {HttpClient} from '@angular/common/http';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit, AfterViewInit {
  @Output() displayProd = new EventEmitter<Product[]>();

  public productsArr: Product[] = [];

  public originalArr: Product[] = [];

  public allProductsSubscription:Subscription;

  public filterProductsSubscription:Subscription;

  constructor(private appService: AppService,private http:HttpClient, private apiService:ApiService) {}

  ngOnInit(): void {
    this.allProductsSubscription = this.appService
      .getProducts()
      .subscribe((response: Product) => {
        this.originalArr.push(response);
        this.productsArr.push(response);
        //console.log(this.productsArr);
      });

    // this.apiService.get("http://localhost:3001").subscribe((response:Product[])=>{
    //   this.originalArr = response;
    //   this.productsArr = response
    // });

    this.filterProductsSubscription = this.appService.filterByPrice$.subscribe(response=>{
      console.log(response);
      let filterValue = response;
      this.productsArr = Array.from(this.originalArr);
      let clonedArray = Array.from(this.productsArr);
      let filteredArray = clonedArray.filter(arrItem=>{
        return Number(arrItem.productPrice) >= filterValue;
      })

      this.productsArr = Array.from(filteredArray);
    });
  }

  ngAfterViewInit() {
    this.appService.filterProd$.subscribe((data: Product[]) => {
      console.log(data);
      this.productsArr = data;
    });
  }

  displayProduct(pdt: Product) {
    console.log(pdt);
    this.displayProd.emit([pdt]);
  }

  ngOnDestroy() {
    this.allProductsSubscription.unsubscribe();
    this.filterProductsSubscription.unsubscribe();
  }
}
