import styles from "./toast.module.css";

interface IToast {
  variant: "success" | "error";
  toast: boolean;
  message: string;
}

export default function Toast({ variant, toast, message }: IToast) {
  switch (variant) {
    case "success":
      return (
        <span
          className={
            toast ? `${styles.success} ${styles.show}` : styles.success
          }
        >
          {message}
        </span>
      );
    case "error":
      return (
        <span
          className={toast ? `${styles.error} ${styles.show}` : styles.error}
        >
          {message}
        </span>
      );
  }
}
