import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import GlobalStyle from "../styles/global-styles";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { RecoilRoot } from "recoil";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ApolloProvider client={client}>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </RecoilRoot>
  );
}

export default MyApp;
