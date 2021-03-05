import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { from } from 'rxjs';
import { Product, CartProduct } from './app.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public productCategory: string[] = [
    'Groceries',
    'Electronics',
    'Fitness',
    'Clothing',
  ];

  public filterProd = new Subject<Product[]>();

  public filterProd$ = this.filterProd.asObservable();

  public filterByPrice$ = new Subject<number>();


  public productArr: Product[] = [
    {
      imageSource: './../assets/food-product.png',
      productTitle: 'TestProduct1',
      productPrice: '20',
      productCategory: 'groceries',
      topProduct: false,
      id: 0,
    },
    {
      imageSource: './../assets/food-product.png',
      productTitle: 'TestProduct2',
      productPrice: '30',
      productCategory: 'groceries',
      topProduct: true,
      id: 1,
    },
    {
      imageSource: './../assets/food-product.png',
      productTitle: 'TestProduct3',
      productPrice: '50',
      productCategory: 'groceries',
      topProduct: true,
      id: 2,
    },
    {
      imageSource: './../assets/sandisk-pendrive.jpg',
      productTitle: 'Sandisk Pendrive',
      productPrice: '60',
      productCategory: 'electronics',
      topProduct: true,
      id: 3,
    },
    {
      imageSource: './../assets/food-product.png',
      productTitle: 'TestProduct4',
      productPrice: '10',
      productCategory: 'groceries',
      topProduct: false,
      id: 4,
    },
    {
      imageSource: './../assets/food-product.png',
      productTitle: 'TestProduct5',
      productPrice: '30',
      productCategory: 'groceries',
      topProduct: false,
      id: 5,
    },
    {
      imageSource: './../assets/food-product.png',
      productTitle: 'TestProduct6',
      productPrice: '150',
      productCategory: 'groceries',
      topProduct: false,
      id: 6,
    },
    {
      imageSource: './../assets/food-product.png',
      productTitle: 'TestProduct7',
      productPrice: '67',
      productCategory: 'groceries',
      topProduct: false,
      id: 7,
    },
    {
      imageSource: './../assets/food-product.png',
      productTitle: 'TestProduct8',
      productPrice: '88',
      productCategory: 'groceries',
      topProduct: false,
      id: 8,
    },
    {
      imageSource: './../assets/food-product.png',
      productTitle: 'TestProduct9',
      productPrice: '92',
      productCategory: 'groceries',
      topProduct: true,
      id: 9,
    },
  ];

  public cartProducts: CartProduct[] = [];

  constructor(private http:HttpClient) {
    http.get("https://node-salesforce-integration.herokuapp.com/").subscribe((response:Product[])=>{
      this.productArr = Array.from(response);
    })
  }

  getProducts(): Observable<Product> {
    return from(this.productArr);
  }

  filterProductsBySearchString(searchby: string, searchString: string) {
    console.log(searchString);
    const clonedProductsArr = Array.from(this.productArr);
    if (searchby === 'userInput') {
      const filteredProducts = clonedProductsArr.filter((arrItem) => {
        return arrItem.productTitle
          .toLowerCase()
          .includes(searchString.toLowerCase());
      });

      if (filteredProducts.length === 0) {
        return this.filterProd.next([
          {
            imageSource: 'Null',
            productTitle: 'No product Found',
            productPrice: 'N/A',
            productCategory: 'N/A',
            topProduct: false,
            id: 1,
          },
        ]);
      } else {
        return this.filterProd.next(filteredProducts);
      }
    } else if (searchby === 'productCategory') {
      const filteredProductsByCategory = clonedProductsArr.filter(
        (productsObj) =>
          productsObj.productCategory.toLowerCase() ===
          searchString.toLowerCase()
      );

      return this.filterProd.next(filteredProductsByCategory);
    }
    else if(searchby=== null && searchString===null ){
      return this.filterProd.next(this.productArr);
    }
  }

  addProductsToCart(products: CartProduct) {
    if (this.cartProducts.length > 0) {
      const cartProdIndex = this.cartProducts.findIndex((item) => {
        return item.id === products.id;
      });
      if (cartProdIndex !== -1) {
        this.cartProducts[cartProdIndex].quantity =
          this.cartProducts[cartProdIndex].quantity + products.quantity;
      } else {
        this.cartProducts.push(products);
      }
    } else if (this.cartProducts.length === 0) {
      this.cartProducts.push(products);
    }
  }

  getCartProducts() {
    return from(this.cartProducts);
  }
}
