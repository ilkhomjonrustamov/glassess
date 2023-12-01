import "../styles/main.css";
import type { AppProps } from "next/app";
import Router from "next/router";
import { useEffect } from "react";
import NProgress from "nprogress";
import { QueryClient, QueryClientProvider } from "react-query";
import TranslationsProvider from "../store/translations";
import FormContextProvider from "../store/form";
import SiteinfoProvider from "../store/siteinfo";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      NProgress.start();
    });

    Router.events.on("routeChangeComplete", () => {
      NProgress.done();
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TranslationsProvider>
        <FormContextProvider>
          <SiteinfoProvider>
            <Component {...pageProps} />
          </SiteinfoProvider>
        </FormContextProvider>
      </TranslationsProvider>
    </QueryClientProvider>
  );
}
