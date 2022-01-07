import * as React from "react";
import { createContext, useState } from "react";

export type UserSettingsContextProps = {
  userPublicKey: any;
  setUserPublicKey: (publicKey: any) => void;
};

export const UserSettingsContext = createContext<UserSettingsContextProps>({
  userPublicKey: null,
  setUserPublicKey: () => null,
});

export const UserSettingsProvider: React.FC = ({ children }) => {
  const [userWalletaddress, setUserWalletAddress] = useState<any>(null);

  return (
    <UserSettingsContext.Provider
      value={{
        userPublicKey: userWalletaddress,
        setUserPublicKey: setUserWalletAddress,
      }}
    >
      {children}
    </UserSettingsContext.Provider>
  );
};
