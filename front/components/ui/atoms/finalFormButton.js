import IconComponent from './iconComponent';

import styles from './finalFormButton.module.scss';

export default function FinalFormButton({title, iconName, iconColor, clickFn}) {

  return (
    <div className={`${styles.button}`} onClick={() => clickFn ? clickFn() : null}>

      <div className={`${styles.button__icon}`}>
        <div className={`${styles.button__icon_hoverbg}`}></div>
        <IconComponent name={iconName} color={iconColor}/>
      </div>

      <div className={`${styles.button__text}`}>{title}</div>
    </div>
  )
}
