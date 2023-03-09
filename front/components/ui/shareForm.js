import { useEffect, useState } from 'react';

import checkObjIsEmpty from '../../utils/checkObjIsEmpty';
import madeShortUrl from '../../utils/madeShortUrl';

import LoadingSpinner from './atoms/loadingSpinner';
import IconComponent from './atoms/iconComponent';
import Button from './atoms/button';
import FormHeader from './atoms/formHeader';

import styles from './shareForm.module.scss';
import SuccessMessage from './atoms/successMessage';

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
// console.log('checkObjIsEmpty(errors)', checkObjIsEmpty(errors))
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

            <h4 className={styles.contactForm__content_title}>Link zu dieser Konfiguration</h4>
            <p className={styles.contactForm__content_text}>Mit diesem Link erreichen Sie immer den derzeitigen Stand Ihrer Konfiguration. So können Sie diese ganz einfach mit Familie und Freunden teilen und besprechen</p>
            <div className={styles.contactForm__content_link}>
              <div >
                {link}
              </div>
              <div >
                <Button type="primary" iconName="copy" iconColor="#fff" clickFn={copyLink}/>
              </div>
            </div>
          </div>
          <div className={styles.contactForm__content_right}>

          <form className={styles.form}> 
            <h4 className={styles.contactForm__content_title}>PDF an weitere Personen versenden</h4> 

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

            <div className={`${styles.form_buttons} ${(!checkObjIsEmpty(errors) || formValue.email === '') && styles.button__disabled}`}>
              <Button 
                title="Senden" 
                href={`mailto:${formValue.email}?subject=Meine Appenzeller Huus Konfiguration&body=Hallo, ${formValue.name}! %0A%0a${formValue.text}`}
                type="primary" />
            </div>
          </form>
          </div>
        </div> 
      </div> 
    </section>
  )
}
