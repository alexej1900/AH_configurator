
import styles from './loadingSpinner.module.scss';

export default function LoadingSpinner({full}) {
  return (
    <div className={`${styles.spinnerContainer} ${full && styles.full}`}>
      <div className={styles.loadingSpinner}>
      </div>
    </div>
  );
}
