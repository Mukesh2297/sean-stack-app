import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { CartProduct } from '../app.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public cartProd: CartProduct[] = [];

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.getCartProducts().subscribe((products: CartProduct) => {
      this.cartProd.push(products);
    });
  }

  numberConversion(numberString: string) {
    return Number(numberString);
  }
}
