import { IMasterPassResonse, IBody } from '../models/MasterPassResponse'

export class ResponseHandler {
  constructor (status:number, response:IMasterPassResonse) {
    this.call(status, response)
  }

  private call (status:number, response:IMasterPassResonse): IBody {
    if (response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '0000' ||
    response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '') {
      return response.Data.Body
    } else {
      return response.Data.Body
    }
  }

  // public OTP () {
  //   if (this.response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '0000' ||
  //   this.response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '') {
  //     return this.response.Data.Body.Response
  //   } else {
  //     if (this.response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '5001') { // OTP sor
  //       return this.response.Data.Body.Fault
  //     } else if (this.response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '5008') { // Masterpass OTP sor
  //       return this.response.Data.Body.Fault
  //     } else if (this.response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '5010') { // 3D Secure sor
  //       window.location.assign(this.response.Data.Body.Response.Result.TransactionBody.url3D + '&returnUrl=' + 'Your ReturnURL')
  //       return this.response.Data.Body.Fault
  //     } else if (this.response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '5015') {
  //       return this.response.Data.Body.Fault
  //     // MPIN tanimlanmasini iste
  //     // $('#mpin-form').show()
  //     // $('#mpin-define-label').show()
  //     }
  //   }
  // }

  // public linkCardToClient () {
  //   if (this.response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '0000' ||
  //   this.response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '') {
  //     return this.response.Data.Body.Response
  //   } else {
  //     if (this.response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '5001') { // OTP sor
  //       return this.response.Data.Body.Fault
  //     } else if (this.response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '5008') { // Masterpass OTP sor
  //       return this.response.Data.Body.Fault
  //     } else if (this.response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '5010') { // 3D Secure sor
  //       window.location.assign(this.response.Data.Body.Response.Result.TransactionBody.url3D + '&returnUrl=' + 'Your ReturnURL')
  //       return this.response.Data.Body.Fault
  //     } else if (this.response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '5015') {
  //       return this.response.Data.Body.Fault
  //     // MPIN tanimlanmasini iste
  //     // $('#mpin-form').show()
  //     // $('#mpin-define-label').show()
  //     }
  //   }
  // }

  // public checkMastercard () {
  //   if (
  //     this.response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '0000' ||
  //       this.response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '') {
  //     return this.response.Data.Body.Response
  //   } else {
  //     return this.response.Data.Body.Fault
  //   }
  // }

  // public onListCardHandler = (status?: number, response?: IMasterPassResonse) => {
  //   if (response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '0000' ||
  //     response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '') {
  //     return response.Data.Body.Response
  //   } else {
  //     return response.Data.Body.Fault
  //   }
  // }
}
