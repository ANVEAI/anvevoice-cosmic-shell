import { createContext, useContext, useState, ReactNode } from 'react';

interface OrbContextType {
  isCentered: boolean;
  setIsCentered: (centered: boolean) => void;
}

const OrbContext = createContext<OrbContextType | undefined>(undefined);

export const OrbProvider = ({ children }: { children: ReactNode }) => {
  const [isCentered, setIsCentered] = useState(false);

  return (
    <OrbContext.Provider value={{ isCentered, setIsCentered }}>
      {children}
    </OrbContext.Provider>
  );
};

export const useOrbContext = () => {
  const context = useContext(OrbContext);
  if (context === undefined) {
    throw new Error('useOrbContext must be used within OrbProvider');
  }
  return context;
};
