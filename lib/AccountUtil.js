

import { sanitizeDoc } from './sanitizer'


/** 
 * Helper function to build mongodb query from prefixed address
 * eg: eth:0xabcde123123...
 */
function toAddressFilter(prefixedAddress) {
    let s = prefixedAddress.split(':')
    if (s.length != 2) {
        throw 'Invalid prefixedAddress'
    }
    if (s[0] == 'eth') {
        return { ethAddress: s[1] }
    }
    else if (s[0] == 'nuchain') {
        return { nuchainAddress: s[1] }
    }
    throw 'Invalid prefixedAddress'
}


function accountToApiType(doc) {
    let acc = sanitizeDoc(doc)
    let prefixedAddress = null
    if (acc.nuchainAddress) {
        prefixedAddress = `nuchain:${acc.nuchainAddress}`
    }
    else if (acc.ethAddress) {
        prefixedAddress = `eth:${acc.ethAddress}`
    }
    return {
        ...acc,
        prefixedAddress
    }
}


export {
    toAddressFilter,
    accountToApiType
}