interface IServiceFaultDetail {
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

interface IDetail {
  ServiceFaultDetail: IServiceFaultDetail
}

export interface IFault {
  Detail: IDetail
}

interface IListItems {
  ListItem?: any[]
}

interface ITransactionBody {
  url3D?: string | null
  ListItems?: IListItems
  AccountStatus?: string | null
  RefNo: string | null
}

interface ITransactionHeader {
  RequestDateTime: string | null
  ResponseDatime: string | null
}

interface IResult {
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

interface IData {
  Body: IBody
}

export interface IMasterPassResonse {
  Result: boolean
  Message: string
  Data: IData
}
