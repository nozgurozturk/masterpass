
export interface IPurchase {
  amount: string
  rewardName?: string
  rewardValue?: string
  listAccountName: string
  installmentCount: number
  cvc: string
  orderNo: string
}

export interface IPurchaseReq extends IPurchase {
  paymentType: string
  orderNo: string
  macroMerchantId: string
  cvc: string
  installmentCount: number
  moneyCardInvoiceAmount: string | null
  moneyCardMigrosDiscountAmount: string | null
  moneyCardPaymentAmount: string | null
  moneyCardExtraDiscountAmount: string | null
  moneyCardProductBasedDiscountAmount: string | null
  rewardValue: string
  rewardName: string
  token: string
  userId: string
  sendSmsMerchant: string
  sendSmsLanguage: string
  sendSms: string
  referenceNo: string
  password: string
  msisdn: string
  listAccountName: string
  encCPin: string
  encPassword: string
  clientIp: string
  amount: string
  aav: string
  fp: string | null
  clientId: string
  dateTime: string | Date
  version: string
  clientType: string
}
