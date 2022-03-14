import { Category } from "./category.model";

export class Lotto {
  public lotto_no: string;
  public price: number;
  public discount: number;
  public net_price: number;
  public category: Category;

  constructor(
    lotto_no: string,
    price: number,
    discount: number,
    net_price: number,
    category: Category
  ){
    this.lotto_no = lotto_no
    this.price = price
    this.discount = discount
    this.net_price = net_price
    this.category = category
  }
}
