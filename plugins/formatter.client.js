export default ({ app }, inject) => {
  inject('formatter', {
    truncateCryptoAddress(address) {
      if (address.length < 11) {
        return '???'
      }
      const hexStyle = address.substring(0, 2) === '0x'
      const addr = hexStyle ? address.substring(2) : address
      return `${hexStyle ? '0x' : ''}${addr.substring(0, 4)}...${addr.substring(
        addr.length - 4,
        addr.length
      )}`
    }
  })
}
