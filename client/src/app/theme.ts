import { createTheme, DEFAULT_THEME, mergeMantineTheme } from "@mantine/core";

const themeOverride = createTheme({
  primaryColor: "tuatara",
  defaultRadius: 16,
  colors: {
    tuatara: [
      "#f6f6f6",
      "#e7e7e7",
      "#d1d1d1",
      "#b0b0b0",
      "#888888",
      "#6d6d6d",
      "#5d5d5d",
      "#4f4f4f",
      "#454545",
      "#3d3d3d",
      "#262626",
    ],
    "chateau-green": [
      "#f3faf4",
      "#e3f5e6",
      "#c8eace",
      "#9dd8a8",
      "#6abe7a",
      "#46a358",
      "#358444",
      "#2c6938",
      "#275430",
      "#22452a",
      "#0e2514",
    ],

    "dove-gray": [
      "#f6f6f6",
      "#e7e7e7",
      "#d1d1d1",
      "#b0b0b0",
      "#888888",
      "#727272",
      "#5d5d5d",
      "#4f4f4f",
      "#454545",
      "#3d3d3d",
      "#262626",
    ],

    "silver-chalice": [
      "#f7f7f7",
      "#ededed",
      "#dfdfdf",
      "#c8c8c8",
      "#acacac",
      "#999999",
      "#888888",
      "#7b7b7b",
      "#676767",
      "#545454",
      "#363636",
    ],
  },
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);
