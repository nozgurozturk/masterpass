export interface ICheckMasterPass {
  userId: string
  token: string
  referenceNo: string
  clientId: string
  sendSmsLanguage: string
  readonly sendSms: string
  readonly fp: string | null
  readonly dateTime: string | Date
  readonly version: string | number
  readonly clientType: string
}

export class CheckMasterPass {
  public userId: string
  public token: string
  public referenceNo: string
  public clientId: string
  public sendSmsLanguage: string
  public sendSms: string
  public fp: string | null
  public dateTime: string | Date
  public version: string | number
  public clientType: string
  constructor (
    userId: string,
    token: string,
    referenceNo: string,
    clientId: string,
    sendSmsLanguage: string,
    sendSms: string,
    fp: string | null,
    dateTime: string | Date,
    version: string | number,
    clientType: string) {
    this.userId = userId
    this.token = token
    this.referenceNo = referenceNo
    this.clientId = clientId
    this.sendSmsLanguage = sendSmsLanguage
    this.sendSms = sendSms
    this.fp = fp
    this.dateTime = dateTime
    this.version = version
    this.clientType = clientType
  }
}
