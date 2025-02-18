import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

export interface HeaderContextType {
  lastOpenedDropdown: string | undefined;
  setLastOpenedDropdown:
    | Dispatch<SetStateAction<string | undefined>>
    | undefined;
}

export const HeaderContext = createContext<HeaderContextType>({
  lastOpenedDropdown: undefined,
  setLastOpenedDropdown: undefined,
});

export const HeaderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [lastOpenedDropdown, setLastOpenedDropdown] = useState<
    string | undefined
  >();

  return (
    <HeaderContext.Provider
      value={{ lastOpenedDropdown, setLastOpenedDropdown }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderContext = () => useContext(HeaderContext);
