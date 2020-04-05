import { Request } from '../helpers/RequestHandler'
import { setAccountStatus } from './AccountController'
import { ICheckForm } from '../models/forms/CheckForm'
import { generateForm } from '../helpers/FormGenerator'
import { MasterPass } from './MasterPass'

const CheckMasterPassForm: ICheckForm = {
  referenceNo: '', userId: '', sendSmsLanguage: '', token: '', sendSms: 'N'
}

const setFormInstance = (): void => {
  CheckMasterPassForm.referenceNo = '0000000'
  CheckMasterPassForm.userId = MasterPass.msisdn
  CheckMasterPassForm.sendSmsLanguage = 'tur'
}

const createdForm = (): JQuery<HTMLElement> => {
  setFormInstance()
  return generateForm<ICheckForm>(CheckMasterPassForm)
}
const responseHandler = (status: number, response: any) => {
  if (response.responseCode === '0000' || response.responseCode === '') {
    const { accountStatus, referenceNo, responseCode, responseDescription } = response
    setAccountStatus(accountStatus)
    return new Request(referenceNo, responseCode, responseDescription, true)
  } else {
    const { referenceNo, responseCode, responseDescription } = response
    return new Request(referenceNo, responseCode, responseDescription, false)
  }
}

export const CheckMasterPass = () => {
  window.MFS.checkMasterPass(createdForm(), responseHandler)

}
