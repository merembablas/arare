import {
  web3Enable,
  web3Accounts,
  web3FromAddress
} from '@polkadot/extension-dapp'

export default ({ app }, inject) => {
  inject('nuchainJs', { web3Enable, web3Accounts, web3FromAddress })
}
