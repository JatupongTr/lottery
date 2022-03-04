export class Lottery {
  public list_no: string;
  public price: number;
  public discount: number;
  public netPrice: number;
  public category: string;

  constructor(
    list_no: string,
    price: number,
    discount: number,
    netPrice: number,
    category: string
  ) {
    this.list_no = list_no;
    this.price = price;
    this.discount = discount;
    this.netPrice = netPrice;
    this.category = category;
  }
}
