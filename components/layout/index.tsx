import Header from "./header";
import Footer from "./footer";
import { useRouter } from "next/router";
import { useContext } from "react";

import { ICategory } from "../../server/interfaces";

export default function Layout({
  children,
  categories,
}: {
  children: React.ReactNode;
  categories: ICategory[];
}) {
  return (
    <div className="wrapper">
      <Header />
      <main>{children}</main>
      <Footer categories={categories} />
    </div>
  );
}
