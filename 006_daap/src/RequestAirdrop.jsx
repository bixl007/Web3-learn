import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function RequestAirdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();

  async function sendAirdropToUser() {
    const amount = document.getElementById("publicKey").value;
    await connection.requestAirdrop(
      wallet.publicKey,
      amount * LAMPORTS_PER_SOL
    );
    alert("Airdropped SOL");
  }

  return (
    <div>
      <input type="text" id="publicKey" placeholder="Amount" />
      <button onClick={sendAirdropToUser}>Send Airdrop!!</button>
    </div>
  );
}
