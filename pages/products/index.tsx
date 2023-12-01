import Layout from "../../components/layout";
import { CustomHead } from "../../components/layout/head";
import {
  getAtributsColors,
  getAtributsForms,
  getAtributsMaterial,
  getAtributsSizes,
  getCategories,
  getFilteredProducts,
  getHomeCategories,
  getProducts,
} from "../../server/api";
import {
  ICategory,
  IColors,
  IForms,
  IMaterials,
  IProduct,
  ISizes,
} from "../../server/interfaces";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TranslationsContext } from "../../store/translations";
import styles from "../../styles/catalog.module.css";
import CategoryCardProducts from "../../components/cards/category_products";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { arrow_down, close, filter } from "../../public/icons";
import ProductCard from "../../components/cards/product";
export default function Page({
  products,
  categories,
  ctx,
  colors,
  forms,
  material,
  sizes,
  categoriesFooter,
}: {
  products: IProduct[];
  categories: ICategory[];
  ctx: any;
  colors: IColors[];
  forms: IForms[];
  material: IMaterials[];
  sizes: ISizes[];
  categoriesFooter: ICategory[];
}) {
  const router = useRouter();
  const { t } = useContext(TranslationsContext);
  const [materials, setMaterials] = useState("");
  const [size, setSize] = useState("");
  const [gender, setGender] = useState("");
  const [color, setColor] = useState("");
  const [form, setForm] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);

  const query = router.query;
  const fetchFilteredProducts = async () => {
    const newProducts = await getFilteredProducts(ctx, query);
    setFilterProducts(newProducts);
  };
  useEffect(() => {
    fetchFilteredProducts();
  }, [Object.keys(query)]);
  const sin = async (name: string, ids: number) => {
    await router.push({
      pathname: `/products`,
      query: {
        ...router.query,
        [name]: ids,
      },
    });
    fetchFilteredProducts();
  };
  return (
    <>
      <CustomHead title={"products"} desc="" canonical={`/products`} />
      <Layout categories={categoriesFooter}>
        <section className={styles.section}>
          <div className={styles.categories}>
            <Swiper
              slidesPerView={6}
              spaceBetween={18}
              breakpoints={{
                0: {
                  spaceBetween: 8,
                  slidesPerView: 1.5,
                },
                330: {
                  spaceBetween: 8,
                  slidesPerView: 1.8,
                },
                400: {
                  spaceBetween: 8,
                  slidesPerView: 2,
                },
                550: {
                  spaceBetween: 8,
                  slidesPerView: 3.1,
                },
                660: {
                  spaceBetween: 8,
                  slidesPerView: 3.8,
                },
                1024: {
                  spaceBetween: 11,
                  slidesPerView: 4.8,
                },
                1200: {
                  spaceBetween: 11,
                  slidesPerView: 6,
                },
                1350: {
                  spaceBetween: 18,
                  slidesPerView: 4.4,
                },
                1430: {
                  spaceBetween: 18,
                  slidesPerView: 4.7,
                },
                1450: {
                  spaceBetween: 18,
                  slidesPerView: 6,
                },
              }}
              className={`${styles.swiper} box`}
            >
              {categories.length > 0
                ? categories.map((category) => {
                    return (
                      <SwiperSlide
                        key={category.id}
                        className={styles.category_slide}
                        onClick={() => sin("category", category.id)}
                      >
                        <CategoryCardProducts
                          key={category.id}
                          category={category}
                          type="grey"
                        />
                      </SwiperSlide>
                    );
                  })
                : null}
            </Swiper>
          </div>
          <div className={styles.products}>
            <div className="box">
              <p className="section_title">Мужские солнцезащитные очки </p>
            </div>
            <div className={`${styles.filter_box} `}>
              <div className={`box ${styles.filter_box_inner} `}>
                <p className={styles.subtitle}>
                  Оправ {filterProducts.length}:{" "}
                </p>
                <div className={styles.filters}>
                  <button
                    className={`${styles.black} ${styles.subtitle}`}
                    onClick={() => {
                      setIsFilter(!isFilter);
                    }}
                  >
                    Фильтр <span className={styles.desktop}> {arrow_down}</span>
                    <span className={styles.mobile}>{filter}</span>
                  </button>
                </div>
                {isFilter ? (
                  <Filter
                    setIsFilter={setIsFilter}
                    product={products}
                    colors={colors}
                    forms={forms}
                    material={material}
                    sizes={sizes}
                    setColor={setColor}
                    setForm={setForm}
                    setMaterial={setMaterials}
                    setSize={setSize}
                    colorstate={color}
                    formstate={form}
                    materialstate={materials}
                    sizestate={size}
                  />
                ) : null}
              </div>
            </div>
            <div className={`${styles.products_inner} box`}>
              {filterProducts.length > 0
                ? filterProducts.map((product, id) => {
                    return (
                      <div key={id}>
                        <ProductCard product={product} />
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

const Filter = ({
  setIsFilter,
  product,
  colors,
  forms,
  material,
  sizes,
  setColor,
  setForm,
  setMaterial,
  setSize,
  colorstate,
  formstate,
  materialstate,
  sizestate,
}: {
  setIsFilter: any;
  product: any;
  colors: IColors[];
  forms: IForms[];
  material: IMaterials[];
  sizes: ISizes[];
  setColor: any;
  setForm: any;
  setMaterial: any;
  setSize: any;
  colorstate: any;
  formstate: any;
  materialstate: any;
  sizestate: any;
}) => {
  const router = useRouter();
  const [color_title, setColor_title] = useState("");
  return (
    <section className={styles.filter_modal_box}>
      <div className={styles.desktop}>
        <div className={styles.filter_model}>
          <div className={styles.filter}>
            <p className={styles.filter_title}>Форма</p>
            <div className={styles.filter_subtitles}>
              {forms.length > 0
                ? forms.map((form, id) => {
                    return (
                      <div key={id}>
                        <button
                          className={styles.filter_subtitle}
                          onClick={() => {
                            router.push({
                              pathname: `/products`,
                              query: {
                                ...router.query,
                                form: form.id,
                              },
                            });
                            setForm(form.id);
                          }}
                        >
                          {form.title}
                        </button>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
          <div className={styles.filter}>
            <p className={styles.filter_title}>Материал</p>
            <div className={styles.filter_subtitles}>
              {material.length > 0
                ? material.map((material, id) => {
                    return (
                      <div key={id}>
                        <button
                          className={styles.filter_subtitle}
                          onClick={() => {
                            router.push({
                              pathname: `/products`,
                              query: {
                                ...router.query,
                                material: material.id,
                              },
                            });
                            setMaterial(material.id);
                          }}
                        >
                          {material.title}
                        </button>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
          <div className={styles.filter}>
            <p className={styles.filter_title}>Размер</p>
            <div className={styles.filter_subtitles}>
              {sizes.length > 0
                ? sizes.map((sizes, id) => {
                    return (
                      <div key={id}>
                        <button
                          className={styles.filter_subtitle}
                          onClick={() => {
                            router.push({
                              pathname: `/products`,
                              query: {
                                ...router.query,
                                sizes: sizes.id,
                              },
                            });
                            setSize(sizes.id);
                          }}
                        >
                          {sizes.title}
                        </button>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
          <div className={styles.filter}>
            <p className={styles.filter_title}>Цвет</p>
            <div className={styles.filter_subtitles_color}>
              {colors.length > 0
                ? colors.map((colors, id) => {
                    return (
                      <div key={id}>
                        <button
                          className={styles.filter_subtitle}
                          onClick={() => {
                            router.push({
                              pathname: `/products`,
                              query: {
                                ...router.query,
                                colors: colors.id,
                              },
                            });
                            setColor(colors.title);
                          }}
                        >
                          {colors.title}
                        </button>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
          <button
            className={styles.close}
            onClick={() => {
              setIsFilter();
            }}
          >
            {close}
          </button>
        </div>
      </div>
      <div className={styles.mobile}>
        <div className={styles.filter_modal_mb}>
          <div className={styles.filter_top_mb}>
            <div
              className={styles.close_btn}
              onClick={() => {
                setIsFilter();
              }}
            >
              {close}
            </div>
            <p className={styles.filter_top_mb_title}>Фильтры</p>
          </div>
          <div className={styles.filters_mb}>
            <div className={styles.filter}>
              <p className={styles.filter_title}>Форма</p>

              <div className={styles.filter_subtitles}>
                {forms.length > 0
                  ? forms.map((form, id) => {
                      return (
                        <div
                          key={id}
                          className={`${styles.filter_subtitle_box} ${
                            formstate == form.id ? styles.active : null
                          }`}
                        >
                          <button
                            className={`${styles.filter_subtitle} `}
                            onClick={() => {
                              router.push({
                                pathname: `/products`,
                                query: {
                                  ...router.query,
                                  form: form.id,
                                },
                              });
                              setForm(form.id);
                            }}
                          >
                            {form.title}
                          </button>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
            <div className={styles.filter}>
              <p className={styles.filter_title}>Материал</p>
              <div className={styles.filter_subtitles}>
                {material.length > 0
                  ? material.map((material, id) => {
                      return (
                        <div
                          key={id}
                          className={`${styles.filter_subtitle_box} ${
                            materialstate == material.id ? styles.active : null
                          }`}
                        >
                          <button
                            className={`${styles.filter_subtitle} `}
                            onClick={() => {
                              router.push({
                                pathname: `/products`,
                                query: {
                                  ...router.query,
                                  material: material.id,
                                },
                              });
                              setMaterial(material.id);
                              materialstate = material.id;
                            }}
                          >
                            {material.title}
                          </button>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
            <div className={styles.filter}>
              <p className={styles.filter_title}>Размер</p>
              <div className={styles.filter_subtitles}>
                {sizes.length > 0
                  ? sizes.map((sizes, id) => {
                      return (
                        <div
                          key={id}
                          className={`${styles.filter_subtitle_box} ${
                            sizestate == sizes.id ? styles.active : null
                          }`}
                        >
                          <button
                            className={`${styles.filter_subtitle}`}
                            onClick={() => {
                              router.push({
                                pathname: `/products`,
                                query: {
                                  ...router.query,
                                  sizes: sizes.id,
                                },
                              });
                              setSize(sizes.id);
                              sizestate = sizes.id;
                            }}
                          >
                            {sizes.title}
                          </button>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
            <div className={styles.filter}>
              <p className={styles.filter_title}>Цвет</p>
              <Swiper
                slidesPerView={5.4}
                spaceBetween={9}
                className={styles.filter_subtitles_color}
              >
                {colors.length > 0
                  ? colors.map((colors, id) => {
                      return (
                        <SwiperSlide
                          key={id}
                          className={`${styles.filter_subtitle_color_box} ${
                            colors.id === colorstate ? styles.isActive : null
                          }`}
                        >
                          <button
                            style={{ background: colors.hex }}
                            className={`${styles.filter_subtitle_color} ${
                              colors.id === colorstate ? styles.isActive : null
                            }`}
                            onClick={() => {
                              router.push({
                                pathname: `/products`,
                                query: {
                                  ...router.query,
                                  colors: colors.id,
                                },
                              });
                              setColor(colors.id);
                              setColor_title(colors.title);
                            }}
                          ></button>
                        </SwiperSlide>
                      );
                    })
                  : null}
              </Swiper>
              <p className={styles.chosen_color}>Выбранно: {color_title}</p>
            </div>
          </div>{" "}
          <button
            className={`${styles.implement} `}
            onClick={() => {
              setIsFilter();
            }}
          >
            Применить
          </button>
        </div>
      </div>
    </section>
  );
};
export async function getServerSideProps(ctx: any, router: any) {
  const categories = await getCategories(ctx.locale);
  const products = await getProducts(ctx.locale);
  const categoriesFooter = await getHomeCategories(ctx.locale);
  const colors = await getAtributsColors();
  const forms = await getAtributsForms();
  const material = await getAtributsMaterial();
  const sizes = await getAtributsSizes();
  return {
    props: {
      categories,
      products,
      colors,
      forms,
      material,
      sizes,
      categoriesFooter,
    },
  };
}
