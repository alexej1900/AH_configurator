import IconComponent from './iconComponent';
import styles from './contactBtn.module.scss';

export default function ContactBtn({small}) {

  return (
    <div className={`${styles.btn__getContacts} ${small && styles.btn__small}`}>
      <IconComponent name="person" color="#fff"/>
      <div className={`${styles.btn__getContacts_text}`}>
        {!small && <div>Kontakt</div> }
        {!small && <div>aufnehmen</div> }
      </div>
    </div>
  )
}
