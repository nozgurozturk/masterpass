import CardControler from '../controllers/CardControler'
import { listCards } from './listCards'
import { showErrorMessage } from './errorMessage'
import { MasterPass } from '../models/MasterPass'

function deleteCard (cardName:string) {
  CardControler.delete(cardName)
    .then((response:MasterPass.IResponse) => {
      // listCards()
    })
    .catch((fault:MasterPass.IFault) => {
      showErrorMessage(fault.Detail.ServiceFaultDetail.ResponseDesc)
    })
}

// document.body.addEventListener('click', (event) => {
//   if ((<Element>event.target).className === 'masterpass-card') {
//     const name = (<Element>event.target).getAttribute('data-alias')
//     deleteCard(name)
//   }
// })
