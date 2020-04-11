// Context
import { setAccount, Context } from '../contex/index'
// Requests
import { ICheckMasterPass } from '../requests/CheckMasterPass'
import { ILinkCard } from '../requests/LinkCard'
// Models
import { MasterPass } from '../models/MasterPass'
import { Account, AccountStatus, IAccount } from '../models/Account'
// Services
import { AccountService } from '../services/AccountService'
// Controllers
import MasterPassController from './MasterPassController'

/**
 * @class AccountController
 * @property {Function} onAccountChanged
 * @property {Function} handleAddAccount
 * @property {Function} handleStatus
 * @property {Function} checkMasterPass
 * @property {Function} linkAccount
 */

class AccountController {
  private accountService: AccountService

  /**
   * @param {AccountService} accountService
   */

  constructor (accountService: AccountService) {
    this.accountService = accountService
    accountService.bindAccountChanged(this.onAccountChanged)
  }

  /**
   * Invokes when Account is changed
   * @method onAccountChanged
   * @private
   * @param {Account} account
   * @returns {void}
   */

  private onAccountChanged = (account: Account):void => {
    setAccount(account)
  }

  /**
   * Invokes when Account is added
   * @method handleAddAccount
   * @private
   * @param {Account} account
   * @returns {void}
   */

  private handleAddAccount = (account: IAccount):void => {
    this.accountService.add(account)
  }

  /**
   * Invokes when Account status is added
   * @method handleStatus
   * @private
   * @param {string} status
   * @returns {AccountStatus}
   */

  private handleStatus = (status:string):AccountStatus => {
    return this.accountService.setAccountStatus(status)
  }

  /**
   * Check Account from Masterpass
   * @method checkMasterPass
   * @public
   * @returns {Promise}
   */

  public checkMasterpass = async () : Promise<MasterPass.IResponse | MasterPass.IFault> => {
    const checkMasterPassInstance: ICheckMasterPass = {
      sendSmsLanguage: 'tur',
      sendSms: 'Y',
      referenceNo: '0000000',
      token: Context.MasterPass.token,
      userId: Context.MasterPass.msisdn,
      fp: '',
      clientId: Context.MasterPass.clientId,
      dateTime: new Date().toISOString(),
      version: '35',
      clientType: '1'
    }
    try {
      const masterpassResponse: any = await fetch(`${Context.MasterPass.address}/checkMasterPassEndUser`, {
        method: 'POST',
        body: JSON.stringify(checkMasterPassInstance)
      })
      const response: MasterPass.Response = await masterpassResponse.json()

      return new Promise<MasterPass.IResponse | MasterPass.IFault>((resolve, reject) => {
        if (response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '0000' ||
            response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '') {
          const newAccount: IAccount = {
            userId: Context.MasterPass.msisdn,
            accountStatus: this.handleStatus(response.Data.Body.Response.Result.TransactionBody.AccountStatus)
          }
          this.handleAddAccount(newAccount)
          resolve(response.Data.Body.Response)
        } else {
          reject(response.Data.Body.Fault)
        }
      })
    } catch (error) {
      return error.message
    }
  }

  /**
   * Link Account to Masterpass
   * @method linkAccount
   * @public
   * @returns {Promise}
   */

  public linkAccount = async ():Promise<MasterPass.IResponse | MasterPass.IFault> => {
    const LinkCardInstance:ILinkCard = {
      sendSmsLanguage: 'tur',
      sendSms: 'Y',
      referenceNo: '0000000',
      token: Context.MasterPass.token,
      cardAliasName: 'a',
      msisdn: Context.MasterPass.msisdn,
      fp: '',
      clientId: Context.MasterPass.clientId,
      dateTime: new Date().toISOString(),
      version: '35',
      clientType: '1'
    }
    try {
      const linkCardResponse:any = await fetch(`${Context.MasterPass.address}/linkCardToClient`, {
        method: 'POST',
        body: JSON.stringify(LinkCardInstance)
      })
      const response: MasterPass.Response = await linkCardResponse.json()
      return new Promise<MasterPass.IResponse | MasterPass.IFault>((resolve, reject) => {
        if (response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '0000' ||
            response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '') {
          this.handleStatus(response.Data.Body.Response.Result.TransactionBody.AccountStatus)
          resolve(response.Data.Body.Response)
        } else {
          MasterPassController.onResponseTokenChanged(response.Data.Body.Fault.Detail.ServiceFaultDetail.Token)
          reject(response.Data.Body.Fault)
        }
      })
    } catch (error) {
      return error.message
    }
  }
}

export default new AccountController(new AccountService())
