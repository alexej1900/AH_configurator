import IconComponent from './iconComponent';
import styles from './scrollIcon.module.scss';

export default function ScrollIcon () {
  return (
    <div className={styles.scroll__icon}>
      <IconComponent name="scroll"/>
   </div>
  )
}
