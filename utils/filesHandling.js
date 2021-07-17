const fs = require('fs')
const removeFile = path => {
    fs.unlinkSync('public/' + path)
}

module.exports = { removeFile }