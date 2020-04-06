/* eslint-disable prefer-const */
import { IAccount, AccountStatus } from '../models/Account'
import { IMasterPass } from '../models/MasterPass'
import { Card } from '../models/Card'

export namespace Context {
  export const Env:string = 'prod'
  export const baseUrl = Env === 'dev' ? 'https://test.masterpassturkiye.com/MasterpassJsonServerHandler/v2' : 'https://ui.masterpassturkiye.com/v2'

  export let Account: IAccount = {
    userId: '',
    accountStatus: AccountStatus.NoAccount
  }

  export let MasterPass: IMasterPass = {
    address: '',
    clientId: '',
    forceMasterPass3d: false,
    isOtpMsisdn: false,
    msisdn: '',
    token: '',
    responseToken: ''
  }

  export let Cards: Card[] = []
}

export function setAccount (newAccount: IAccount) {
  Context.Account = newAccount
}

export function setMasterPassContext (mp:IMasterPass) {
  Context.MasterPass = mp
}

export function setResponseTokenContext (responseToken:string) {
  Context.MasterPass.responseToken = responseToken
}
