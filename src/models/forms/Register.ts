import { IMFSForm } from './MFSForm'

interface IREgisterForm extends IMFSForm {
  rtaPan: string
  expiryDate: string
  cvc: string
}
