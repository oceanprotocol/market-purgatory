import { NowRequest, NowResponse } from '@vercel/node'
import { listAssets, AssetData } from '@oceanprotocol/list-purgatory'

export default async (req: NowRequest, res: NowResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')

  const {
    query: { did }
  } = req

  if (!did) {
    res.status(200).send(listAssets)
    return
  }
  if (!listAssets) return

  const currentAsset = listAssets.filter(
    (asset: AssetData) => asset.did === did
  )

  res.status(200).send(currentAsset)
}
