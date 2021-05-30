import React from "react";
import "../styles/global.css";
import { AppProps } from "next/app";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../theme";
import { AppWrapper } from "../utils/context";

export default function App({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <AppWrapper>
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
          <style global jsx>{`
            html,
            body,
            body > div:first-child,
            div#__next,
            div#__next > div {
              height: 100%;
            }
          `}</style>
        </ThemeProvider>
      </React.Fragment>
    </AppWrapper>
  );
}
