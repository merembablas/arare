
// function wrap(doc) {
//     let wdoc = { ...(doc._doc) }
//     wdoc['id'] = wdoc['_id']
//     delete wdoc['_id']
//     delete wdoc['__v']
//     return wdoc
// }

import { sanitizeDoc } from './sanitizer'


export default (item, creator) => {
    return {
        ...sanitizeDoc(item),
        pic: `${process.env.BASE_UPLOAD_URL}/${item.hash}${item.fileExtension}`,
        creator
    }
}

