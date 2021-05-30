import React, { createContext, useContext } from "react";

type AppContextInterface = {
  isFan: boolean;
  setFan: (value: boolean) => void;
};

const AppContext = createContext<AppContextInterface>({} as AppContextInterface);

export function AppWrapper({ children }) {
  const [isFan, setFan] = React.useState(false);

  return (
    <AppContext.Provider value={{ isFan, setFan }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
