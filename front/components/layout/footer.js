import { useSelector } from 'react-redux';

import IconComponent from '../ui/Components/iconComponent';

import styles from './footer.module.scss';

export default function Footer() {

  const logo = useSelector(state => state.generalStates.logo);

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>

        <div className={styles.back__btn}>
          <IconComponent name="arrow" color="#3C6589"/>
          <p className={styles.back__btn_title}>Zurück zur Appenzeller Huus Website</p>
        </div>

        <div className={styles.footer__content}>
          <div className={styles.footer__content_links}>
            <a href="#" target='_blank'>
              <img className={styles.footer__content_links_logo} src='./AHLogo.svg' alt="summary" />
            </a>
            
            <div className={styles.footer__content_links_social}>
              <a href="#" target='_blank'>
                <IconComponent name="fb" color="#000"/>
              </a>
              <a href="#" target='_blank'>
                <IconComponent name="insta" color="#000"/>
              </a>
            </div>
          </div>

          <div className={styles.footer__content_contacts}>
            <div className={styles.footer__content_contacts_title}>Appenzeller Huus Gonten AG</div>
            <div className={styles.footer__content_contacts_address}>Dorfstrasse 40</div>
            <div className={styles.footer__content_contacts_address}>9108 Gonten</div>
            <div className={styles.footer__content_contacts_address}>Switzerland</div>
            <a className={styles.footer__content_contacts_data} href="info@appenzellerhuss.ch">
              <IconComponent name="mail" color="#000"/>
              <p>info@appenzellerhuss.ch</p>
            </a>
            <a className={styles.footer__content_contacts_data} href="tel:+41 44 55 66 77">
              <IconComponent name="phone" color="#000"/>
              <p>+41 44 55 66 77</p>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.footer__legals}>
        <a className={styles.footer__legals_link} href="#">Impressum </a>
        <a className={styles.footer__legals_link} href="#">AGB</a>
        <a className={styles.footer__legals_link} href="#">Datenschutz</a>
      </div>
    </footer>
  )
}
