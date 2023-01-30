import styles from './contactBtn.module.scss';

export default function ContactBtn({small}) {

  return (
    <div className={`${styles.btn__getContacts} ${small && styles.btn__small} center`}>
        {!small && <h4>Kontakt</h4> }
        {!small && <h5>aufnehmen</h5> }
    </div>
  )
}
