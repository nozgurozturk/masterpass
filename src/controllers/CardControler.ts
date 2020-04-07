import { CardService } from '../services/CardService'
import { Card, ICard } from '../models/Card'
import { IListCard } from '../instances/ListCard'
import { Context, setCards } from '../contex/index'
import { IMasterPassResonse } from '../models/MasterPassResponse'
import { IRegisterCard, IRegisterCardDefault } from '../instances/RegisterCard'
import MasterPassController from './MasterPassController'
import { IDeleteCard } from '../instances/DeleteCard'

class CardController {
  private CardService : CardService
  constructor (CardService: CardService) {
    this.CardService = CardService
    this.CardService.bindCardListChanged(this.onCardListChanged)
  }

  onCardListChanged = (cards: Card[]) => {
    setCards(cards)
  };

  handleAddCard = (card: ICard) => {
    this.CardService.add(card)
  };

  handleEditCard = (id: string, card: ICard) => {
    this.CardService.edit(id, card)
  };

  handleDeleteCard = (id: string) => {
    this.CardService.delete(id)
  };

  public ListCard = async () => {
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
      const response: IMasterPassResonse = await listCardResponse.json()
      return new Promise((resolve, reject) => {
        console.log(response)
        if (response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '0000' ||
        response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '') {
          this.onCardListChanged(response.Data.Body.Response.Result.TransactionBody.ListItems.ListItem)
          resolve(response.Data.Body.Response)
        } else {
          reject(response.Data.Body.Fault)
        }
      })
    } catch (error) {
      return new Error(error.message)
    }
  }

  public registerCard = async (registerCardInstance:IRegisterCard) => {
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
    const addCardInstance = { ...initialInstances, ...registerCardInstance }
    console.log(JSON.stringify(addCardInstance))
    try {
      const addCardResponse : any = await fetch('https://ui.masterpassturkiye.com/v2/register', {
        method: 'POST',
        body: JSON.stringify(addCardInstance)
      })
      const response : IMasterPassResonse = await addCardResponse.json()
      return new Promise((resolve, reject) => {
        console.log(response)
        if (response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '0000' ||
        response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '') {
          // this.handleAddCard(response.Data.Body.Response.Result.TransactionBody.ListItems.ListItem)
          resolve(response.Data.Body.Response)
        } else {
          MasterPassController.onResponseTokenChanged(response.Data.Body.Fault.Detail.ServiceFaultDetail.Token)
          reject(response.Data.Body.Fault)
        }
      })
    } catch (error) {
      return new Error(error.message)
    }
  }

  public deleteCard = async (accountAliasName: string) => {
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
      const deleteCardResponse : any = await fetch('https://ui.masterpassturkiye.com/v2/deleteCard', {
        method: 'POST',
        body: JSON.stringify({ ...deleteCardInstance, accountAliasName })
      })
      const response : IMasterPassResonse = await deleteCardResponse.json()
      return new Promise((resolve, reject) => {
        console.log(response)
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

export default new CardController(new CardService())
