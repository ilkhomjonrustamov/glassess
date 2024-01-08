import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Autoplay } from "swiper/modules";
import Layout from "../../components/layout";
import { CustomHead } from "../../components/layout/head";
import { getCategories, getSingleProduct } from "../../server/api";
import { ICategory, IProduct } from "../../server/interfaces";
import Buttons from "../../components/utils/buttons";
import ProductCard from "../../components/cards/product";
// import styles from "../../styles/product.module.css";
import styles from "../../styles/catalog_inner.module.css";
import Image from "next/image";
import noimage from "../../public/media/noimage.jpg";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { isFound, save, update } from "../../helpers/storage";
import { TranslationsContext } from "../../store/translations";

interface PageProps extends IProduct {
  other_products: IProduct[];
  images: { id: number; image: string }[];
}

export default function Page({
  product,
  categories,
}: {
  product: PageProps;
  categories: ICategory[];
}) {
  const router = useRouter();
  const [cImg, setCImg] = useState("");

  const [count, setCount] = useState(1);
  const [inCart, setInCart] = useState<boolean>(false);

  useEffect(() => {
    setCImg(product.images.length > 0 ? product.images[0].image : "");
  }, [router]);

  //   useEffect(() => {
  //     setInCart(isFound(product.id).boolean);
  //     setCount(isFound(product.id).count);
  //   }, [orders, router]);
  const { t } = useContext(TranslationsContext);

  return (
    <>
      <CustomHead
        title={product.title}
        desc={product.desc}
        canonical={`/product/${product.slug}`}
      />
      <Layout categories={categories} children={undefined}>
        {/* <section>
          <div className={`box ${styles.section_inner}`}>
            <div className={styles.product_images_wrapper}>
              <div className={styles.images_mainimg}>
                <Image
                  src={cImg ? cImg : noimage}
                  alt={product.title}
                  width={680}
                  height={500}
                  className="image"
                  priority
                />
              </div>
              <div>
                <Swiper slidesPerView={4} spaceBetween={16} speed={800}>
                  {product.images.length > 0
                    ? product.images.map((img) => {
                        return (
                          <SwiperSlide key={img.id}>
                            <div
                              className={
                                cImg === img.image
                                  ? `${styles.images_secondary} ${styles.active}`
                                  : styles.images_secondary
                              }
                              onClick={() => setCImg(img.image)}
                            >
                              <Image
                                src={img.image ? img.image : noimage}
                                alt={product.title}
                                className="image"
                                width={160}
                                height={115}
                                priority
                              />
                            </div>
                          </SwiperSlide>
                        );
                      })
                    : null}
                </Swiper>
              </div>
            </div>
            <div className={styles.product_content_wrapper}>
              <div className={styles.content_body}>
                <div>
                  <div className={styles.top}>
                    <p className={styles.title}>Caledonia</p>
                    <p className={styles.price}>{product.price} sum</p>
                  </div>
                  <button className={styles.buy_btn}>Купить</button>
                </div>
              </div>
              {product.details ? (
                <div
                  className={styles.content_table}
                  dangerouslySetInnerHTML={{ __html: product.details }}
                ></div>
              ) : null}
            </div>
          </div>
        </section> */}
        {/* {product.other_products.length > 0 ? (
          <section className="section">
            <div className="box section_inner">
              <div className="section_inner_top">
                <h3 className="section_title">{t["main.other_products"]}</h3>
                <Buttons
                  variant="blue"
                  prevClass="prev-product"
                  nextClass="next-product"
                />
              </div>
              <div>
                <Swiper
                  modules={[Navigation, Autoplay]}
                  speed={800}
                  navigation={{
                    prevEl: ".prev-product",
                    nextEl: ".next-product",
                  }}
                  autoplay={{ delay: 2000, disableOnInteraction: false }}
                  loop={true}
                  breakpoints={{
                    0: {
                      spaceBetween: 16,
                      slidesPerView: 1,
                    },
                    580: {
                      spaceBetween: 16,
                      slidesPerView: 2.4,
                    },
                    880: {
                      spaceBetween: 16,
                      slidesPerView: 3.4,
                    },
                    1200: {
                      spaceBetween: 24,
                      slidesPerView: 4.5,
                    },
                  }}
                >
                  {product.other_products.map((product) => {
                    return (
                      <SwiperSlide key={product.id}>
                        <ProductCard product={product} />
                      </SwiperSlide>
                    );
                  })}
                  {product.other_products.map((product) => {
                    return (
                      <SwiperSlide key={product.id}>
                        <ProductCard product={product} />
                      </SwiperSlide>
                    );
                  })}
                  {product.other_products.map((product) => {
                    return (
                      <SwiperSlide key={product.id}>
                        <ProductCard product={product} />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </section>
        ) : null} */}
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const product = await getSingleProduct(ctx.locale, ctx.query.slug);
  const categories = await getCategories(ctx.locale);
  return {
    props: { product, categories },
  };
}
