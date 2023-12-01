import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { ICategory } from "../../../server/interfaces";
import CategoryCard from "../../cards/category";
import Buttons from "../../utils/buttons";
import styles from "./categories.module.css";
import { Navigation } from "swiper/modules";
export default function CategoriesHome({
  categories,
}: {
  categories: ICategory[];
}) {
  return (
    <section>
      <div className={styles.categories}>
        {categories.length > 0
          ? categories.map((categories, id) => {
              return (
                <div className={`${styles.categories_inner} `} key={id}>
                  <div className={`${styles.categories_inner_top} box`}>
                    <p className={styles.category_title}>{categories.title}</p>
                    <Buttons
                      variant="white"
                      prevClass={`prev-category${categories.id}`}
                      nextClass={`next-category${categories.id}`}
                    />
                  </div>
                  <div className={styles.categories_box}>
                    <style jsx>{`
                      .swiper {
                        overflow-x: visible;
                      }
                      swiper {
                        overflow-x: visible;
                      }
                    `}</style>
                    <Swiper
                      slidesPerView={6.5}
                      spaceBetween={11}
                      // style={{ overflowX: visible }}
                      modules={[Navigation]}
                      navigation={{
                        prevEl: `.prev-category${categories.id}`,
                        nextEl: `.next-category${categories.id}`,
                      }}
                      // loop={true}
                      breakpoints={{
                        0: {
                          spaceBetween: 8,
                          slidesPerView: 1.7,
                        },
                        330: {
                          spaceBetween: 8,
                          slidesPerView: 2,
                        },
                        550: {
                          spaceBetween: 8,
                          slidesPerView: 3.8,
                        },
                        1024: {
                          spaceBetween: 11,
                          slidesPerView: 4.5,
                        },
                        1200: {
                          spaceBetween: 11,
                          slidesPerView: 4.2,
                        },
                        1350: {
                          spaceBetween: 11,
                          slidesPerView: 4.9,
                        },
                        1450: {
                          spaceBetween: 11,
                          slidesPerView: 6.2,
                        },
                      }}
                      className={`${styles.swiper} box`}
                    >
                      {categories.children.length > 0
                        ? categories.children.map((category) => {
                            return (
                              <SwiperSlide
                                key={category.id}
                                className={styles.category_slide}
                              >
                                <CategoryCard
                                  key={category.id}
                                  category={category}
                                  type="white"
                                />
                              </SwiperSlide>
                            );
                          })
                        : null}
                      {categories.children.length > 0
                        ? categories.children.map((category) => {
                            return (
                              <SwiperSlide
                                key={category.id}
                                className={styles.category_slide}
                              >
                                <CategoryCard
                                  key={category.id}
                                  category={category}
                                  type="white"
                                />
                              </SwiperSlide>
                            );
                          })
                        : null}
                      {categories.children.length > 0
                        ? categories.children.map((category) => {
                            return (
                              <SwiperSlide
                                key={category.id}
                                className={styles.category_slide}
                              >
                                <CategoryCard
                                  key={category.id}
                                  category={category}
                                  type="white"
                                />
                              </SwiperSlide>
                            );
                          })
                        : null}
                      {categories.children.length > 0
                        ? categories.children.map((category) => {
                            return (
                              <SwiperSlide
                                key={category.id}
                                className={styles.category_slide}
                              >
                                <CategoryCard
                                  key={category.id}
                                  category={category}
                                  type="white"
                                />
                              </SwiperSlide>
                            );
                          })
                        : null}
                      {categories.children.length > 0
                        ? categories.children.map((category) => {
                            return (
                              <SwiperSlide
                                key={category.id}
                                className={styles.category_slide}
                              >
                                <CategoryCard
                                  key={category.id}
                                  category={category}
                                  type="white"
                                />
                              </SwiperSlide>
                            );
                          })
                        : null}
                      {categories.children.length > 0
                        ? categories.children.map((category) => {
                            return (
                              <SwiperSlide
                                key={category.id}
                                className={styles.category_slide}
                              >
                                <CategoryCard
                                  key={category.id}
                                  category={category}
                                  type="white"
                                />
                              </SwiperSlide>
                            );
                          })
                        : null}
                      {categories.children.length > 0
                        ? categories.children.map((category) => {
                            return (
                              <SwiperSlide
                                key={category.id}
                                className={styles.category_slide}
                              >
                                <CategoryCard
                                  key={category.id}
                                  category={category}
                                  type="white"
                                />
                              </SwiperSlide>
                            );
                          })
                        : null}
                    </Swiper>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </section>
  );
}
