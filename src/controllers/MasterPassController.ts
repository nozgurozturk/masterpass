import { MasterPassService } from '../services/MasterPassService'
import { MasterPass } from '../models/MasterPass'
import { setMasterPassContext, setResponseTokenContext } from '../contex/index'

/**
 * @class MasterPassController
 * @property {Function} onResponseTokenChanged
 * @property {Function} onMasterPassChanged
 * @property {Function} init
 */

class MasterPassController {
  private masterPassService: MasterPassService

  /**
   * @param {MasterPassService} masterPassService
   */

  constructor (masterPassService: MasterPassService) {
    this.masterPassService = masterPassService
    masterPassService.bindMasterPassChanged(this.onMasterPassChanged)
    masterPassService.bindResponseTokenChanged(this.onMasterPassChanged)
  }

  /**
   * Invokes when Response token is changed
   * @method onResponseTokenChanged
   * @public
   * @param {string} responseToken
   * @returns {void}
   */

  public onResponseTokenChanged = (responseToken: string):void => {
    setResponseTokenContext(responseToken)
  }

  /**
   * Invokes when Masterpass instances is changed
   * @method onMasterPassChanged
   * @public
   * @param {MasterPass._Model} masterpass
   * @returns {void}
   */

  public onMasterPassChanged = (masterpass: MasterPass._Model):void => {
    setMasterPassContext(masterpass)
  }

  /**
   * Invokes when Masterpass instances is changed
   * @method init
   * @public
   * @param {MasterPass._Model} masterpass
   * @returns {void}
   */

  public init = (masterpass: MasterPass._Model): void => {
    this.masterPassService.add(masterpass)
  }
}

export default new MasterPassController(new MasterPassService())
