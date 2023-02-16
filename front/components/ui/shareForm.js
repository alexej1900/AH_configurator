import { useEffect, useState } from 'react';

import checkObjIsEmpty from '../../utils/checkObjIsEmpty';
import madeShortUrl from '../../utils/madeShortUrl';

import LoadingSpinner from './Components/loadingSpinner';
import IconComponent from './Components/iconComponent';
import FormHeader from './Components/formHeader';

import styles from './shareForm.module.scss';
import SuccessMessage from './Components/successMessage';

export default function ShareForm({ onCancel }) {
  const [formValue, setFormValue] = useState(
    { name: '',
      email: '',
      text: '',
    });
  const [formFilled, setFormFilled] = useState(false);
  const [errors, setErrors] = useState(false);
  const [link, setLink] = useState('');
  const [showCopyLinkSuccess, setShowCopyLinkSuccess] = useState(false);

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
        <FormHeader title="Konfiguration teilen" clickFn={onCancel}/>

        <div className={styles.contactForm__content}>
          <div className={styles.contactForm__content_left}>
            <SuccessMessage text={`Link  "${link}"  wurde kopiert`} showMessage={showCopyLinkSuccess}/> 

            <div className={styles.contactForm__content_social}>
              <a className={styles.contactForm__content_social_link} href={`https://wa.me/?text=${link}`} target="_blank">
                <IconComponent name="phoneLink" color="#3C6589"/>
              </a>
              <a className={styles.contactForm__content_social_link} href={`https://www.facebook.com/sharer/sharer.php?u=https://ah-configurator.vercel.app/&quote=${link}`} target='_blank'>
                <IconComponent name="facebookLink" color="#3C6589"/>
              </a>
              <a className={styles.contactForm__content_social_link} href={`https://twitter.com/intent/tweet?text=${link}`} target='_blank'>
                <IconComponent name="twitterLink" color="#3C6589"/>
              </a>
            </div>

            <div className={styles.contactForm__content_title}>Link zu dieser Konfiguration</div>
            <div className={styles.contactForm__content_text}>Mit diesem Link erreichen Sie immer den derzeitigen Stand Ihrer Konfiguration. So können Sie diese ganz einfach mit Familie und Freunden teilen und besprechen</div>
            <div className={styles.contactForm__content_link}>
              {link}
              <div className={styles.contactForm__content_link_btn} onClick={copyLink}>
                <IconComponent name="copy" color="#fff"/>
              </div>
            </div>
          </div>
          <div className={styles.contactForm__content_right}>

          <form className={styles.form}> 
            <div className={styles.contactForm__content_title}>PDF an weitere Personen versenden</div> 

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
              className={errors && styles.contactForm__error}
            />
            {errors.email ? <div className={styles.errors}>{errors.email}</div> : null}

            <textarea 
              placeholder="Zusätzliche Nachricht" 
              name="message[text]"
              value={formValue.text} 
              onChange={(e) => changeFormData({text: e.target.value})} 
            ></textarea>

            <div className={`${styles.form_buttons}`}>
              <a 
                className={`${styles.form_button} ${styles.button__confirm} ${(!checkObjIsEmpty(errors) || formValue.email === '') && styles.button__disabled}`} 
                href={`mailto:${formValue.email}?subject=Meine Appenzeller Huus Konfiguration&body=Hallo, ${formValue.name}! %0A%0a${formValue.text}`}
              >
                Senden
              </a>
            </div>
          </form>
          </div>
        </div> 
      </div> 
    </section>
  )
}
