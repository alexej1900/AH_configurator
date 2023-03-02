
import styles from './loadingSpinner.module.scss';

export default function LoadingSpinner({full}) {
  return (
    <div className={`${styles.spinnerContainer} ${full && styles.full}`}>
     <img className={styles.loadingSpinner} src='./AHLogo.svg' alt="summary" />
      {/* <div className={styles.loadingSpinner}>
      </div> */}
    </div>
  );
}
