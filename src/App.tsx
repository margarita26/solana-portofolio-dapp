import styled from "@emotion/styled";
import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import CustomAppBar from "./components/header/CustomAppBar";
import LandingPage from "./components/pages/landingPage/LandingPage";
import colors from "./constants/colors";
import { TransactionsProvider } from "./contexts/Transactions";
import { UserSettingsProvider } from "./contexts/UserSettings";
import Wallet from "./solana/Wallet";
import MintPage from "./components/pages/mingPage/MintPage";
import * as anchor from '@project-serum/anchor';


const StyledContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(
    45deg,
    ${colors.primary},
    80%,
    ${colors.secondary}
  );
`;

const theme = createTheme(
  {
    palette: {
      primary: {
        main: colors.primary,
      },
      secondary: {
        main: colors.secondary,
      },
    },
  },
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
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(250, 250, 250, 0.3)",
            height: "14px",
            borderRadius: "8px",
          },
          bar: {
            background: `linear-gradient(45deg, ${colors.primary}, 80%, ${colors.secondary})`,
            height: "14px",
          },
        },
      },
    },
  }
);

function App() {
  const getCandyMachineId = (): anchor.web3.PublicKey | undefined => {
    try {
      const candyMachineId = new anchor.web3.PublicKey(
        process.env.REACT_APP_CANDY_MACHINE_ID!
      );

      return candyMachineId;
    } catch (e) {
      console.log("Failed to construct CandyMachineId", e);
      return undefined;
    }
  };

  const candyMachineId = getCandyMachineId();

  return (
    <ThemeProvider theme={theme}>
      <UserSettingsProvider>
        <Wallet>
          <TransactionsProvider>
            <StyledContainer>
              <CustomAppBar />
              <LandingPage />
              <MintPage candyMachineId={candyMachineId} />
            </StyledContainer>
          </TransactionsProvider>
        </Wallet>
      </UserSettingsProvider>
    </ThemeProvider>
  );
}

export default App;
