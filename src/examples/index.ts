import { initializeMasterPass } from './initializeMasterPass'
import { checkMasterPass } from './checkMasterPass'
import { showErrorMessage } from './errorMessage'
import './linkCardToClient'
import './registerCard'
import './listCards'
import './deleteCard'
import './purhcase'
import { Context } from '../contex/index'

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
