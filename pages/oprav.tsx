import Link from "next/link";
import Layout from "../components/layout";
import { CustomHead } from "../components/layout/head";
import { getHomeCategories } from "../server/api";
import { ICategory } from "../server/interfaces";
import styles from "../styles/inner.module.css";
import Image from "next/image";
import { arrow_right } from "../public/icons";

export default function Oprav({ categories }: { categories: ICategory[] }) {
  return (
    <>
      <CustomHead title={` Glasses | Oprav`} desc={""} canonical={"/search"} />
      <Layout categories={categories}>
        <section className="section_page">
          <div className={`box ${styles.minibox_mb}`}>
            <div className={styles.top}>
              <div className={styles.img_box}>
                <Image
                  src={"/media/oprav.png"}
                  width={100}
                  height={100}
                  alt="top"
                  className={styles.img}
                />
              </div>
              <div className={styles.info_section}>
                <p className={` ${styles.section_title}`}>
                  Оправы для очков OptikaVision
                </p>
                <p className={styles.desc}>
                  Идеальное сочетание абсолютного качества
                  премиум-класса,вневременного дизайна и инновационных
                  технологий для оптимального комфорта при ношении.
                </p>
                <p className={styles.desc}>
                  Все это сочетается в неподвластном времени дизайне, который
                  всегда впечатляет тех, кто носит очки.
                </p>
              </div>
            </div>
            <div className={styles.others}>
              <Link className={styles.other} href={"/products/?gender=m"}>
                <div className={styles.color}></div>
                <div className={styles.img_box_other}>
                  <Image
                    src={"/media/gender_male.png"}
                    className={styles.img}
                    alt="gender photo"
                    width={100}
                    height={100}
                  />
                </div>
                <p className={styles.link}>
                  <span> Посмотреть все мужские очки </span>
                  {arrow_right}
                </p>
              </Link>
              <Link className={styles.other} href={"/products?gender=f"}>
                <div className={styles.color}></div>
                <div className={styles.img_box_other}>
                  <Image
                    src={"/media/gender_female.png"}
                    className={styles.img}
                    alt="gender photo"
                    width={100}
                    height={100}
                  />
                </div>
                <p className={styles.link}>
                  <span> Посмотреть все мужские очки </span>
                  {arrow_right}
                </p>
              </Link>{" "}
              <Link className={styles.other} href={"/products?gender=u"}>
                <div className={styles.color}></div>
                <div className={styles.img_box_other}>
                  <Image
                    src={"/media/gender_unisex.png"}
                    className={styles.img}
                    alt="gender photo"
                    width={100}
                    height={100}
                  />
                </div>
                <p className={styles.link}>
                  <span> Посмотреть все мужские очки </span>
                  {arrow_right}
                </p>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
export async function getServerSideProps(ctx: any) {
  const categories = await getHomeCategories(ctx.locale);
  return {
    props: { categories },
  };
}
