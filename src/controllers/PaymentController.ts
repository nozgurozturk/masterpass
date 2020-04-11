// Context
import { Context } from '../contex/index'
// Requests
import { IPurchase, IPurchaseReq } from '../requests/Purchase'
// Models
import { MasterPass } from '../models/MasterPass'
// Controller
import MasterPassController from './MasterPassController'
// Helpers
import { RSA } from '../helpers/RSA'

/**
 * @class Paymentcontroller
 * @property {Function} purchase
 */

class PaymentController {
  /**
   * Complete Purchase via Masterpass
   * @method submit
   * @param {IPurchase} purchaseRequset
   * @returns {Promise}
   */
  public static purchase = async (purchaseRequset: IPurchase):Promise<MasterPass.IResponse | MasterPass.IFault> => {
    const purchaseInstances: IPurchaseReq = {
      paymentType: null,
      orderNo: purchaseRequset.orderNo,
      macroMerchantId: null,
      cvc: RSA.encrypt(purchaseRequset.cvc) || null,
      installmentCount: purchaseRequset.installmentCount,
      moneyCardInvoiceAmount: null,
      moneyCardMigrosDiscountAmount: null,
      moneyCardPaymentAmount: null,
      moneyCardExtraDiscountAmount: null,
      moneyCardProductBasedDiscountAmount: null,
      rewardValue: null,
      rewardName: null,
      token: Context.MasterPass.token,
      userId: '',
      sendSmsMerchant: 'Y',
      sendSmsLanguage: 'tur',
      sendSms: 'N',
      referenceNo: '0000000',
      password: '',
      msisdn: Context.MasterPass.msisdn,
      listAccountName: purchaseRequset.listAccountName,
      encCPin: '0',
      encPassword: '',
      clientIp: '',
      amount: purchaseRequset.amount,
      aav: 'aav',
      fp: '',
      clientId: Context.MasterPass.clientId,
      dateTime: new Date().toISOString(),
      version: '35',
      clientType: '1'
    }

    try {
      const otpResponse: any = await fetch(`${Context.MasterPass.address}/remotePurchaseOther`, {
        method: 'POST',
        body: JSON.stringify(purchaseInstances)
      })
      const response: MasterPass.Response = await otpResponse.json()
      return new Promise<MasterPass.IResponse | MasterPass.IFault>((resolve, reject) => {
        if (response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '0000' ||
        response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '') {
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
}

export default PaymentController
