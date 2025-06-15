import express from "express";
import { Client } from "pg";
import { HDNodeWallet, Wallet } from "ethers6";
import { mnemonicToSeedSync, validateMnemonic } from "bip39";
import { SEED } from "./config";
import cors from "cors";

const client = new Client(
  "postgres://postgres:yourpassword@localhost:5432/mynewdb"
);

const seed = mnemonicToSeedSync(SEED);

const app = express();
app.use(cors());
app.use(express.json());

client.connect();

app.post("/signup", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const result = await client.query(
      "INSERT INTO users (username, password, depositAddress, privateKey, balance) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [username, password, "", "", 0]
    );
    const userId = result.rows[0].id;

    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(`m/44'/60'/${userId}'/0`);

    await client.query(
      "UPDATE users SET depositAddress=$1, privateKey=$2 WHERE id=$3",
      [child.address, child.privateKey, userId]
    );

    console.log(child.privateKey);
    console.log(child.address);
    res.json({
      userId,
      depositAddress: child.address,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/depositAddress/:userId", async (req, res) => {

});

app.listen(3000);
