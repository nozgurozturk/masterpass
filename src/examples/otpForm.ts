import OTPController from '../controllers/OTPController'
import { showErrorMessage } from './errorMessage'
import { MasterPass } from '../models/MasterPass'
import { listCards } from './listCards'
import { Context } from '../contex'

const otpForm = document.querySelector('.otp-form-container')
const otpSubmitButton = document.querySelector('.otp-submit')
const formlabel = document.querySelector('.otp-form-container label')

export function showOTPForm (type?: string) {
  if (type === 'mpin') formlabel.innerHTML = 'MPIN'
  else formlabel.innerHTML = 'OTP'
  otpForm.classList.remove('hidden')
  otpSubmitButton.addEventListener('click', () => {
    const validationCode = (<HTMLInputElement>document.querySelector('#otp-validation')).value
    OTPSubmit(validationCode, type)
  })
}

export function OTPSubmit (validationCode: string, type?:string) {
  console.log('validationcode', validationCode)
  OTPController.submit(validationCode)
    .then((response:MasterPass.IResponse) => {
      otpForm.classList.add('hidden')
      console.log('success')
    })
    .catch((fault:MasterPass.IFault) => {
      if (fault.Detail.ServiceFaultDetail.ResponseCode === '5001' || fault.Detail.ServiceFaultDetail.ResponseCode === '5008') {
        console.log('otp')
        showOTPForm()
      } else if (fault.Detail.ServiceFaultDetail.ResponseCode === '5010') {
        // TODO: SHOW 3D
      } else if (fault.Detail.ServiceFaultDetail.ResponseCode === '5015') {
        console.log('mpin')
        showOTPForm('mpin')
      } else {
        showErrorMessage(fault.Detail.ServiceFaultDetail.ResponseDesc)
      }
    })
    .finally(() => {
      (<HTMLInputElement>document.querySelector('#otp-validation')).value = ''
      otpForm.classList.add('hidden')
    })
}
