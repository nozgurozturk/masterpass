import { Initial } from './Initial'

export interface IOTP extends Initial{
  validationCode: string
  sendSms: string
  sendSmsLanguage: string
  pinType?: string
  validationRefNo: string
  token: string | null
  fp: string | null
}

export interface IResend extends Initial {
  validationRefNo: string
  sendSmsLanguage: string
  sendSms: string
}
