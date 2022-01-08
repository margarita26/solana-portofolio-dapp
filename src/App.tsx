import styled from "@emotion/styled";
import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import CustomAppBar from "./components/header/CustomAppBar";
import LandingPage from "./components/pages/landingPage/LandingPage";
import colors from "./constants/colors";
import { TransactionsProvider } from "./contexts/Transactions";
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

const theme = createTheme(
  {},
  {
    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: "rgba(25, 118, 210, 0.5)",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            "&:before": {
              borderBottom: "white",
            },
          },
        },
      },
    },
  }
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserSettingsProvider>
        <Wallet>
          <TransactionsProvider>
            <StyledContainer>
              <CustomAppBar />
              <LandingPage />
            </StyledContainer>
          </TransactionsProvider>
        </Wallet>
      </UserSettingsProvider>
    </ThemeProvider>
  );
}

export default App;
