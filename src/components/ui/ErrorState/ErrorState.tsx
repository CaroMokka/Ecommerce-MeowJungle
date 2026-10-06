import styles from "./ErrorState.module.scss";

type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

function ErrorState({
  message = "Ocurrió un problema inesperado. Intentá de nuevo.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className={styles["error-state"]} role="alert">
      <p className={styles["error-state__message"]}>{message}</p>
      {onRetry && (
        <button
          type="button"
          className={styles["error-state__retry"]}
          onClick={onRetry}
        >
          Reintentar
        </button>
      )}
    </div>
  );
}

export default ErrorState;