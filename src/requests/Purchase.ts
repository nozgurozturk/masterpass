import { Initial } from "./Initial";

export interface IPurchase {
  amount: string;
  rewardName?: string;
  rewardValue?: string;
  listAccountName: string;
  installmentCount: number;
  cvc: string;
  orderNo: string;
  token: string;
}

export interface IPurchaseReq extends IPurchase, Initial {
  paymentType: string;
  macroMerchantId: string;
  moneyCardInvoiceAmount: string | null;
  moneyCardMigrosDiscountAmount: string | null;
  moneyCardPaymentAmount: string | null;
  moneyCardExtraDiscountAmount: string | null;
  moneyCardProductBasedDiscountAmount: string | null;
  userId: string;
  sendSmsMerchant: string;
  sendSmsLanguage: string;
  sendSms: string;
  password: string;
  msisdn: string;
  encCPin: string;
  encPassword: string;
  clientIp: string;
  aav: string;
  fp: string | null;
}
