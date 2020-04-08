export interface ICheckMasterPass {
  userId: string
  token: string
  referenceNo: string
  clientId: string
  sendSmsLanguage: string
  sendSms: string
  fp: string | null
  dateTime: string | Date
  version: string | number
  clientType: string
}
