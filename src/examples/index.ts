import { initializeMasterPass } from './initializeMasterPass'
import { checkMasterPass } from './checkMasterPass'
import { showErrorMessage } from './errorMessage'
import './linkCardToClient'
import './registerCard'
import './listCards'
import './deleteCard'
import { Context } from '../contex/index'

initializeMasterPass().then(() => { checkMasterPass() }).catch((error) => showErrorMessage(error.message))

document.querySelector('.log-button').addEventListener('click', () => {
  console.log(Context.Account)
  console.log(Context.Cards)
  console.log(Context.MasterPass)
})
