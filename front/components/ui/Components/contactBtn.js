import IconComponent from './iconComponent';
import styles from './contactBtn.module.scss';

export default function ContactBtn({small}) {

  return (
    <div className={`${styles.btn__getContacts} ${small && styles.btn__small}`}>
      <IconComponent name="person" color="#fff"/>
      <div className={`${styles.btn__getContacts_text}`}>
        {!small && <h4>Kontakt</h4> }
        {!small && <h5>aufnehmen</h5> }
      </div>
    </div>
  )
}
