export interface HalfPayResponse {
  _id: string;
  cate_id: string;
  cate_name: string;
  description: string;
  __v: number;
  rewardPrice: number;
  purchaseMaximum: number;
  purchaseAmount: number;
  purchaseBalance: number;
  halfPay: HalfPay;
  halfPayReward: number;
}

export interface HalfPay {
  lottoNo: string;
  _id: string;
}
