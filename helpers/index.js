const bcrypt = require('bcryptjs')

const hashing = (password)=>{
    return bcrypt.hashSync(password,6)
}

const comparing  = (password, hash)=>{
    return bcrypt.compare(password,hash)
}

module.exports = {
    hashing,
    comparing
}