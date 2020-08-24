import { lightColors } from './colors';
import { sizes } from './variables';

function getTheme() {
  return {
    colors: lightColors,
    sizes
  };
}

export function useTheme() {
  return getTheme();
}
