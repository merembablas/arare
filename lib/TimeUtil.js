



function getUtcNow() {
    return Math.round(new Date().getTime())
}

function getUtcSeconds() {
    return Math.round(new Date().getTime() / 1000)
}


export { getUtcSeconds, getUtcNow }