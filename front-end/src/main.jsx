import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli, sepolia, polygonMumbai, polygon, mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, sepolia, polygonMumbai, goerli],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "AI+Crypto Hackathon",
  projectId: "2d6e659eb8c25472630c4b97d3c1369d",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider modalSize="compact" chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </>
);
