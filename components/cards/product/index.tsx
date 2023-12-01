import Link from "next/link";
import { IProduct } from "../../../server/interfaces";
import styles from "./product.module.css";
import Image from "next/image";
import noimage from "../../../public/media/noimage.jpg";
import { useContext, useState } from "react";
import { TranslationsContext } from "../../../store/translations";

export default function ProductCard({ product }: { product: IProduct }) {
  const { t } = useContext(TranslationsContext);
  const [limit, setLimit] = useState(4);
  return (
    <Link href={`/products/${product.slug}`} className={styles.card}>
      {product.images?.length > 0 ? (
        <div className={styles.card_image}>
          <Image
            src={product.images[0].image ? product.images[0].image : noimage}
            alt={product.title}
            width={510}
            height={400}
            className={`image ${styles.image} ${styles.img_close}`}
          />
          <Image
            src={product.images[1].image ? product.images[1].image : noimage}
            alt={product.title}
            width={510}
            height={400}
            className={`image ${styles.image} ${styles.img_open}`}
          />
        </div>
      ) : (
        <div className={styles.card_image}>
          <Image
            src={noimage}
            alt="noimage"
            width={510}
            height={400}
            className={`${styles.noimage}`}
          />
        </div>
      )}
      <div className={styles.card_content}>
        <p className={styles.card_title}>{product.title}</p>
        <p className={styles.card_price}> {product.price} sum</p>
        <div className={styles.card_content_body}>
          {product.colors.length > 0
            ? product.colors.slice(0, limit).map((color, id) => {
                return (
                  <div
                    key={id}
                    className={styles.color}
                    style={{ background: color.hex }}
                  ></div>
                );
              })
            : null}

          {product.colors.length > limit ? (
            product.colors.length - limit > 0 ? (
              <p className={styles.number_color}>
                +{product.colors.length - limit}
              </p>
            ) : null
          ) : null}
        </div>
      </div>
    </Link>
  );
}
