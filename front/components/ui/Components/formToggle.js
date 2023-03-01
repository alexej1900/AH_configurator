import {useState} from 'react';
import IconComponent from './iconComponent';

import styles from './formToggle.module.scss';

export default function FormToggle({tab1, tab1Action, tab2, tab2Action}) {
  const [isActive, setIsActive] = useState(true);

  return (
    <div className={styles.toggle}>
      <div 
        className={[styles.option, isActive && styles.active].join(' ')} 
        onClick = {() => {
          if (!isActive) {
            tab1Action(); 
            setIsActive(!isActive);
          }
        }}
      >
        <IconComponent name="baseroom" />
        <div className={styles.toggle__title}>{tab1}</div>
        <div className={`${styles.toggle__sign}  ${isActive && styles.toggle__sign_active}`}>
          <div className={styles.toggle__point}></div>
        </div>
      </div>
      
      <div 
        className={[styles.option, !isActive && styles.active].join(' ')} 
        onClick = {() => {
          if (isActive) {
            tab2Action(); 
            setIsActive(!isActive);
          }
        }}
      >
        <IconComponent name="chair" />
        <div className={styles.toggle__title}>{tab2}</div>
        <div className={`${styles.toggle__sign}  ${!isActive && styles.toggle__sign_active}`}>
          <div className={styles.toggle__point}></div>
        </div>
      </div>
    </div>
  )
}
