// Context
import { Context } from '../contex/index'
// Requests
import { IOTP, IResend } from '../requests/OTP'
// Models
import { MasterPass } from '../models/MasterPass'
// Controllers
import MasterPassController from './MasterPassController'
// Helpres
import { RSA } from '../helpers/RSA'
import { AccountStatus } from '../models/Account'

/**
 * @class OTPController
 * @property {Function} submit
 */

class OTPController {
  /**
   * Submit SMS validation code to Bank or MasterPass
   * @method submit
   * @public
   * @param {string} validationCode
   * @returns {Promise}
   */
  public static submit = async (validationCode: string, type?:string):Promise<MasterPass.IResponse | MasterPass.IFault> => {
    if (type === 'mpin') validationCode = RSA.encrypt(validationCode)

    const OTPInstance: IOTP = {
      validationRefNo: Context.MasterPass.responseToken,
      token: Context.MasterPass.token,
      referenceNo: '0000000',
      sendSmsLanguage: 'tur',
      sendSms: 'Y',
      validationCode: validationCode,
      fp: '',
      clientId: Context.MasterPass.clientId,
      clientType: '1',
      dateTime: new Date().toISOString(),
      version: '35'
    }
    try {
      const otpResponse: any = await fetch(`${Context.MasterPass.address}/validateTransaction`, {
        method: 'POST',
        body: JSON.stringify(OTPInstance)
      })
      const response: MasterPass.Response = await otpResponse.json()
      return new Promise<MasterPass.IResponse | MasterPass.IFault>((resolve, reject) => {
        if (response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '0000' ||
        response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '') {
          if (response.Data.Body.Response.Result.TransactionBody.Token) MasterPassController.onResponseTokenChanged(response.Data.Body.Response.Result.TransactionBody.Token)
          if (Context.Account.status === AccountStatus.AccountWithCard) Context.Account.status = AccountStatus.LinkedWithCard
          resolve(response.Data.Body.Response)
        } else {
          MasterPassController.onResponseTokenChanged(response.Data.Body.Fault.Detail.ServiceFaultDetail.Token)
          reject(response.Data.Body.Fault)
        }
      })
    } catch (error) {
      return error.message
    }
  }

  /**
   * Resend SMS validation code to Bank or MasterPass
   * @method submit
   * @public
   * @param {string} validationCode
   * @returns {Promise}
   */
  public static resend = async ():Promise<MasterPass.IResponse | MasterPass.IFault> => {
    const OTPInstance: IResend = {
      validationRefNo: Context.MasterPass.responseToken,
      referenceNo: '0000000',
      sendSmsLanguage: 'tur',
      sendSms: 'Y',
      clientId: Context.MasterPass.clientId,
      clientType: '1',
      dateTime: new Date().toISOString(),
      version: '35'
    }

    try {
      const otpResponse: any = await fetch(`${Context.MasterPass.address}/resendOtp`, {
        method: 'POST',
        body: JSON.stringify(OTPInstance)
      })
      const response: MasterPass.Response = await otpResponse.json()
      return new Promise<MasterPass.IResponse | MasterPass.IFault>((resolve, reject) => {
        if (response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '5001' ||
        response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '5008') {
          if (response.Data.Body.Response.Result.TransactionBody.Token) MasterPassController.onResponseTokenChanged(response.Data.Body.Response.Result.TransactionBody.Token)
          if (Context.Account.status === AccountStatus.AccountWithCard) Context.Account.status = AccountStatus.LinkedWithCard
          resolve(response.Data.Body.Response)
        } else {
          reject(response.Data.Body.Fault)
        }
      })
    } catch (error) {
      return error.message
    }
  }
}

export default OTPController
