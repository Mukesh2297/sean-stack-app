export interface Product {
  imageSource: string;
  productTitle: string;
  productPrice: string;
  productCategory: string;
  topProduct: boolean;
  id?: number;
}

export interface CartProduct extends Product {
  quantity: number;
}
