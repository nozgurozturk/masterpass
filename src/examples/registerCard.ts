import CardControler from '../controllers/CardControler'
import { showErrorMessage } from './errorMessage'
import { IRegisterCardInstances } from '../requests/RegisterCard'
import { showOTPForm } from './otpForm'
import { listCards } from './listCards'
import { MasterPass } from '../models/MasterPass'

const registerButton = document.querySelector('.register-submit')
const registerFormContainer = document.querySelector('.register-form-container')
const fillCardInfoButton = document.querySelector('.fill')
const showInputsButton = document.querySelector('.add-card')

function registerCard (cardInstance:IRegisterCardInstances) {
  CardControler.register(cardInstance).then((response:MasterPass.IResponse) => {
    registerFormContainer.classList.add('hidden')
    listCards()
  })
    .catch((fault:MasterPass.IFault) => {
      if (fault.Detail.ServiceFaultDetail.ResponseCode === '5001' ||
      fault.Detail.ServiceFaultDetail.ResponseCode === '5008') {
        showOTPForm()
      } else if (fault.Detail.ServiceFaultDetail.ResponseCode === '5010') {
        // TODO: SHOW 3D
      } else if (fault.Detail.ServiceFaultDetail.ResponseCode === '5015') {
        showOTPForm('mpin')
      } else {
        showErrorMessage(fault.Detail.ServiceFaultDetail.ResponseDesc)
      }
    })
}

function fillCardInfos () {
  (<HTMLInputElement>document.querySelector('#card-number')).value = '4748544748544745';
  (<HTMLInputElement>document.querySelector('#expire-date')).value = '2012';
  (<HTMLInputElement>document.querySelector('#card-cvc')).value = '000';
  (<HTMLInputElement>document.querySelector('#holder-name')).value = 'Obiwan Kenobi';
  (<HTMLInputElement>document.querySelector('#card-name')).value = 'Akbank Test'
}

function onRegisterCard () {
  const rtaPan = (<HTMLInputElement>document.querySelector('#card-number')).value
  const expiryDate = (<HTMLInputElement>document.querySelector('#expire-date')).value
  const cvc = (<HTMLInputElement>document.querySelector('#card-cvc')).value
  const cardHolderName = (<HTMLInputElement>document.querySelector('#holder-name')).value
  const accountAliasName = (<HTMLInputElement>document.querySelector('#card-name')).value
  registerCard({ rtaPan, expiryDate, cvc, cardHolderName, accountAliasName })
}

registerButton.addEventListener('click', () => {
  onRegisterCard()
})

fillCardInfoButton.addEventListener('click', () => {
  fillCardInfos()
})

showInputsButton.addEventListener('click', () => {
  registerFormContainer.classList.remove('hidden')
})
