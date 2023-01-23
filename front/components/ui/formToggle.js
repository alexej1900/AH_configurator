import {useState} from 'react';

import styles from './formToggle.module.scss';

export default function FormToggle({tab1, tab1Action, activeTabStyle,tab2, tab2Action}) {
  const [isActive, setActive] = useState('tab1');

    return (
        <div className={styles.toggle}>
            <div 
              className={[styles.option, isActive === 'tab1' && styles.active].join(' ')} 
              onClick = {() => {tab1Action(); setActive('tab1')}}
              style={isActive === 'tab1' ? activeTabStyle : {background: '#fff'}}
            >
              <p className={styles.toggle__title}>{tab1}</p>
            </div>
            <div 
              className={[styles.option, isActive === 'tab2' && styles.active].join(' ')} 
              onClick = {() => {tab2Action(); setActive('tab2')}}
              style={isActive === 'tab2' ? activeTabStyle : {background: '#fff'}}
            >
              <p className={styles.toggle__title}>{tab2}</p>
            </div>
          </div>
    )
}