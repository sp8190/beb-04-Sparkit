import type { AppProps } from "next/app";
import GlobalStyle from "../styles/global-styles";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { RecoilRoot } from "recoil";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ApolloProvider client={client}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ApolloProvider>
    </RecoilRoot>
  );
}

export default MyApp;
