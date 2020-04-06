import { Context } from '../contex/index'
import { IMasterPass, MasterPass } from '../models/MasterPass'

export class MasterPassService {
  public masterPass: MasterPass
  private onMasterPassChange: Function
  private onResponseTokenChanged: Function
  constructor () {
    const mp: IMasterPass = Context.MasterPass
    this.masterPass = new MasterPass(mp.address, mp.clientId, mp.forceMasterPass3d, mp.isOtpMsisdn, mp.msisdn, mp.token)
  }

  public bindResponseTokenChanged (callback: Function) {
    this.onMasterPassChange = callback
  }

  public bindMasterPassChanged (callback: Function) {
    this.onMasterPassChange = callback
  }

  private commit (mp: MasterPass) {
    this.onMasterPassChange(mp)
  }

  public add (mp: MasterPass) {
    const newMasterPass = new MasterPass(mp.address, mp.clientId, mp.forceMasterPass3d, mp.isOtpMsisdn, mp.msisdn, mp.token)
    this.commit(newMasterPass)
  }
}
