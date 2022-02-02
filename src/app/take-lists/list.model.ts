import { Category } from './../shared/category.model';

export class List {
  public list_no: string;
  public price: number;
  public discount: number;
  public netPrice: number;
  public category: Category;

  constructor(
    list_no: string,
    price: number,
    discount: number,
    netPrice: number,
    category: Category
  ) {
    this.list_no = list_no;
    this.price = price;
    this.discount = discount;
    this.netPrice = netPrice;
    this.category = category;
  }
}
