import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import {secp256k1} from "ethereum-cryptography/secp256k1";

export const hashMessage = (message) => {
    const hash = keccak256(utf8ToBytes(message))

    return hash
}

export const signMessage = async (message, PRIVATE_KEY) => {
    return secp256k1.sign(hashMessage(message), PRIVATE_KEY);
}