import AccountController from '../controllers/AccountController'
import { Context } from '../contex/index'
import { AccountStatus } from '../models/Account'
import { listCards } from './listCards'
import { showErrorMessage } from './errorMessage'
import { MasterPass } from '../models/MasterPass'

// HTML ELEMENTS

const linkButton = document.querySelector('.link-button')

export function checkMasterPass () {
  AccountController.CheckMasterPass()
    .then((response:MasterPass.IResponse) => {
      console.log(Context.Account.accountStatus)
      console.log(AccountStatus.LinkedWithCard)
      if (Context.Account.accountStatus === AccountStatus.NoAccount || Context.Account.accountStatus === AccountStatus.BlockedAccount) {
        throw new Error('Account not found or blocked')
      }
      if (Context.Account.accountStatus === AccountStatus.AccountWithCard) {
        linkButton.classList.remove('hidden')
        return response.Result
      }
      if (Context.Account.accountStatus === AccountStatus.LinkedWithCard) {
        console.log('treu')
        listCards()
      }
    }).catch((fault:MasterPass.IFault) => {
      showErrorMessage(fault.Detail.ServiceFaultDetail.ResponseDesc)
    })
}