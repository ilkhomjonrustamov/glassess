import styles from "./service.module.css";
import Buttons from "../../utils/buttons/index";
import Link from "next/link";
import ServiceCard from "../../cards/service";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { IService } from "../../../server/interfaces";
export default function Services({ services }: { services: IService[] }) {
  return (
    <section className={`section ${styles.section}`}>
      <div className={`${styles.topper} box`}>
        <div className={styles.top_left}>
          <p className="section_title">Что такое OptikaVision</p>
          <p className={styles.desc}>
            Современная оптика с дружеским сервисом и магазинами в ТАШКЕНТЕ
          </p>
        </div>
        <Buttons
          variant={"blue"}
          prevClass={`prev-service`}
          nextClass={`next-service`}
        />
      </div>
      <div className={`desktop ${styles.service_desktop}`}>
        {" "}
        <div className={styles.services}>
          <div className={styles.services_left}>
            <p className={styles.service_title}>
              OptikaVision - Это удобный интерфейс, актуальный дизайн, понятная
              услуга и человеческий сервис
            </p>
            <p className={styles.service_desc}>
              Производим оправы и солнцезащитные очки под своей маркой,
              оказываем полный спектр услуг по линзам, работаем в интерьерах
            </p>
            <Link href={"/"} className={styles.service_link}>
              Узнать больше
            </Link>
          </div>
          <Swiper
            slidesPerView={4.21}
            // loop={true}
            spaceBetween={24}
            className={styles.swiper}
            modules={[Navigation]}
            navigation={{
              prevEl: `.prev-service`,
              nextEl: `.next-service`,
            }}
            breakpoints={{
              0: {
                spaceBetween: 8,
                slidesPerView: 1.7,
              },
              330: {
                spaceBetween: 8,
                slidesPerView: 1,
              },
              550: {
                spaceBetween: 8,
                slidesPerView: 2,
              },
              1024: {
                spaceBetween: 11,
                slidesPerView: 2,
              },
              1200: {
                spaceBetween: 16,
                slidesPerView: 3,
              },
              1350: {
                spaceBetween: 24,
                slidesPerView: 4.1,
              },
              1450: {
                spaceBetween: 24,
                slidesPerView: 4.2,
              },
            }}
          >
            <SwiperSlide>
              <></>
            </SwiperSlide>
            {services.length > 0
              ? services.map((services, id) => {
                  return (
                    <SwiperSlide key={id}>
                      <ServiceCard service={services} />
                    </SwiperSlide>
                  );
                })
              : null}
            {services.length > 0
              ? services.map((services, id) => {
                  return (
                    <SwiperSlide key={id}>
                      <ServiceCard service={services} />
                    </SwiperSlide>
                  );
                })
              : null}
            {services.length > 0
              ? services.map((services, id) => {
                  return (
                    <SwiperSlide key={id}>
                      <ServiceCard service={services} />
                    </SwiperSlide>
                  );
                })
              : null}
            {services.length > 0
              ? services.map((services, id) => {
                  return (
                    <SwiperSlide key={id}>
                      <ServiceCard service={services} />
                    </SwiperSlide>
                  );
                })
              : null}
            {services.length > 0
              ? services.map((services, id) => {
                  return (
                    <SwiperSlide key={id}>
                      <ServiceCard service={services} />
                    </SwiperSlide>
                  );
                })
              : null}
          </Swiper>
        </div>
      </div>
      <div className="mobile box">
        <div className={styles.services_mb}>
          <div className={styles.service1_mb}>
            <p className={styles.service_title}>
              OptikaVision - Это удобный интерфейс, актуальный дизайн, понятная
              услуга и человеческий сервис
            </p>
            <p className={styles.service_desc}>
              Производим оправы и солнцезащитные очки под своей маркой,
              оказываем полный спектр услуг по линзам, работаем в интерьерах
            </p>
            <Link href={"/"} className={styles.service_link}>
              Узнать больше
            </Link>
          </div>
          {services.length > 0
            ? services.map((services, id) => {
                return (
                  <div key={id}>
                    <ServiceCard service={services} />
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </section>
  );
}
