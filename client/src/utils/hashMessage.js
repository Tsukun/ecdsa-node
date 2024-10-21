import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";

export const hashMessage = (message) => {
    const hash = keccak256(utf8ToBytes(message))

    return hash
}