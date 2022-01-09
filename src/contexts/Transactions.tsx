import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  ConfirmedSignatureInfo,
  PublicKey,
  RpcResponseAndContext,
  SignatureResult,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import React, { createContext, useCallback, useContext } from "react";
import { UserSettingsContext } from "./UserSettings";

/**
 * My test app wallet that recieves all messages and from where to pull history.
 * Doesnt have any sol dont even :)
 */
const APP_WALLET_PUBLIC_KEY = new PublicKey(
  "AsvD2XFxEf7nNa6T6GB5oq1HgW3sPgKTdVB4L7r9eryR"
);

export type TransactionsContextProps = {
  sendMessageTransaction: (
    message: string
  ) => Promise<RpcResponseAndContext<SignatureResult> | null>;
  getTransactionsMemos: () => Promise<ConfirmedSignatureInfo[]>;
};

export const TransactionsContext = createContext<TransactionsContextProps>(
  {} as TransactionsContextProps
);

export const TransactionsProvider: React.FC = ({ children }) => {
  const { userPublicKey } = useContext(UserSettingsContext);
  const { sendTransaction } = useWallet();
  const { connection } = useConnection();

  const getTransactionsMemos = useCallback(async () => {
    const transactions = await connection.getConfirmedSignaturesForAddress2(
      APP_WALLET_PUBLIC_KEY
    );
    return transactions;
  }, [connection]);

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
        return null;
      }
    },
    [connection, sendTransaction, userPublicKey]
  );

  return (
    <TransactionsContext.Provider
      value={{
        sendMessageTransaction,
        getTransactionsMemos,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsProvider;
