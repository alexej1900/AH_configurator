import { useSelector } from 'react-redux';

import styles from './footer.module.scss';

export default function Footer() {

  const logo = useSelector(state => state.generalStates.logo);

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
          <div className={`${styles.info} ${styles.footer__block}`}>
            <p>Calydo AG</p> <br />
            <p>Sennweidstrasse 35</p>
            <p>6312 SteinhausenSwitzerland</p><br />
            <p>+41 41 748 44 11</p><br />
            {/* <a className={styles.mail} href="mailto:info@calydo.com">info@calydo.com</a> */}
          </div>
          <div className={`${styles.logo__container} ${styles.footer__block}`}>

            <p>Entwickelt von</p>
            <a href="https://www.calydo.com/" target="_blank"><img src={'/logo.svg'} layout="fixed" /></a>
          </div>
          <div className={`${styles.contacts} ${styles.footer__block}`}>
            <div className={styles.social}>
              <img src={"/youtube.svg"} width="32" height="32"/>
              <img src={"/twitter.svg"} width="32" height="32"/>
              <img src={"/facebook.svg"} width="32" height="32"/>
              <img src={"/linked.svg"} width="32" height="32"/>
            </div>

            <div className={styles.member}>
              <p>Member of the </p>
              <strong>Brand Leadership Circle</strong>

              <div className={styles.menu}>
                <a href="javascript.void();">AGB </a>
                <a href="javascript.void();">Impressum </a>
                <a href="javascript.void();">Datenschutz </a>
                <a href="javascript.void();">Kontaktfeld (Vermarkter)  </a>
              </div>
            </div>
        </div>
      </div>
    </footer>
  )
}
