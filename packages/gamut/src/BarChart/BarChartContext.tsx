import { createContext, useContext } from 'react';
import * as React from 'react';

import { BoxProps } from '../Box';

export interface BarChartContextValue {
  styleConfig: {
    textColor?: BoxProps['color'];
    foregroundBarColor?: BoxProps['color'];
    backgroundBarColor?: BoxProps['color'];
  };
  minRange: number;
  maxRange: number;
  xScale: number;
  unit: string;
  animate?: boolean;
}

const BarChartContext = createContext<BarChartContextValue | undefined>(
  undefined
);

export interface BarChartProviderProps {
  children: React.ReactNode;
  value: BarChartContextValue;
}

export const BarChartProvider: React.FC<BarChartProviderProps> = ({
  children,
  value,
}) => {
  return (
    <BarChartContext.Provider value={value}>
      {children}
    </BarChartContext.Provider>
  );
};

export const useBarChartContext = (): BarChartContextValue => {
  const context = useContext(BarChartContext);
  if (context === undefined) {
    throw new Error(
      'useBarChartContext must be used within a BarChartProvider'
    );
  }
  return context;
};

