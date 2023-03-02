import {useState} from 'react';

import IconComponent from './iconComponent';

import styles from './infoTitle.module.scss';

export default function InfoTitle({title, infoText}) {
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  return (
    <div className={styles.block}>
      <div className={styles.block__description}>
        <div className={styles.block__description_text}>{title}</div>
        <div className={styles.block__description_button} onClick={() => setIsInfoVisible(!isInfoVisible)}>
          <IconComponent name={isInfoVisible ? "close" : "info"} color="#fff"/>
        </div>
      </div>
      <div className={`${styles.block__info} ${isInfoVisible && styles.block__info_show}`}>
        {infoText}
      </div>
    </div>
  )
}
