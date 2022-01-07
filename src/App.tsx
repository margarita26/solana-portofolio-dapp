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
import { UserSettingsProvider } from './contexts/UserSettings';

const StyledContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  top: 0;
  left: 0;
  background: linear-gradient(45deg, ${colors.primary}, 80%, #58f3cd);
`;

const StyledButtonContainer = styled.div`
  margin: 8px;
`;

function App() {
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
                <WalletModalProvider>
                  <StyledButtonContainer>
                    <WalletMultiButton />
                  </StyledButtonContainer>
                  <StyledButtonContainer>
                    <WalletDisconnectButton />
                  </StyledButtonContainer>
                </WalletModalProvider>
              </div>
            </Container>
          </AppBar>
        </StyledContainer>
      </Wallet>
    </UserSettingsProvider>
  );
}

export default App;
