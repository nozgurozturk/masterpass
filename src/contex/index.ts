/* eslint-disable prefer-const */
import { Account, AccountStatus } from '../models/Account'
import { MasterPass } from '../models/MasterPass'
export namespace Context {

  export let Account: Account = {
    userId: '',
    status: AccountStatus.NoAccount
  }

  export let MasterPass: MasterPass._Model = {
    address: '',
    clientId: '',
    clientIp: '',
    forceMasterPass3d: false,
    isOtpMsisdn: false,
    msisdn: '',
    token: '',
    responseToken: ''
  }
}

export function setAccount (newAccount: Account) {
  Context.Account = newAccount
}

export function setMasterPassContext (mp:MasterPass._Model) {
  Context.MasterPass = mp
}

export function setResponseTokenContext (responseToken:string) {
  Context.MasterPass.responseToken = responseToken
}
