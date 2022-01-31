import styled from "@emotion/styled";
import { AppBar, Button, Container } from "@mui/material";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import React from "react";
import pageId from "../../constants/page-ids";

const StyledButtonContainer = styled.div`
  margin: 8px;
`;

const StyledInnerButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const CustomAppBar = () => {
  const scrollToPage = (pageId: string): void => {
    const element = document.getElementById(pageId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
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
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <StyledInnerButtonContainer>
          <Button
            key={pageId.chat}
            onClick={() => scrollToPage(pageId.chat)}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            Chat
          </Button>
          <Button
            key={pageId.mint}
            onClick={() => scrollToPage(pageId.mint)}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            Mint
          </Button>
        </StyledInnerButtonContainer>
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
