import Head from "next/head";
import { useRouter } from "next/router";

type Props = {
  title: string | any;
  desc: string | any;
  canonical: string | any;
};

export function CustomHead({ title, desc, canonical }: Props) {
  const URL = "https://premiumpipe-ndc.vercel.app";
  const { locales } = useRouter();

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
        integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <meta name="description" content={desc} />
      <link rel="canonical" href={`${URL}${canonical}`} />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      {locales?.map((locale: string) => {
        return (
          <link
            key={locale}
            rel="alternate"
            hrefLang={locale}
            href={`${URL}${canonical}/${locale}`}
          />
        );
      })}
    </Head>
  );
}
