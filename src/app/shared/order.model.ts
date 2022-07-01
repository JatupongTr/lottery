import { Agent } from './../agents/agent.model';
import { Category } from 'src/app/shared/category.model';

export interface OrderResponse {
  Orders: Order[];
}

export interface RewardResponse {
  _id: string;
  period: Date;
  items: Item;
  agentId: Agent;
  createdAt: Date;
  updatedAt: Date;
  agent: Agent[];
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
  categoryName: string;
  // overPrice: boolean
}
