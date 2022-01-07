import styled from "@emotion/styled";
import { AppBar, Container } from "@mui/material";
import {
    WalletDisconnectButton, WalletModalProvider, WalletMultiButton
} from "@solana/wallet-adapter-react-ui";
import React from "react";

const StyledButtonContainer = styled.div`
  margin: 8px;
`;

const CustomAppBar = () => {
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
  );
};

export default CustomAppBar;
