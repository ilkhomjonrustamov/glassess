import { IService } from "../../../server/interfaces";
import styles from "./service_card.module.css";
import Image from "next/image";
import Link from "next/link";
export default function ServiceCard({ service }: { service: IService }) {
  return (
    <Link href={`/service/${service.slug}`} className={styles.card}>
      <div className={styles.card_img}>
        {service.image ? (
          <Image
            src={service.image}
            width={100}
            height={100}
            alt="service_image"
            className="image"
          />
        ) : (
          <div className={styles.noimg_box}>
            <Image
              src={"/media/noimage.jpg"}
              width={100}
              height={100}
              alt="service_image"
              className={styles.noimage}
            />
          </div>
        )}
      </div>
      <div className={styles.info}>
        <p className={styles.title}>{service?.title}</p>
        <p className={styles.desc}>{service?.sub_text}</p>
      </div>
    </Link>
  );
}
