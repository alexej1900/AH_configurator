import FormHeader from './formHeader';
import Button from './button';

import styles from './confirmationForm.module.scss';

export default function ConfirmationForm({ onCancel, onConfirm, title, child, resetForm}) {

  return (
    <section className={`${styles.contactForm}`}>
      <div className={styles.contactForm__block}>
        <FormHeader title={title} clickFn={onCancel}/>
        <div className={styles.contactForm__content}>
          <div className={styles.contactForm__content_left}>
            <div className={styles.contactForm__content_title}>Hinweis:</div>
            <div className={styles.contactForm__content_text}>
              {child}
            </div>

            {resetForm 
              ? <div className={`${styles.form_buttons}  ${styles.form_buttons_reset}`}>
                  <Button title='Fortfahren' type="primary" clickFn={onCancel} iconName="arrow-right" iconColor="#fff" iconRight={true}/>
                  <Button title='Neue Konfiguration' type="secondary" clickFn={onConfirm} iconName="entry" iconColor="#fff"/>
                </div>
              : <div className={`${styles.form_buttons}`}>
                  <Button title='Abbrechen' type="secondary" clickFn={onCancel}/>
                  <Button title='Übernehmen' type="primary" clickFn={onConfirm}/>
                </div>
            }
          </div>
        </div> 
      </div> 
    </section>
  )
}
