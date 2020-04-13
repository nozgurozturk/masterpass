import { ICard } from './Card'

export namespace MasterPass {
  export interface IServiceFaultDetail {
    RefNo: string | null | undefined
    ResponseCode: string | null | undefined
    ResponseDesc: string | null | undefined
    Token: string | null | undefined
    NewMsisdn: string | null | undefined
    InternalResponseCode: string | null | undefined
    InternalResponseMessage: string | null | undefined
    CardIssuerName?: string | null | undefined,
    MaskedPan?: string | null | undefined
  }

  export interface IDetail {
    ServiceFaultDetail: IServiceFaultDetail
  }

  export interface IFault {
    Detail: IDetail
  }

  export interface IListItems {
    ListItem?: ICard[]
  }

  export interface ISmsNoti {
      To?: string | null
      Value?: string | null
  }

  export interface ITransactionBody {
    url3D?: string | null | undefined
    ListItems?: IListItems
    AccountStatus?: string | null | undefined
    RefNo: string | null | undefined
    CardUniqueId?: string
    SmsNoti?: ISmsNoti
    Token?: string
    MaskedAccountNo?: string,
    CurrencyCode?: string | null,
    ApprovalCode?: string | null,
    MaskedSenderRta?: string,
    MerchantName?: string | null,
  }

  export interface ITransactionHeader {
    RequestDateTime: string | null | undefined
    ResponseDatime: string | null | undefined
  }

  export interface IResult {
    TransactionHeader: ITransactionHeader
    TransactionBody: ITransactionBody
  }

  export interface IResponse {
    Result: IResult
  }

  export interface IBody {
    Response: IResponse
    Fault: IFault
  }

  export interface IData {
    Body: IBody
  }

  export interface Response {
    Result: boolean
    Message: string
    Data: IData
  }

  export interface _Interface {
    address: string
    clientId: string
    clientIp: string
    forceMasterPass3d: boolean
    isOtpMsisdn: boolean
    msisdn: string
    token: string
    responseToken?: string
  }

  export class _Model implements _Interface {
    public address: string
    public clientId: string
    public clientIp: string
    public forceMasterPass3d: boolean
    public isOtpMsisdn: boolean
    public msisdn: string
    public token: string
    public responseToken?: string
    constructor (
      {
        address,
        clientIp,
        clientId,
        forceMasterPass3d,
        isOtpMsisdn,
        msisdn,
        token,
        responseToken
      }:_Interface) {
      this.address = address
      this.clientId = clientId
      this.clientIp = clientIp
      this.forceMasterPass3d = forceMasterPass3d
      this.isOtpMsisdn = isOtpMsisdn
      this.msisdn = msisdn
      this.token = token
      this.responseToken = responseToken
    }
  }
}
