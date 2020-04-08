import { Context } from '../contex/index'
import { MasterPass } from '../models/MasterPass'

/**
 * @class MasterPassService
 * @description Manages MasterPass Data
 * @property {Function} commit
 * @property {Function} bindResponseTokenChanged
 * @property {Function} bindMasterPassChanged
 * @property {Function} add
 */

export class MasterPassService {
  public masterPass: MasterPass._Model
  private onMasterPassChange: Function
  private onResponseTokenChange: Function
  constructor () {
    const masterpass = Context.MasterPass
    this.masterPass = masterpass
  }

  /**
   * Commit Data to Context
   * @method commit
   * @private
   * @param {MasterPass} masterpass
   * @returns {void}
   */
  private commit (masterpass: MasterPass._Model) {
    this.onMasterPassChange(masterpass)
  }

  /**
   * Inovke callback function when MasterPassResponseToken is changed
   * @method bindResponseTokenChanged
   * @public
   * @param {Function} callback
   * @returns {void}
   */

  public bindResponseTokenChanged (callback: Function) {
    this.onResponseTokenChange = callback
  }

  /**
   * Invoke callback function when MasterPass data is changed
   * @public
   * @method bindResponseTokenChanged
   * @param {Function} callback
   * @returns {void}
   */

  public bindMasterPassChanged (callback: Function) {
    this.onMasterPassChange = callback
  }

  /**
   * Add Masterpass Data to Context
   * @public
   * @method add
   * @param {MasterPass._Interface} masterpass
   * @returns {void}
   */

  public add (masterpass: MasterPass._Interface): void {
    const newMasterPass = new MasterPass._Model(masterpass)
    this.commit(newMasterPass)
  }
}
