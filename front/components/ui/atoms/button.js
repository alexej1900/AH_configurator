import Link from 'next/link';
import IconComponent from './iconComponent';

import styles from './button.module.scss';

export default function Button({ title, href, type, iconName, iconColor, iconRight, clickFn }) {
  const button = 
    <a className={`${styles.btn} ${styles[type]}`} onClick={clickFn ? () => clickFn() : null}>
      {!iconRight &&  iconName ? <IconComponent name={iconName} color={iconColor}/> : null}
      {title ? title : null}
      {iconRight &&  iconName ? <IconComponent name={iconName} color={iconColor}/> : null }
    </a>

  return (
    href ? <Link href={href}>{button}</Link> : button
  )
}
