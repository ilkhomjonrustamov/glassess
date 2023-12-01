import { useRouter } from "next/router";
import styles from "./header.module.css";
import Link from "next/link";
import { useContext, useState } from "react";
import { searchProducts } from "../../../server/api";
import { FormContext } from "../../../store/form";
import { TranslationsContext } from "../../../store/translations";
import { SiteinfoContext } from "../../../store/siteinfo";
import { useEffect } from "react";
import {
  close,
  email,
  hamburger,
  location,
  phone,
  search,
} from "../../../public/icons";
export default function Header() {
  const { pathname, locale, locales, asPath, push } = useRouter();
  const { setProducts, query, setQuery } = useContext(FormContext);
  const { siteinfo } = useContext(SiteinfoContext);
  const { t } = useContext(TranslationsContext);
  const [localesDropdown, setLocalesDropdown] = useState(false);
  const [numbersDropdown, setNumbersDropdown] = useState(false);
  const [productDropdown, setProductDropdown] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  let numbers: string[] = [];

  if (siteinfo.nbm != null && typeof siteinfo.nbm === "string") {
    numbers = siteinfo.nbm.split("| ");
  }
  useEffect(() => {
    if (pathname != "/search") {
      setQuery("");
    }
  }, [pathname]);
  const links = [
    {
      name: "Главная",
      link: "/",
      isActive: pathname === "/" ? true : false,
    },
    {
      name: "Каталог",
      link: "/products",
      isActive: pathname === "/products" ? true : false,
    },
    {
      name: "О нас",
      link: "#",
      isActive: pathname === "/about" ? true : false,
    },
    {
      name: "Линзы",
      link: "/products",
      isActive: pathname === "/lens" ? true : false,
    },
    {
      name: "Оправы для очков",
      link: "/oprav",
      isActive: pathname === "/oprav" ? true : false,
    },
    {
      name: "Контакты",
      link: "/contact",
      isActive: pathname === "/contact" ? true : false,
    },
  ];
  return (
    <header className={styles.header}>
      <div className="desktop">
        <div className={`${styles.header_top}`}>
          <div className={`box ${styles.header_top_inner}`}>
            <a href="#" className={styles.header_top_link}>
              {location} {siteinfo.address}
            </a>
            <a
              href={`mailto: ${siteinfo.email}`}
              target={"_blank"}
              rel="noreferrer"
              className={styles.header_top_link}
            >
              {email} {siteinfo.email}
            </a>
            <div className={styles.header_top_number}>
              {phone}
              {numbers && numbers.length > 0
                ? numbers.map((number, i) => {
                    return (
                      <a
                        key={i}
                        href={`tel: ${number}`}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.header_top_link}
                      >
                        {number}
                      </a>
                    );
                  })
                : null}
            </div>
            {/* <div className={styles.header_top_withdropdown}>
                <button
                  className={styles.another_wrapper}
                  onClick={() => setLocalesDropdown(!localesDropdown)}
                >
                  <span>{locale}</span>
                </button>
                <div
                  className={
                    localesDropdown
                      ? `${styles.dropdown} ${styles.show} ${styles.locales}`
                      : styles.dropdown
                  }
                >
                  {locales?.map((sl) => {
                    return (
                      <Link
                        key={sl}
                        href={asPath}
                        locale={sl}
                        onClick={() => setLocalesDropdown(false)}
                      >
                        {sl}
                      </Link>
                    );
                  })}
                </div>
              </div> */}
          </div>
        </div>
        <div className={`${styles.header_bottom} `}>
          <div className={`box ${styles.header_bottom_inner}`}>
            <Link href="/" className={`${styles.logo} `}>
              OptikaVision
            </Link>
            <nav className={styles.header_nav}>
              {links.map((link, id) => {
                return (
                  <Link
                    href={link.link}
                    key={id}
                    className={`${
                      link.isActive
                        ? `${styles.nav_link} ${styles.active}`
                        : styles.nav_link
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
            <button
              onClick={() => {
                setIsSearch(!isSearch);
              }}
            >
              {search}
            </button>
            {/* <form
              className={styles.search_wrapper}
              onSubmit={(e) => {
                e.preventDefault();
                searchProducts(query)
                  .then((r) => {
                    push("/search");
                    setProducts(r.results);
                  })
                  .catch((e) => console.log(e));
              }}
            >
              <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
              />

              <button type="submit">{search}</button>
            </form> */}
          </div>
        </div>
      </div>
      <div className="mobile">
        <div className={`${styles.header_bottom}`}>
          <div className={styles.header_bottom_top}>
            <Link href="/" className={`${styles.logo}`}>
              OptikaVision
            </Link>
            {/* <div className={styles.langchanger_wrapper}>
              <button onClick={() => setLocalesDropdown(!localesDropdown)}>
                {locale}
              </button>
              <div
                className={
                  localesDropdown
                    ? `${styles.dropdown} ${styles.show}`
                    : styles.dropdown
                }
              >
                {locales?.map((sl) => {
                  return (
                    <Link
                      key={sl}
                      href={asPath}
                      locale={sl}
                      onClick={() => setLocalesDropdown(false)}
                    >
                      {sl}
                    </Link>
                  );
                })}
              </div>
            </div> */}
          </div>
          <div className={styles.header_bottom_bottom}>
            <button
              className={styles.hamburger}
              onClick={() => setIsMenu(!isMenu)}
            >
              {isMenu ? close : hamburger}
            </button>
          </div>
        </div>
        {isMenu ? <MobileMenu /> : null}
      </div>
      {isSearch ? (
        <section className={styles.search}>
          <div className={`${styles.search_inner} box`}>
            <form
              className={styles.search_wrapper}
              onSubmit={(e) => {
                e.preventDefault();
                searchProducts(query)
                  .then((r) => {
                    push("/search");
                    setProducts(r.results);
                  })
                  .catch((e) => console.log(e));
                setTimeout(() => {
                  setIsSearch(false);
                }, 2000);
              }}
            >
              <button type="submit">{search}</button>
              <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
                autoFocus
              />
            </form>
            <button
              onClick={() => {
                setIsSearch(!isSearch);
              }}
            >
              {close}
            </button>
          </div>
          <div
            className={styles.space}
            onClick={() => {
              return setIsSearch(!isSearch);
            }}
          ></div>
        </section>
      ) : null}
    </header>
  );
}
const MobileMenu = () => {
  const { pathname } = useRouter();
  const { t } = useContext(TranslationsContext);
  const links = [
    {
      name: "Главная",
      link: "/",
      isActive: pathname === "/" ? true : false,
    },
    {
      name: "Каталог",
      link: "/products",
      isActive: pathname === "/products" ? true : false,
    },
    {
      name: "О нас",
      link: "#",
      isActive: pathname === "/about" ? true : false,
    },
    {
      name: "Линзы",
      link: "/products",
      isActive: pathname === "/lens" ? true : false,
    },
    {
      name: "Оправы для очков",
      link: "/oprav",
      isActive: pathname === "/oprav" ? true : false,
    },
    {
      name: "Контакты",
      link: "/contact",
      isActive: pathname === "/contact" ? true : false,
    },
  ];
  return (
    <section className={`${styles.mobile_menu}`}>
      <p className={styles.menu}>Меню</p>
      <nav className={styles.header_nav}>
        {links.map((link, id) => {
          return (
            <Link
              href={link.link}
              key={id}
              className={`${
                link.isActive
                  ? `${styles.nav_link} ${styles.active}`
                  : styles.nav_link
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
    </section>
  );
};
const Search = ({ setIsSearch }: { setIsSearch: any }) => {
  const { pathname, push } = useRouter();
  const { setProducts, query, setQuery } = useContext(FormContext);

  const { t } = useContext(TranslationsContext);

  useEffect(() => {
    if (pathname != "/search") {
      setQuery("");
    }
  }, [pathname]);
  return (
    <section className={styles.search}>
      <div className={`${styles.search_inner} box`}>
        <form
          className={styles.search_wrapper}
          onSubmit={(e) => {
            e.preventDefault();
            searchProducts(query)
              .then((r) => {
                push("/search");
                setProducts(r.results);
              })
              .catch((e) => console.log(e));
          }}
        >
          <button type="submit">{search}</button>
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
            autoFocus
          />
        </form>
        <button
          onClick={() => {
            setIsSearch();
          }}
        >
          {close}
        </button>
      </div>
    </section>
  );
};
