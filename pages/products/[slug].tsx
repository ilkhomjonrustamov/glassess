import Layout from "../../components/layout";
import styles from "../../styles/product_inner.module.css";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TranslationsContext } from "../../store/translations";
import { ICategory, IProduct, IStoreObjectData } from "@/server/interfaces";
import { CustomHead } from "@/components/layout/head";
import { getCategories, getSingleProduct, storeOrders } from "@/server/api";
import Buttons from "@/components/utils/buttons";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import ProductCard from "@/components/cards/product";
import noimage from "../../public/media/noimage.jpg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { arrow_left } from "@/public/icons";
import Link from "next/link";
import { IMaskInput } from "react-imask";
import { FormContext } from "@/store/form";
import Toast from "../../components/utils/toast/index";

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
  const [colorName, setColorName] = useState("");
  const [color, setColor] = useState(-1);
  const [size, setSize] = useState(-1);
  const [buypop, setBuypop] = useState(false);
  const { isSuccess, setIsSuccess } = useContext(FormContext);
  const [isValid, setIsValid] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  // useEffect(() => {
  //   setCImg(product.images.length > 0 ? product.images[0].image : "");
  // }, [router]);
  //   useEffect(() => {
  //     setInCart(isFound(product.id).boolean);
  //     setCount(isFound(product.id).count);
  //   }, [orders, router]);
  const { t } = useContext(TranslationsContext);
  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + "</span>";
    },
  };
  return (
    <>
      <CustomHead
        title={product.title}
        desc={product.desc}
        canonical={`/product/${product.slug}`}
      />
      <Layout categories={categories}>
        <section>
          <div className={`box ${styles.section_inner}`}>
            <div className={styles.swiper_part}>
              <div className={styles.buttons}>
                <button
                  className={`${styles.btn} prev-productimg`}
                  style={{ transform: "rotate(180deg)" }}
                >
                  {arrow_left}
                </button>
                <button className={`${styles.btn} next-productimg`}>
                  {arrow_left}
                </button>
              </div>
              <Swiper
                slidesPerView={1}
                spaceBetween={16}
                navigation={{
                  prevEl: ".prev-productimg",
                  nextEl: ".next-productimg",
                }}
                pagination={pagination}
                modules={[Navigation, Pagination]}
                className={styles.swiper}
              >
                {product.images.length > 0 ? (
                  product.images.map((img, id) => {
                    return (
                      <SwiperSlide className={styles.SwiperSlide} key={id}>
                        <div className={styles.img_box}>
                          <Image
                            src={img.image ? img.image : noimage}
                            alt={product.title}
                            className={`${styles.img} image`}
                            width={160}
                            height={115}
                            priority
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })
                ) : (
                  <SwiperSlide className={styles.SwiperSlide}>
                    <div className={styles.img_box}>
                      <Image
                        src={noimage}
                        alt={product.title}
                        className={`${styles.img} image ${styles.noimg}`}
                        width={160}
                        height={115}
                        priority
                      />
                    </div>
                  </SwiperSlide>
                )}
              </Swiper>
            </div>
            <div className={styles.product_content_wrapper}>
              <div className={styles.content_body}>
                <div className={styles.title_section}>
                  <div className={styles.title_box_inner}>
                    <p className={styles.title}>Caledonia</p>
                    <p className={styles.price}>{product.price} sum</p>
                  </div>
                  <button
                    className={styles.buy_btn}
                    onClick={() => {
                      setBuypop(true);
                    }}
                  >
                    Купить
                  </button>
                </div>
                <div className={styles.sizes_box}>
                  <p className={styles.subtitle}>Price</p>
                  <div className={styles.sizes_inner_box}>
                    {product.sizes.length > 0
                      ? product.sizes.map((sizes, id) => {
                          return (
                            <div
                              className={`${styles.size} ${
                                sizes.id === size ? styles.active : null
                              }`}
                              key={id}
                              onClick={() => {
                                setSize(sizes.id);
                              }}
                            >
                              {sizes.title}
                            </div>
                          );
                        })
                      : null}
                  </div>
                </div>
                <div className={styles.colors_box}>
                  <div className={styles.colors_title_box}>
                    <p className={styles.subtitle}>Colors</p>
                    <p className={styles.color_desc}>{colorName}</p>
                  </div>
                  <div className={styles.colors_inner_box}>
                    {product.colors.length > 0
                      ? product.colors.map((colors, id) => {
                          return (
                            <div
                              className={`${styles.color_box} ${
                                colors.id === color ? styles.active : null
                              } `}
                              key={id}
                            >
                              <div
                                className={`${styles.color} `}
                                style={{ background: `${colors.hex}` }}
                                onClick={() => {
                                  setColorName(colors.title);
                                  setColor(colors.id);
                                }}
                              ></div>
                            </div>
                          );
                        })
                      : null}
                  </div>
                </div>
              </div>
              <div className={styles.desc_title_box}>
                <p className={styles.subtitle}>Описания</p>
              </div>
              {product.desc ? (
                <div
                  className={styles.content_table}
                  dangerouslySetInnerHTML={{ __html: product.desc }}
                ></div>
              ) : null}
              {product.includes ? (
                <div className={styles.includes}>
                  <p className={styles.includes_title}>Включает в себя:</p>{" "}
                  <div
                    className={styles.content_table}
                    dangerouslySetInnerHTML={{ __html: product.includes }}
                  ></div>
                </div>
              ) : null}
              <button
                className={`${styles.buy_btn_mb} `}
                onClick={() => {
                  setBuypop(true);
                }}
              >
                Купить
              </button>
            </div>
          </div>
        </section>
        {product.other_products.length > 0 ? (
          <section className={`section ${styles.other_products}`}>
            <div className="box section_inner">
              <div className={styles.other_products_top_title_section}>
                <h3 className="section_title">Похожие продукты</h3>
                <Link href={"/products"} className={styles.link_other_products}>
                  Посмотреть все
                </Link>
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
                      spaceBetween: 9,
                      slidesPerView: 1,
                    },
                    580: {
                      spaceBetween: 9,
                      slidesPerView: 1.4,
                    },
                    880: {
                      spaceBetween: 9,
                      slidesPerView: 2,
                    },
                    1200: {
                      spaceBetween: 9,
                      slidesPerView: 3,
                    },
                  }}
                  className={styles.swiper_others}
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
        ) : null}
      </Layout>
      {buypop ? (
        <div className={styles.buy_popup}>
          <div
            className={styles.space}
            onClick={() => {
              setBuypop(false);
            }}
          ></div>
          <div className={styles.buy_popup_inner}>
            <p className={styles.buy_popup_title}>
              Оставьте свои данные и мы вам перезвоним
            </p>

            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
                const data: IStoreObjectData = {
                  full_name: name,
                  phone_number: number,
                  email: "rilhom21@gmail.com",
                  message: message,
                  city: "city",
                  product: "",
                  size: 1,
                  color: 1,
                };
                storeOrders(data)
                  .then((res) => {
                    setIsSuccess(true);
                    setTimeout(() => {
                      setIsSuccess(false);
                      setBuypop(false);
                      setMessage("");
                      setName("");
                      setNumber("");
                      setColorName("");
                      setColor(-1);
                      setSize(-1);
                    }, 2000);
                  })
                  .catch((e) => console.log(e));
              }}
            >
              <div className={styles.form_inner}>
                <div className={styles.form_top}>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder={`Имя*`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div className={styles.formwrapper_number}>
                    <span
                      className={`${number.length > 0 ? styles.black : ""}`}
                    >
                      +998
                    </span>
                    <IMaskInput
                      className={styles.number}
                      type="text"
                      mask={"(00) 000 00 00"}
                      unmask={true}
                      placeholder=" 33 571 46 56"
                      required
                      value={number}
                      onChange={(e) => setNumber(e.currentTarget.value)}
                    />
                  </div>
                </div>
                <input
                  type="text"
                  className={styles.input}
                  placeholder={`Комментарии`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />{" "}
                <button
                  type="submit"
                  className={`${styles.submit} primary_btn `}
                >
                  Отправить
                </button>
              </div>
              <button
                type="submit"
                className={`${styles.submit} ${styles.buy_btn_mb_open} primary_btn`}
              >
                Отправить
              </button>
            </form>
          </div>
        </div>
      ) : null}
      <Toast
        variant="success"
        toast={isSuccess ? true : false}
        message={`Sent !`}
      />
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
