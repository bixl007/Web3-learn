import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import {
  http,
  createConfig,
  WagmiProvider,
  useConnect,
  useAccount,
  useBalance,
  useSendTransaction,
} from "wagmi";
import { base, mainnet, optimism } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";


const queryClient = new QueryClient();

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
  },
});

function App() {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <WalletConnector />
          <EthSend />
          <MyAddress />
        </QueryClientProvider>
      </WagmiProvider>

    </>
  );
}

function WalletConnector() {
  const { connectors, connect } = useConnect();
  return connectors.map((connectors) => (
    <button
      key={connectors.uid}
      onClick={() => connect({ connector: connectors })}
    >
      {connectors.name}
    </button>
  ));
}

function MyAddress() {
  const { address } = useAccount();
  const { balance } = useBalance({ address });

  return (
    <div>
      <div>{address}</div> <div> {balance?.data?.formatted}</div>
    </div>
  );
}

function EthSend() {
  const {data: hash, sendTransaction} = useSendTransaction();

  function sendEth() {
    sendTransaction({
      to: document.getElementById("address").value,
      value: "100000000000000000",
    });
  }
  
  return <div>
    <input id="address" type="text" placeholder="address.." />
    <button onClick={sendEth}>Send 0.1 ETH</button>

  </div>
}

export default App;
