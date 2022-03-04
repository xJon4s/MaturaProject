export class Deck {
  private _did:number;
  private _commander:string;
  private _name:string;
  private _laender:number;
  private _pid:number;

  constructor(did:number,commander:string,name:string,laender:number,pid:number){
    this._did = did;
    this._commander = commander;
    this._name = name;
    this._laender = laender;
    this._pid = pid;
  }

  get did():number {
    return this._did;
  }

  get commander():string {
    return this._commander;
  }

  get name():string {
    return this._name;
  }

  get laender():number {
    return this._laender;
  }

  get pid():number {
    return this._pid;
  }
}
