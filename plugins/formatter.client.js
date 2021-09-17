const DECIMAL = 10 * 1000000000

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
    formatBalance(balance) {
      try {
        const bal = balance / DECIMAL
        if (bal % 1 === 0) {
          return bal.toString() + ' ARA'
        }
        return bal.toFixed(2).toString() + ' ARA'
      } catch {
        return balance.toString() + ' ARA'
      }
    }
  })
}
