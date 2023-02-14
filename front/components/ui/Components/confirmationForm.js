import IconComponent from './iconComponent';

import styles from './confirmationForm.module.scss';

export default function ConfirmationForm({ room, onCancel, onConfirm}) {

  const roomsList = ['wohnzimmer', 'raumtrenner', 'küche', 'schlafzimmer', 'gang'];

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
              <div>Eine Anpassung der Option “Boden” wird auch in weiteren Räumen übernommen:</div>
              <ul>
                {roomsList.map((roomItem) => {
                  if (roomItem !== room) return <li>{roomItem}</li>
                })}
              </ul>
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
