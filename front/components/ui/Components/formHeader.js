import IconComponent from './iconComponent';

import styles from './formHeader.module.scss';

export default function FormHeader({title, clickFn}) {

  return (
    <div className={styles.formHeader}>
      <div>{title}</div>
      <div className={styles.formHeader__closeBtn} onClick={() => clickFn()}>
        <IconComponent name="close" color="#fff"/>
      </div>
    </div> 
  )
}
