import { useState } from "react";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

import server from "./server";

function Wallet({ address, setAddress, balance, setBalance }) {
  const [privateKey, setPrivateKey] = useState("");
  async function onChange(evt) {
    setPrivateKey(evt.target.value);
    const address = toHex(secp256k1.getPublicKey(evt.target.value))
    
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Your Private Key
        <input placeholder="Type an pk" value={privateKey} onChange={onChange}></input>
      </label>
      <label>Your address = {address} </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
