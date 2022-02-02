import { List } from "../take-lists/list.model";

export class Agent {
  public code: string;
  public name: string;
  public imagePath: string;
  public itemLists: List[];

  constructor(code: string, name: string, imagePath: string, itemLists: List[]) {
    this.code = code;
    this.name = name;
    this.imagePath = imagePath;
    this.itemLists = itemLists;
  }
}
