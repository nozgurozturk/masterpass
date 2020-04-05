import { IMasterPass } from '../models/MasterPass'

const MasterPass: IMasterPass = {
  clientId: '', address: '', token: '', msisdn: '', forceMasterPass3d: false, isOtpMsisdn: false
}

const setClientId = (clientId: string) => {
  console.log(MasterPass)
  MasterPass.clientId = clientId
}

const setAddress = (address: string) => {
  MasterPass.address = address
}

const setToken = (token: string) => {
  MasterPass.token = token
}

const setMsisdn = (msisdn: string) => {
  MasterPass.msisdn = msisdn
}

const setForceMasterPass3d = (forceMasterPass3d: boolean) => {
  MasterPass.forceMasterPass3d = forceMasterPass3d
}

const setIsOtpMsisdn = (isOtpMsisdn: boolean) => {
  MasterPass.isOtpMsisdn = isOtpMsisdn
}

export const initilizeMasterPass = (response: IMasterPass) => {
  const { clientId, address, token, msisdn, forceMasterPass3d, isOtpMsisdn } = response
  setClientId(clientId)
  setAddress(address)
  setToken(token)
  setMsisdn(msisdn)
  setForceMasterPass3d(forceMasterPass3d)
  setIsOtpMsisdn(isOtpMsisdn)
}

export { MasterPass }
