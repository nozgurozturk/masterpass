import { Account, IAccount, AccountStatus } from '../models/Account'
import { Context } from '../contex/index'

export class AccountService {
  public account: Account
  public userId: string
  public accountStatus: AccountStatus
  private onAccountChange: Function
  constructor () {
    const account: Account = Context.Account
    this.account = account
  }

  bindAccountChanged (callback: Function) {
    this.onAccountChange = callback
  }

  private commit (account: Account) {
    this.onAccountChange(account)
  }

  public add ({ userId, accountStatus }: IAccount) {
    const newAccount = new Account({ userId, accountStatus })
    this.commit(newAccount)
  }

  private convertStringsToDigits = (accountStatus: string): number[] => {
    return accountStatus.substring(0, 7).split('').map(string => Number(string))
  }

  private identifyAccountStatus = (digits: number[]): number => {
    return digits.reduce((sum: number, digit: number, index: number) => Number(sum) + Number(digit) * Math.pow(2, index))
  }

  public setAccountStatus = (accountStatus: string): AccountStatus => {
    const digits = this.convertStringsToDigits(accountStatus)
    const status = this.identifyAccountStatus(digits)
    switch (status) {
      case digits[0] = 0:
        return AccountStatus.NoAccount
      case digits[4] = 1:
        return AccountStatus.BlockedAccount
      case 66 || 67:
        return AccountStatus.RegisteredAccount
      case 10 || 11:
        return AccountStatus.LinkedWithoutCard
      case 70 || 71:
        return AccountStatus.AccountWithCard
      case 78 || 79:
        return AccountStatus.LinkedWithCard
      default:
        return AccountStatus.NoAccount
    }
  }
}
