import { ILinkCard } from '../models/LinkCard'
import { IMasterPassResonse, IBody } from '../models/MasterPassResponse'
import { Context } from '../contex/index'

export class LinkCardController {
  private LinkCardInstance: ILinkCard
  constructor (LinkCardInstance: ILinkCard) {
    this.LinkCardInstance = LinkCardInstance
  }

  private onLinkCardResponseHandler = (status?: number, response?: IMasterPassResonse) => {
    console.log(response)
    if (response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '0000' ||
        response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '') {
      // alert('Kart kayit basarili')
      return response.Data.Body
    } else {
      if (response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '5001') {
        // OTP sor
        return response.Data.Body
      } else if (response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '5008') { // Masterpass OTP sor
        return response.Data.Body
      } else if (response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '5010') { // 3D Secure sor
        window.location.assign(response.Data.Body.Response.Result.TransactionBody.url3D + '&returnUrl=' + 'Your ReturnURL')
        return response.Data.Body
      } else if (response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '5015') {
        return response.Data.Body
        // MPIN tanimlanmasini iste
        // $('#mpin-form').show()
        // $('#mpin-define-label').show()
      } else {
        return response.Data.Body
      }
    }
  }

  public onLinkCard = async () => {
    // TODO : Link Cardtan sonra yapilacak
    try {
      const linkCardResponse: any = await fetch(Context.baseUrl + '/linkCardToClient', {
        method: 'POST',
        body: JSON.stringify(this.LinkCardInstance)
      })
      const response: IMasterPassResonse = await linkCardResponse.json()
      const body :IBody = this.onLinkCardResponseHandler(200, response)
      return new Promise((resolve, reject) => {
        if (!body.Fault.Detail.ServiceFaultDetail.ResponseCode) {
          resolve(body.Response)
        } else {
          reject(body)
        }
      })
    } catch (error) {
      return new Error(error.message)
    }
  }
}
