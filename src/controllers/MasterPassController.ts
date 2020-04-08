import { MasterPassService } from '../services/MasterPassService'
import { MasterPass } from '../models/MasterPass'
import { setMasterPassContext, setResponseTokenContext } from '../contex/index'

class MasterPassController {
  private masterPassService: MasterPassService
  constructor (masterPassService: MasterPassService) {
    this.masterPassService = masterPassService
    masterPassService.bindMasterPassChanged(this.onMasterPassChanged)
    masterPassService.bindResponseTokenChanged(this.onMasterPassChanged)
  }

  public onResponseTokenChanged = (responseToken: string) => {
    setResponseTokenContext(responseToken)
  }

  public onMasterPassChanged = (mp: MasterPass._Model) => {
    setMasterPassContext(mp)
  }

  public init = (masterpass: MasterPass._Model) => {
    this.masterPassService.add(masterpass)
  }
}

export default new MasterPassController(new MasterPassService())
