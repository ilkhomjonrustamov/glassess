import styles from "./footer.module.css";
import { email, location, phone } from "../../../public/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { TranslationsContext } from "../../../store/translations";
import { SiteinfoContext } from "../../../store/siteinfo";
import { ICategory } from "../../../server/interfaces";

export default function Footer({ categories }: { categories: ICategory[] }) {
  const { pathname } = useRouter();
  const { t } = useContext(TranslationsContext);
  const { siteinfo } = useContext(SiteinfoContext);
  const navigation = [
    {
      title: "Главная",
      path: "/",
      isActive: pathname === "/" ? true : false,
    },
    {
      title: "Каталог",
      path: "/products",
      isActive: pathname === "/products" ? true : false,
    },
    {
      title: "О нас",
      path: "/",
      isActive: pathname === "/about" ? true : false,
    },
    {
      title: "Линзы",
      path: "/products",
      isActive: pathname === "/products" ? true : false,
    },
    {
      title: "Оправы для очков",
      path: "/oprav",
      isActive: pathname === "/oprav" ? true : false,
    },
    {
      title: "Контакты",
      path: "/contacts",
      isActive: pathname === "/contacts" ? true : false,
    },
  ];

  let numbers: string[] = [];

  if (siteinfo.nbm != null && typeof siteinfo.nbm === "string") {
    numbers = siteinfo.nbm.split("| ");
  }

  return (
    <section className={styles.footer}>
      <div className="desktop">
        <div className={`box ${styles.footer_inner}`}>
          <p className={styles.logo}>Optikavision</p>
          <div className={styles.footer_inner_in}>
            <p className={styles.title}>Главная</p>
            <nav className={styles.nav_box}>
              {navigation.map((link, id) => {
                return (
                  <Link
                    key={id}
                    href={link.path}
                    className={
                      link.isActive === true
                        ? `${styles.footer_link} ${styles.active}`
                        : styles.footer_link
                    }
                  >
                    {link.title}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className={styles.footer_inner_in}>
            <p className={styles.title}>Категория</p>
            <nav className={styles.nav_box}>
              {categories.map((link, id) => {
                return (
                  <Link
                    key={id}
                    href={`/products?category=${link.id}`}
                    className={styles.footer_link}
                  >
                    {link.title}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className={styles.footer_inner_in}>
            <p className={styles.title}>Контакты</p>
            <nav className={`${styles.nav_box} ${styles.contact}`}>
              <div className={styles.numbers}>
                {phone}
                <div className={styles.numbers_inner}>
                  {numbers && numbers.length > 0
                    ? numbers.map((number, i) => {
                        return (
                          <a
                            key={i}
                            href={`tel: ${number}`}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.footer_link}
                          >
                            {number}
                          </a>
                        );
                      })
                    : null}
                </div>
              </div>
              <a href="#" className={`${styles.footer_link} `}>
                {location}
                <span className={styles.location}>{siteinfo.address}</span>
              </a>
              <a
                href={`mailto: ${siteinfo.email}`}
                target={"_blank"}
                rel="noreferrer"
                className={styles.footer_link}
              >
                {email} {siteinfo.email}
              </a>
            </nav>
          </div>
        </div>
      </div>
      <div className="mobile">
        <div className={`box ${styles.footer_inner}`}>
          <div
            className={`${styles.footer_inner_in} ${styles.footer_inner_mb_top}`}
          >
            <p className={styles.logo}>Optikavision</p>
            <nav className={`${styles.nav_box} ${styles.contact}`}>
              <div className={styles.numbers}>
                {phone}
                <div className={styles.numbers_inner}>
                  {numbers && numbers.length > 0
                    ? numbers.map((number, i) => {
                        return (
                          <a
                            key={i}
                            href={`tel: ${number}`}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.footer_link}
                          >
                            {number}
                          </a>
                        );
                      })
                    : null}
                </div>
              </div>
              <a
                href={`mailto: ${siteinfo.email}`}
                target={"_blank"}
                rel="noreferrer"
                className={styles.footer_link}
              >
                {email} {siteinfo.email}
              </a>
              <a href="#" className={`${styles.footer_link} `}>
                {location}
                <span className={styles.location}>{siteinfo.address}</span>
              </a>
            </nav>
          </div>
          <div className={styles.footer_inner_in}>
            <p className={styles.title}>Главная</p>
            <nav className={styles.nav_box}>
              {navigation.map((link, id) => {
                return (
                  <Link
                    key={id}
                    href={link.path}
                    className={
                      link.isActive === true
                        ? `${styles.footer_link} ${styles.active}`
                        : styles.footer_link
                    }
                  >
                    {link.title}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className={styles.footer_inner_in}>
            <p className={styles.title}>Категория</p>
            <nav className={styles.nav_box}>
              {categories.map((link, id) => {
                return (
                  <Link
                    key={id}
                    href={`/products?category=${link.id}`}
                    className={styles.footer_link}
                  >
                    {link.title}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
