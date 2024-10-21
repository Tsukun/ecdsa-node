import { useState } from "react";
import server from "./server";
import { hashMessage, signMessage } from "./utils/cryptography";
import { toHex } from "ethereum-cryptography/utils";

function Transfer({ address, setBalance }) {

  const [transferData, setTransferData] = useState({
    amount: "",
    recipient: ""
  })

  const [privateKey, setPrivateKey] = useState("")


  const changeTransferData = (name, value) => {
    setTransferData(prevState=>({
      ...prevState,
      [name]: value,
    }))
  }

  const setNameValue = (setter) => (evt) => setter(evt.target.name, evt.target.value);
  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    
    const messageHash = toHex(hashMessage(JSON.stringify(transferData)));
    const signature = await signMessage(JSON.stringify(transferData), privateKey);
    signature.r = signature.r.toString();
    signature.s = signature.s.toString();
  
    try {
      const {
        data: { balance },
      } = 
      await server.post(`send`, {
        sender: address,
        recipient: transferData.recipient,
        amount: transferData.amount,
        hash: messageHash,
        signature
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          name="amount"
          type="number"
          placeholder="1, 2, 3..."
          value={transferData.amount}
          onChange={setNameValue(changeTransferData)}
        />
      </label>

      <label>
        Recipient
        <input
          name="recipient"
          placeholder="Type an address, for example: 0x2"
          value={transferData.recipient}
          onChange={setNameValue(changeTransferData)}
        />
      </label>

      <label>
        Private key
        <input
          name="privateKey"
          placeholder="Type an address, for example: 0x2"
          value={privateKey}
          onChange={setValue(setPrivateKey)}
        />
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
