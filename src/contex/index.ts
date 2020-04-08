/* eslint-disable prefer-const */
import { Account, AccountStatus } from '../models/Account'
import { MasterPass } from '../models/MasterPass'
import { Card } from '../models/Card'

export namespace Context {
  export const Env:string = 'prod'
  export const baseUrl = Env === 'dev' ? 'https://test.masterpassturkiye.com/MasterpassJsonServerHandler/v2' : 'https://ui.masterpassturkiye.com/v2'

  export let Account: Account = {
    userId: '',
    accountStatus: AccountStatus.NoAccount
  }

  export let MasterPass: MasterPass._Model = {
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

export function setCards (cards: Card[]) {
  Context.Cards = cards
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
