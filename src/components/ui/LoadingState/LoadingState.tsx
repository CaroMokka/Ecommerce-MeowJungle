import styles from "./LoadingState.module.scss";

type LoadingStateProps = {
  message?: string;
};

function LoadingState({ message = "Cargando contenido…" }: LoadingStateProps) {
  return (
    <div className={styles["loading-state"]} role="status">
      <p className={styles["loading-state__message"]}>{message}</p>
    </div>
  );
}

export default LoadingState;