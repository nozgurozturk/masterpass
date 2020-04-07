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

  onResponseTokenChanged = (responseToken: string) => {
    setResponseTokenContext(responseToken)
  }

  onMasterPassChanged = (mp: MasterPass) => {
    setMasterPassContext(mp)
  }

  handleAddMasterPass= (mp: MasterPass) => {
    this.masterPassService.add(mp)
  }
}

export default new MasterPassController(new MasterPassService())
