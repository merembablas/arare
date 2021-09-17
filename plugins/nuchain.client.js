import {
  web3Enable,
  web3Accounts,
  web3FromAddress
} from '@polkadot/extension-dapp'

import { Nuchain, WsProvider, Keyring } from 'nuchain-api'
import { cryptoWaitReady } from '@polkadot/util-crypto'

const keyring = new Keyring({ type: 'sr25519', ss58Format: 42 })

function getError(events) {
  // get error by iterating triggered tx events
  let event = events.find(
    ({ event: { method, section } }) =>
      `${section}.${method}` === 'system.ExtrinsicFailed'
  )

  if (event && event.event) {
    event = event.event
  }

  if (!event || !event.data) {
    return null
  }

  const mod = event.data.find((a) => a.isModule)
  if (mod) {
    const error = mod.registry.findMetaError(mod.asModule)
    console.log(error)
    return error
  } else {
    return null
  }
}

function getEventByName(events, name) {
  const event = events.find(
    ({ event: { method, section } }) => `${section}.${method}` === name
  )
  return event
}

export default async ({ app }, inject) => {
  inject('nuchainJs', {
    web3Enable,
    web3Accounts,
    web3FromAddress,
    getError,
    getEventByName
  })
  await setupNuchainApi(inject)
}

async function setupNuchainApi(inject) {
  await cryptoWaitReady()

  console.log('Connecting to', process.env.nuchainEndpoint, '...')
  const provider = new WsProvider(process.env.nuchainEndpoint)
  const conn = await Nuchain.connectApi({ provider })
  console.log('Connected', conn)

  inject('nuchain', {
    api: conn,
    keyring
  })
}
