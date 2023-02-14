import {useState} from 'react';
import IconComponent from './iconComponent';

import styles from './formToggle.module.scss';

export default function FormToggle({tab1, tab1Action, tab2, tab2Action}) {
  const [isActive, setIsActive] = useState(true);

  return (
    <div className={styles.toggle}>
      <div 
        className={[styles.option, isActive && styles.active].join(' ')} 
        onClick = {() => {tab1Action(); setIsActive(!isActive)}}
      >
        <IconComponent name="bed" color={isActive ? '#FFFFFF' : '#3C6589'}/>
        <p className={styles.toggle__title}>{tab1}</p>
      </div>
      
      <div 
        className={[styles.option, !isActive && styles.active].join(' ')} 
        onClick = {() => {tab2Action(); setIsActive(!isActive)}}
      >
        <IconComponent name="chair" color={!isActive ? '#FFFFFF' : '#3C6589'}/>
        <p className={styles.toggle__title}>{tab2}</p>
      </div>
    </div>
  )
}
