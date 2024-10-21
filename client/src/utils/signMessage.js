import {secp256k1} from "ethereum-cryptography/secp256k1";
import {hashMessage} from './hashMessage';

export const signMessage = async (message, PRIVATE_KEY) => {
    return secp256k1.sign(hashMessage(message), PRIVATE_KEY);
}