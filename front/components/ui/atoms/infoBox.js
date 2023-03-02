import {useState} from 'react';

import IconComponent from './iconComponent';

import styles from './infoBox.module.scss';

export default function InfoBox({styleTitle, description}) {
  const [colapsed, setCollapsed] = useState(true);

  return (
    <div className={[styles.infoBox, !colapsed ? styles.open : styles.closed].join(' ')}>
      <div className={styles.text_block}>
        <h2> {styleTitle} </h2>
        <div className={styles.close} onClick={() => setCollapsed(!colapsed)}>
          <IconComponent name={colapsed ? 'info' : 'close'} color="#000"/>
        </div>
      </div>
      <div className={styles.text_block__text}>
        <div dangerouslySetInnerHTML={{ __html: description }}></div>
      </div>
    </div>
  )
}
