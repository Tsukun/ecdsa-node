const { secp256k1 } = require('ethereum-cryptography/secp256k1')
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");


const hashMessage = (message) => {
    const hash = keccak256(utf8ToBytes(message))
    return hash
}

const verify = (signature, message, publicKey) => {
    return secp256k1.verify(signature, message, publicKey)
}

const createKeyPair = (count) => {
    for(let i = 0; i < count; i ++){
        const privateKey = secp256k1.utils.randomPrivateKey()
        console.log(`privateKey: `, toHex(privateKey))
        const publicKey = secp256k1.getPublicKey(privateKey)
        console.log(`publicKey: `, toHex(publicKey))
        console.log("\n")
    }
}

module.exports = {
    hashMessage,
    verify,
    createKeyPair
}
