export class Gameplayer {
  private _pid:number;
  private _did:number;
  private _dmg:number = 0;
  private _kills:number = 0;
  private _lp:number= 40;
  private _infect:number = 10;
  public alive = true;
  public _cdmg:number[] = [];

  constructor(pid:number,did:number) {
    this._pid=pid;
    this._did=did;
  }

  get infect():number{
    return this._infect;
  }

  getCdmg(index:number):number{
    return this._cdmg[index];
  }

  deltCdmg(index:number, dmg:number):number{
    this._cdmg[index]+=dmg;
    this._lp += dmg;
    return this._cdmg[index];
  }

  deltInfect(infect:number):number{
    this._infect += infect;
    this._lp += infect;
    return this._infect;
  }

  get lp():number{
    return this._lp;
  }

  deltDmg(dmg:number):number{
    this._lp = this._lp + dmg;
    return this._lp;
  }

  dealsDmg(dmg:number):void{
    this._dmg = this._dmg + dmg;
  }

  kill():void{
    this._kills++;
  }

  die():void{
    this.alive = false;
  }

  get pid():number{
    return this._pid;
  }

  get did():number{
    return this._did;
  }

  get dmg():number{
    return this._dmg;
  }

  get kills():number{
    return this._kills;
  }

}
