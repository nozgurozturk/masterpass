import { Context } from '../contex/index'
import { IMasterPass, MasterPass } from '../models/MasterPass'

export class MasterPassService {
  public masterPass: MasterPass
  private onMasterPassChange: Function
  private onResponseTokenChange: Function
  constructor () {
    const masterpass = Context.MasterPass
    this.masterPass = masterpass
  }

  private commit (mp: MasterPass) {
    this.onMasterPassChange(mp)
  }

  public bindResponseTokenChanged (callback: Function) {
    this.onResponseTokenChange = callback
  }

  public bindMasterPassChanged (callback: Function) {
    this.onMasterPassChange = callback
  }

  public add (masterpass: IMasterPass) {
    const newMasterPass = new MasterPass(masterpass)
    this.commit(newMasterPass)
  }
}
