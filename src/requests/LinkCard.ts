import { Initial } from './Initial'

export interface ILinkCard extends Initial{
  sendSmsLanguage: string
  sendSms: string
  token: string
  cardAliasName: string | null
  msisdn: string
  fp: string
}
