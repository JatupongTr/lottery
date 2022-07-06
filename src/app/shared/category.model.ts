export interface Category {
  _id: any;
  id: string;
  cate_id: string;
  cate_name: string;
  description: string;
  rewardPrice: number;
  purchaseMaximum: number;
  purchaseAmount: number;
  purchaseBalance: number;
  halfPayReward: number;
  halfPay: HalfPay[];
  available: boolean
}
export interface HalfPay {
  lottoNo: number;
}
