import { useEffect, useState } from 'react';

import serialize from '../../utils/serialize';
import checkObjIsEmpty from '../../utils/checkObjIsEmpty';
import madeShortUrl from '../../utils/madeShortUrl';

import LoadingSpinner from './atoms/loadingSpinner';
import IconComponent from './atoms/iconComponent';
import FormHeader from './atoms/formHeader';
import SuccessMessage from './atoms/successMessage';

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
    validate();
  },[formValue]);

  const validate = () => {
    if (!formFilled) return;
    const errors = {};

    if (!/^[A-Za-z ]{1,32}$/i.test(formValue.name)) {
      errors.name = 'Please use only letters';
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValue.email)) {
      errors.email = 'Invalid email address';
    }

    if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i.test(formValue.phone)) {
      errors.phone = 'Invalid phone format';
    }

    const formValueKeys = Object.keys(formValue);

    formValueKeys.forEach(key => {
      if (key !== 'callBack' && key !== 'gender' && !formValue[key]) {
        errors[key] = 'Required';
      } 
    })

    setErrors(errors)
  };

  const changeFormData = (data) => {
    !formFilled && setFormFilled(true); 
    setFormValue({...formValue, ...data});
  }

  const submitContactForm = async(ev) => {
    ev.preventDefault();
    
    if (!checkObjIsEmpty(errors)) return;
    setLoading(true);
    
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
            <h2>Wir sind f??r Sie da.</h2>
            <p className={styles.contactForm__content_text}>Sie k??nnen uns gerne telefonisch kontaktieren oder Sie senden und ??ber das Formular eine Mitteilung.</p>
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
            text="Vielen Dank f??r Ihr Interesse an einem Eigenheim im Appenzeller Huus. Unser Vermarkter wird mit Ihnen Kontakt aufnehmen."
            showMessage={showSuccess}
          /> 
            
          {loading ? <LoadingSpinner/> :
            <form method="post" className={styles.form} id="contactForm" onSubmit={(e) => submitContactForm(e)}>   

              <input type="hidden" name="user_link" value={link}/>  
              <input type="hidden" name="fromEmail" value={'info@immokonfigurator.com'}/>    
              <input type="hidden" name="fromName" value={`${formValue.name}`} />  
              <input type="hidden" name="callBack" value={formValue.callBack} />
              <input type="hidden" name="subject" value={formValue.callBack ? "Call me" : ""} />

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
                placeholder="Email *" 
                name="message[Mail]"
                value={formValue.email} 
                onChange={(e) => changeFormData({email: e.target.value})} 
                className={errors.email && styles.contactForm__error}
              />
              {errors.email ? <div className={styles.errors}>{errors.email}</div> : null}

              <input 
                type="tel" 
                placeholder="Telefonnummer" 
                name="message[Phone]"
                value={formValue.phone} 
                onChange={(e) => changeFormData({phone: e.target.value})} 
                className={errors.phone && styles.contactForm__error}
              />
              {errors.phone ? <div className={styles.errors}>{errors.phone}</div> : null}

              <div className={styles.form__checkbox}>
                <input 
                  type="checkbox" 
                  name="callback" 
                  onChange={() => changeFormData({callBack: !formValue.callBack})}
                />
                <label htmlFor="callback">Ich w??nsche einen telefonischen R??ckruf</label>
              </div>

              <textarea 
                placeholder="Ihre Nachricht" 
                name="message[text]"
                value={formValue.text} 
                onChange={(e) => changeFormData({text: e.target.value})} 
              ></textarea>

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
