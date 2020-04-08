import { IOTP } from '../requests/OTP'
import { MasterPass } from '../models/MasterPass'
import { Context } from '../contex/index'

class OTPController {
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
      const response: MasterPass.Response = await otpResponse.json()
      return new Promise<MasterPass.IResponse | MasterPass.IFault>((resolve, reject) => {
        if (response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '0000' ||
        response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '') {
          resolve(response.Data.Body.Response)
        } else {
          reject(response.Data.Body.Fault)
        }
      })
    } catch (error) {
      return new Error(error.message)
    }
  }
}

export default OTPController
