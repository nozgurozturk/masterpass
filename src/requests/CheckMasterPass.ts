import { Initial } from './Initial'

export interface ICheckMasterPass extends Initial{
  userId: string
  token: string
  referenceNo: string
  sendSmsLanguage: string
  sendSms: string
  fp: string | null
}
