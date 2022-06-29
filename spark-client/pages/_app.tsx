import type { AppProps } from "next/app";
import GlobalStyle from "../styles/global-styles";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { RecoilRoot } from "recoil";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router;
  console.log(pathname);
  return (
    <RecoilRoot>
      <ApolloProvider client={client}>
        <GlobalStyle />
        {pathname !== "/" && pathname !== "/Mypage" ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </ApolloProvider>
    </RecoilRoot>
  );
}

export default MyApp;
