import { Account, IAccount, AccountStatus } from '../models/Account'
import { Context } from '../contex/index'

export class AccountService {
  public account: Account
  private onAccountChange: Function
  constructor () {
    const account: IAccount = Context.Account
    this.account = new Account(account.userId, account.accountStatus)
  }

  bindAccountChanged (callback: Function) {
    this.onAccountChange = callback
  }

  private commit (account: Account) {
    this.onAccountChange(account)
  }

  public add (account: Account) {
    const newAccount = new Account(account.userId, account.accountStatus)
    this.commit(newAccount)
  }

  private convertStringsToDigits = (accountStatus: string): number[] => {
    return accountStatus.substring(0, 7).split('').map(string => Number(string))
  }

  private identifyAccountStatus = (digits: number[]): number => {
    return digits.reduce((sum: number, digit: number, index: number) => Number(sum) + Number(digit) * Math.pow(2, index))
  }

  public setAccountStatus = (accountStatus: string): void => {
    const digits = this.convertStringsToDigits(accountStatus)
    const status = this.identifyAccountStatus(digits)
    let accStatus
    switch (status) {
      case digits[0] = 0:
        accStatus = AccountStatus.NoAccount
        break
      case digits[4] = 1:
        accStatus = AccountStatus.BlockedAccount
        break
      case 66 || 67:
        accStatus = AccountStatus.RegisteredAccount
        break
      case 10 || 11:
        accStatus = AccountStatus.LinkedWithoutCard
        break
      case 70 || 71:
        accStatus = AccountStatus.AccountWithCard
        break
      case 78 || 79:
        accStatus = AccountStatus.LinkedWithCard
        break
      default:
        accStatus = AccountStatus.NoAccount
        break
    }
    this.commit(new Account(Context.Account.userId, accStatus))
  }
}
