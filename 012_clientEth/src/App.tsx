import { useConnectors, WagmiProvider } from "wagmi";
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
