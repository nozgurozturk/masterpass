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
import { IPurchaseAndRegister, IPurchaseAndRegisterReq } from '../requests/PurchaseAndRegister'

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
      paymentType: '',
      orderNo: purchaseRequset.orderNo,
      macroMerchantId: '',
      cvc: purchaseRequset.cvc !== '' ? RSA.encrypt(purchaseRequset.cvc) : '',
      installmentCount: purchaseRequset.installmentCount,
      moneyCardInvoiceAmount: null,
      moneyCardMigrosDiscountAmount: null,
      moneyCardPaymentAmount: null,
      moneyCardExtraDiscountAmount: null,
      moneyCardProductBasedDiscountAmount: null,
      rewardValue: '',
      rewardName: '',
      token: purchaseRequset.token,
      userId: Context.MasterPass.msisdn,
      sendSmsMerchant: 'Y',
      sendSmsLanguage: 'tur',
      sendSms: 'Y',
      referenceNo: '0000000',
      password: '',
      msisdn: Context.MasterPass.msisdn,
      listAccountName: purchaseRequset.listAccountName,
      encPassword: '',
      encCPin: '0',
      clientIp: Context.MasterPass.clientIp,
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

  public static purchaseAndRegister = async (purchaseAndRegister: IPurchaseAndRegister):Promise<MasterPass.IResponse | MasterPass.IFault> => {
    const purhcaseAndRegisterReq : Omit<IPurchaseAndRegisterReq, 'listAccountName'> = {
      accountAliasName: purchaseAndRegister.accountAliasName,
      rtaPan: RSA.encrypt(purchaseAndRegister.rtaPan),
      expiryDate: purchaseAndRegister.expiryDate,
      cvc: RSA.encrypt(purchaseAndRegister.cvc),
      cardHolderName: purchaseAndRegister.cardHolderName,
      amount: purchaseAndRegister.amount,
      orderNo: purchaseAndRegister.orderNo,
      installmentCount: purchaseAndRegister.installmentCount,
      rewardName: purchaseAndRegister.rewardName,
      rewardValue: purchaseAndRegister.rewardValue,
      token: purchaseAndRegister.token,
      paymentType: null,
      macroMerchantId: '',
      moneyCardInvoiceAmount: null,
      moneyCardMigrosDiscountAmount: null,
      moneyCardPaymentAmount: null,
      moneyCardExtraDiscountAmount: null,
      moneyCardProductBasedDiscountAmount: null,
      merchantId: null,
      gender: null,
      lastName: null,
      firstName: null,
      actionType: 'A',
      fP: null,
      sendSmsLanguage: 'tur',
      sendSms: 'Y',
      msisdn: Context.MasterPass.msisdn,
      fp: '',
      clientId: Context.MasterPass.clientId,
      clientType: '1',
      dateTime: new Date().toISOString(),
      referenceNo: '101252836185',
      version: '35'
    }
    try {
      const otpResponse: any = await fetch(`${Context.MasterPass.address}/purchaseAndRegister`, {
        method: 'POST',
        body: JSON.stringify(purhcaseAndRegisterReq)
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
