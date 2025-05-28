import React, { createContext, useContext, ReactNode, useState } from 'react';

interface AppState {
  refreshTrigger: number;
}

interface AppContextType {
  state: AppState;
  refreshData: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    refreshTrigger: 0
  });

  const refreshData = () => {
    setState(prev => ({
      ...prev,
      refreshTrigger: prev.refreshTrigger + 1
    }));
  };

  const value = {
    state,
    refreshData
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext; 