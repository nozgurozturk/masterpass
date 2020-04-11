import CardControler from '../controllers/CardControler'
import { Card } from '../models/Card'
import { showErrorMessage } from './errorMessage'
import { MasterPass } from '../models/MasterPass'

const cardListContainer = document.querySelector('.card-list-container')

function renderCards (cardList:Card[]) {
  cardListContainer.innerHTML = ''
  cardList.forEach((card:Card) => {
    const element = document.createElement('li')
    element.className = 'masterpass-card'
    element.setAttribute('data-alias', card.Name)
    element.innerText = `${card.Name} - ${card.Value1} - ${card.ProductName}`
    cardListContainer.appendChild(element)
  })
}

export function listCards () {
  CardControler.list()
    .then((response:MasterPass.IResponse) => {
      renderCards(response.Result.TransactionBody.ListItems.ListItem)
    })
    .catch((fault:MasterPass.IFault) => {
      showErrorMessage(fault.Detail.ServiceFaultDetail.ResponseDesc)
    })
}
