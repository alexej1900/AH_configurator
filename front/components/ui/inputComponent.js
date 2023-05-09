import { useState } from 'react';

import IconComponent from './atoms/iconComponent';

import styles from './inputComponent.module.scss';

export default function InputComponent({ type, inputName, valueName, placeholder, value, changeFn, errors, id }) {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const clearInput = () => {
    changeFn({[valueName]: ''}); 
    setIsInputFocused(false);
  }

  return (
    type !== "textarea"  
      ? <div className={styles.input}>
          <input 
            type={type} 
            name={inputName}
            value={value} 
            onFocus={ () => setIsInputFocused(true) } 
            onChange={ (e) => changeFn({[valueName]: e.target.value}) } 
            className={ `${isInputFocused && errors && styles.input__error}` }
          />
          <span className={`${styles.input__label} ${isInputFocused && styles.input__label_focus}`}>{placeholder}</span>
         { value ? <div className={ `${styles.input__clean}` } onClick={clearInput}>
            <IconComponent name="close" color="#fff"/>
          </div> : null}
          <div className={ `${styles.input__errors}` }>{isInputFocused && errors && errors}</div>
        </div>
      : <div className={styles.input}>
          <textarea
            id={id}
            // placeholder={placeholder} 
            onFocus={ () => setIsInputFocused(true) } 
            name={inputName}
            value={value} 
            onChange={ (e) => changeFn({[valueName]: e.target.value}) } 
          ></textarea>
          <span className={`${styles.input__label} ${isInputFocused && styles.input__label_focus}`}>{placeholder}</span>
          { value ? <div className={ `${styles.input__clean}` } onClick={clearInput}>
            <IconComponent name="close" color="#fff"/>
          </div> : null}
        </div>
  )
}
