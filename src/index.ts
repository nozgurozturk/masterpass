import MasterPassController from './controllers/MasterPassController'
import { Context } from './contex/index'
import AccountController from './controllers/AccountController'
import { ICheckMasterPass } from './instances/CheckMasterPass'
import { IMasterPass } from './models/MasterPass'
import { IListCard } from './instances/ListCard'
import CardControler from './controllers/CardControler'
import { IBody, IResponse, IFault } from './models/MasterPassResponse'
import { OTPController } from './controllers/OTPController'
import { ICard } from './models/Card'
import { IRegisterCard } from './instances/RegisterCard'
import { RSA } from './helpers/RSA'

// HTML ELEMENTS

const otpForm = document.querySelector('.otp-form-container')
const linkButton = document.querySelector('.link-button')
const cardListContainer = document.querySelector('.card-list-container')
const registerButton = document.querySelector('.register-submit')
const registerFormContainer = document.querySelector('.register-form-container')

const fillCardInfo = document.querySelector('.fill')

function initilizeMasterPass () {
  const mp:IMasterPass = {
    clientId: '34704570',
    forceMasterPass3d: true,
    isOtpMsisdn: true,
    address: 'https://ui.masterpassturkiye.com/v2',
    msisdn: '905385657551',
    token: '1B51EF5558DCCAB1A116EDF5BDCB35BD19CE23A21CBACB71C1539DF469D52211F96F9A44A41AEAB3750796E1C3F88A5D7AD3E78CE02918F678228E5C8552CF29C161D38AF5B14D8420697B1DA544E61A923B47040830D3A139104B99C10CA6CEB7645DFCD57E09F63D9C558B3D32A80197A4F6F0D6C148585F7160661BE0ADB7C064090E41244E51CDFDFEF01B011CA809289C34'
  }
  MasterPassController.handleAddMasterPass(mp)
}

function listCards () {
  CardControler.ListCard().then((response:IResponse) => {
    renderCards(response.Result.TransactionBody.ListItems.ListItem)
    cardListContainer.classList.remove('hidden')
  }).catch((error:IFault) => console.log(error))
}

function renderCards (cardList:any) {
  cardListContainer.innerHTML = ''
  cardList.forEach((card:ICard) => {
    const element = document.createElement('li')
    element.className = 'masterpass-card'
    element.setAttribute('data-alias', card.Name)
    element.addEventListener('click', () => {
      deleteCard(card.Name)
    })
    element.innerText = `${card.Name} - ${card.Value1} - ${card.ProductName}`
    cardListContainer.appendChild(element)
  })
}

function checkMasterPass () {
  AccountController.CheckMasterPass()
    .then((response:IResponse) => {
      if (Context.Account.accountStatus === 0 || Context.Account.accountStatus === 1) {
        return
      }
      if (Context.Account.accountStatus === 5) {
        listCards()
        return
      }
      linkButton.classList.remove('hiden')
    })
    .catch((error:IFault) => console.log(error))
}

function linkCardToClient () {
  AccountController.LinkCard()
    .then((response:IResponse) => linkButton.classList.add('hidden'))
    .catch((fault:IFault) => {
      console.log(fault)
      if (fault.Detail.ServiceFaultDetail.ResponseCode === '5001') {
        // TODO : Show OTP Form
        console.log('show otp', fault.Detail.ServiceFaultDetail.ResponseCode)
        otpForm.classList.remove('hidden')
      } else if (fault.Detail.ServiceFaultDetail.ResponseCode === '5008') {
        // TODO : Show OTP Form
        otpForm.classList.remove('hidden')
        console.log('show otp', fault.Detail.ServiceFaultDetail.ResponseCode)
      } else if (fault.Detail.ServiceFaultDetail.ResponseCode === '5010') {
        // TODO : Show 3D Form
        otpForm.classList.remove('hidden')
        // console.log('show 3d', fault.Response.Result.TransactionBody.url3D)
      } else {
        // TODO : Show MPIN Form
        console.log('show mpin')
      }
    })
}

function OTPSubmit (validationCode:string) {
  OTPController.submit(validationCode)
    .then(value => {
      (<HTMLInputElement>document.querySelector('#otp-validation')).value = ''
      otpForm.classList.add('hidden')
      listCards()
    })
    .catch(error => console.log(error))
}

function registerCard (cardInstance:IRegisterCard) {
  CardControler.registerCard(cardInstance).then((response:IResponse) => {
    registerFormContainer.classList.add('hidden')
  })
    .catch((fault:IFault) => {
      if (fault.Detail.ServiceFaultDetail.ResponseCode === '5001') {
      // TODO : Show OTP Form
        console.log('show otp', fault.Detail.ServiceFaultDetail.ResponseCode)
        otpForm.classList.remove('hidden')
      } else if (fault.Detail.ServiceFaultDetail.ResponseCode === '5008') {
      // TODO : Show OTP Form
        otpForm.classList.remove('hidden')
        console.log('show otp', fault.Detail.ServiceFaultDetail.ResponseCode)
      } else if (fault.Detail.ServiceFaultDetail.ResponseCode === '5010') {
      // TODO : Show 3D Form
        otpForm.classList.remove('hidden')
      // console.log('show 3d', fault.Response.Result.TransactionBody.url3D)
      } else {
      // TODO : Show MPIN Form
        console.log('show mpin')
      }
    })
}

function deleteCard (cardName: string) {
  CardControler.deleteCard(cardName).then(() => {
    listCards()
  }).catch((fault:IFault) => {
    console.log(fault.Detail.ServiceFaultDetail.ResponseDesc)
  })
}

function main () {
  initilizeMasterPass()
  checkMasterPass()
}

main()

document.querySelector('.otp-submit').addEventListener('click', () => {
  const validationCode = (<HTMLInputElement>document.querySelector('#otp-validation')).value
  OTPSubmit(validationCode)
})

linkButton.addEventListener('click', () => {
  linkCardToClient()
})

document.querySelector('.add-card').addEventListener('click', () => {
  registerFormContainer.classList.remove('hidden')
})
fillCardInfo.addEventListener('click', () => {
  (<HTMLInputElement>document.querySelector('#card-number')).value = '5170414821448657';
  (<HTMLInputElement>document.querySelector('#expire-date')).value = '2809';
  (<HTMLInputElement>document.querySelector('#card-cvc')).value = '744';
  (<HTMLInputElement>document.querySelector('#holder-name')).value = 'Neset Ozgur Ozturk';
  (<HTMLInputElement>document.querySelector('#card-name')).value = 'Garanti Test'
})
registerButton.addEventListener('click', () => {
  const rtaPan = RSA.encrypt((<HTMLInputElement>document.querySelector('#card-number')).value)
  const expiryDate = (<HTMLInputElement>document.querySelector('#expire-date')).value
  const cvc = RSA.encrypt((<HTMLInputElement>document.querySelector('#card-cvc')).value)
  const cardHolderName = (<HTMLInputElement>document.querySelector('#holder-name')).value
  const accountAliasName = (<HTMLInputElement>document.querySelector('#card-name')).value
  registerCard({ rtaPan, expiryDate, cvc, cardHolderName, accountAliasName })
})

document.querySelector('.log-button').addEventListener('click', () => {
  console.log(Context.Account)
  console.log(Context.MasterPass)
})
