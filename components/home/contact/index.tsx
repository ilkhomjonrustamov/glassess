import styles from "./contact.module.css";
import { IMaskInput } from "react-imask";
import {
  glasses,
  men_glasses,
  unisex,
  women_glasses,
} from "../../../public/icons";
import { useContext, useState } from "react";
import { FormContext } from "../../../store/form";
import { IStoreObjectData } from "../../../server/interfaces";
import { storeOrders } from "../../../server/api";
import ReCAPTCHA from "react-google-recaptcha";
import { TranslationsContext } from "../../../store/translations";
import { SiteinfoContext } from "../../../store/siteinfo";
import noimage from "../../../public/media/noimage.jpg";
import Image from "next/image";
import Link from "next/link";
export default function ContactsHome() {
  const { isSuccess, setIsSuccess } = useContext(FormContext);
  const [isValid, setIsValid] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [city, setCity] = useState("");
  const { t } = useContext(TranslationsContext);
  const { siteinfo } = useContext(SiteinfoContext);
  const frames = [
    {
      img: glasses,
      title: "Обзор",
      link: "/oprav",
    },
    {
      img: women_glasses,
      title: "женские очки",
      link: "/products?gender=f",
    },
    {
      img: men_glasses,
      title: "Мужские очки",
      link: "/products?gender=m",
    },
    {
      img: unisex,
      title: "Очки унисекс",
      link: "/products?gender=u",
    },
  ];
  return (
    <section className={`${styles.container} section`}>
      <div className={`${styles.box} box`}>
        <div className={styles.topper}>
          <p className="section_title">Оправы для очков</p>
          <div className={styles.frames}>
            {frames.map((frame, id) => {
              return (
                <Link key={id} href={frame.link} className={styles.frame}>
                  {frame.img}
                  <p className={styles.frame_title}>{frame.title}</p>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="desktop">
          <div className={styles.bottom}>
            <p className={styles.section_title_contacts}>Остались вопросы?</p>
            <div className={styles.bottom_inner}>
              <div className={styles.bottom_inner_left}>
                <div className={styles.form_container}>
                  <form
                    className={styles.store_form}
                    onSubmit={(e) => {
                      e.preventDefault();
                      const data: IStoreObjectData = {
                        full_name: name,
                        phone_number: number,
                        email: email,
                        message: message,
                        city: city,
                        product: "",
                        size: 1,
                        color: 1,
                      };
                      storeOrders(data)
                        .then((res) => {
                          setIsSuccess(true);
                          setTimeout(() => {
                            setIsSuccess(false);
                            setCity("");
                            setEmail("");
                            setMessage("");
                            setName("");
                            setNumber("");
                          }, 2000);
                        })
                        .catch((e) => console.log(e));
                    }}
                  >
                    <div className={styles.form_body}>
                      <div className={styles.store_form_inputs}>
                        <input
                          type="text"
                          className={styles.store_input}
                          placeholder={`Имя*`}
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <input
                          type="email"
                          className={styles.store_input}
                          placeholder="E-mail"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />

                        <div className={styles.formwrapper}>
                          <span
                            className={`${
                              number.length > 0 ? styles.black : ""
                            }`}
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
                        <input
                          type="text"
                          className={styles.store_input}
                          placeholder="Город"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                      <textarea
                        cols={30}
                        rows={1}
                        placeholder="Сообщения"
                        className={`${styles.store_input} ${styles.textarea}`}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                    </div>
                    <div className={styles.form_buttons}>
                      <ReCAPTCHA
                        sitekey={`${process.env.NEXT_PUBLIC_SITEKEY}`}
                        onChange={() => setIsValid(true)}
                      />
                      <button
                        type="submit"
                        className={`${styles.submit} primary_btn`}
                      >
                        Отправить
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className={styles.map}>
                <div dangerouslySetInnerHTML={{ __html: siteinfo.map }}></div>
              </div>
            </div>
            <p className={styles.bottom_desc}>
              Нажав кнопку `&quot;` Отправить `&quot;`, вы подтверждаете, что
              даете компании свое согласие на обработку ваших персональных
              данных
            </p>
          </div>
        </div>
        <div className="mobile">
          <div className={styles.bottom}>
            <p className={styles.section_title_contacts}>Остались вопросы?</p>
            <div className={styles.bottom_inner}>
              <form
                className={styles.store_form}
                onSubmit={(e) => {
                  e.preventDefault();

                  const data: IStoreObjectData = {
                    full_name: name,
                    phone_number: number,
                    email: email,
                    message: message,
                    city: city,
                    product: "",
                    size: 1,
                    color: 1,
                  };

                  storeOrders(data)
                    .then((res) => {
                      setIsSuccess(true);

                      localStorage.setItem("orders", JSON.stringify([]));
                      setTimeout(() => {
                        setIsSuccess(false);
                      }, 2000);
                    })
                    .catch((e) => console.log(e));
                }}
              >
                <div className={styles.form_container}>
                  <div className={styles.store_form}>
                    <div className={styles.form_body}>
                      <div className={styles.store_form_inputs}>
                        <input
                          type="text"
                          className={styles.store_input}
                          placeholder={`Имя*`}
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <input
                          type="email"
                          className={styles.store_input}
                          placeholder="E-mail"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />

                        <div className={styles.formwrapper}>
                          <span
                            className={`${
                              number.length > 0 ? styles.black : ""
                            }`}
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
                        <input
                          type="text"
                          className={styles.store_input}
                          placeholder="Город"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                      <textarea
                        cols={30}
                        rows={1}
                        placeholder="Сообщения"
                        className={`${styles.store_input} ${styles.textarea}`}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className={styles.map}>
                  <div dangerouslySetInnerHTML={{ __html: siteinfo.map }}></div>
                </div>
                <div className={styles.form_buttons}>
                  <ReCAPTCHA
                    sitekey={`${process.env.NEXT_PUBLIC_SITEKEY}`}
                    onChange={() => setIsValid(true)}
                  />
                  <button
                    type="submit"
                    className={`${styles.submit} primary_btn`}
                  >
                    Отправить
                  </button>
                </div>
              </form>
            </div>
            <p className={styles.bottom_desc}>
              Нажав кнопку `&quot;`Отправить`&quot;`, вы подтверждаете, что
              даете компании свое согласие на обработку ваших персональных
              данных
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
