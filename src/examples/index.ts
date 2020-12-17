import { initializeMasterPass } from './initializeMasterPass'
import { checkMasterPass } from './checkMasterPass'
import { showErrorMessage } from './errorMessage'
import './linkCardToClient'
import './registerCard'
import './listCards'
import './deleteCard'
import './purhcase'
import './purchaseAndRegister'
import { Context } from '../contex/index'
import { creaditCardValidator } from '../helpers/creditCardValidator'
initializeMasterPass().then(() => { checkMasterPass() }).catch((error) => showErrorMessage(error.message))

document.querySelector('.log-button').addEventListener('click', () => {
  console.log(Context.Account)
  console.log(Context.MasterPass)
})

const errorContainer = document.querySelector('.error-message')
const errorMessage = document.querySelector('.error-message p')
const errorCloseButton = document.querySelector('.error-message button')

errorCloseButton.addEventListener('click', () => {
  errorMessage.innerHTML = ''
  errorContainer.classList.add('hidden')
})

const otpContainer = document.querySelector('.otp-form-container')
const otpCloseButton = document.querySelector('.otp-close')
const otpInput = document.querySelector('#otp-validation')

otpCloseButton.addEventListener('click', () => {
  (<HTMLInputElement>otpInput).value = ''
  otpContainer.classList.add('hidden')
})

const cardList = ['4748544748544745', '4748544748544745', '5571135571135575', '4022774022774026', '5456165456165454', '4282209004348015', '4824894728063019']

cardList.forEach(element => {
  const result = creaditCardValidator(element)
  console.log('result', result)
})
