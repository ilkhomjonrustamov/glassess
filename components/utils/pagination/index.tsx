import Link from "next/link";
import styles from "./pagination.module.css";
import { useRouter } from "next/router";
import { chevron_right } from "../../../public/icons";

interface IPaginationComponent {
  path: string;
  setPage: Function;
  current: number;
  maximal: number;
}

export default function Pagination({
  path,
  setPage,
  current,
  maximal,
}: IPaginationComponent) {
  const router = useRouter();

  return (
    <div className={styles.pagination}>
      <button
        disabled={current - 1 < 1 ? true : false}
        style={{
          opacity: current - 1 < 1 ? "0.5" : "1",
          transform: "rotate(180deg)",
        }}
        className={styles.last_element}
        onClick={() => {
          router.push(`${path}?page=${current - 1}`);
          setPage(current - 1);
        }}
      >
        {chevron_right}
      </button>
      {(() => {
        const paginations = [];

        for (let i = 1; i <= maximal; i++) {
          paginations.push(
            <Link
              key={i}
              href={`${path}?page=${i}`}
              onClick={() => setPage(i)}
              className={
                i == current ? `${styles.btn} ${styles.active}` : styles.btn
              }
            >
              {i}
            </Link>
          );
        }

        return paginations;
      })()}
      <button
        disabled={current + 1 > maximal ? true : false}
        style={{ opacity: current + 1 > maximal ? "0.5" : "1" }}
        className={styles.last_element}
        onClick={() => {
          router.push(`${path}?page=${current + 1}`);
          setPage(current + 1);
        }}
      >
        {chevron_right}
      </button>
    </div>
  );
}
