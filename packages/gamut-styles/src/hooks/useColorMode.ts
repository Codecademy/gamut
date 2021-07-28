import { ColorModes } from '../types';
import { useColorModes } from './useColorModes';

export function useCurrentMode(mode?: ColorModes) {
  const [activeMode] = useColorModes();
  return mode ?? activeMode;
}
