import styles from "./hero.module.css";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { TranslationsContext } from "../../../store/translations";
export default function Intro() {
  const { t } = useContext(TranslationsContext);
  const [img1, setImg1] = useState(true);
  const [img2, setImg2] = useState(false);
  const [img3, setImg3] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setImg1(false);
      setImg2(true);
    }, 4000);

    setTimeout(() => {
      setImg2(false);
      setImg3(true);
    }, 6000);
  }, []);

  return (
    <section>
      <div className={styles.container}>
        <div className={` ${styles.desktop_box} `}>
          <div className={styles.desktop}>
            <div className={styles.left}>
              {img1 ? (
                <div className={styles.left1_img_box}>
                  <Image
                    src={"/media/hero1.png"}
                    alt="hero left image"
                    width={100}
                    height={100}
                    className={`${styles.left1_img} ${styles.img}`}
                  />
                </div>
              ) : (
                ""
              )}
              {img2 ? (
                <div className={styles.left2_img_box}>
                  <Image
                    src={"/media/hero2.png"}
                    alt="hero left image"
                    width={100}
                    height={100}
                    className={`${styles.left2_img} ${styles.img}`}
                  />
                </div>
              ) : (
                ""
              )}
              {img3 ? (
                <div className={styles.left3_img_box}>
                  <Image
                    src={"/media/hero3.png"}
                    alt="hero left image"
                    width={100}
                    height={100}
                    className={`${styles.left3_img} ${styles.img}`}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
            <div className={styles.right}>
              <Image
                src={"/media/hero_right.png"}
                alt="hero left image"
                width={100}
                height={100}
                className={styles.right_img}
              />
            </div>
          </div>
        </div>
        <div className={styles.mobile}>
          <div className={styles.img_box_mobile}>
            <Image
              className={`${styles.img} ${styles.img_mb}`}
              width={100}
              height={100}
              src={"/media/hero_mobile.png"}
              alt="hero img mobile"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
