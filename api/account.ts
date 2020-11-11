import { NowRequest, NowResponse } from '@vercel/node'

const fetch = require('node-fetch')

const listUrl =
  'https://raw.githubusercontent.com/oceanprotocol/list-purgatory/main/list-accounts.json'

export default async (req: NowRequest, res: NowResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')

  const {
    query: { address }
  } = req

  const request = await fetch(listUrl).then((response: any) => response.json())
  console.log(request)
  const listAccounts = request

  if (!address) {
    res.status(200).send(listAccounts)
    return
  }
  if (!listAccounts) return

  const currentAccount = listAccounts.filter(
    (account: any) => account.address === address
  )

  res.status(200).send(currentAccount)
}
