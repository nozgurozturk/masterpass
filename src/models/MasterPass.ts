import { ICard } from './Card'

export namespace MasterPass {
  export interface IServiceFaultDetail {
    RefNo: string | null
    ResponseCode: string | null
    ResponseDesc: string | null
    Token: string | null
    NewMsisdn: string | null
    InternalResponseCode: string | null
    InternalResponseMessage: string | null
    CardIssuerName?: string | null,
    MaskedPan?: string | null
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

  export interface ITransactionBody {
    url3D?: string | null
    ListItems?: IListItems
    AccountStatus?: string | null
    RefNo: string | null
  }

  export interface ITransactionHeader {
    RequestDateTime: string | null
    ResponseDatime: string | null
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
    forceMasterPass3d: boolean
    isOtpMsisdn: boolean
    msisdn: string
    token: string
    responseToken?: string
  }

  export class _Model {
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
      }:_Interface) {
      this.address = address
      this.clientId = clientId
      this.forceMasterPass3d = forceMasterPass3d
      this.isOtpMsisdn = isOtpMsisdn
      this.msisdn = msisdn
      this.token = token
      this.responseToken = responseToken
    }
  }
}
