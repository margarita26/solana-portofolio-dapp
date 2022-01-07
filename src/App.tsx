import styled from "@emotion/styled";
import { AppBar, Container } from "@mui/material";
import {
  WalletDisconnectButton, WalletModalProvider, WalletMultiButton
} from "@solana/wallet-adapter-react-ui";
import React from "react";
import LandingPage from "./components/landingPage/LandingPage";
import colors from "./constants/colors";
import {
  UserSettingsProvider
} from "./contexts/UserSettings";
import Wallet from "./solana/Wallet";

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
          <LandingPage/>
        </StyledContainer>
      </Wallet>
    </UserSettingsProvider>
  );
}

export default App;
