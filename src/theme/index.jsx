import PropTypes from "prop-types";
import { useMemo } from "react";
// @mui
import { CssBaseline } from "@mui/material";
import {
  alpha,
  createTheme,
  ThemeProvider as MUIThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
// hooks
import useSettings from "../hooks/useSettings.js";
//
import palette from "./palette.js";
import typography from "./typography.js";
import breakpoints from "./breakpoints.js";
import componentsOverride from "./overrides/index.jsx";
import shadows, { customShadows } from "./shadows.js";

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default function ThemeProvider({ children }) {
  const { themeMode, themeDirection } = useSettings();

  const isLight = themeMode === "light";

  const themeOptions = useMemo(
    () => ({
      palette: isLight ? palette.light : palette.dark,
      typography,
      breakpoints,
      shape: { borderRadius: 8 },
      direction: themeDirection,
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight, themeDirection]
  );

  const theme = createTheme({...themeOptions});

  theme.components = {...componentsOverride(theme),MuiCssBaseline: {styleOverrides : {'&::-webkit-scrollbar': {
                            width: 0,
                        },
                        '&::-webkit-scrollbar-track': {
                            background: "transparent",
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: "transparent",
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: "transparent",
                        }}}};

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
