export interface Setting {
    toddThree:   number;
    topThree:    number;
    downThree:   number;
    firstThree:  number;
    lastThree:   number;
    topTwo:      number;
    downTwo:     number;
    topRunning:  number;
    downRunning: number;
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