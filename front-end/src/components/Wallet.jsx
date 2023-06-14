import React, { useEffect, useState } from "react";

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli, sepolia, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [goerli, sepolia, polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "2d6e659eb8c25472630c4b97d3c1369d",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import { getUsers } from "../modules/Notion.mjs";

const Wallet = (props) => {
  const { address } = useAccount();
  const [currentUser, setCurrentUser] = useState(null);

  // const CustomAvatar = (user) => {
  //   const icon = user
  //     ? user.iconUrl
  //     : "https://beta.unyte.team/proposals/951780348465909820";
  //   return (
  //     <div><img src={icon} height="400px" width="400px" style={{color:"red",borderRadius: 999}} /></div>
  //   );
  // };

  useEffect(() => {
    const getUser = async () => {
      const user = await getUsers(address);
      setCurrentUser(user);
      return user;
    };
    getUser().then(console.log);
  }, [address]);

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        modalSize="compact"
        chains={chains}
        //avatar={() => CustomAvatar({currentUser})}
      >
        <ConnectButton
          showBalance={false}
          chainStatus="none"
          accountStatus="full"
        />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Wallet;
