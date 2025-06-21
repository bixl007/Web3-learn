import * as borsh from "borsh";

import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { expect, test } from "bun:test";
import { COUNTER_SIZE, schema } from "./types";

let adminAccount = Keypair.generate();
let dataAccount = Keypair.generate();

const PROGRAM_ID = new PublicKey(
  "CXbNEf6XYydSAMPTwUgnjgukV3BDPWbTpzDKY9Z5QyCA"
);

const connection = new Connection("http://127.0.0.1:8899");

test("Account is initialized", async () => {
  const txn = await connection.requestAirdrop(
    adminAccount.publicKey,
    100 * LAMPORTS_PER_SOL
  );
  await connection.confirmTransaction(txn);

  const data = await connection.getAccountInfo(adminAccount.publicKey);

  const lamports = await connection.getMinimumBalanceForRentExemption(
    COUNTER_SIZE
  );

  const ix = SystemProgram.createAccount({
    fromPubkey: adminAccount.publicKey,
    lamports,
    space: COUNTER_SIZE,
    programId: PROGRAM_ID,
    newAccountPubkey: dataAccount.publicKey,
  });

  const createAccountTxn = new Transaction();
  createAccountTxn.add(ix);
  const signature = await connection.sendTransaction(createAccountTxn, [
    adminAccount,
    dataAccount,
  ]);

  await connection.confirmTransaction(signature);
  console.log(dataAccount.publicKey.toBase58())

  const dataAccountInfo = await connection.getAccountInfo(dataAccount.publicKey);
  const counter = borsh.deserialize(schema, dataAccountInfo?.data);
  console.log(counter.count)
  expect(counter.count).toBe(0);


});
