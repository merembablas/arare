import { sanitizeDoc } from './sanitizer'

/**
 * Helper function to build mongodb query from prefixed address
 * eg: eth:0xabcde123123...
 */
function toAddressFilter(prefixedAddress) {
  const s = prefixedAddress.split(':')
  if (s.length !== 2) {
    throw new Error('Invalid prefixedAddress')
  }
  if (s[0] === 'eth') {
    return { ethAddress: s[1] }
  } else if (s[0] === 'nuchain') {
    return { nuchainAddress: s[1] }
  }
  throw new Error('Invalid prefixedAddress')
}

function accountToApiType(doc) {
  const acc = sanitizeDoc(doc)
  let prefixedAddress = null
  if (acc.nuchainAddress) {
    prefixedAddress = `nuchain:${acc.nuchainAddress}`
  } else if (acc.ethAddress) {
    prefixedAddress = `eth:${acc.ethAddress}`
  }
  let pic = `https://i.pravatar.cc/300?u=ARA${acc.primaryAddress}`

  if (acc.image) {
    if (acc.image.startsWith('hash://')) {
      pic = `${process.env.BASE_UPLOAD_URL}/${acc.image.substring(7)}`
      console.log(
        '🚀 ~ file: AccountUtil.js ~ line 33 ~ accountToApiType ~ pic',
        pic
      )
    }
  }

  const coverPic = `https://picsum.photos/seed/${acc.primaryAddress}/1024/400`
  return {
    ...acc,
    pic,
    coverPic,
    prefixedAddress
  }
}

export { toAddressFilter, accountToApiType }
