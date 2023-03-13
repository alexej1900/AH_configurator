import {useState} from 'react';

import IconComponent from './iconComponent';

import styles from './infoBox.module.scss';

export default function InfoBox({styleTitle, description}) {
  const [colapsed, setCollapsed] = useState(true);

  return (
    description 
      ? <div className={[styles.infoBox, !colapsed ? styles.open : styles.closed].join(' ')}>
        <div className={styles.text_block}>
          <div className={styles.text_block__title}> {styleTitle} </div>
          <div className={styles.close} onClick={() => setCollapsed(!colapsed)}>
            <IconComponent name={colapsed ? 'info' : 'close'} color="#000"/>
          </div>
        </div>
        <div className={styles.text_block__text}>
          <p dangerouslySetInnerHTML={{ __html: description }}></p>
        </div>
      </div>
    : null
  )
}
