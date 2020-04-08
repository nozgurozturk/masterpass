import OTPController from '../controllers/OTPController'
import { showErrorMessage } from './errorMessage'
import { MasterPass } from '../models/MasterPass'

const otpForm = document.querySelector('.otp-form-container')
const otpSubmitButton = document.querySelector('.otp-submit')

export function showOTPForm (callback:Function) {
  otpForm.classList.remove('hidden')
  otpSubmitButton.addEventListener('click', () => {
    const validationCode = (<HTMLInputElement>document.querySelector('#otp-validation')).value
    OTPSubmit(validationCode, callback)
  })
}

function OTPSubmit (validationCode: string, callback?:Function) {
  OTPController.submit(validationCode)
    .then((response:MasterPass.IResponse) => {
      callback()
      otpForm.classList.add('hidden')
    })
    .catch((fault:MasterPass.IFault) => {
      showErrorMessage(fault.Detail.ServiceFaultDetail.ResponseDesc)
    })
    .finally(() => {
      (<HTMLInputElement>document.querySelector('#otp-validation')).value = ''
    })
}
