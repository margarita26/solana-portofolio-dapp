import styled from "@emotion/styled";
import { Button, List, Paper, TextField } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../../contexts/Transaction";
import { UserSettingsContext } from "../../contexts/UserSettings";
import CustomText from "../shared/CustomText";

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

const StyledWalletAddressText = styled.div`
  border: 1px solid white;
  border-radius: 10px;
  padding: 16px;
`;

const LandingPage = () => {
  const [message, setMessage] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<(string | null)[]>([]);
  const { userPublicKey, setUserPublicKey } = useContext(UserSettingsContext);
  const { sendMessageTransaction, getTransactionsMemos } =
    useContext(TransactionContext);
  const { publicKey } = useWallet();

  useEffect(() => {
    setUserPublicKey(publicKey);
  }, [publicKey, setUserPublicKey]);

  useEffect(() => {
    const asyncGetTransactions = async () => {
      await getTransactionsMemos()
      .then((messages) => {
        console.log(messages);
        setChatMessages(messages);
      });
    };
    asyncGetTransactions();
  }, [getTransactionsMemos]);

  const WelcomeText = () => (
    <div>
      <div>
        <CustomText color="white" size="36px" animated>
          {"welcome to solana based public chat"}
        </CustomText>
      </div>
      <div>
        <CustomText color="white" size="36px" animated>
          {"pelase connect wallet to continue"}
        </CustomText>
      </div>
    </div>
  );

  const handleOnSend = async () => {
    setMessage("");
    const reciept = await sendMessageTransaction(message);

    if (reciept) {
      console.log("transaction sent");
    }
  };

  return (
    <>
      {userPublicKey ? (
        <StyledChatContainer>
          <StyledInnerChatContainer>
            <StyledWalletAddressText>
              <CustomText size="18px" color={"white"}>
                {publicKey?.toBase58()}
              </CustomText>
            </StyledWalletAddressText>
          </StyledInnerChatContainer>
          <StyledInnerChatContainer>
            <Paper
              style={{
                padding: "8px",
                background: "rgba(255,255,255,.5)",
                height: "400px",
                overflow: "auto",
                width: "100%",
              }}
            >
              {chatMessages.map((message, index) => (
                <div key={index}>
                  <CustomText key={index} size="18px" color="white">
                    {message}
                  </CustomText>
                </div>
              ))}
            </Paper>
          </StyledInnerChatContainer>
          <StyledInnerChatContainer flexDirection="row">
            <TextField
              inputProps={{ style: { color: "white" } }}
              sx={{
                width: "60%",
                color: "white",
                marginRight: "32px",
              }}
              id="standard-basic"
              color="primary"
              label="Message"
              variant="standard"
              value={message}
              onChange={(e: any) => setMessage(e.target.value)}
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
