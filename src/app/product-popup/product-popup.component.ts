import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../app.model';
import { AppService } from '../app.service';

@Component({
  selector: 'app-product-popup',
  templateUrl: './product-popup.component.html',
  styleUrls: ['./product-popup.component.css'],
})
export class ProductPopupComponent implements OnInit {
  @Input() pdt: Product[];

  @Output() closePopupDisplay = new EventEmitter<boolean>();

  public prodQty = 1;

  public totalCost: number;

  constructor(private appService: AppService) {}

  ngOnInit(): void {}

  addQty() {
    this.prodQty = this.prodQty++;
    this.totalCost = this.prodQty * Number(this.pdt[0].productPrice);
  }

  closePopup() {
    this.closePopupDisplay.emit(false);
  }

  addToCart() {
    const cartObj = this.pdt[0];
    const cartProd = { ...cartObj, quantity: this.prodQty };
    this.appService.addProductsToCart(cartProd);
    this.closePopupDisplay.emit(false);
  }

  modifyQty(action: string) {
    if (action === 'add') {
      this.prodQty = ++this.prodQty;
    } else {
      this.prodQty = --this.prodQty;
    }
  }
}
