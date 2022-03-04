export class Player {
  private _pid:number;
  private _fname:string;
  private _lname:string;
  private _nname:string;

  constructor(pid:number,fname:string,lname:string,nname:string) {
    this._pid = pid;
    this._fname = fname;
    this._lname = lname;
    this._nname = nname;
  }

  get pid():number{
    return this._pid;
  }

  get fname():string{
    return this._fname;
  }

  get lname():string{
    return this._lname;
  }

  get nname():string{
    return this._nname;
  }
}
