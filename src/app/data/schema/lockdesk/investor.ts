export class Investor {
  name: string;
  investorid: number;
  nmls: number;
  mld : number;
  numberOfStars : number;
  constructor(name: string, investorid: number, nmls: number,mld:number,numberOfStars:number) {
    this.name = name;
    this.investorid = investorid;
    this.nmls = nmls;
    this.mld = mld;
    this.numberOfStars = numberOfStars;
  }
}
