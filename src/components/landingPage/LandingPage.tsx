import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useContext, useEffect } from "react";
import { UserSettingsContext } from "../../contexts/UserSettings";
import Text from "../shared/AnimatedText";

const LandingPage = () => {
  const { userPublicKey, setUserPublicKey } = useContext(UserSettingsContext);

  const { connection } = useConnection();
  const { publicKey, sendTransaction, wallet } = useWallet();

  useEffect(() => {
    setUserPublicKey(publicKey);
  }, [publicKey, setUserPublicKey]);

  console.log(publicKey?.toBase58());

  const WelcomeText = () => (
    <div>
      <div>
        <Text color="white" size="36px" animated>
          {"welcome to solana based public chat"}
        </Text>
      </div>
      <div>
        <Text color="white" size="36px" animated>
          {"pelase connect wallet to continue"}
        </Text>
      </div>
    </div>
  );

  return (
    <>
      {userPublicKey ? (
        <div>
          <Text size="24px" color={"white"}>
            {publicKey?.toBase58()}
          </Text>
        </div>
      ) : (
        <WelcomeText />
      )}
    </>
  );
};

export default LandingPage;
