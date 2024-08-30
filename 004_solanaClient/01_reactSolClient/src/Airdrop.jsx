import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export function Airdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();

  async function sendAirdropToUser() {
    const amount = document.getElementById("publicKey").value
    await connection.requestAirdrop(wallet.publicKey, amount * 1000000000);
    alert("Airdropped SOL")
  }

  return (
    <div>
      <input type="text" id="publicKey" placeholder="Amount" />
      <button onClick={sendAirdropToUser}>Send Airdrop!!</button>
    </div>
  );
}
