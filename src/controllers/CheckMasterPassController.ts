import { ICheckMasterPass } from '../models/CheckMasterPass'
import { IMasterPassResonse, IBody } from '../models/MasterPassResponse'
import { AccountController } from './AccountController'
import { AccountService } from '../services/AccountService'
import { Context } from '../contex/index'

export class CheckMasterPassController {
  private checkMasterPassInstance: ICheckMasterPass
  constructor (checkMasterPassInstance: ICheckMasterPass) {
    this.checkMasterPassInstance = checkMasterPassInstance
  }

  private onResponseHandler = (status?: number, response?: IMasterPassResonse) => {
    if (
      response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '0000' ||
        response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '') {
      return response.Data.Body
    } else {
      return response.Data.Body
    }
  }

  public onCheckMasterPass = async () => {
    try {
      const masterpassResponse: any = await fetch(Context.baseUrl + '/checkMasterPassEndUser', {
        method: 'POST',
        body: JSON.stringify(this.checkMasterPassInstance)
      })
      const response: IMasterPassResonse = await masterpassResponse.json()
      const body: IBody = this.onResponseHandler(200, response)
      return new Promise((resolve, reject) => {
        if (body.Response.Result.TransactionBody.AccountStatus) {
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
