import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { resetState } from '../../redux/actions';

import { useRouter } from 'next/router';

import { useMutation } from '@apollo/client';

import madeShortUrl from '../../utils/madeShortUrl';
import checkObjIsEmpty from '../../utils/checkObjIsEmpty';

// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

import { saveData } from '../../gql/index';

import Popup from './atoms/popup';
import LoadingSpinner from './atoms/loadingSpinner';
import IconComponent from './atoms/iconComponent';

import styles from './finalForm.module.scss';

export default function ContactForm() {

  const [isContactReady, setIsContactReady] = useState(false);
  const [isPopup, setIsPopup] = useState(false);

  const [formValue, setFormValue] = useState(
    { name: '',
      surname: '',
      email: '',
      phone: ''
    });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const [link, setLink] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const router = useRouter();
  const dispatch = useDispatch();

  const checkHandler = () => {
    setIsContactReady(!isContactReady)
  }

  useEffect(async () => {
    const shortURl = await madeShortUrl(window.location.href);
    setLink(shortURl);
  }, []);

  useEffect(() => {
    validate(false);
  },[formValue]);

  const [save_users_default_Entry, {data, loading, error}] = useMutation(saveData);

  const validate = (onSubmit) => {
    const errors = {};
    if (!/^[A-Za-z]{1,32}$/i.test(formValue.name)) {
      errors.name = 'Please use only letters';
    }

    if (!/^[A-Za-z]{1,32}$/i.test(formValue.surname)) {
      errors.surname = 'Please use only letters';
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValue.email)) {
      errors.email = 'Invalid email address';
    }

    if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i.test(formValue.phone)) {
      errors.phone = 'Invalid phone format';
    }

    const formValueKeys = Object.keys(formValue);

    formValueKeys.forEach(key => {
      if (!formValue[key]) {
        errors[key] = onSubmit ? 'Required' : '';
      } 
    })

    setErrors(errors);
    checkObjIsEmpty(errors) ? setIsFormValid(true) : setIsFormValid(false);
  }

  const changeFormData = (data) => {
    setFormValue({...formValue, ...data});
  }

  const emailSendingHandler = (e) => {
    validate(true);
    e.preventDefault();

    if (!isFormValid) return;
    // saveAsPdfHandler(false); 

    save_users_default_Entry({ variables: { 
      resultName: formValue.name + ' ' + formValue.surname,
      userEmail: formValue.email, 
      userPhone: formValue.phone, 
      userData: link,
      authorId: 3,
    } });

    if(!loading){
      setShowSuccess(true);

      setTimeout(() => { 
        setShowSuccess(false);

        setFormValue({ 
          name: '',
          surname: '',
          email: '',
          phone: ''
        })
       }, 2500)
    }
  }

  const submitHandler = async () => {
    const type = "text/plain";
    const shortURl = await madeShortUrl(window.location.href);
    const blob = new Blob([shortURl], { type });

    const data = [new ClipboardItem({ [type]: blob })];
    navigator.clipboard.write(data).then(() => {alert(`Link ist:  ${shortURl}`)});
  }

  const onConfirm = () => {
    setIsPopup(false);
    router.push('/');

    setTimeout(() => { 
      dispatch(resetState());
     }, 0);
  }

  const onCancel = () => {
    setIsPopup(false);
  }

  // const saveAsPdfHandler = async(isSave) => {
  //   const apartmentImage = document.getElementById('apartmentImage');
  //   const stats = document.getElementById('stats');
  //   const finalRooms = document.getElementsByClassName('finalRoom');

  //   const pdfDOC = new jsPDF("p", "mm", "a4"); 

  //   pdfDOC.text(`Name: ${formValue.name}`, 20, 10);
  //   pdfDOC.text(`Vorame: ${formValue.surname}`, 20, 20);
  //   pdfDOC.text(`Email: ${formValue.email}`, 20, 30);
  //   pdfDOC.text(`Telefonnummer: ${formValue.phone}`, 20, 40);
  //   isContactReady && pdfDOC.text(`Rückruf: Ya`, 140, 40);

  //   pdfDOC.text(`Link to settings: ${link}`, 20, 50);

  //   // await getPdfPage(apartmentImage, pdfDOC, false, 20, 60, 1);
  //   await getPdfPage(stats, pdfDOC, false, 20, 70, 1);


  //   for (let i = 0; i < finalRooms.length; i++) {
  //     await getPdfPage(finalRooms[i], pdfDOC, true, 10, 20, 1);
  //   }

  //   isSave && pdfDOC.save('summary.pdf');   //Download the rendered PDF.
  // }

  // const getPdfPage = async(div, pdfDOC, addPage, x, y, scale) => {
  //   addPage && pdfDOC.addPage();
  //   const divHeight = div.clientHeight
  //   const divWidth = 1440;
  //   const ratio = divHeight / divWidth;

  //   await html2canvas(div, { scale: '2' }).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');
      
  //     const width = pdfDOC.internal.pageSize.getWidth();
  //     let height = pdfDOC.internal.pageSize.getHeight();
  //     height = ratio * width;

  //     pdfDOC.addImage(imgData, 'JPEG', x ? x : 0, y ? y : 0, (width - 20)/scale, (height - 10)/scale);

  //   })  

  //   return pdfDOC
  // }

  return (
    <>
      <section className={`${styles.contactForm}`}>
        <div className={styles.text__inner}>
          <div className={styles.contactForm_header}>
            <h3>Herzlichen Glückwunsch! Sie sind Ihrer Traumwohnung einen Schritt näher.</h3>
          </div>
          <div className={styles.formular}>
            <p >Speichern Sie die Zusammenfassung der Materialisierung Ihrer Wohnung für sich als PDF für eine persönliche Besprechung oder senden Sie Ihre konkrete Anfrage direkt an uns per Formular.</p> 
            <p >Anschliessend wird Sie unser Vermarkter für die weiteren Schritte kontaktieren.</p>
            
            {loading ? <LoadingSpinner/> :
              <form className={styles.form}> 
                
                <div className={`${styles.success__message}  ${showSuccess && styles.active}`}  >
                  <span>Vielen Dank für Ihr Interesse an einem Eigenheim im Appenzeller Huus. Unser Vermarkter wird mit Ihnen Kontakt aufnehmen.</span>
                </div>
                
                <input 
                  type="text" 
                  placeholder="Name" 
                  value={formValue.name} 
                  onChange={(e) => changeFormData({name: e.target.value})} 
                  className={errors.name && styles.contactForm__error} 
                />
                {errors.name ? <div className={styles.errors}>{errors.name}</div> : null}
                <input 
                  type="text" 
                  placeholder="Vorname" 
                  value={formValue.surname} 
                  onChange={(e) => changeFormData({surname: e.target.value})} 
                  className={errors.surname && styles.contactForm__error}
                />
                {errors.surname ? <div className={styles.errors}>{errors.surname}</div> : null}
                <input 
                  type="email" 
                  placeholder="Emailadresse" 
                  value={formValue.email} 
                  onChange={(e) => changeFormData({email: e.target.value})} 
                  className={errors.email && styles.contactForm__error}
                />
                {errors.email ? <div className={styles.errors}>{errors.email}</div> : null}
                <input 
                  type="tel" 
                  placeholder="Telefonnummer" 
                  value={formValue.phone} 
                  onChange={(e) => changeFormData({phone: e.target.value})} 
                  className={errors.phone && styles.contactForm__error}
                />
                {errors.phone ? <div className={styles.errors}>{errors.phone}</div> : null}

              </form>
            }
              <button 
                className={`${styles.mailBtn} ${styles.btn}`} 
                onClick={ (e) =>  emailSendingHandler(e)} 
                disabled={showSuccess}
                title='Kontakte werden gesendet. Warten Sie auf einen Anruf'
                
              >
                {loading ? 'Senden...' : 'Kontakte per Email zusenden '} <IconComponent name="mail" color="#fff"/>
              </button>
              <button 
                className={`${styles.pdfBtn} ${styles.btn}`} 
                onClick={(e) => {
                  e.preventDefault();
                  saveAsPdfHandler(true);
                }} 
                title='Sie können alle Einstellungen in einer PDF-Datei speichern'
              >
                Konfiguration als PDF speichern <IconComponent name="pdf" color="#fff"/>
              </button>
              <button 
                className={`${styles.shareBtn} ${styles.btn}`} 
                onClick={(e) => {
                  e.preventDefault();
                  submitHandler();
                }}
                title='Sie können alle Einstellungen als Link speichern'
              >
                Link weiterleiten <IconComponent name="share" color="#fff"/>
              </button>
          </div>

          <p>Sie möchten die Wohnung nochmal komplett neu zusammenstellen? </p>
          <p>Kein Problem. Nutzen Sie einfach den Reset Button und Sie gelangen zurück auf die Startseite. </p>
            <button 
              className={`${styles.resetBtn} ${styles.btn}`} 
              onClick={() => setIsPopup(true)}
              title='RESET YOUR DATA'
            >
              RESET <IconComponent name="reset" color="#fff"/>
            </button>
        </div>
        
      </section>

      {isPopup && <Popup 
        children='Durch die Bestätigung werden Sie zur Hauptseite weitergeleitet. Ihre vorherigen Einstellungen werden zurückgesetzt' 
        onConfirm={onConfirm}
        onCancel={onCancel}
        buttonIsVisible={true}
        />}
    </>
  )
}
