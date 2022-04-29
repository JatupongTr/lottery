export interface Setting {
  toddThreeDigits: number,
  topThreeDigits: number,
  downThreeDigits: number,    
  firstThreeDigits: number,
  lastThreeDigits: number,
  topTwoDigits: number,
  downTwoDigits: number,
  topRunDigits: number,
  downRunDigits: number
}

export class ItemLimit {
    public limitNumber: string;
    public typeNumber: string;
  
    constructor(
        limitNumber: string,
        typeNumber: string,
    ){
      this.limitNumber = limitNumber
      this.typeNumber = typeNumber
    }
  }