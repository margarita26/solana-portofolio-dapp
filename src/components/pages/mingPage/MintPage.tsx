import styled from "@emotion/styled";
import { Button, LinearProgress, Paper, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React, {
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import colors from "../../../constants/colors";
import pageId from "../../../constants/page-ids";
import { UserSettingsContext } from "../../../contexts/UserSettings";
import {
  awaitTransactionSignatureConfirmation,
  CandyMachineAccount,
  getCandyMachineState,
  mintOneToken,
} from "../../../utils/candy-machine";
import CustomText from "../../shared/CustomText";
import * as anchor from "@project-serum/anchor";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const StyledInfoAndButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const StyledProgressTextContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

interface MintPageProps {
  candyMachineId: anchor.web3.PublicKey | undefined;
}

const MintPage = ({ candyMachineId }: MintPageProps) => {
  const { userPublicKey } = useContext(UserSettingsContext);
  const [candyMachine, setCandyMachine] = useState<CandyMachineAccount>();
  const [isUserMinting, setIsUserMinting] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const { connection } = useConnection();
  const wallet = useWallet();

  const anchorWallet = useMemo(() => {
    if (
      !wallet ||
      !wallet.publicKey ||
      !wallet.signAllTransactions ||
      !wallet.signTransaction
    ) {
      return;
    }

    return {
      publicKey: wallet.publicKey,
      signAllTransactions: wallet.signAllTransactions,
      signTransaction: wallet.signTransaction,
    } as anchor.Wallet;
  }, [wallet]);

  const refreshCandyMachineState = useCallback(async () => {
    if (candyMachineId && anchorWallet) {
      try {
        const cndy = await getCandyMachineState(
          anchorWallet,
          candyMachineId,
          connection
        );
        setCandyMachine(cndy);
        const currentProgress = candyMachine ? 320 - candyMachine.state.itemsRemaining : 0;
        setProgress(currentProgress);
      } catch (e) {
        console.log("There was a problem fetching Candy Machine state");
      }
    }
  }, [anchorWallet, candyMachine, candyMachineId, connection]);

  useEffect(() => {
    refreshCandyMachineState();
  }, [candyMachineId, connection, refreshCandyMachineState]);

  const onMint = async () => {
    try {
      setIsUserMinting(true);
      if (wallet.connected && candyMachine?.program && wallet.publicKey) {
        const mintTxId = (
          await mintOneToken(candyMachine, wallet.publicKey)
        )[0];

        let status: any = { err: true };
        if (mintTxId) {
          status = await awaitTransactionSignatureConfirmation(
            mintTxId,
            6000,
            connection,
            true
          );
        }
        if (status && !status.err) {
          console.log(status.err);
        }
      }
      refreshCandyMachineState();
      const currentProgress = candyMachine ? 320 - candyMachine.state.itemsRemaining : 0;
      setProgress(currentProgress);
      console.log("progress is", progress);
      setIsUserMinting(false);
    } catch (error: any) {
      let message = error.msg || "Minting failed! Please try again!";
      if (!error.msg) {
        if (!error.message) {
          message = "Transaction Timeout! Please try again.";
        } else if (error.message.indexOf("0x137")) {
          message = `SOLD OUT!`;
        } else if (error.message.indexOf("0x135")) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        if (error.code === 311) {
          message = `SOLD OUT!`;
          window.location.reload();
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }
      console.log(message);
    }
  };

  const mintPaperCss: React.CSSProperties = {
    padding: "8px",
    background: "rgba(255,255,255,.3)",
    height: "40%",
    overflow: "auto",
    width: "40%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    fontSize: "24px",
    color: "white",
  };

  const infoBoxCss: React.CSSProperties = {
    width: "100px",
    height: "100px",
    margin: "8px",
    borderRadius: "8px",
    backgroundColor: "rgb(250, 250, 250, 0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const progressBoxStyles: React.CSSProperties = {
    width: "90%",
    margin: "8px",
  };

  return userPublicKey ? (
    <StyledContainer id={pageId.mint}>
      <Paper elevation={10} style={mintPaperCss}>
        <div>Mint your NFT here</div>
        <StyledInfoAndButtonContainer>
          <div style={{ display: "flex" }}>
            <Box sx={infoBoxCss}>
              <div>
                <CustomText color={colors.primary} size={"14px"}>
                  ITEMS
                </CustomText>
              </div>
              <div>
                <CustomText color={"white"} size={"16px"}>
                  320
                </CustomText>
              </div>
            </Box>
            <Box sx={infoBoxCss}>
              <div>
                <CustomText color={colors.primary} size={"14px"}>
                  PRICE
                </CustomText>
              </div>
              <div>
                <CustomText color={"white"} size={"16px"}>
                  0.1 SOL
                </CustomText>
              </div>
            </Box>
            <Box sx={infoBoxCss}>
              <div>
                <CustomText color={colors.primary} size={"14px"}>
                  LIMIT
                </CustomText>
              </div>
              <div>
                <CustomText color={"white"} size={"16px"}>
                  3 TOKENS
                </CustomText>
              </div>
            </Box>
          </div>

          <Button
            variant="contained"
            color="secondary"
            sx={{
              width: "30%",
              border: "4px solid transparent",
              fontSize: "12px",
            }}
            onClick={() => onMint()}
          >
            {isUserMinting ? <CircularProgress /> : "Mint your token!"}
          </Button>
        </StyledInfoAndButtonContainer>
        <Box sx={progressBoxStyles}>
          <StyledProgressTextContainer>
            {progress}/320
          </StyledProgressTextContainer>
          <LinearProgress
            color="primary"
            variant="determinate"
            value={progress}
          ></LinearProgress>
        </Box>
      </Paper>
    </StyledContainer>
  ) : null;
};

export default MintPage;
