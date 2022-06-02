
import { Category } from "./category.model";

export class Item {
  public lottoNo: string;
  public price: number;
  public discount: number;
  public netPrice: number;
  public categoryId: Category;
  public categoryName: string;

  constructor(
    lottoNo: string,
    price: number,
    discount: number,
    netPrice: number,
    categoryId: Category
  ){
    this.lottoNo = lottoNo
    this.price = price
    this.discount = discount
    this.netPrice = netPrice
    this.categoryId = categoryId
  }
}
