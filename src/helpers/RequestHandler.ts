export class Request {
  public referenceNo: string
  public errorCode: number
  public message: string
  public success: boolean
  constructor (referenceNo: string, errorCode: number, message: string, success: boolean) {
    this.referenceNo = referenceNo
    this.errorCode = errorCode
    this.message = message
    this.success = success
  }
}
