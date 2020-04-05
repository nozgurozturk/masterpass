import { AccountStatus, IAccount } from '../models/Account'

const Account: IAccount = {
  userId: '', accountStatus: 0
}

export function setAccountId (id: string) {
  Account.userId = id
}

const convertStringsToDigits = (accountStatus: string): number[] => {
  return accountStatus.substring(0, 7).split('').map(string => Number(string))
}

const identifyAccountStatus = (digits: number[]): number => {
  return digits.reduce((sum: number, digit: number, index: number) => Number(sum) + Number(digit) * Math.pow(2, index))
}

export const setAccountStatus = (accountStatus: string): void => {
  const digits = convertStringsToDigits(accountStatus)
  const status = identifyAccountStatus(digits)
  switch (status) {
    case digits[0] = 0:
      Account.accountStatus = AccountStatus.NoAccount
      break
    case digits[4] = 1:
      Account.accountStatus = AccountStatus.BlockedAccount
      break
    case 18:
      Account.accountStatus = AccountStatus.RegisteredAccount
      break
    case 10:
      Account.accountStatus = AccountStatus.LinkedWithCard
      break
    case 26:
      Account.accountStatus = AccountStatus.LinkedWithoutCard
      break
    case 70:
      Account.accountStatus = AccountStatus.AccountWithCard
      break
    case 78 || 79:
      Account.accountStatus = AccountStatus.LinkedWithCard
      break
    default:
      break
  }
}

export { Account }
