import { IMaskInput } from "react-imask";
import Layout from "../components/layout";
import { CustomHead } from "../components/layout/head";
import styles from "../styles/contact.module.css";
import ReCAPTCHA from "react-google-recaptcha";
import {
  email,
  facebook,
  instagram,
  phone,
  youtube,
  location,
} from "../public/icons";
import { FormContext } from "../store/form";
import { useContext, useState } from "react";
import Toast from "../components/utils/toast";
import { ICategory, IStoreObjectData } from "../server/interfaces";
import { getCategories, getHomeCategories, storeOrders } from "../server/api";
import { TranslationsContext } from "../store/translations";
import { SiteinfoContext } from "../store/siteinfo";

export default function Page({ categories }: { categories: ICategory[] }) {
  const { isSuccess, setIsSuccess } = useContext(FormContext);
  const [isValid, setIsValid] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [emails, setEmails] = useState("");
  const [message, setMessage] = useState("");
  const [city, setCity] = useState("");
  const { t } = useContext(TranslationsContext);
  const { siteinfo } = useContext(SiteinfoContext);

  let numbers: string[] = [];

  if (siteinfo.nbm != null) {
    numbers = siteinfo.nbm.split("| ");
  }
  const socialmedia = [
    {
      title: "youtube",
      path: siteinfo.youtube,
      icon: youtube,
    },
    {
      title: "facebook",
      path: siteinfo.facebook,
      icon: facebook,
    },
    {
      title: "instagram",
      path: siteinfo.instagram,
      icon: instagram,
    },
  ];
  return (
    <>
      <CustomHead
        title={` Glasses | Contacts`}
        desc={""}
        canonical={"/contact"}
      />
      <Layout categories={categories}>
        <section className={`${styles.section}`}>
          <div className={`box ${styles.section_inner}`}>
            <div className={styles.top}>
              <div className={styles.map}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27018.61222563285!2d69.27642009744224!3d41.319158668075445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef48a8ed4d0e9%3A0x3772abeffc72e7b8!2sInha%20University%20in%20Tashkent!5e0!3m2!1sen!2s!4v1698162642342!5m2!1sen!2s"
                  width="600"
                  height="450"
                  loading="lazy"
                ></iframe>
              </div>

              <div className={`${styles.info}`}>
                <a href="#" className={styles.contact_link}>
                  {location}{" "}
                  <p className={styles.address}>{siteinfo.address}</p>
                </a>
                <a
                  href={`mailto: ${siteinfo.email}`}
                  target={"_blank"}
                  rel="noreferrer"
                  className={styles.contact_link}
                >
                  {email} {siteinfo.email}
                </a>
                <div className={styles.contact_numbers}>
                  {phone}
                  <div className={styles.numbers_box}>
                    {numbers && numbers.length > 0
                      ? numbers.map((number, i) => {
                          return (
                            <a
                              key={i}
                              href={`tel: ${number}`}
                              target="_blank"
                              rel="noreferrer"
                              className={styles.contact_link}
                            >
                              {number}
                            </a>
                          );
                        })
                      : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.form_container}>
            <div className={`box ${styles.form_box}`}>
              <p className={styles.form_title}>Остались вопросы?</p>
              <form
                className={styles.form}
                onSubmit={(e) => {
                  e.preventDefault();
                  const data: IStoreObjectData = {
                    full_name: name,
                    phone_number: number,
                    email: emails.length > 0 ? emails : "noemail@gmail.com",
                    message: message.length > 0 ? message : "no message",
                    city: city.length > 0 ? city : "no city",
                    product: "",
                    color: 1,
                    size: 1,
                  };
                  storeOrders(data)
                    .then((res) => {
                      setIsSuccess(true);
                      setTimeout(() => {
                        setIsSuccess(false);
                        setCity("");
                        setEmails("");
                        setMessage("");
                        setName("");
                        setNumber("");
                      }, 2000);
                    })
                    .catch((e) => console.log(e));
                }}
              >
                <div className={styles.form_body}>
                  <div className={styles.form_inputs}>
                    <input
                      type="text"
                      className={styles.form_input}
                      placeholder={`Имя*`}
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      type="email"
                      className={styles.form_input}
                      placeholder="E-mail"
                      value={emails}
                      onChange={(e) => setEmails(e.target.value)}
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
                    <input
                      type="text"
                      className={styles.form_input}
                      placeholder="Город"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <textarea
                    cols={30}
                    rows={4}
                    placeholder="Сообщения"
                    className={`${styles.form_input} ${styles.textarea}`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                <div className={styles.form_buttons}>
                  <ReCAPTCHA
                    sitekey={`${process.env.NEXT_PUBLIC_SITEKEY}`}
                    onChange={() => setIsValid(true)}
                  />
                  <button type="submit" className={`${styles.submit} `}>
                    Отправить
                  </button>
                </div>
              </form>
              <p className={styles.instruction}>
                Нажав кнопку `&quot;`Отправить`&quot;`, вы подтверждаете, что
                даете компании свое согласие на обработку ваших персональных
                данных
              </p>
            </div>
          </div>
        </section>
      </Layout>
      <Toast
        variant="success"
        toast={isSuccess ? true : false}
        message={`Sent !`}
      />
    </>
  );
}
export async function getServerSideProps(ctx: any) {
  const categories = await getHomeCategories(ctx.locale);
  return {
    props: { categories },
  };
}
