import AccountController from '../controllers/AccountController'
import { listCards } from './listCards'
import { showErrorMessage } from './errorMessage'
import { showOTPForm } from './otpForm'
import { MasterPass } from '../models/MasterPass'

const linkButton = document.querySelector('.link-button')

function linkCardToClient () {
  AccountController.linkAccount()
    .then((response:MasterPass.IResponse) => {
      listCards()
    }).catch((fault:MasterPass.IFault) => {
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

linkButton.addEventListener('click', () => {
  linkCardToClient()
})
