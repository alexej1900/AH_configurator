import {useState} from 'react';
import Image from 'next/image';

import styles from './infoBox.module.scss';

export default function InfoBox({styleTitle, description}) {
  const [colapsed, setCollapsed] = useState(true);

  return (
    <div className={[styles.infoBox, !colapsed ? styles.open : styles.closed].join(' ')}>
      <div className={styles.text_block}>
        <h2> {styleTitle} </h2>
        <div className={styles.close} onClick={() => setCollapsed(!colapsed)}>
          <Image src={colapsed ? '/info.svg' : '/clear.svg'} width="24" height="24" alt="Icon"/> 
        </div>
      </div>
      <div className={styles.text_block__text}>
        <div dangerouslySetInnerHTML={{ __html: description }}></div>
      </div>
    </div>
  )
}
