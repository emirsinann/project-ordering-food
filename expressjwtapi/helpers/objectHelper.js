exports.objectCleaner = (body)=> {
    for(let k in body)
    {
        if(body[k] == null || body[k] === undefined)
        delete body[k]
    }

    return body
}