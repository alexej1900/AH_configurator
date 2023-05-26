import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import checkObjIsEmpty from '../../utils/checkObjIsEmpty';

import validateForm from '../../utils/validateForm';

import madeShortUrl from '../../utils/madeShortUrl';

import IconComponent from './atoms/iconComponent';
import Button from './atoms/button';
import FormHeader from './atoms/formHeader';
import InputComponent from './inputComponent';

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
  const [showCopyLinkSuccess, setShowCopyLinkSuccess] = useState(false);

  const { link } = useSelector(state => state.generalStates);

  useEffect(() => {
    validateForm(formValue, setErrors, formFilled)
  },[formValue]);

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
            <h4 className={styles.contactForm__content_title}>Link an weitere Personen versenden</h4> 

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
              type="textarea" 
              placeholder="Ihre Nachricht" 
              inputName="message[text]"
              valueName="text"
              value={formValue.text} 
              changeFn={changeFormData} 
            />

            <div className={`${styles.form_buttons} ${(!checkObjIsEmpty(errors) || formValue.email === '') && styles.button__disabled}`} 
                  onClick={onCancel}
            >
              <Button 
                title="Senden" 
                href={`mailto:${formValue.email}?subject=Meine Appenzeller Huus Konfiguration&body=Hallo, ${formValue.name}! %0A%0aDas ist Link zu meine Konfiguration:%0A%0a${link}%0A%0a${formValue.text}`}
                type="primary" />
            </div>
          </form>
          </div>
        </div> 
      </div> 
    </section>
  )
}
