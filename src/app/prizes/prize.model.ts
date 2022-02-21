export class Prize {
  public daily: string;
  public first_prize: string;
  public three_last_prize: string;
  public three_first_prize: string;
  public two_down_prize: string;

  constructor(
    daily: string,
    first_prize: string,
    three_last_prize: string,
    three_first_prize: string,
    two_down_prize: string
  ) {
    this.daily = daily
    this.first_prize = first_prize;
    this.three_last_prize = three_last_prize;
    this.three_first_prize = three_first_prize;
    this.two_down_prize = two_down_prize;
  }
}
