import { Initial } from "./Initial";
import { IPurchase } from "./Purchase";
import { IRegisterCardInstances } from "./RegisterCard";

export interface IPurchaseAndRegister {
  accountAliasName: string;
  rtaPan: string;
  expiryDate: string;
  cvc: string;
  cardHolderName: string;
  amount: string;
  orderNo: string;
  installmentCount: number;
  rewardName?: string;
  rewardValue?: string;
  token: string;
}

export interface IPurchaseAndRegisterReq
  extends IPurchase,
    IRegisterCardInstances,
    Initial {
  paymentType: string;
  macroMerchantId: string;
  moneyCardInvoiceAmount: string | null;
  moneyCardMigrosDiscountAmount: string | null;
  moneyCardPaymentAmount: string | null;
  moneyCardExtraDiscountAmount: string | null;
  moneyCardProductBasedDiscountAmount: string | null;
  merchantId: string | null;
  gender: string | null;
  lastName: string | null;
  firstName: string | null;
  actionType: string;
  fP: string | null;
  sendSmsLanguage: string;
  sendSms: string;
  msisdn: string;
  fp: string | null;
}
