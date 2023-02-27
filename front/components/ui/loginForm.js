import { useEffect, useState } from 'react';

import checkObjIsEmpty from '../../utils/checkObjIsEmpty';
import madeShortUrl from '../../utils/madeShortUrl';

import LoadingSpinner from './Components/loadingSpinner';
import IconComponent from './Components/iconComponent';
import FormHeader from './Components/formHeader';

import styles from './loginForm.module.scss';
import SuccessMessage from './Components/successMessage';

export default function LoginForm({ onCancel }) {
  const [formValue, setFormValue] = useState(
    { name: '',
      email: '',
      text: '',
    });
  const [formFilled, setFormFilled] = useState(false);
  const [errors, setErrors] = useState(false);

  useEffect(() => {
    validate();
  },[formValue]);

  const validate = () => {
    if (!formFilled) return;
    const errors = {};

    if (formValue.name && !/^[A-Za-z ]{1,32}$/i.test(formValue.name)) {
      errors.name = 'Please use only letters';
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValue.email)) {
      errors.email = 'Invalid email address';
    }

    if (!formValue.email) {
      errors.email = 'Required';
    }

    setErrors(errors)
  };

  const changeFormData = (data) => {
    !formFilled && setFormFilled(true); 
    setFormValue({...formValue, ...data});
  }

  const copyLink = async () => {
    const type = "text/plain";
    const shortURl = await madeShortUrl(window.location.href);
    const blob = new Blob([shortURl], { type });

    const data = [new ClipboardItem({ [type]: blob })];
    navigator.clipboard.write(data).then(() => {
      setShowCopyLinkSuccess(true);

      setTimeout(() => { 
        setShowCopyLinkSuccess(false);
        // onCancel();
        }, 3500);
    });
  }
console.log('checkObjIsEmpty(errors)', checkObjIsEmpty(errors))
  return (
    <section className={`${styles.contactForm}`}>
      <div className={styles.contactForm__block}>
        <FormHeader title="In Profil speichern" clickFn={onCancel}/>

        <div className={styles.contactForm__content}>
          <div className={styles.contactForm__content_left}>
            {/* <SuccessMessage text={`Link  "${link}"  wurde kopiert`} showMessage={showCopyLinkSuccess}/>  */}

            <div className={styles.contactForm__content_title}>Profil anlegen</div>

            <form className={styles.form}> 
              <input 
                type="text" 
                placeholder="Name *" 
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
                className={errors && styles.contactForm__error}
              />
              {errors.email ? <div className={styles.errors}>{errors.email}</div> : null}

              <div className={styles.form__checkbox}>
                <input 
                  type="checkbox" 
                  name="callback" 
                  onChange={() => changeFormData({callBack: !formValue.callBack})}
                />
                <label htmlFor="callback">Ja, ich stimme der Speicherung meiner personenbezogenen Daten durch THE COMPANY AG zu. Diese Einwilligung kann ich jederzeit gemäß <a className={styles.link}>Datenschutzerklärung</a> widerrufen.</label>
              </div>

              <div className={`${styles.form_buttons}`}>
                <button type="submit" className={`${styles.form_button} ${styles.button__confirm}`} disabled={!formFilled || !checkObjIsEmpty(errors) || loading}>Registrieren</button>
              </div>
            </form>
            
          </div>
          <div className={styles.contactForm__content_right}>
            <div className={styles.contactForm__content_title}>Login</div> 

            <form className={styles.form}> 
              <input 
                type="email" 
                placeholder="Email *" 
                name="message[Mail]"
                value={formValue.email} 
                onChange={(e) => changeFormData({email: e.target.value})} 
                className={errors && styles.contactForm__error}
              />
              {errors.email ? <div className={styles.errors}>{errors.email}</div> : null}

              <input 
                type="password" 
                placeholder="Password *" 
                name="message[password]"
                value={formValue.password} 
                onChange={(e) => changeFormData({password: e.target.value})} 
                className={errors && styles.contactForm__error}
              />
              {errors.password ? <div className={styles.errors}>{errors.password}</div> : null}

              <div className={`${styles.form_buttons}`}>
                <a 
                  className={`${styles.form_button} ${styles.button__confirm} ${(!checkObjIsEmpty(errors) || formValue.email === '') && styles.button__disabled}`} 
                  href={`mailto:${formValue.email}?subject=Meine Appenzeller Huus Konfiguration&body=Hallo, ${formValue.name}! %0A%0a${formValue.text}`}
                >
                  Anmelden
                </a>
              </div>
            </form>
          </div>
        </div> 
      </div> 
    </section>
  )
}
