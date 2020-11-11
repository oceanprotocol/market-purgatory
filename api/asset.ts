import { NowRequest, NowResponse } from '@vercel/node'
const fetch = require("node-fetch");

const listUrl =
  'https://raw.githubusercontent.com/oceanprotocol/list-purgatory/main/list-assets.json'

export default async (req: NowRequest, res: NowResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')

  const {
    query: { did }
  } = req

  const request = await fetch(listUrl).then((response:any) => response.json())
  console.log(request)
  const listAssets = request

  if (!did) {
    res.status(200).send(listAssets)
    return
  }
  if (!listAssets) return

  const currentAsset = listAssets.filter(
    (asset: any) => asset.did === did
  )

  res.status(200).send(currentAsset)
}
