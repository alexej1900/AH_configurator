
import styles from './successMessage.module.scss';

export default function SuccessMessage({text, showMessage}) {

  return (
    <div className={`${styles.success__message}  ${showMessage && styles.active}`}  >
      <p>{text}</p>
    </div>   
  )
}
