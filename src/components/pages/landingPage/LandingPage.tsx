import styled from "@emotion/styled";
import { Button, Paper, TextField } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { ConfirmedSignatureInfo } from "@solana/web3.js";
import { useContext, useEffect, useState } from "react";
import colors from "../../../constants/colors";
import { TransactionsContext } from "../../../contexts/Transactions";
import { UserSettingsContext } from "../../../contexts/UserSettings";
import { getDate } from "../../../utils/dateUtils";
import CustomText from "../../shared/CustomText";

const StyledChatContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface StyledInnerChatContainerProps {
  flexDirection?: string;
}

const StyledInnerChatContainer = styled.div<StyledInnerChatContainerProps>`
  margin-bottom: 32px;
  width: 100%;
  display: flex;
  flex-direction: ${(props: StyledInnerChatContainerProps) =>
    props.flexDirection};
  justify-content: center;
  align-items: center;
`;

const StyledTextWithBorder = styled.div`
  border: 1px solid white;
  border-radius: 10px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LandingPage = () => {
  const [message, setMessage] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ConfirmedSignatureInfo[]>(
    []
  );
  const { userPublicKey, setUserPublicKey } = useContext(UserSettingsContext);
  const { sendMessageTransaction, getTransactionsMemos } =
    useContext(TransactionsContext);
  const { publicKey } = useWallet();

  useEffect(() => {
    setUserPublicKey(publicKey);
  }, [publicKey, setUserPublicKey]);

  useEffect(() => {
    const asyncGetTransactions = async () => {
      await getTransactionsMemos().then((messages) => {
        setChatMessages(messages);
      });
    };
    asyncGetTransactions();
  }, [getTransactionsMemos]);

  const WelcomeText = () => (
    <div>
      <div style={{ marginTop: "32px" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CustomText color="white" size="36px" animated>
            {"welcome to solana based public chat"}
          </CustomText>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CustomText color="white" size="36px" animated>
            {"pelase connect wallet to continue"}
          </CustomText>
        </div>
      </div>
    </div>
  );

  const Chat = () => (
    <Paper
      style={{
        padding: "8px",
        background: "rgba(255,255,255,.3)",
        height: "400px",
        overflow: "auto",
        width: "100%",
      }}
    >
      {chatMessages.map((message, index) => (
        <div key={index} style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ marginRight: "8px", width: "65px" }}>
            <CustomText size="18px" color={colors.primary}>
              {`${getDate(message.blockTime)}:`}
            </CustomText>
          </div>
          <div>
            <CustomText size="18px" color="white">
              {message.memo}
            </CustomText>
          </div>
        </div>
      ))}
    </Paper>
  );

  const handleOnSend = async () => {
    setMessage("");
    const reciept = await sendMessageTransaction(message);
    if (reciept) {
      console.log("transaction sent");
      await getTransactionsMemos().then((messages) => {
        setChatMessages(messages);
      });
    }
  };

  return (
    <>
      {userPublicKey ? (
        <StyledChatContainer>
          <StyledInnerChatContainer>
            <StyledTextWithBorder>
              <CustomText size="18px" color={"white"}>
                {publicKey?.toBase58()}
              </CustomText>
            </StyledTextWithBorder>
          </StyledInnerChatContainer>
          <StyledInnerChatContainer>
            <Chat />
          </StyledInnerChatContainer>
          <StyledInnerChatContainer flexDirection="row">
            <TextField
              inputProps={{
                style: {
                  color: "white",
                },
              }}
              sx={{
                width: "60%",
                color: "white",
                marginRight: "32px",
              }}
              color="primary"
              label="Message"
              variant="standard"
              value={message}
              onChange={(e: any) => setMessage(e.target.value)}
              autoComplete="off"
            />
            <Button variant="outlined" onClick={() => handleOnSend()}>
              Send
            </Button>
          </StyledInnerChatContainer>
        </StyledChatContainer>
      ) : (
        <WelcomeText />
      )}
    </>
  );
};

export default LandingPage;
