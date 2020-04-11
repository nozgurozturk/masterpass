// Context
import { Context } from '../contex/index'
// Requests
import { IListCard } from '../requests/ListCard'
import { IRegisterCard, IRegisterCardDefault } from '../requests/RegisterCard'
import { IDeleteCard } from '../requests/DeleteCard'
// Models
import { MasterPass } from '../models/MasterPass'
// Controllers
import MasterPassController from './MasterPassController'
// Helpers
import { RSA } from '../helpers/RSA'

/**
 * @class CardController
 * @property {Function} listCard
 * @property {Function} registerCard
 * @property {Function} deleteCard
 */

class CardController {
  /**
   * Gets Listed Cards from Masterpass
   * @method listCard
   * @public
   * @returns {Promise}
   */

  public static list = async ():Promise<MasterPass.IResponse | MasterPass.IFault> => {
    const listCardInstance : IListCard = {
      token: Context.MasterPass.token,
      msisdn: Context.MasterPass.msisdn,
      referenceNo: '000000',
      listType: 'ACCOUNT',
      sendSms: 'Y',
      clientIp: '',
      sendSmsLanguage: 'tur',
      clientId: Context.MasterPass.clientId,
      dateTime: new Date().toISOString(),
      version: '35',
      clientType: '1'
    }
    try {
      const listCardResponse: any = await fetch(`${Context.MasterPass.address}/listManagement`, {
        method: 'POST',
        body: JSON.stringify(listCardInstance)
      })
      const response: MasterPass.Response = await listCardResponse.json()
      return new Promise<MasterPass.IResponse | MasterPass.IFault>((resolve, reject) => {
        if (response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '0000' ||
        response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '') {
          resolve(response.Data.Body.Response)
        } else {
          reject(response.Data.Body.Fault)
        }
      })
    } catch (error) {
      return error.message
    }
  }

  /**
   * Register Card to Masterpass
   * @method registerCard
   * @public
   * @param {IRegisterCard} registerCardInstance
   * @returns {Promise}
   */

  public static register = async (registerCardInstance:IRegisterCard):Promise<MasterPass.IResponse | MasterPass.IFault> => {
    const initialInstances: IRegisterCardDefault = {
      token: Context.MasterPass.token,
      email: null,
      lastName: null,
      firstName: null,
      homePostalCode: null,
      homeCountryCode: null,
      homeState: null,
      homeCity: null,
      homeAddress: null,
      uiChannelType: '6',
      timeZone: '+01',
      sendSmsLanguage: 'tur',
      sendSms: 'Y',
      referenceNo: '0000000',
      msisdn: Context.MasterPass.msisdn,
      mobileAccountConfig: 'MWA',
      identityVerificationFlag: 'Y',
      mmrpConfig: '110010',
      defaultAccount: 'Y',
      cpinFlag: 'Y',
      cardTypeFlag: '05',
      eActionType: 'A',
      delinkReason: '',
      clientIp: '',
      actionType: 'A',
      fp: '',
      clientId: Context.MasterPass.clientId,
      dateTime: new Date().toISOString(),
      version: '35',
      clientType: '1'
    }
    registerCardInstance = {
      ...registerCardInstance, cvc: RSA.encrypt(registerCardInstance.cvc), rtaPan: RSA.encrypt(registerCardInstance.rtaPan)
    }
    const addCardInstance = { ...initialInstances, ...registerCardInstance }
    try {
      const addCardResponse : any = await fetch(`${Context.MasterPass.address}/register`, {
        method: 'POST',
        body: JSON.stringify(addCardInstance)
      })
      const response : MasterPass.Response = await addCardResponse.json()
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

  /**
   * Delete Card from Masterpass
   * @method deleteCard
   * @public
   * @param {string} accountAliasName
   * @returns {Promise}
   */

  public static delete = async (accountAliasName: string): Promise<MasterPass.IResponse | MasterPass.IFault> => {
    const deleteCardInstance: IDeleteCard = {
      token: Context.MasterPass.token,
      uiChannelType: '6',
      timeZone: '03',
      sendSmsLanguage: 'tur',
      sendSms: 'Y',
      referenceNo: '0000000',
      msisdn: Context.MasterPass.msisdn,
      mobileAccountConfig: 'WMA',
      identityVerificationFlag: 'Y',
      mmrpConfig: '110010',
      defaultAccount: 'Y',
      cpinFlag: 'Y',
      cardTypeFlag: '05',
      eActionType: 'A',
      delinkReason: '',
      clientIp: '',
      actionType: 'A',
      fp: '',
      clientId: Context.MasterPass.clientId,
      dateTime: new Date().toISOString(),
      version: '35',
      clientType: '1'
    }
    try {
      const deleteCardResponse : any = await fetch(`${Context.MasterPass.address}/deleteCard`, {
        method: 'POST',
        body: JSON.stringify({ ...deleteCardInstance, accountAliasName })
      })
      const response : MasterPass.Response = await deleteCardResponse.json()
      return new Promise<MasterPass.IResponse | MasterPass.IFault>((resolve, reject) => {
        if (response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '0000' ||
        response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '') {
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

export default CardController
