import { useAccount, useConnectors, useDisconnect, useReadContract, WagmiProvider } from "wagmi";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "./config";
import { ABI } from "./abi";

function App() {
  const client = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <ConnectWallet />
        <TotalSupply />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function ConnectWallet() {
  const connectors = useConnectors();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  if (address) {
    return <div>
      You are connected {address}
      <button onClick={() => {
        disconnect()
        }}>Disconnect</button>
    </div>
  }

  return (
    <div>
      {connectors.map((c) => (
        <button 
          key={c.id} 
          onClick={() => c.connect()}
        >
          Connect via {c.name}
        </button>
      ))}
    </div>
  );
}

function TotalSupply() {
  const { address, isConnected } = useAccount();

  const { data, isLoading, error } = useReadContract({
    address: '0x00645CA984815A7a3aFD337E138Fd4dfE39FECb4',
    abi: ABI,
    functionName: 'balanceOf',
    args: [address!], 
    query: {
      enabled: isConnected && !!address, 
    },
  });

  if (!isConnected) {
    return <div>Please connect your wallet to view your balance.</div>;
  }


  if (isLoading && (isConnected && !!address)) { 
    return <div>Loading balance...</div>; 
  }

  if (error) {
    console.error("Error fetching balance:", error); 
    return <div>Error fetching balance: {error.message}</div>; 
  }

  const balanceText = data !== undefined ? data?.toString() : (!!address ? '0' : 'N/A');

  return (
    <div>
      Your balance is {balanceText} 
    </div>
  );
}

export default App;
