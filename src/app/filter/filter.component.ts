import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppService } from '../app.service';
import { Options } from '@angular-slider/ngx-slider';
import { Product } from '../app.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  value = 0;
  options: Options = { floor: 0, ceil: 200 };

  public productCategory: string[];

  public topProducts: Product[] = [];

  public isFilterCategorySelected:boolean = false;

  @Output() public appliedFilterValue = new EventEmitter<number>();

  constructor(private appService: AppService, private apiService:ApiService) {}

  ngOnInit() {
    this.productCategory = this.appService.productCategory;
    this.apiService.get("http://localhost:3001").subscribe((response:Product[])=>{
      this.topProducts = response.filter((pdtObj)=>{
        return pdtObj.topProduct === true;
      })
    });
  }

  filterProductbyCategory(btnValue) {
    this.isFilterCategorySelected = true;
    const searchCategory = btnValue._elementRef.nativeElement.value;
    this.appService.filterProductsBySearchString(
      'productCategory',
      searchCategory
    );
  }

  filterProductByPrice(){

    this.appService.filterByPrice$.next(this.value);
  
  }

  removeAllFilters(){
    this.isFilterCategorySelected = false;
    this.appService.filterProductsBySearchString(
      null,
      null
    );
  }
}
