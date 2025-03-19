import { http, createConfig } from "wagmi";
import { injected } from "wagmi/connectors";
import { mainnet } from "wagmi/chains";

export const config = createConfig({
  connectors: [injected()],
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(
      "https://eth-mainnet.g.alchemy.com/v2/7CLTtYA6ym7nUhydjLQiWkl0l7UPxbie"
    ),
  },
});
