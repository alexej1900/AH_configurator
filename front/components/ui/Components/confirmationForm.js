import IconComponent from './iconComponent';

import styles from './confirmationForm.module.scss';

export default function ConfirmationForm({ onCancel, onConfirm, child}) {

  return (
    <section className={`${styles.contactForm}`}>
      <div className={styles.contactForm__block}>
        <div className={styles.contactForm__header}>
          <div>Zimmerübergreifende Option</div>
          <div className={styles.contactForm__closeBtn} onClick={onCancel}>
            <IconComponent name="close" color="#fff"/>
          </div>
        </div> 

        <div className={styles.contactForm__content}>
          <div className={styles.contactForm__content_left}>
            <div className={styles.contactForm__content_title}>Hinweis:</div>
            <div className={styles.contactForm__content_text}>
              {child}
            </div>
            <div className={`${styles.form_buttons}`}>
              <button className={`${styles.form_button} ${styles.button__cancel}`} onClick={onCancel}>Abbrechen</button>
              <button className={`${styles.form_button} ${styles.button__confirm}`} onClick={onConfirm}>Übernehmen</button>
            </div>
          </div>
        </div> 
      </div> 
    </section>
  )
}
