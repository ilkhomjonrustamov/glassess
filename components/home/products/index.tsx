import { useContext, useState } from "react";
import { ICategory, IProduct } from "../../../server/interfaces";
import ProductCard from "../../cards/product";
import { TranslationsContext } from "../../../store/translations";
import Link from "next/link";
import styles from "./products.module.css";

export default function ProductsSection({ category }: { category: ICategory }) {
  const { t } = useContext(TranslationsContext);
  const [limit, setLimit] = useState(6);
  return (
    <section className="section">
      <div className="box section_inner">
        <div className="section_inner_top">
          <h3 className="section_title">{category?.title}</h3>
          {category?.slug ? (
            <Link href={category?.slug ? category.slug : "/"} className="more">
              Посмотреть все
            </Link>
          ) : null}
        </div>
        <div className="products_container">
          {category?.products.length > 0
            ? category.products.slice(0, 6).map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })
            : null}
        </div>
      </div>
    </section>
  );
}
