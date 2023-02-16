import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { resetState } from '../../redux/actions';

import { useRouter } from 'next/router';

import { useMutation } from '@apollo/client';

import madeShortUrl from '../../utils/madeShortUrl';
import checkObjIsEmpty from '../../utils/checkObjIsEmpty';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import serialize from '../../utils/serialize';

import { saveData } from '../../gql/index';

import Popup from './Components/popup';
import LoadingSpinner from './Components/loadingSpinner';
import IconComponent from './Components/iconComponent';
import FinalFormButton from './Components/finalFormButton';
import ContactForm from './contactForm';
import ShareForm from './shareForm';

import styles from './finalFormNew.module.scss';

export default function FinalFormNew() {

  const [isPopup, setIsPopup] = useState(false);
  const [isContactFormVisible, setIsContactFormVisible] = useState(false);
  const [isShareFormVisible, setIsShareFormVisible] = useState(true);
  const [formFilled, setFormFilled] = useState(false);

  const [formValue, setFormValue] = useState(
    { name: '',
      email: '',
      text: ''
    });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [link, setLink] = useState('');
  const [pdfData, setPdfData] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [dataIsLoading, setDataIsLoading] = useState(false);

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
          <FinalFormButton title="Konfiguration teilen" iconName="download" iconColor="#3C6589" clickFn={showPopup}/>
          <FinalFormButton title="Konfiguration teilen" iconName="share" iconColor="#3C6589" clickFn={showShareForm}/>
          <FinalFormButton title="Konfiguration teilen" iconName="person" iconColor="#3C6589" clickFn={showContactForm}/>
        </div>

        <p>Sie möchten die Wohnung nochmal komplett neu zusammenstellen? </p>
        <p>Kein Problem. Nutzen Sie einfach den Reset Button und Sie gelangen zurück auf die Startseite. </p>
          <button 
            className={`${styles.resetBtn} ${styles.form_button}`} 
            onClick={() => setIsPopup(true)}
            title='RESET YOUR DATA'
          >RESET <IconComponent name="reset" color="#fff"/></button>
      </section>

      {/* {isPopup && <Popup 
        children='Durch die Bestätigung werden Sie zur Hauptseite weitergeleitet. Ihre vorherigen Einstellungen werden zurückgesetzt' 
        // onConfirm={onResetConfirm}
        onCancel={onCancel}
        buttonIsVisible={true}
        />} */}

      {isContactFormVisible && <ContactForm onCancel={onCancel}/>}
      {isShareFormVisible && <ShareForm onCancel={onCancel}/>}
    </>
  )
}
