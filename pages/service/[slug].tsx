import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Autoplay } from "swiper/modules";
import Layout from "../../components/layout";
import { CustomHead } from "../../components/layout/head";
import { getCategories, getHomeCategories, getSingleService } from "../../server/api";
import { ICategory, IService } from "../../server/interfaces";
import Buttons from "../../components/utils/buttons";

import Image from "next/image";
import noimage from "../../public/media/noimage.jpg";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TranslationsContext } from "../../store/translations";
import Link from "next/link";
import { arrow_right } from "../../public/icons";
import styles from "../../styles/inner.module.css";
import ServiceCard from "../../components/cards/service";
interface PageProps extends IService {
  services: IService[];

  images: { id: number; image: string }[];
}

export default function Page({
  service,
  categories,
}: {
  service: PageProps;
  categories: ICategory[];
}) {
  const router = useRouter();

  const { t } = useContext(TranslationsContext);

  return (
    <>
      <CustomHead
        title={service.title}
        desc=""
        canonical={`/service/${service.slug}`}
      />
      <Layout categories={categories}>
        <section>
          <div className={`box ${styles.section_inner}`}>
            <section className="section_page">
              <div className={`box ${styles.minibox_mb}`}>
                <div className={styles.top}>
                  <div className={styles.img_box}>
                    <Image
                      src={service.image ? service.image : noimage}
                      width={100}
                      height={100}
                      alt="top"
                      className={styles.img}
                    />
                  </div>
                  <div className={styles.info_section}>
                    <p className={` ${styles.section_title}`}>
                      {service.title}
                    </p>
                    <p className={styles.desc}>{service.sub_text} </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
        {service.services.length > 0 ? (
          <section className={`section ${styles.section_inner}`}>
            <div className={`section_inner `}>
              <div className="section_inner_top box ">
                <h3 className="section_title">Other services</h3>
                <Buttons
                  variant="blue"
                  prevClass="prev-product"
                  nextClass="next-product"
                />
              </div>
              <div className={`${styles.swiper_wrapper} box`}>
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
                  className={styles.swiper}
                >
                  {service.services.map((service) => {
                    return (
                      <SwiperSlide key={service.id}>
                        <ServiceCard service={service} />
                      </SwiperSlide>
                    );
                  })}
                  {service.services.map((service) => {
                    return (
                      <SwiperSlide key={service.id}>
                        <ServiceCard service={service} />
                      </SwiperSlide>
                    );
                  })}
                  {service.services.map((service) => {
                    return (
                      <SwiperSlide key={service.id}>
                        <ServiceCard service={service} />
                      </SwiperSlide>
                    );
                  })}
                  {service.services.map((service) => {
                    return (
                      <SwiperSlide key={service.id}>
                        <ServiceCard service={service} />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </section>
        ) : null}
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const service = await getSingleService(ctx.locale, ctx.query.slug);
  const categories = await getHomeCategories(ctx.locale);
  return {
    props: { service, categories },
  };
}
