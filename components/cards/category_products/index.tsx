import Link from "next/link";
import styles from "./category.module.css";
import { ICategory } from "../../../server/interfaces";
import Image from "next/image";

import ImageCategory from "../../utils/image";

export default function CategoryCardProducts({
  category,
  type,
}: {
  category: ICategory;
  type: string;
}) {
  return (
    <div
      className={`${styles.card} ${
        type === "white" ? styles.white : styles.grey
      }`}
    >
      <div className={styles.image_box}>
        <div className={styles.image_box_inner}>
          <Image
            src={category.image ? category.image : "/media/noimage.jpg"}
            alt=""
            width={300}
            height={300}
            className={styles.img}
          />
        </div>
      </div>
      <p className={styles.category_name}>{category.title}</p>
    </div>
  );
}
