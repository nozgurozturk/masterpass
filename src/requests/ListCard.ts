import { Initial } from './Initial'

export interface IListCard extends Initial{
  token: string
  msisdn: string
  listType: string // 'ACCOUNT'
  sendSms: string
  clientIp: string
  sendSmsLanguage: string
}

