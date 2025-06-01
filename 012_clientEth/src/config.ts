import { http, createConfig } from "wagmi";
import { injected } from "wagmi/connectors";
import { mainnet } from "wagmi/chains";

export const config = createConfig({
  connectors: [injected()],
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(
      "rpc-url"
    ),
  },
});
