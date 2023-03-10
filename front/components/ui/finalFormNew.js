import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { resetState } from '../../redux/actions';

import ReactPDF, { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

import { useRouter } from 'next/router';

import ConfirmationForm from './atoms/confirmationForm';
import IconComponent from './atoms/iconComponent';
import FinalFormButton from './atoms/finalFormButton';
import Button from './atoms/button';
import ContactForm from './contactForm';
import ShareForm from './shareForm';
import PdfPage from './pdfPage';

import styles from './finalFormNew.module.scss';

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
    dispatch(resetState());

    setTimeout(() => { 
      router.push('/');
     }, 500);
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
          <p className={styles.finalForm_header_description}>Speichern Sie die Zusammenfassung der Materialisierung Ihrer Wohnung für sich als PDF für eine persönliche Besprechung oder senden Sie Ihre konkrete Anfrage direkt an uns per Formular. </p>
          <p className={styles.finalForm_header_description}>Anschliessend wird Sie unser Vermarkter für die weiteren Schritte kontaktieren.</p>
        </div>

        <div className={`${styles.finalForm__buttons}`}>

          {/* <PDFDownloadLink document={<PdfPage image={isometry}/>} fileName="somename.pdf">
            {({ blob, url, loading, error }) =>
              <FinalFormButton title={ loading ? "Loading document..." : "PDF herunterladen"} iconName="download" iconColor="#3C6589"/>
            }
          </PDFDownloadLink> */}
          <FinalFormButton title={"PDF herunterladen"} iconName="download" iconColor="#3C6589"/>
          <FinalFormButton title="Konfiguration teilen" iconName="share" iconColor="#3C6589" clickFn={showShareForm}/>
          <FinalFormButton title="Kontakt aufnehmen" iconName="person" iconColor="#3C6589" clickFn={showContactForm}/>
        </div>
        {/* <PDFViewer>
          <PdfPage image={isometry}/>
        </PDFViewer> */}
      </section>

      <div className={`${styles.finalForm__reset}`}>
          <h3 className={styles.finalForm__reset_title}>Spiels noch einmal Sam.</h3>
          <div className={styles.finalForm__reset_subtitle}>Probieren Sie gerne auch weitere Variationen ihrer Traumwohnung aus.</div>
          <p className={styles.finalForm__reset_description}>Ihre aktuelle Konfiguration im PDF und dem zur Verfügung gestellten “Share”-Link bleibt dabei erhalten.</p>

          <div className={`${styles.resetBtn}`} title='RESET YOUR DATA'>
            <Button title="Neue Konfiguration" type="secondary" iconName="entry" iconColor="#fff" clickFn={() => setIsPopup(true)}/>
          </div>
        </div>

      {isPopup && <ConfirmationForm
                      onCancel={onCancel} 
                      onConfirm={onResetConfirm}
                      title={''}
                      child={<p>Durch die Bestätigung werden Sie zur Hauptseite weitergeleitet. Ihre vorherigen Einstellungen werden zurückgesetzt</p>}
                    />}

      {isContactFormVisible && <ContactForm onCancel={onCancel}/>}
      {isShareFormVisible && <ShareForm onCancel={onCancel}/>}
    </>
  )
}
