import { createPublicClient, http } from "viem";
import "./App.css";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { mainnet } from "viem/chains";

async function getBalance() {
  const client = createPublicClient({
    chain: mainnet,
    transport: http(),
  });

  const balance = await client.getBalance({
    address: "Your wallet address",
  });
  return balance.toString();
}

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  );
}

function Todos() {
  const query = useQuery({
    queryKey: ["balance"],
    queryFn: getBalance,
    refetchInterval: 10 * 1000,
  });

  return (
    <div>
      Balance:
      {query.data}
    </div>
  );
}

export default App;
