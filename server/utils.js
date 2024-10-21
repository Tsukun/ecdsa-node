const secp = require('ethereum-cryptography/secp256k1')
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");


const hashMessage = (message) => {
    const hash = keccak256(utf8ToBytes(message))
    return hash
}

const verify = (signature, message, publicKey) => {
    return secp.secp256k1.verify(signature, message, publicKey)
}

const createKeyPair = (count) => {
    for(let i = 0; i < count; i ++){
        const privateKey = secpCompat.createPrivateKeySync()
        console.log(`privateKey: `, utils.toHex(privateKey))
        const publicKey = secp.secp256k1.getPublicKey(privateKey)
        console.log(`publicKey: `, utils.toHex(publicKey))
        console.log("\n")
    }
}

module.exports = {
    hashMessage,
    verify,
    createKeyPair
}
