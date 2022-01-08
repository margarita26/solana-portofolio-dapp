import styled from "@emotion/styled";
import React from "react";
import CustomAppBar from "./components/header/CustomAppBar";
import LandingPage from "./components/pages/landingPage/LandingPage";
import colors from "./constants/colors";
import { TransactionProvider } from "./contexts/Transaction";
import { UserSettingsProvider } from "./contexts/UserSettings";
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

function App() {
  return (
    <UserSettingsProvider>
      <Wallet>
        <TransactionProvider>
          <StyledContainer>
            <CustomAppBar />
            <LandingPage />
          </StyledContainer>
        </TransactionProvider>
      </Wallet>
    </UserSettingsProvider>
  );
}

export default App;
