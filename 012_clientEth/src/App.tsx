import { useAccount, useConnectors, useDisconnect, WagmiProvider } from "wagmi";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "./config";

function App() {
  const client = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <ConnectWallet />
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

export default App;
