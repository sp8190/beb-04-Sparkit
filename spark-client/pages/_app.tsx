import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import GlobalStyle from "../styles/global-styles";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
