import { IOTP } from '../models/OTP'
import { IMasterPassResonse, IBody } from '../models/MasterPassResponse'
import { Context } from '../contex/index'
import { IListCard } from '../models/ListCard'

export class ListCardController {
  private ListCardInstance: IListCard
  constructor (ListCardInstance: IListCard) {
    this.ListCardInstance = ListCardInstance
  }

  private onListCardHandler = (status?: number, response?: IMasterPassResonse) => {
    if (response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '0000' ||
      response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '') {
      return response.Data.Body
    } else {
      return response.Data.Body
      // if (response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '5001') { // OTP sor
      //   return response.Data.Body
      // } else if (response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '5008') { // Masterpass OTP sor
      //   return response.Data.Body
      // } else if (response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '5010') { // 3D Secure sor
      //   window.location.assign(response.Data.Body.Response.Result.TransactionBody.url3D + '&returnUrl=' + 'Your ReturnURL')
      //   return response.Data.Body
      // } else if (response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '5015') {
      //   return response.Data.Body
      //   // MPIN tanimlanmasini iste
      //   // $('#mpin-form').show()
      //   // $('#mpin-define-label').show()
      // }
    }
  }

  public onListCard = async () => {
    // TODO : Link Cardtan sonra yapilacak
    try {
      const listCardResponse: any = await fetch(Context.baseUrl + '/listManagement', {
        method: 'POST',
        body: JSON.stringify(this.ListCardInstance)
      })
      const response: IMasterPassResonse = await listCardResponse.json()
      const body:IBody = this.onListCardHandler(200, response)
      return new Promise((resolve, reject) => {
        if (!body.Fault.Detail.ServiceFaultDetail.ResponseCode) {
          resolve(body.Response)
        } else {
          reject(body.Fault)
        }
      })
    } catch (error) {
      return new Error(error.message)
    }
  }
}
