import Layout from "../components/layout";
import { CustomHead } from "../components/layout/head";
import { search } from "../public/icons";
import styles from "../styles/search.module.css";
import emptyImg from "../public/media/empty.jpg";
import Image from "next/image";
import ProductCard from "../components/cards/product";
import { getHomeCategories, searchProducts } from "../server/api";
import { useContext, useEffect, useState } from "react";
import { ICategory, IProduct } from "../server/interfaces";
import { FormContext } from "../store/form";
import { TranslationsContext } from "../store/translations";

export default function Page({ categories }: { categories: ICategory[] }) {
  const { products, setProducts, query, setQuery } = useContext(FormContext);
  const { t } = useContext(TranslationsContext);

  return (
    <>
      <CustomHead title={` Glasses | Search`} desc={""} canonical={"/search"} />
      <Layout categories={categories}>
        <section className="section">
          <div className={`box ${styles.minibox_mb}`}>
            <form
              className={styles.input_wrapper}
              onSubmit={(e) => {
                e.preventDefault();
                searchProducts(query)
                  .then((res) => setProducts(res.results))
                  .catch((e) => console.log(e));
              }}
            >
              <input
                type="text"
                required
                className={styles.input}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit">{search}</button>
            </form>
            {products.length > 0 ? (
              <ContentComponent products={products} />
            ) : (
              <EmptyComponent />
            )}
          </div>
        </section>
      </Layout>
    </>
  );
}

const EmptyComponent = () => {
  const { t } = useContext(TranslationsContext);
  return (
    <div className={styles.empty_wrapper}>
      <h4 style={{ textAlign: "center" }} className={styles.custom_title}>
        По вашему запросу ничего не найдено
      </h4>
      <Image src={emptyImg} alt="empty image" />
    </div>
  );
};

const ContentComponent = ({ products }: { products: IProduct[] }) => {
  const { t } = useContext(TranslationsContext);
  return (
    <div className={`section_inner ${styles.content_wrapper}`}>
      <div className="section_inner_top">
        <h4 className={styles.custom_title}>{t["main.thing_found"]}</h4>
      </div>
      <div>
        <div className={styles.search_results}>
          {products.map((product, key) => {
            return <ProductCard product={product} key={key} />;
          })}
        </div>
      </div>
    </div>
  );
};
export async function getServerSideProps(ctx: any) {
  const categories = await getHomeCategories(ctx.locale);
  return {
    props: { categories },
  };
}
