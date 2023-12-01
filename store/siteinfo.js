import { createContext, useEffect, useState } from "react";
import { getSiteinfo } from "../server/api";
import { useRouter } from "next/router";

export const SiteinfoContext = createContext();

export default function SiteinfoProvider({ children }) {
  const { locale } = useRouter();
  const [siteinfo, setSiteinfo] = useState({});

  useEffect(() => {
    getSiteinfo(locale)
      .then((res) => setSiteinfo(res))
      .catch((e) => console.log(e));
  }, [locale]);

  return (
    <SiteinfoContext.Provider value={{ siteinfo }}>
      {children}
    </SiteinfoContext.Provider>
  );
}
