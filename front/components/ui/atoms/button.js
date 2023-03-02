import Link from 'next/link';
import IconComponent from './iconComponent';

import styles from './button.module.scss';


export default function Button({title, href, classes, style, iconName, iconColor}) {
  const reducer = (acc, curr) => `${acc} ${styles[curr]}`;
  const className = classes.split(' ').reduce(reducer, '');
  return (
    <Link href={href}>
      <a className={className} style={style}>
        {iconName
          ? <IconComponent name={iconName} color={iconColor}/>
          : null
        }
        {title}
      </a>
    </Link>
  )
}
