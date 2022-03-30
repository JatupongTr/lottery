import { Agent } from './../agents/agent.model';
import { Category } from 'src/app/shared/category.model';

export interface OrderResponse {
  message: string;
  Orders: Order[];
}

export interface Order {
  _id: string;
  period: Date;
  items: Item[];
  agentId: Agent;
}

export interface Item {
  lottoNo: string;
  price: number;
  discount: number;
  netPrice: number;
  categoryId: Category;
}
