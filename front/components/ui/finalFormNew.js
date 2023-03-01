import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { resetState } from '../../redux/actions';

import ReactPDF, { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

import { useRouter } from 'next/router';

import ConfirmationForm from './Components/confirmationForm';
import IconComponent from './Components/iconComponent';
import FinalFormButton from './Components/finalFormButton';
import ContactForm from './contactForm';
import ShareForm from './shareForm';

import styles from './finalFormNew.module.scss';
import PdfPage from './pdfPage';

export default function FinalFormNew({isometry}) {

  const [isPopup, setIsPopup] = useState(false);
  const [isContactFormVisible, setIsContactFormVisible] = useState(false);
  const [isShareFormVisible, setIsShareFormVisible] = useState(false);

  const { apartSize } = useSelector(state => state);

  // console.log('apartStyle.image.url', apartSize.image.url)

  const router = useRouter();
  const dispatch = useDispatch();

  const showPopup = () => setIsPopup(true);

  const showContactForm = () => setIsContactFormVisible(true);
  const showShareForm = () => setIsShareFormVisible(true);

  const onCancel = () => {
    setIsPopup(false);
    setIsContactFormVisible(false);
    setIsShareFormVisible(false);
  }

  const onResetConfirm = () => {
    setIsPopup(false);
    router.push('/');

    setTimeout(() => { 
      dispatch(resetState());
     }, 0);
  }

  const savePdf = () => {
    ReactPDF.render(<PdfPage />, `example.pdf`)
  }

  return (
    <>
      <section className={`${styles.finalForm}`}>
        <div className={styles.finalForm_header}>
          <h3 className={styles.finalForm_header_title}>Herzlichen Glückwunsch!</h3>
          <div className={styles.finalForm_header_subtitle}>Sie sind Ihrer Traumwohnung einen Schritt näher.</div>
          <div className={styles.finalForm_header_description}>Speichern Sie die Zusammenfassung der Materialisierung Ihrer Wohnung für sich als PDF für eine persönliche Besprechung oder senden Sie Ihre konkrete Anfrage direkt an uns per Formular. </div>
          <div className={styles.finalForm_header_description}>Anschliessend wird Sie unser Vermarkter für die weiteren Schritte kontaktieren.</div>
        </div>

        <div className={`${styles.finalForm__buttons}`}>

          <PDFDownloadLink document={<PdfPage image={isometry}/>} fileName="somename.pdf">
            {({ blob, url, loading, error }) =>
              <FinalFormButton title={ loading ? "Loading document..." : "PDF herunterladen"} iconName="download" iconColor="#3C6589"/>
            }
          </PDFDownloadLink>
          {/* <FinalFormButton title={"PDF herunterladen"} iconName="download" iconColor="#3C6589"/> */}
          <FinalFormButton title="Konfiguration teilen" iconName="share" iconColor="#3C6589" clickFn={showShareForm}/>
          <FinalFormButton title="Kontakt aufnehmen" iconName="person" iconColor="#3C6589" clickFn={showContactForm}/>
        </div>
        {/* <PDFViewer>
          <PdfPage image={isometry}/>
        </PDFViewer> */}

        <div className={`${styles.finalForm__reset}`}>
          <div className={`${styles.finalForm__reset_text}`}>
            <p>Sie möchten die Wohnung nochmal komplett neu zusammenstellen? </p>
            <p>Kein Problem. Nutzen Sie einfach den Reset Button und Sie gelangen zurück auf die Startseite. </p>
          </div>
          <div className={`${styles.resetBtn}`} onClick={() => setIsPopup(true)} title='RESET YOUR DATA'>
            RESET <IconComponent name="reset" color="#fff"/>
          </div>
        </div>

      </section>

      {isPopup && <ConfirmationForm
                      onCancel={onCancel} 
                      onConfirm={onResetConfirm}
                      title={''}
                      child={<div>Durch die Bestätigung werden Sie zur Hauptseite weitergeleitet. Ihre vorherigen Einstellungen werden zurückgesetzt</div>}
                    />}

      {isContactFormVisible && <ContactForm onCancel={onCancel}/>}
      {isShareFormVisible && <ShareForm onCancel={onCancel}/>}
    </>
  )
}
