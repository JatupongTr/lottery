import { Lottery } from './../shared/lottery.model';

export class Agent {
  public code: string;
  public name: string;
  public imagePath: string;
  public itemLists: Lottery[];

  constructor(code: string, name: string, imagePath: string, itemLists: Lottery[]) {
    this.code = code;
    this.name = name;
    this.imagePath = imagePath;
    this.itemLists = itemLists;
  }
}
