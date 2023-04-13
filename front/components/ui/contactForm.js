import { useEffect, useState } from 'react';

import serialize from '../../utils/serialize';
import checkObjIsEmpty from '../../utils/checkObjIsEmpty';
import madeShortUrl from '../../utils/madeShortUrl';
import validateForm from '../../utils/validateForm';

import LoadingSpinner from './atoms/loadingSpinner';
import IconComponent from './atoms/iconComponent';
import FormHeader from './atoms/formHeader';
import SuccessMessage from './atoms/successMessage';
import InputComponent from './inputComponent';

import styles from './contactForm.module.scss';

export default function ContactForm({ onCancel }) {
  const [formValue, setFormValue] = useState(
    { name: '',
      email: '',
      phone: '',
      text: '',
      callBack: false
    });
  const [formFilled, setFormFilled] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(async () => {
    const shortURl = await madeShortUrl(window.location.href);
    setLink(shortURl);
  }, []);

  useEffect(() => {
    validateForm(formValue, setErrors, formFilled);
  },[formValue]);

  const changeFormData = (data) => {
    !formFilled && setFormFilled(true); 
    setFormValue({...formValue, ...data});
  }

  const submitContactForm = async(ev) => {
    ev.preventDefault();
    
    if (!checkObjIsEmpty(errors)) return;
    setLoading(true);
    
    await fetch('https://ah.immokonfigurator.ch/mail', {
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
        console.log(result);
        setLoading(false);
        setShowSuccess(true);

        setTimeout(() => { 
          setShowSuccess(false);
          onCancel();
         }, 2500);
      });
  }

  return (
    <section className={`${styles.contactForm}`}>
      <div className={styles.contactForm__block}>
        <FormHeader title="Kontakt Aufnehmen" clickFn={onCancel}/>

        <div className={styles.contactForm__content}>
          <div className={styles.contactForm__content_left}>
            <h2>Wir sind für Sie da.</h2>
            <p className={styles.contactForm__content_text}>Sie können uns gerne telefonisch kontaktieren oder Sie senden und über das Formular eine Mitteilung.</p>
            <div className={styles.contactForm__content_phone}>
              <IconComponent name="phone" color="#000"/>
              <div>
                <div className={styles.contactForm__content_phone_value}>+41 41 748 64 00</div>
                <div className={styles.contactForm__content_phone_time}>Business hours  9:00 till 17:00.</div>
              </div>
            </div>
          </div>
          <div className={styles.contactForm__content_right}>

          <SuccessMessage 
            text="Vielen Dank für Ihr Interesse an einem Eigenheim im Appenzeller Huus. Unser Vermarkter wird mit Ihnen Kontakt aufnehmen."
            showMessage={showSuccess}
          /> 
            
          {loading ? <LoadingSpinner/> :
            <form method="post" className={styles.form} id="contactForm" onSubmit={(e) => submitContactForm(e)}>   

              <input type="hidden" name="user_link" value={link}/>  
              <input type="hidden" name="fromEmail" value={'info@immokonfigurator.com'}/>    
              <input type="hidden" name="fromName" value={`${formValue.name}`} />  
              <input type="hidden" name="callBack" value={formValue.callBack} />
              <input type="hidden" name="subject" value={formValue.callBack ? "Call me" : ""} />

              <InputComponent
                type="text" 
                placeholder="Name" 
                inputName="name"
                valueName="name"
                value={formValue.name} 
                changeFn={changeFormData} 
                errors={errors.name}
              />

              <InputComponent
                type="text" 
                placeholder="Email *" 
                inputName="message[Mail]"
                valueName="email"
                value={formValue.email} 
                changeFn={changeFormData} 
                errors={errors.email}
              />

              <InputComponent
                type="tel" 
                placeholder="Telefon" 
                inputName="message[Phone]"
                valueName="phone"
                value={formValue.phone} 
                changeFn={changeFormData} 
                errors={errors.phone}
              />


              <div className={styles.form__checkbox}>
                <input 
                  type="checkbox" 
                  name="callback" 
                  onChange={() => changeFormData({callBack: !formValue.callBack})}
                />
                <label htmlFor="callback">Ich wünsche einen telefonischen Rückruf</label>
              </div>

              <InputComponent
                type="textarea" 
                placeholder="Ihre Nachricht" 
                inputName="message[text]"
                valueName="text"
                value={formValue.text} 
                changeFn={changeFormData} 
              />

              <div className={`${styles.form_buttons}`}>
                <button type="submit" className={`${styles.form_button} ${styles.button__confirm}`} disabled={!formFilled || !checkObjIsEmpty(errors) || loading}>Senden</button>
              </div>
            </form>
          }
          </div>
        </div> 
      </div> 
    </section>
  )
}
