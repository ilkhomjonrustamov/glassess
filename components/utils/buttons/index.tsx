import { arrow_left, hugearrow } from "../../../public/icons";
import styles from "./buttons.module.css";

interface ComponentProps {
  variant: "blue" | "white";
  prevClass: string;
  nextClass: string;
}

export default function Buttons({
  variant,
  prevClass,
  nextClass,
}: ComponentProps) {
  return (
    <div className={styles.buttons}>
      <button
        className={`${styles.btn} ${prevClass} ${
          variant === "white" ? styles.white : styles.blue
        }`}
        style={{ transform: "rotate(180deg)" }}
      >
        {arrow_left}
      </button>
      <button
        className={`${styles.btn} ${nextClass} ${
          variant === "white" ? styles.white : styles.blue
        }`}
      >
        {arrow_left}
      </button>
    </div>
  );
}
