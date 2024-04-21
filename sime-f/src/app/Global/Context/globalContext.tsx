import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
});


// Loader Context
export interface LoaderState {
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const LoaderContext = createContext<LoaderState | undefined>(undefined);

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const context = React.useContext(LoaderContext);
  if (context === undefined) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
};
