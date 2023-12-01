import styles from "./image.module.css";
import Image from "next/image";
export default function ImageCategory({ category }: any) {
  return (
    <Image
      src={category.image}
      width={220}
      height={190}
      alt=""
      className={styles.image}
    />
  );
}
