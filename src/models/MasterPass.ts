export interface IMasterPass {
  address: string
  clientId: string
  forceMasterPass3d: boolean
  isOtpMsisdn: boolean
  msisdn: string
  token: string
  responseToken?: string
}

export class MasterPass {
  public address: string
  public clientId: string
  public forceMasterPass3d: boolean
  public isOtpMsisdn: boolean
  public msisdn: string
  public token: string
  public responseToken?: string
  constructor (
    {
      address,
      clientId,
      forceMasterPass3d,
      isOtpMsisdn,
      msisdn,
      token,
      responseToken
    }:IMasterPass) {
    this.address = address
    this.clientId = clientId
    this.forceMasterPass3d = forceMasterPass3d
    this.isOtpMsisdn = isOtpMsisdn
    this.msisdn = msisdn
    this.token = token
    this.responseToken = responseToken
  }
}
