// import { BigNumber } from 'bignumber.js'

const DECIMAL = 10 ** 10

const NETWORK_TOKEN_CODES = {
  nuchain: 'ARA',
  ethereum: 'ETH'
}

function numberWithCommas(x) {
  return x.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export default ({ app }, inject) => {
  inject('formatter', {
    truncateCryptoAddress(address) {
      if (!address) {
        return '??'
      }
      if (address.length < 11) {
        return '???'
      }
      const hexStyle = address.substring(0, 2) === '0x'
      const addr = hexStyle ? address.substring(2) : address
      return `${hexStyle ? '0x' : ''}${addr.substring(0, 4)}...${addr.substring(
        addr.length - 4,
        addr.length
      )}`
    },
    formatBalance(balance, options = { truncate: true, network: 'nuchain' }) {
      console.log(
        '🚀 ~ file: formatter.client.js ~ line 27 ~ formatBalance ~ balance',
        balance
      )

      let bal = balance

      if (options.network === 'nuchain') {
        if (bal.dividedBy) {
          bal = bal.dividedBy(DECIMAL)
        }
      }

      let balStr = bal.toFixed(2).toString(10)

      if (options.truncate) {
        balStr = balStr.split('.')[0]
        if (balStr.length > 3) {
          balStr = balStr.substring(0, balStr.length - 3) + 'k'
        }
      }

      return (
        numberWithCommas(balStr) + ' ' + NETWORK_TOKEN_CODES[options.network]
      )

      // if (typeof balance === typeof BigNumber(0)) {
      //   return balance.toString(10) + ' ' + NETWORK_TOKEN_CODES[network]
      // }
      // try {
      //   const bal = balance / DECIMAL
      //   if (bal % 1 === 0) {
      //     return bal.toString() + ' ' + NETWORK_TOKEN_CODES[network]
      //   }
      //   return bal.toFixed(2).toString() + ' ' + NETWORK_TOKEN_CODES[network]
      // } catch {
      //   return balance.toString() + ' ' + NETWORK_TOKEN_CODES[network]
      // }
    }
  })
}
