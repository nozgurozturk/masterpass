import { Initial } from './Initial'

export interface IDeleteCard extends Initial {
  token: string
  uiChannelType: string
  timeZone: string
  sendSmsLanguage: string
  sendSms: string
  msisdn: string
  mobileAccountConfig: string
  identityVerificationFlag: string
  mmrpConfig: string
  defaultAccount: string
  cpinFlag: string
  cardTypeFlag: string
  eActionType: string
  delinkReason: string
  clientIp: string
  actionType: string
  fp: string
}
