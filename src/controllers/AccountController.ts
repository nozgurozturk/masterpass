import { AccountService } from '../services/AccountService'
import { Account, AccountStatus } from '../models/Account'
import { setAccount, Context } from '../contex/index'
import { IMasterPassResonse } from '../models/MasterPassResponse'
import { ICheckMasterPass } from '../instances/CheckMasterPass'
import { ILinkCard } from '../instances/LinkCard'
import MasterPassController from './MasterPassController'

class AccountController {
  private accountService: AccountService
  constructor (accountService: AccountService) {
    this.accountService = accountService
    accountService.bindAccountChanged(this.onAccountChanged)
  }

  onAccountChanged = (account: Account) => {
    setAccount(account)
  }

  handleAddAccount = (account: Account) => {
    this.accountService.add(account)
  }

  handleStatus = (status:string):AccountStatus => {
    return this.accountService.setAccountStatus(status)
  }

  public CheckMasterPass = async () => {
    const checkMasterPassInstance: ICheckMasterPass = {
      sendSmsLanguage: 'tur',
      sendSms: 'N',
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
      const masterpassResponse: any = await fetch(Context.MasterPass.address + '/checkMasterPassEndUser', {
        method: 'POST',
        body: JSON.stringify(checkMasterPassInstance)
      })
      const response: IMasterPassResonse = await masterpassResponse.json()

      return new Promise((resolve, reject) => {
        if (response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '0000' ||
            response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '') {
          const newAccount: Account = new Account({
            userId: Context.MasterPass.msisdn,
            accountStatus: this.handleStatus(response.Data.Body.Response.Result.TransactionBody.AccountStatus)
          })
          this.handleAddAccount(newAccount)
          resolve(response.Data.Body.Response)
        } else {
          reject(response.Data.Body.Fault)
        }
      })
    } catch (error) {
      return new Error(error.message)
    }
  }

  public LinkCard = async () => {
    const LinkCardInstance:ILinkCard = {
      sendSmsLanguage: 'tur',
      sendSms: 'Y',
      token: Context.MasterPass.token,
      cardAliasName: '',
      msisdn: Context.MasterPass.msisdn,
      fp: '',
      clientId: Context.MasterPass.clientId,
      dateTime: new Date().toISOString(),
      version: '35',
      clientType: '1'
    }
    try {
      const linkCardResponse:any = await fetch(Context.baseUrl + '/linkCardToClient', {
        method: 'POST',
        body: JSON.stringify(LinkCardInstance)
      })
      const response: IMasterPassResonse = await linkCardResponse.json()
      return new Promise((resolve, reject) => {
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
      return new Error(error.message)
    }
  }
}

export default new AccountController(new AccountService())
