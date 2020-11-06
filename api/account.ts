import { NowRequest, NowResponse } from '@vercel/node'
import { listAccounts, AccountData } from '@oceanprotocol/list-purgatory'

export default async (req: NowRequest, res: NowResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')

  const {
    query: { address }
  } = req

  if (!address) {
    res.status(200).send(listAccounts)
    return
  }
  if (!listAccounts) return

  const currentAccount = listAccounts.filter(
    (account: AccountData) => account.address === address
  )

  res.status(200).send(currentAccount)
}
