import { CardService } from '../services/CardService'
import { Card, ICard } from '../models/Card'
import { IListCard } from '../requests/ListCard'
import { Context, setCards } from '../contex/index'
import { MasterPass } from '../models/MasterPass'
import { IRegisterCard, IRegisterCardDefault } from '../requests/RegisterCard'
import MasterPassController from './MasterPassController'
import { IDeleteCard } from '../requests/DeleteCard'
import { RSA } from '../helpers/RSA'

/**
 * @class CardController
 * @property {Function} onCardListChanged
 * @property {Function} handleAddCard
 * @property {Function} handleEditCard
 * @property {Function} listCard
 * @property {Function} registerCard
 * @property {Function} deleteCard
 */

class CardController {
  private CardService : CardService

  /**
   * @param {CardService} CardService
   */

  constructor (CardService: CardService) {
    this.CardService = CardService
    this.CardService.bindCardListChanged(this.onCardListChanged)
  }

  /**
   * Invokes when Card list is changed
   * @method onCardListChanged
   * @private
   * @param {Array<Card>} cards
   * @returns {void}
   */

  private onCardListChanged = (cards: Card[]):void => {
    setCards(cards)
  };

  /**
   * Invokes when Card is added
   * @method handleAddCard
   * @private
   * @param {ICard} card
   * @returns {void}
   */

  private handleAddCard = (card: ICard):void => {
    this.CardService.add(card)
  };

  /**
   * Invokes when Card is edited
   * @method handleEditCard
   * @private
   * @param {ICard} card
   * @param {string} name
   * @returns {void}
   */

  private handleEditCard = (name: string, card: ICard):void => {
    this.CardService.edit(name, card)
  };

  /**
   * Invokes when Card is deleted
   * @method handleDeleteCard
   * @private
   * @param {string} name
   * @returns {void}
   */

  private handleDeleteCard = (name: string):void => {
    this.CardService.delete(name)
  };

  /**
   * Gets Listed Cards from Masterpass
   * @method listCard
   * @public
   * @returns {Promise}
   */

  public listCard = async ():Promise<MasterPass.IResponse | MasterPass.IFault> => {
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
          this.onCardListChanged(response.Data.Body.Response.Result.TransactionBody.ListItems.ListItem)
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

  public registerCard = async (registerCardInstance:IRegisterCard):Promise<MasterPass.IResponse | MasterPass.IFault> => {
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
      referenceNo: '00000000',
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
        console.log(response)
        if (response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '0000' ||
        response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '') {
          response.Data.Body.Response.Result.TransactionBody.ListItems.ListItem.forEach(item => {
            this.handleAddCard(item)
          })
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

  public deleteCard = async (accountAliasName: string): Promise<MasterPass.IResponse | MasterPass.IFault> => {
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
          this.handleDeleteCard(accountAliasName)
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

export default new CardController(new CardService())
