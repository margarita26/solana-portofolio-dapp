import React from "react";
import styled from "@emotion/styled";
import Wallet from "./solana/Wallet";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { AppBar, Container } from "@mui/material";
import colors from "./constants/colors";
import {
  UserSettingsProvider,
  UserSettingsContext,
} from "./contexts/UserSettings";
import AnimatedText from "./components/shared/AnimatedText";
import { css } from "@emotion/react";
import { useContext, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as solanaWeb3 from "@solana/web3.js";

const StyledContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, ${colors.primary}, 80%, #58f3cd);
`;

const StyledButtonContainer = styled.div`
  margin: 8px;
`;

function App() {
  const { userWalletaddress } = useContext(UserSettingsContext);

  const { connection } = useConnection();
  const { publicKey, sendTransaction, wallet } = useWallet();

  console.log(useWallet());
  useEffect(() => {
    const lamports = async () => {

      await connection.getBalance(publicKey).catch((err) => {
        console.error(`Error: ${err}`);
      });
    };

    lamports();
  });

  const WelcomeText = () => (
    <div>
      <div>
        <AnimatedText color="white" size="36px">
          {"welcome to solana based public chat"}
        </AnimatedText>
      </div>
      <div>
        <AnimatedText color="white" size="36px">
          {"pelase connect wallet to continue"}
        </AnimatedText>
      </div>
    </div>
  );

  const WalletComponent = () => (
    <WalletModalProvider>
      <StyledButtonContainer>
        <WalletMultiButton />
      </StyledButtonContainer>
      <StyledButtonContainer>
        <WalletDisconnectButton />
      </StyledButtonContainer>
    </WalletModalProvider>
  );

  return (
    <UserSettingsProvider>
      <Wallet>
        <StyledContainer>
          <AppBar
            position="fixed"
            color="primary"
            sx={{
              background: "rgba(0, 0, 0, 0.1)",
              boxShadow: "none",
            }}
          >
            <Container
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  width: "fit-content",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <WalletComponent />
              </div>
            </Container>
          </AppBar>
          {userWalletaddress ? "Connected" : <WelcomeText />}
        </StyledContainer>
      </Wallet>
    </UserSettingsProvider>
  );
}

export default App;
