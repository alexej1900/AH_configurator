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

import Popup from './popup';
import LoadingSpinner from './loadingSpinner';
import IconComponent from './Components/iconComponent';

import styles from './finalForm.module.scss';

export default function ContactForm() {

  const [isPopup, setIsPopup] = useState(false);
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

  useEffect(async () => {
    const shortURl = await madeShortUrl(window.location.href);
    setLink(shortURl);
    saveAsPdf(false)
  }, []);

  useEffect(() => {
    validate(false);
  },[formValue]);

  const [save_users_default_Entry, {data, loading, error}] = useMutation(saveData);

  const validate = (onSubmit) => {
    const errors = {};
    if (!/^[A-Za-z ]{1,32}$/i.test(formValue.name)) {
      errors.name = 'Please use only letters';
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValue.email)) {
      errors.email = 'Invalid email address';
    }

    const formValueKeys = Object.keys(formValue);

    formValueKeys.forEach(key => {
      if (key !== 'text' && !formValue[key]) {
        errors[key] = onSubmit ? 'Required' : '';
      } 
    })

    setErrors(errors);
    checkObjIsEmpty(errors) ? setIsFormValid(true) : setIsFormValid(false);
  }

  const changeFormData = (data) => {
    !formFilled && setFormFilled(true); 
    setFormValue({...formValue, ...data});
  }

  // const emailSendingHandler = (e) => {
  //   validate(true);
  //   e.preventDefault();

  //   if (!isFormValid) return;
  //   // saveAsPdfHandler(false); 

  //   save_users_default_Entry({ variables: { 
  //     resultName: formValue.name,
  //     userEmail: formValue.email, 
  //     userData: link,
  //     authorId: 3,
  //   } });

  //   if(!loading){
  //     setShowSuccess(true);

  //     setTimeout(() => { 
  //       setShowSuccess(false);

  //       setFormValue({ 
  //         name: '',
  //         email: '',
  //         text: ''
  //       })
  //      }, 2500)
  //   }
  // }

  const submitHandler = async () => {
    const type = "text/plain";
    const shortURl = await madeShortUrl(window.location.href);
    const blob = new Blob([shortURl], { type });
    const data = [new ClipboardItem({ [type]: blob })];
    navigator.clipboard.write(data);

    alert(`Link ist:  ${shortURl}`);
  }

  const onResetConfirm = () => {
    setIsPopup(false);
    router.push('/');

    setTimeout(() => { 
      dispatch(resetState());
     }, 0);
  }

  const onCancel = () => {
    setIsPopup(false);
  }

  const saveAsPdf = async(isSave) => {
    const apartmentImage = document.getElementById('apartmentImage');
    const stats = document.getElementById('stats');
    const finalRooms = document.getElementsByClassName('finalRoom');

    const pdfDOC = new jsPDF("p", "mm", "a4"); 

    pdfDOC.text(`Name: ${formValue.name}`, 20, 10);
    pdfDOC.text(`Email: ${formValue.email}`, 20, 20);
    pdfDOC.text(`Link to settings: ${link}`, 20, 30);

    await getPdfPage(apartmentImage, pdfDOC, false, 20, 40, 2);
    await getPdfPage(stats, pdfDOC, false, 20, 170, 2);


    for (let i = 0; i < finalRooms.length; i++) {
      await getPdfPage(finalRooms[i], pdfDOC, true, 10, 20, 1);
    }

    // isSave && pdfDOC.save('summary.pdf');   //Download the rendered PDF.
    // pdfDOC.output('save', 'summary.pdf');
    const pdfFile = pdfDOC.output('datauristring'); 
    // pdfDOC.output('dataurlnewwindow'); 
    // setPdfData(pdfFile);
    // window.open(pdfFile);

    
  }

  const getPdfPage = async(div, pdfDOC, addPage, x, y, scale) => {
    addPage && pdfDOC.addPage();
    const divHeight = div.clientHeight
    const divWidth = 1440;
    const ratio = divHeight / divWidth;

    await html2canvas(div, { scale: '2' }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      
      const width = pdfDOC.internal.pageSize.getWidth();
      let height = pdfDOC.internal.pageSize.getHeight();
      height = ratio * width;

      pdfDOC.addImage(imgData, 'JPEG', x ? x : 0, y ? y : 0, (width - 20)/scale, (height - 10)/scale);

    })  

    return pdfDOC
  }

  const showPdfFile = () => {
    window.open(pdfData, '_blank');
  }

  const submitContactForm = async(ev) => {
    console.log('send')
    validate(true);
    ev.preventDefault();

    if (!isFormValid) return;
    saveAsPdfHandler(false); 

    save_users_default_Entry({ variables: { 
      resultName: formValue.name,
      userEmail: formValue.email, 
      userPhone: pdfData,
      userData: link,
      authorId: 3,
    } });

    if(!loading){
      setShowSuccess(true);

      setTimeout(() => { 
        setShowSuccess(false);

        setFormValue({ 
          name: '',
          email: '',
          text: ''
        })
       }, 2500)
    }
    
    // if (!checkObjIsEmpty(errors)) return;
    // setDataIsLoading(true);
    
    await fetch('https://staging.immokonfigurator.ch/mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
      },
      mode: 'no-cors',
      body: serialize(ev.target)
      })
      .then((result) => {
        // console.log(result);
        setDataIsLoading(false);
        setShowSuccess(true);

        setTimeout(() => { 
          setShowSuccess(false);
          onCancel();
         }, 2500);
      });
  }
console.log('pdf', pdfData)
  return (
    <>
      <section className={`${styles.finalForm}`}>
        <div className={styles.finalForm_header}>
          <h3 className={styles.finalForm_header_title}>Herzlichen Glückwunsch!</h3>
          <div className={styles.finalForm_header_subtitle}>Sie sind Ihrer Traumwohnung einen Schritt näher.</div>
          <div className={styles.finalForm_header_description}>Speichern Sie die Zusammenfassung der Materialisierung Ihrer Wohnung für sich als PDF für eine persönliche Besprechung oder senden Sie Ihre konkrete Anfrage direkt an uns per Formular. </div>
          <div className={styles.finalForm_header_description}>Anschliessend wird Sie unser Vermarkter für die weiteren Schritte kontaktieren.</div>
        </div>

        <div className={styles.formular}>
          <div className={styles.formular__left}>
            <div className={styles.formular__left_pdf_btn} onClick={() =>  showPdfFile()} >
              <div className={styles.formular__left_pdf_icon}>
                <IconComponent name="pdf" color="#fff"/>
              </div>
              <div className={styles.formular__left_pdf_title}>PDF anzeigen</div>
            </div>

            <div className={styles.formular__left_content}>
              <div className={styles.title}>Link zu dieser Konfiguration</div>
              <div className={styles.formular__left_content_description}>Mit diesem Link erreichen SIe immer den aktuellen Stand Ihrer Konfiguration. So konnen SIe diese ganz einfach mit Familie und Freunden teilen und besprechen</div>
            </div>
            
            <div className={styles.formular__left_share_btn}>
              <div className={styles.formular__left_share_title}>
                {link}
              </div>
              <div className={styles.formular__left_share_icon}>
                <IconComponent name="share" color="#fff"/>
              </div>
            </div>
          </div>

          <div className={styles.formular__right}>
            <div className={styles.title}>PDF versenden</div>
            {dataIsLoading ? <LoadingSpinner/> : 
            <form className={styles.form} onSubmit={(e) => submitContactForm(e)}> 
              
              <div className={`${styles.success__message}  ${showSuccess && styles.active}`}  >
                <span>Vielen Dank für Ihr Interesse an einem Eigenheim im Appenzeller Huus. Unser Vermarkter wird mit Ihnen Kontakt aufnehmen.</span>
              </div>

              <input type="hidden" name="user_link" value={link}/>  
              <input type="hidden" name="fromEmail" value={'info@immokonfigurator.com'}/>    
              <input type="hidden" name="fromName" value={`${formValue.name}`} />  
              
              <input 
                type="text" 
                placeholder="Name" 
                name="name"
                value={formValue.name} 
                onChange={(e) => changeFormData({name: e.target.value})} 
                className={errors.name && styles.contactForm__error}
              />
              {errors.name ? <div className={styles.errors}>{errors.name}</div> : null}

              <input 
                type="email" 
                placeholder="Email*" 
                name="message[Mail]"
                value={formValue.email} 
                onChange={(e) => changeFormData({email: e.target.value})} 
                className={errors.email && styles.contactForm__error}
              />
              {errors.email ? <div className={styles.errors}>{errors.email}</div> : null}

              <textarea 
                placeholder="Zusätzliche Nachricht" 
                name="message[text]"
                value={formValue.text} 
                onChange={(e) => changeFormData({text: e.target.value})} 
              ></textarea>

              <button 
                type="submit" 
                className={`${styles.form_button} ${styles.button__confirm}`} 
                disabled={!formFilled || !checkObjIsEmpty(errors) || loading}
                // onClick={ (e) =>  emailSendingHandler(e)}
              >Senden</button>
            </form>}
          </div>

          {/* } */}
            {/* <button 
              className={`${styles.mailBtn} ${styles.btn}`} 
              onClick={ (e) =>  emailSendingHandler(e)} 
              disabled={showSuccess}
              title='Kontakte werden gesendet. Warten Sie auf einen Anruf'
              
            >
              {loading ? 'Senden...' : 'Kontakte per Email zusenden '}
            </button>
            <button 
              className={`${styles.pdfBtn} ${styles.btn}`} 
              onClick={(e) => {
                e.preventDefault();
                saveAsPdfHandler(true);
              }} 
              title='Sie können alle Einstellungen in einer PDF-Datei speichern'
            >
              Konfiguration als PDF speichern
            </button>
            <button 
              className={`${styles.shareBtn} ${styles.btn}`} 
              onClick={(e) => {
                e.preventDefault();
                // submitHandler();
              }}
              title='Sie können alle Einstellungen als Link speichern'
            >
              Link weiterleiten
            </button> */}
        </div>

        <p>Sie möchten die Wohnung nochmal komplett neu zusammenstellen? </p>
        <p>Kein Problem. Nutzen Sie einfach den Reset Button und Sie gelangen zurück auf die Startseite. </p>
          <button 
            className={`${styles.resetBtn} ${styles.form_button}`} 
            onClick={() => setIsPopup(true)}
            title='RESET YOUR DATA'
          >RESET <IconComponent name="reset" color="#fff"/></button>
      </section>

      {isPopup && <Popup 
        children='Durch die Bestätigung werden Sie zur Hauptseite weitergeleitet. Ihre vorherigen Einstellungen werden zurückgesetzt' 
        onConfirm={onResetConfirm}
        onCancel={onCancel}
        buttonIsVisible={true}
        />}
    </>
  )
}
