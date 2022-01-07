import * as React from "react";
import { createContext, useState } from "react";

export type UserSettingsContextProps = {
  userWalletaddress: string;
  setUserWalletAddress: (walletAddress: string) => void;
};

export const UserSettingsContext = createContext<UserSettingsContextProps>({
  userWalletaddress: "",
  setUserWalletAddress: () => null,
});

export const UserSettingsProvider: React.FC = ({ children }) => {
  const [userWalletaddress, setUserWalletAddress] = useState<string>("");

  return (
    <UserSettingsContext.Provider
      value={{
        userWalletaddress,
        setUserWalletAddress,
      }}
    >
      {children}
    </UserSettingsContext.Provider>
  );
};
