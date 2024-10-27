const express = require("express");
const app = express();
const cors = require("cors");
const utils = require("./utils/cryptography");

const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "032a2c2d59ca1347bbe050f06f3253b461192a14123731ccd545c0109a2056ad1b": 100,
  "031e2387cb58ab9106856e9a5ef0772130cf72ba02c59a1c3fdd88b4d4202974ca": 50,
  "02f98dcb1f37f7c3f6ace0aa994740404ea42976ee79496439a731b4aef7d465ab": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, hash, signature } = req.body;

  signature.r = BigInt(signature.r)
  signature.s = BigInt(signature.s)
  
  if(!utils.verify(signature, hash, sender)){
    return res.status(500).send({message: 'You are not sender wallet owner !'})
  }

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
