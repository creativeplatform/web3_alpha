import React, { createContext, useContext } from "react";

type AppContextInterface = {
  isMember: boolean;
  setMember: (value: boolean) => void;
};

const AppContext = createContext<AppContextInterface>(null);

export function AppWrapper({ children }) {
  const { isMember, setMember } = useAppContext()!;

  return (
    <AppContext.Provider value={{ isMember, setMember }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
