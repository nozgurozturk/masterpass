import { IOTP } from '../instances/OTP'
import { IMasterPassResonse } from '../models/MasterPassResponse'
import { Context } from '../contex/index'
import MasterPassController from './MasterPassController'

export class OTPController {
  public static submit = async (validationCode: string) => {
    const OTPInstance: IOTP = {
      validationRefNo: Context.MasterPass.responseToken,
      token: null,
      referenceNo: '000000',
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
      const otpResponse: any = await fetch(Context.MasterPass.address + '/validateTransaction', {
        method: 'POST',
        body: JSON.stringify(OTPInstance)
      })
      const response: IMasterPassResonse = await otpResponse.json()
      return new Promise((resolve, reject) => {
        if (response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '0000' ||
        response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '') {
          resolve(response.Data.Body.Response)
        } else {
          // MasterPassController.onResponseTokenChanged(response.Data.Body.Fault.Detail.ServiceFaultDetail.Token)
          reject(response.Data.Body.Fault)
        }
      })
    } catch (error) {
      return new Error(error.message)
    }
  }
}
