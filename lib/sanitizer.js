


function sanitizeDoc(doc) {
    let wdoc = { ...(doc._doc) }
    wdoc['id'] = wdoc['_id']
    delete wdoc['_id']
    delete wdoc['__v']
    return wdoc
}


export { sanitizeDoc }

