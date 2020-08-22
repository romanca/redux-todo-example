const lightColors = {
  hoverBackground: "#607d8b1a",
};

export function getTheme() {
  return {
    colors: lightColors,
  };
}

export function useTheme() {
  return getTheme();
}
