import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  RpcResponseAndContext,
  SignatureResult,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import React, { useCallback, useMemo } from "react";
import { createContext, useContext } from "react";
import { UserSettingsContext } from "./UserSettings";

/**
 * My test app wallet that recieves all messages and from where to pull history.
 */
const APP_WALLET_PUBLIC_KEY = new PublicKey(
  "AsvD2XFxEf7nNa6T6GB5oq1HgW3sPgKTdVB4L7r9eryR"
);

export type TransactionContextProps = {
  sendMessageTransaction: (
    message: string
  ) => Promise<RpcResponseAndContext<SignatureResult> | null>;
  getTransactionsMemos: () => Promise<(string | null)[]>;
};

export const TransactionContext = createContext<TransactionContextProps>(
  {} as TransactionContextProps
);

export const TransactionProvider: React.FC = ({ children }) => {
  const { userPublicKey } = useContext(UserSettingsContext);
  const { sendTransaction } = useWallet();
  const { connection } = useConnection();

  const sendMessageTransaction = useCallback(
    async (message: string) => {
      const transferTransaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: userPublicKey,
          toPubkey: APP_WALLET_PUBLIC_KEY,
          lamports: 10,
        })
      );

      await transferTransaction.add(
        new TransactionInstruction({
          keys: [{ pubkey: userPublicKey, isSigner: true, isWritable: true }],
          data: Buffer.from(message, "utf-8"),
          programId: new PublicKey(
            "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
          ),
        })
      );

      try {
        console.log("trying to send a message");
        const signature = await sendTransaction(
          transferTransaction,
          connection
        );
        console.log("signed");
        return await connection.confirmTransaction(signature, "processed");
      } catch (e) {
        console.log(e);
        return null;
      }
    },
    [connection, sendTransaction, userPublicKey]
  );

  const getTransactionsMemos = useCallback(async () => {
    const transactions = await connection.getConfirmedSignaturesForAddress2(
      APP_WALLET_PUBLIC_KEY
    );
    const messages = transactions.map((block) => block.memo);
    return messages;
  }, [connection]);

  return (
    <TransactionContext.Provider
      value={{
        sendMessageTransaction,
        getTransactionsMemos,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
