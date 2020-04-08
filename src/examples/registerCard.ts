import CardControler from '../controllers/CardControler'
import { IRegisterCard } from '../requests/RegisterCard'
import { showOTPForm } from './otpForm'
import { listCards } from './listCards'
import { MasterPass } from '../models/MasterPass'

const registerButton = document.querySelector('.register-submit')
const registerFormContainer = document.querySelector('.register-form-container')
const fillCardInfoButton = document.querySelector('.fill')
const showInputsButton = document.querySelector('.add-card')

function registerCard (cardInstance:IRegisterCard) {
  CardControler.registerCard(cardInstance).then((response:MasterPass.IResponse) => {
    registerFormContainer.classList.add('hidden')
    listCards()
  })
    .catch((fault:MasterPass.IFault) => {
      if (fault.Detail.ServiceFaultDetail.ResponseCode === '5001' ||
        fault.Detail.ServiceFaultDetail.ResponseCode === '5008') {
        showOTPForm(listCards)
      } else if (fault.Detail.ServiceFaultDetail.ResponseCode === '5010') {
      // TODO : Show 3D Form
      } else {
      // TODO : Show MPIN Form
        showOTPForm(listCards)
      }
    })
}

function fillCardInfos () {
  (<HTMLInputElement>document.querySelector('#card-number')).value = '5170414821448657';
  (<HTMLInputElement>document.querySelector('#expire-date')).value = '2809';
  (<HTMLInputElement>document.querySelector('#card-cvc')).value = '744';
  (<HTMLInputElement>document.querySelector('#holder-name')).value = 'Neset Ozgur Ozturk';
  (<HTMLInputElement>document.querySelector('#card-name')).value = 'Garanti Test'
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
