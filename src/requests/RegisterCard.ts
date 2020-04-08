export interface IRegisterCardDefault {
  token: string
  email: string | null
  lastName: string | null
  firstName: string | null
  homePostalCode: string | null
  homeCountryCode: string | null
  homeState: string | null
  homeCity: string | null
  homeAddress: string | null
  uiChannelType: string // '6'
  timeZone: string // '+01'
  sendSmsLanguage: string | null
  sendSms: string | null
  referenceNo: string | null
  msisdn: string
  clientIp: string | null // ''
  mobileAccountConfig: string // 'WMA'
  identityVerificationFlag: string // 'Y'
  mmrpConfig: string // '110010'
  defaultAccount: string // 'Y'
  cpinFlag: string // 'Y'
  cardTypeFlag: string // '05'
  eActionType: string // 'A'
  delinkReason: string | null // ''
  actionType: string // 'A'
  fp: string | null
  clientId: string
  dateTime: Date | string
  version: string // '35'
  clientType: string // '1'
}
export interface IRegisterCard {
  rtaPan: string
  expiryDate: string // YYMM
  accountAliasName: string
  cvc: string
  cardHolderName: string
}
